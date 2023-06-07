package com.water_server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.water_server.config.mqtt.Subscriber;
import com.water_server.services.MonitorService;
import com.water_server.data.MonitorVO;

@RestController
@RequestMapping("/water_monitor")
public class mqttController {

    @Autowired
    MonitorService monitorService;

    @Autowired
    private Subscriber subscriber;

    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<MonitorVO>>> listarProdutos(
        @RequestParam(value = "page", defaultValue = "0") Integer page, 
        @RequestParam(value = "size", defaultValue = "12") Integer size,
        @RequestParam(value = "direction", defaultValue = "asc") String direction  
        ) {
        
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Direction.DESC : Direction.ASC;
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "mac"));
        return ResponseEntity.ok(monitorService.findAll(pageable));
    }

    @GetMapping("/start-subscriber")
    public void startSubscriber() {
        subscriber.start();
    }
}
