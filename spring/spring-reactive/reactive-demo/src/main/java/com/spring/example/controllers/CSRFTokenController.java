package com.spring.example.controllers;

import java.util.Optional;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.server.ServerRequest;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value="/csrf-token")
public class CSRFTokenController {
	@GetMapping
	public Mono<String> getCsrfToken(ServerRequest request) {
	    Optional<Object> token = request.attribute("csrf");
	    String csrfToken = token.isPresent() ? ((CsrfToken) token.get()).getToken() : "n/a";
	    //Add CSRF support for WebFlux. A Mono<CsrfToken> is placed on the request attributes with the name csrf by default.
	    System.out.println("csrfToken:" + csrfToken);
	    return Mono.just(csrfToken);
	}
}