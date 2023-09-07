package com.water_server.services;

import com.water_server.data.MonitorVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    public void sendMonitorPayload(MonitorVO monitorVO) {
        messagingTemplate.convertAndSend("/topic/monitor/" + monitorVO.getMACAddress(), monitorVO);
    }
}
