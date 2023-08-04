package com.water_server.services;

import java.util.List;
import java.util.logging.Logger;

import com.water_server.exceptions.ResourceNotFoundException;
import com.water_server.model.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.water_server.data.UserVO;
import com.water_server.mapper.DozerMapper;
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

    public ResponseEntity<?> create(UserVO userVO) {
        User user = repository.findByUsername(userVO.getUserName());

        if (user != null) {
            String errorMessage = "O nome de usuário já existe.";

            return ResponseEntity.badRequest().body(errorMessage);
        }

        userVO = setDefaultDataUser(userVO);

        var entity = DozerMapper.parseObject(userVO, User.class);

        Permission commonUserPermission = permissionRepository.findById(2L).orElseThrow(
                () -> new ResourceNotFoundException("ID de permissão não encontrado.")
        );

        entity.setPermissions(List.of(commonUserPermission));

        UserVO vo;

        User newUser = repository.save(entity);
        vo = DozerMapper.parseObject(newUser, UserVO.class);

        return ResponseEntity.ok().body(vo);
    }

    public ResponseEntity<?> update(UserVO userVO) {
        if (userVO == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Requisição inválida!");
        }

        User user = repository.findById(userVO.getId()).orElse(null);

        if (user == null) {
            String errorMessage = "O nome de usuário não existe.";

            return ResponseEntity.badRequest().body(errorMessage);
        }

        user.setUserName(userVO.getUserName());
        user.setEnabled(userVO.getEnabled());
        user.setFullname(userVO.getFullname());
        user.setAccountNonExpired(userVO.getAccountNonExpired());
        user.setAccountNonLocked(userVO.getAccountNonLocked());
        user.setCredentialsNonExpired(userVO.getCredentialsNonExpired());

        User updatedUser = repository.save(user);
        UserVO resultUserVO = DozerMapper.parseObject(updatedUser, UserVO.class);

        return ResponseEntity.ok().body(resultUserVO);
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
