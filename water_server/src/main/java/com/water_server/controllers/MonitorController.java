package com.water_server.controllers;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.water_server.data.MonitorVO;
import com.water_server.exceptions.RequiredObjectIsNullException;
import com.water_server.services.MonitorService;

import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * Controlador responsável pelos endpoints relacionados à monitoramento da água.
 * Essa classe define os endpoints para criação de monitores.
 */

@Tag(name = "Endpoint de monitor")
@RestController
@RequestMapping("/api/monitor")
public class MonitorController {

    @Autowired
    private MonitorService monitorService;

    @Operation(summary = "Realiza uma busca paginada de todos os monitores.")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> findAllMonitors(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "12") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return monitorService.findAll(pageable);
    }

    @Operation(summary = "Cria uma instância de monitor.")
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

    @Operation(summary = "Realiza a atualização de um monitor e o retorna.")
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> update(@RequestBody MonitorVO monitorVO) {
        return monitorService.update(monitorVO);
    }
}