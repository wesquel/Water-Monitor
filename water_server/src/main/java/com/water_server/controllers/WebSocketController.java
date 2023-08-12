package com.water_server.controllers;

import com.water_server.data.SocketMessageVO;
import com.water_server.services.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {

    @Autowired
    WebSocketService webSocketService;

    @PostMapping("/api/send-message")
    public ResponseEntity<?> sendMessage(@RequestBody SocketMessageVO socketMessageVO) {
        return webSocketService.sendMessageToTopic("/topic/message", socketMessageVO);
    }

    @MessageMapping("/send-message")
    public void receiveMessage(@Payload SocketMessageVO socketMessageVO) {
        // Recebe mensagem do cliente
        webSocketService.sendMessageToTopic("/topic/message", socketMessageVO);
    }

    @SendTo("/topic/message")
    public SocketMessageVO broadcastMessage(@Payload SocketMessageVO socketMessageVO) {
        return socketMessageVO;
    }
}
