package com.concretepage;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SpringBootAppStarter {  
	public static void main(String[] args) {
		SpringApplication.run(SpringBootAppStarter.class, args);
    }       
}            