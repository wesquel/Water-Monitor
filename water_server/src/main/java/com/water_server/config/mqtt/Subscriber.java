package com.water_server.config.mqtt;

import com.water_server.data.MonitorVO;
import com.water_server.model.Monitor;
import com.water_server.repository.MonitorRepository;
import com.water_server.services.MonitorService;
import com.water_server.services.WebSocketService;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Component;

import java.util.UUID;


@Component
public class Subscriber implements MqttCallback {

    private MqttClient client;

    @Autowired
    MonitorRepository monitorRepository;

    @Autowired
    MonitorService monitorService;

    @Autowired
    WebSocketService webSocketService;

    @Value("${mqtt.broker}")
    private String brokerUrl;

    private String clientId = UUID.randomUUID().toString();
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

        String MACAddress = "";
        double ph = 0;
        double temperatura = 0;
        double turbidez = 0;
        double condutividade = 0;

        JSONObject json;

        try {
            json = new JSONObject(payload.replace("\r", ""));

            MACAddress = json.getString("MACAddress");
            ph = json.getDouble("ph");
            temperatura = json.getDouble("temperatura");
            turbidez = json.getDouble("turbidez");
            condutividade = json.getDouble("condutividade");
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        if (client.isConnected()) {
            MonitorVO monitorVO = new MonitorVO();

            monitorVO.setMACAddress(MACAddress);
            monitorVO.setCondutividade(condutividade);
            monitorVO.setPh(ph);
            monitorVO.setTemperatura(temperatura);
            monitorVO.setTurbidez(turbidez);

            System.out.println("Received message:\n" + payload);

            Monitor monitor = monitorRepository.findByMACAddress(MACAddress);

            if (monitor == null) {
                monitorService.create(monitorVO);
            } else {
                monitorService.update(monitorVO);
            }

            webSocketService.sendMonitorPayload(monitorVO);
        } else {
            this.start();
        }
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {
        // not used in this example
    }
}
