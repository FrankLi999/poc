package io.spring.service.core;

import org.springframework.stereotype.Service;

import io.spring.resource.user.EncryptService;

@Service
public class NaiveEncryptService implements EncryptService {
    @Override
    public String encrypt(String password) {
        return password;
    }

    @Override
    public boolean check(String checkPassword, String realPassword) {
        return checkPassword.equals(realPassword);
    }
}
