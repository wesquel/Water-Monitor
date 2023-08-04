package com.water_server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.water_server.data.UserVO;
import com.water_server.services.UserServices;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "User Endpoint")
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired 
    private UserServices userServices;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@RequestBody UserVO userVO){
        System.out.println("to aqui");
        return userServices.create(userVO);
    }
    
}
