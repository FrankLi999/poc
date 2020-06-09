package com.camunda.demo.springboot.junit5;

import java.net.URI;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class Springboot_junit5_api_test {

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	@DisplayName("/hello rest api test ")
	void testMessage() {

		String user = "Peter";
		URI targetUrl = UriComponentsBuilder.fromUriString("/hello").queryParam("user", user).build().encode().toUri();

		String message = this.restTemplate.getForObject(targetUrl, String.class);
		assertEquals("Hello " + user + ", Thanks for the subscription!", message);
	}
}