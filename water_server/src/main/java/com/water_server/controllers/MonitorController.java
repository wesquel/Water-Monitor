package com.water_server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.water_server.data.MonitorVO;
import com.water_server.exceptions.RequiredObjectIsNullException;
import com.water_server.services.MonitorService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Authentication Endpoint")
@RestController
@RequestMapping("/monitor")
public class MonitorController {

    @Autowired
    private MonitorService monitorService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> criarMonitor(@RequestBody MonitorVO monitorVO) {
        try {
            MonitorVO monitorCriado = monitorService.create(monitorVO);
            return ResponseEntity.ok().body(monitorCriado);
        } catch (NumberFormatException ex) {
            String mensagem = "O valor de unidades deve ser um número inteiro.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensagem);
        } catch (RequiredObjectIsNullException ex) {
            String mensagemDeErro = "O objeto produto não pode ser nulo.";
            return ResponseEntity.badRequest().body(mensagemDeErro);
        } catch (Exception ex) {
            String mensagemDeErro = "Ocorreu um erro ao criar o produto.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensagemDeErro);
        }
    }

}