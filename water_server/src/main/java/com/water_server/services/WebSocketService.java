package com.water_server.services;

import com.water_server.data.SocketMessageVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    public ResponseEntity<?> sendMessageToTopic(String topic, SocketMessageVO socketMessageVO) {
        messagingTemplate.convertAndSend(topic, socketMessageVO);

        return ResponseEntity.ok().build();
    }
}
