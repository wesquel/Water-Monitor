package com.water_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;


@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI()
        .info(
            new Info()
            .title("API Manager digital price tag")
            .version("v1")
            .description("Some description about your API")
            .termsOfService("github.com/wesquel")
            .license(
                new License()
                .name("Apache 2.0")
                .url("github.com/wesquel")
            )
        );
    }
}
