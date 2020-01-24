package com.bpwizard.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin
public class UserGreetingService {
	
	@RequestMapping("/api/user/greet")
	public String greet() {
		
		String greetingMsg = "Hello";
		
		String userName = restTemplate().getForObject("http://user-name-service:3001/api/user/name", String.class);
		String userAddress = restTemplate().getForObject("http://user-address-service:3002/api/user/address", String.class);
		
		return greetingMsg + " " + userName + "!\n\n" + userAddress;
	}
	
	@Bean
	RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
