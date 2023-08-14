package com.water_server.services;

import com.water_server.data.UserVO;
import com.water_server.exceptions.ResourceNotFoundException;
import com.water_server.mapper.DozerMapper;
import com.water_server.model.Permission;
import com.water_server.model.User;
import com.water_server.repository.PermissionRepository;
import com.water_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class UserServices implements UserDetailsService {
    private Logger logger = Logger.getLogger(UserServices.class.getName());

    @Autowired
    UserRepository repository;

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    private PagedResourcesAssembler<UserVO> assembler;

    public UserServices(UserRepository repository) {
        this.repository = repository;
    }

    public ResponseEntity<?> findByUsername(String username) {
        logger.info("Iniciando busca do usuário por username: " + username);

        if (username == null || username.isEmpty()) {
            String errorMessage = "O nome de usuário não pode ser nulo ou vazio.";

            return ResponseEntity.badRequest().body(errorMessage);
        }

        try {
            User user = repository.findByUsername(username);

            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            UserVO userVO = DozerMapper.parseObject(user, UserVO.class);

            return ResponseEntity.ok(userVO);
        } catch (Exception e) {
            String errorMessage = "Erro ao buscar o usuário.";

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    public ResponseEntity<?> findAll(Pageable pageable) {
        logger.info("Buscando todos os tags!");

        if (pageable == null) {
            String errorMessage = "O objeto Pageable não pode ser nulo.";

            return ResponseEntity.badRequest().body(errorMessage);
        }

        try {
            Page<User> userPage = repository.findAll(pageable);
            Page<UserVO> userVOsPage = userPage.map(p -> DozerMapper.parseObject(p, UserVO.class));

            return ResponseEntity.ok(assembler.toModel(userVOsPage));
        } catch (Exception e) {
            String errorMessage = "Erro ao buscar os usuários.";

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    public ResponseEntity<?> create(UserVO userVO) {
        logger.info("Iniciando a criação de usuário!");

        if (userVO == null) {
            return ResponseEntity.badRequest().body("Requisição inválida!");
        }

        User user = repository.findByUsername(userVO.getUsername());

        if (user != null) {
            String errorMessage = "O nome de usuário já existe!";

            return ResponseEntity.badRequest().body(errorMessage);
        }

        user = repository.findByEmail(userVO.getEmail());
        if (user != null) {
            String errorMessage = "Este email já está em uso!";

            return ResponseEntity.badRequest().body(errorMessage);
        }

        userVO = setDefaultDataUser(userVO);

        try {
            User entity = DozerMapper.parseObject(userVO, User.class);

            Permission commonUserPermission = permissionRepository.findById(2L).orElseThrow(
                    () -> new ResourceNotFoundException("ID de permissão não encontrado.")
            );

            entity.setPermissions(List.of(commonUserPermission));

            UserVO newUserVO;

            User newUser = repository.save(entity);
            newUserVO = DozerMapper.parseObject(newUser, UserVO.class);

            return ResponseEntity.ok().body(newUserVO);
        } catch (Exception e) {
            String errorMessage = "Erro ao criar usuário.";

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    public ResponseEntity<?> update(UserVO userVO) {
        logger.info("Iniciando atualização de usuário!");

        if (userVO == null) {
            return ResponseEntity.badRequest().body("Requisição inválida!");
        }

        User user = repository.findByUsername(userVO.getUsername());

        if (user == null) {
            String errorMessage = "O nome de usuário não existe.";

            return ResponseEntity.badRequest().body(errorMessage);
        }

        if (!user.getEmail().matches(userVO.getEmail())){
            User userByEmail = repository.findByEmail(userVO.getEmail());

            if (userByEmail != null) {
                String errorMessage = "Este email já está em uso!";
                
                return ResponseEntity.badRequest().body(errorMessage);
            }
        }

        try {
            user.setFullName(userVO.getFullName());
            user.setEmail(userVO.getEmail());

            User updatedUser = repository.save(user);
            UserVO resultUserVO = DozerMapper.parseObject(updatedUser, UserVO.class);

            return ResponseEntity.ok().body(resultUserVO);
        } catch (Exception e) {
            String errorMessage = "Erro ao atualizar dados do usuário.";

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    public UserVO setDefaultDataUser(UserVO userVO) {
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
        logger.info("Encontrando usuário por nome: " + username + "!");

        var user = repository.findByUsername(username);

        if (user != null) {
            return user;
        } else {
            throw new UsernameNotFoundException("Username " + username + " não encontrado!");
        }
    }
}
