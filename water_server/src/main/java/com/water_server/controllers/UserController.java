package com.water_server.controllers;

import com.water_server.data.UserVO;
import com.water_server.services.UserServices;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Endpoint de usuário")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired 
    private UserServices userServices;

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
