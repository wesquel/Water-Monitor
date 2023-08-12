package com.water_server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuração de CORS (Cross-Origin Resource Sharing) para a aplicação Water Server.
 * Essa classe define as configurações de CORS para permitir solicitações de diferentes origens.
 * O CORS é uma medida de segurança do navegador que restringe solicitações HTTP feitas a partir
 * de um contexto de origem diferente do servidor. Essa configuração ajuda a controlar quais
 * origens externas podem interagir com a aplicação.
 */

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT");
    }
}