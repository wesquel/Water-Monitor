package com.water_server.config.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Subscriber implements MqttCallback {

    private MqttClient client;

    @Value("${mqtt.broker}")
    private String brokerUrl;

    private String clientId = "water-monitor";
    private String topic = "monitoramento_agua/servidor";

    public void start() {
        try {
            client = new MqttClient(brokerUrl, clientId);
            client.setCallback(this);
            client.connect();
            client.subscribe(topic);    
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void connectionLost(Throwable cause) {
        System.out.println("Connection lost: " + cause.getMessage());
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) {
        String payload = new String(message.getPayload());

        if(client.isConnected()){
            System.out.println("Received message: " + payload);
        }
        else{
            this.start();
        }
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {
        // not used in this example
    }
}
