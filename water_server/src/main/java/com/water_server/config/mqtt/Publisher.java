package com.water_server.config.mqtt;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Publisher {

    private MqttClient client;
    
    @Value("${mqtt.broker}")
    private String brokerUrl;
    private String clientId;
    private String topic;

    public Publisher() {
    }

    public Publisher(String brokerUrl, String clientId, String topic) {
        this.brokerUrl = brokerUrl;
        this.clientId = clientId;
        this.topic = topic;
    }

    public void publish(String message) {
        
        try {
            // Verifica se o cliente MQTT está nulo ou não está conectado
            if (client == null || !client.isConnected()) {
                // Cria um novo cliente MQTT usando o URL do broker e o ID do cliente fornecidos
                client = new MqttClient(brokerUrl, clientId);
                // Conecta o cliente MQTT ao broker
                client.connect();
            }
            
            // Cria uma mensagem MQTT
            MqttMessage mqttMessage = new MqttMessage();
            // Define o payload da mensagem como um array de bytes convertido a partir da string da mensagem
            mqttMessage.setPayload(message.getBytes());
            // Define o nível de QoS da mensagem como 2 (garantido e entregue exatamente uma vez)
            mqttMessage.setQos(2);
            // Define se a mensagem deve ser retida no broker MQTT para futuros assinantes (false = não retida)
            mqttMessage.setRetained(false);
            
            // Publica a mensagem no tópico MQTT especificado, usando o cliente MQTT
            client.publish(topic, mqttMessage);
        } catch (Exception e) {
            // Captura qualquer exceção que ocorra durante a conexão ou publicação MQTT
            e.printStackTrace();
        }
    }

}
