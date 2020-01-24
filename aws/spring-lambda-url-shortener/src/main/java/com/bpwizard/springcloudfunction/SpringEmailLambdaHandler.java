package com.bpwizard.springcloudfunction;

import org.springframework.cloud.function.adapter.aws.SpringBootRequestHandler;

import com.bpwizard.springcloudfunction.functiontypes.EmailDetails;

public class SpringEmailLambdaHandler extends SpringBootRequestHandler<EmailDetails, Boolean> {
}
