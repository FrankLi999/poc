package com.camunda.demo.springboot.junit5;

import org.springframework.stereotype.Component;

@Component
public class MessageService {

	public String getSubscriptionMessage(String user) {

		return "Hello " + user + ", Thanks for the subscription!";
	}
}