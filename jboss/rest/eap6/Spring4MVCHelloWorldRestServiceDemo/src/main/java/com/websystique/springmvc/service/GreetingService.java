package com.websystique.springmvc.service;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {

	public String greeting() {
		return "Welcome to RestTemplate Example.";
	}
}
