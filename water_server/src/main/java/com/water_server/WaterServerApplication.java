package com.water_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WaterServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(WaterServerApplication.class, args);

		// BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // String result = encoder.encode("teste123");
		// System.out.println(result);
	}
}
