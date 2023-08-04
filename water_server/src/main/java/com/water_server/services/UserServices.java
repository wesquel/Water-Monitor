package com.water_server.services;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.water_server.data.UserVO;
import com.water_server.mapper.DozerMapper;
import com.water_server.model.Permission;
import com.water_server.model.User;
import com.water_server.repository.PermissionRepository;
import com.water_server.repository.UserRepository;


@Service
public class UserServices implements UserDetailsService{
    private Logger logger = Logger.getLogger(UserServices.class.getName());

    @Autowired
    UserRepository repository;

    @Autowired
    PermissionRepository permissionRepository;

    public UserServices(UserRepository repository) {
        this.repository = repository;
    }

     public ResponseEntity<?> create(UserVO userVO){

        User user = repository.findByUsername(userVO.getUserName());

        if(user != null){
            String mensagemDeErro = "username always exist.";
            return ResponseEntity.badRequest().body(mensagemDeErro);
        }

        userVO = setDefaultDataUser(userVO);
        
        var entity = DozerMapper.parseObject(userVO, User.class);
        UserVO vo;

        User newUser = repository.save(entity);
        vo = DozerMapper.parseObject(newUser, UserVO.class);

        return ResponseEntity.ok().body(vo);

    }

    public UserVO setDefaultDataUser(UserVO userVO){

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        userVO.setAccountNonExpired(true);
        userVO.setAccountNonLocked(true);
        userVO.setCredentialsNonExpired(true);
        userVO.setEnabled(true);
        userVO.setPassword(encoder.encode(userVO.getPassword()));

        return userVO;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        logger.info("Finding one user by name "+username+" !");

        var user = repository.findByUsername(username);

        if(user != null){
            return user;
        }else{
            throw new UsernameNotFoundException("Username "+username+" not found!");
        }
    }
}
