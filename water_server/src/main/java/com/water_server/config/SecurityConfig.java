package com.water_server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.water_server.security.jwt.JwtConfigurer;
import com.water_server.security.jwt.JwtTokenProvider;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Autowired
	private JwtTokenProvider tokenProvider;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    return http
			.httpBasic()
            .disable()
			.csrf()
            .disable()
			.sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeHttpRequests(
				authorizeHttpRequests -> authorizeHttpRequests
					.requestMatchers("/auth/signin").permitAll()
					.requestMatchers("/auth/refresh/**").permitAll()
					.requestMatchers("/api-docs/**").permitAll()
					.requestMatchers("/swagger-ui/**").permitAll()
					.requestMatchers("/v3/api-docs/**").permitAll()
	                .requestMatchers("/api/**").authenticated()
	                .requestMatchers("/users").denyAll()
			)
			.cors()
			.and()
			.apply(new JwtConfigurer(tokenProvider))
			.and()
			.build();
    }

	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
    }
    
}