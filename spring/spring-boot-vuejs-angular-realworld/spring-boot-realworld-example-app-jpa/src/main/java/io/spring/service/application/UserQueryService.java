package io.spring.service.application;

import io.spring.dto.UserData;
import io.spring.service.data.jpa.UserReadService;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserQueryService  {
    private UserReadService userReadService;

    public UserQueryService(UserReadService userReadService) {
        this.userReadService = userReadService;
    }

    public Optional<UserData> findById(Long id) {
        return Optional.ofNullable(userReadService.findById(id));
    }
}

