package com.water_server.services;

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
import com.water_server.model.User;
import com.water_server.repository.UserRepository;


@Service
public class UserServices implements UserDetailsService{
    private Logger logger = Logger.getLogger(UserServices.class.getName());

    @Autowired
    UserRepository repository;

    public UserServices(UserRepository repository) {
        this.repository = repository;
    }

     public ResponseEntity<?> create(UserVO userVO){
        
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User user = repository.findByUsername(userVO.getUsername());

        if(user != null){
            String mensagemDeErro = "username always exist.";
            return ResponseEntity.badRequest().body(mensagemDeErro);
        }

        userVO.setPassword(encoder.encode(userVO.getPassword()));

        var entity = DozerMapper.parseObject(userVO, User.class);
        UserVO vo;

        User newUser = repository.save(entity);
        vo = DozerMapper.parseObject(newUser, UserVO.class);

        return ResponseEntity.ok().body(vo);

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
