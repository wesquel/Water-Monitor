package com.water_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.security.messaging.access.intercept.MessageMatcherDelegatingAuthorizationManager;

@Configuration
@EnableWebSocketSecurity
public class WebSocketSecurityConfig {

    @Bean
    AuthorizationManager<Message<?>> messageAuthorizationManager(MessageMatcherDelegatingAuthorizationManager.Builder messages) {
        messages
                .simpTypeMatchers(SimpMessageType.CONNECT, SimpMessageType.DISCONNECT, SimpMessageType.OTHER).permitAll()
                .anyMessage().authenticated();

        return messages.build();
    }

    // O código a seguir desativa o CSRF
    @Bean(name = "csrfChannelInterceptor")
    ChannelInterceptor csrfChannelInterceptor() {
        return new ChannelInterceptor() {};
    }
}
