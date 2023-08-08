package com.water_server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.water_server.data.UserVO;
import com.water_server.services.UserServices;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Endpoint de usuário", description = "Gerenciamento de usuários")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired 
    private UserServices userServices;

     @GetMapping("/{username}")
     @ResponseStatus(HttpStatus.OK)
     public ResponseEntity<?> findByUsername(@PathVariable String username) {
         return userServices.findByUsername(username);
     }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<PagedModel<EntityModel<UserVO>>> findAllUsers(
        @RequestParam(value = "page", defaultValue = "0") Integer page, 
        @RequestParam(value = "size", defaultValue = "12") Integer size,
        @RequestParam(value = "direction", defaultValue = "asc") String direction  
    ) {
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Direction.DESC : Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "username"));
        return ResponseEntity.ok(userServices.findAll(pageable));
    }

    @Operation(summary = "Realiza a criação de um usuário e o retorna.")
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@RequestBody UserVO userVO){
        return userServices.create(userVO);
    }

    @Operation(summary = "Realiza a atualização de um usuário e o retorna.")
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> update(@RequestBody UserVO userVO) {
       return userServices.update(userVO);
    }
    
}
