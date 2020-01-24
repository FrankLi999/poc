package io.spring.service.core;

import org.springframework.stereotype.Service;

import io.spring.resource.user.User;

import java.util.Optional;

@Service
public interface JwtService {
    String toToken(User user);

    Optional<Long> getSubFromToken(String token);
}
