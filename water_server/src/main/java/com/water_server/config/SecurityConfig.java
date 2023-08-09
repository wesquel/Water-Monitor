package com.water_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
     * Configuração de segurança da aplicação para controle de autenticação e autorização.
     * Essa classe define a configuração de segurança da aplicação, incluindo a codificação de senhas,
     * a configuração de filtros de segurança e a definição de regras de autorização para as URLs.
 */

@EnableWebSecurity
@Configuration
public class SecurityConfig {


    /**
         * Método de configuração que fornece um encoder de senha para codificar e comparar senhas.
         * @return Um encoder de senha BCrypt.
     */

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/dashboard", "/dashboard/**").authenticated()
            .anyRequest().permitAll()
        ).rememberMe(Customizer.withDefaults());

        return http.build();
    }
	

	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
    }
    
}