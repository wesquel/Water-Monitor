package com.water_server.config.mqtt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfiguration {

    @Autowired
    private Subscriber subscriber;

    @Bean
    public void init() {
        subscriber.start();
    }
}

