package com.bpwizard.calculator;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/** Calculator logic */
@Service
public class Calculator {
    @Cacheable("sum")
    public int sum(int a, int b) {
        System.out.println(String.format("Calulate sum of %s and %s", a, b));
        return a + b;
    }
}

