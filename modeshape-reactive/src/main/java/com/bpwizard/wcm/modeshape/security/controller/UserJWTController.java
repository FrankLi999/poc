package com.bpwizard.wcm.modeshape.security.controller;

import com.bpwizard.wcm.modeshape.security.dto.LoginVM;
import com.bpwizard.wcm.modeshape.security.jwt.JWTReactiveAuthenticationManager;
import com.bpwizard.wcm.modeshape.security.jwt.JWTToken;
import com.bpwizard.wcm.modeshape.security.jwt.TokenProvider;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import javax.validation.Validator;

/**
 *
 * @author duc-d
 *
 */
@RestController
@RequestMapping("/auth/login")
@Slf4j
public class UserJWTController {
    private final TokenProvider tokenProvider;
    private final JWTReactiveAuthenticationManager authenticationManager;
    private final Validator validation;

    public UserJWTController(TokenProvider tokenProvider,
                             JWTReactiveAuthenticationManager authenticationManager,
                             Validator validation) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.validation = validation;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Mono<JWTToken> authorize(@Valid @RequestBody LoginVM loginVM) {
        if (!this.validation.validate(loginVM).isEmpty()) {
            return Mono.error(new RuntimeException("Bad request"));
        }

        Authentication authenticationToken =
                new UsernamePasswordAuthenticationToken(loginVM.getEmail(), loginVM.getPassword());

        Mono<Authentication> authentication = this.authenticationManager.authenticate(authenticationToken);
        authentication.doOnError(throwable -> {
            throw new BadCredentialsException("Bad crendentials");
        });
        ReactiveSecurityContextHolder.withAuthentication(authenticationToken);

        return authentication.map(auth -> {
            String jwt = tokenProvider.createToken(auth);
            return new JWTToken(jwt);
        });
    }

}
