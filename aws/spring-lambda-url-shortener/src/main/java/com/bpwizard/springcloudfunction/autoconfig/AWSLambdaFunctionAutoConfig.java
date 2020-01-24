package com.bpwizard.springcloudfunction.autoconfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;
import com.bpwizard.springcloudfunction.functions.LambdaFunctions;

@Configuration
public class AWSLambdaFunctionAutoConfig {
    @Bean
    public LambdaFunctions lambdaFunctions() {
        return LambdaInvokerFactory.builder()
				 .lambdaClient(AWSLambdaClientBuilder.defaultClient())
				 .build(LambdaFunctions.class);
    }
}
