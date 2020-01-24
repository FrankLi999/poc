package com.websystique.springmvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.websystique.springmvc.domain.Message;
import com.websystique.springmvc.domain.Person;
import com.websystique.springmvc.service.GreetingService;

@RestController
public class HelloWorldRestController {
	@Autowired
	GreetingService greetingService;
	Person p = new Person();
	
	@RequestMapping(value="/welcome", produces = MediaType.TEXT_PLAIN_VALUE)
	public String welcome() {//Welcome page, non-rest
		//return "Welcome to RestTemplate Example.";
		return greetingService.greeting();
	}

	@RequestMapping(value="/greeting/{player}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Message message(@PathVariable String player) {//REST Endpoint.

		Message msg = new Message(player, "Hello " + player);
		return msg;
	}

	@RequestMapping(value="/person", produces = MediaType.APPLICATION_JSON_VALUE)
	public Person getPerson() {
		return p;
	}
	
}
