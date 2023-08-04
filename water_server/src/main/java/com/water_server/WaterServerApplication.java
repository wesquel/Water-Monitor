package com.water_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
public class WaterServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(WaterServerApplication.class, args);

		// BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // String result = encoder.encode("teste123");
		// System.out.println(result);
	}
}
