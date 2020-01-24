package com.bpwizard.boot;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserNameService {
	
	@RequestMapping("/api/user/name")
	public String getUserName() {
		
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		return "John Smith";
	}
}
