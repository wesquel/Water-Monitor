package com.water_server.controllers;

import com.water_server.data.UserVO;
import com.water_server.services.UserServices;
import com.water_server.validation.UserCreationGroup;
import com.water_server.validation.UserUpdateGroup;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


/**
 * Controlador responsável pelos endpoints relacionados à gestão de usuários.
 * Essa classe define os endpoints para realizar operações de busca, criação e atualização
 * de usuários, fornecendo funcionalidades de gerenciamento de usuários.
 */

@Tag(name = "Endpoint de usuário", description = "Gerenciamento de usuários")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired 
    private UserServices userServices;

    @Operation(summary = "Realiza uma busca pelo username exato.")
    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> findByUsername(@PathVariable String username) {
        return userServices.findByUsername(username);
    }

    @Operation(
            summary = "Realiza uma busca paginada de todos os usuários.",
            description = "Realiza uma busca de todos os usuários pelo número da página, tamanho da página e ordem."
    )
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> findAllUsers(
        @RequestParam(value = "page", defaultValue = "0") Integer page, 
        @RequestParam(value = "size", defaultValue = "12") Integer size,
        @RequestParam(value = "direction", defaultValue = "asc") String direction  
    ) {
        Direction sortDirection = "desc".equalsIgnoreCase(direction) ? Direction.DESC : Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "username"));
        return userServices.findAll(pageable);
    }

    @Operation(summary = "Realiza a criação de um usuário e o retorna.")
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@RequestBody @Validated(UserCreationGroup.class) UserVO userVO) {
        return userServices.create(userVO);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Realiza a atualização de um usuário e o retorna.")
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> update(@RequestBody @Validated(UserUpdateGroup.class) UserVO userVO) {
       return userServices.update(userVO);
    }
}
