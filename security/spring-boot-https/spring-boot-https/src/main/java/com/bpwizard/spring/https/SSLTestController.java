package com.bpwizard.spring.https;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SSLTestController {
	@GetMapping(value = "/ssl-test")
    public String greeting() {
        return "Self Signed SSL is Working!!";
    }
}
