package com.water_server.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.water_server.data.security.AccountCredentialsVO;
import com.water_server.services.AuthServices;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * Controlador responsável pelos endpoints relacionados à autenticação de usuários.
 * Essa classe define os endpoints para autenticação de usuários, permitindo a obtenção
 * e atualização de tokens de autenticação.
 */

@Tag(name = "Endpoint de autenticação")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
	AuthServices authServices;

	@SuppressWarnings("rawtypes")
	@Operation(summary = "Realiza a autenticação do usuário e retorna um token.")
	@PostMapping(value = "/signin")
	public ResponseEntity signin(@RequestBody @Valid AccountCredentialsVO data) {
		if (checkIfParamsAreNotNull(data)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
		}
		
		var token = authServices.signin(data);
		
		if (token == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
		}
		
		return token;
	}
	
	@SuppressWarnings("rawtypes")
	@Operation(summary = "Atualiza o token para o usuário autenticado e retorna um token.")
	@PutMapping(value = "/refresh/{username}")
	public ResponseEntity refreshToken(@PathVariable("username") String username, @RequestHeader("Authorization") String refreshToken) {
		if (checkIfParamsAreNotNull(username, refreshToken)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
		}
		
		var token = authServices.refreshToken(username, refreshToken);
		
		if (token == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid client request!");
		}
		
		return token;
	}

	private boolean checkIfParamsAreNotNull(String username, String refreshToken) {
		return refreshToken == null
		|| refreshToken.isBlank()
		|| username == null
		|| username.isBlank();
	}

	private boolean checkIfParamsAreNotNull(AccountCredentialsVO data) {
		return data == null
		|| data.getUsername() == null
		|| data.getUsername().isBlank()
		|| data.getPassword() == null
		|| data.getPassword().isBlank();
	}

}