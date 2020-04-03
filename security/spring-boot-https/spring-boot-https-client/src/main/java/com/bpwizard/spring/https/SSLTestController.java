package com.bpwizard.spring.https;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Qualifier;

@RestController
public class SSLTestController {
	@Autowired
	@Qualifier("restTemplate1")
	private RestTemplate restTemplate1;
	
	@Autowired
	@Qualifier("restTemplate2")
	private RestTemplate restTemplate2;

	@GetMapping(value = "/ssl-client")
    public String greeting() {
		return this.restTemplate1.getForEntity("https://ubuntu:8643/ssl-test", String.class).getBody();
	}
	
	@GetMapping("/customer")
    public Customer customer() {
		return this.restTemplate2.getForEntity("https://localhost:8443/customer/1", Customer.class).getBody();
    }
}
