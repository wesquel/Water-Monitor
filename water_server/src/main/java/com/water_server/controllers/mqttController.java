package com.water_server.controllers;

import com.water_server.config.mqtt.Subscriber;
import com.water_server.services.MonitorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Endpoint de MQTT")
@RestController
@RequestMapping("/water_monitor")
public class mqttController {

    @Autowired
    MonitorService monitorService;

    @Autowired
    private Subscriber subscriber;

    @GetMapping("/start-subscriber")
    public void startSubscriber() {
        subscriber.start();
    }
}
