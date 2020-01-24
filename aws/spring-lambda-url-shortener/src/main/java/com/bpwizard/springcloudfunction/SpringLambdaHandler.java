package com.bpwizard.springcloudfunction;

import org.springframework.cloud.function.adapter.aws.SpringBootRequestHandler;

/**
 * A simple empty class that extends SpringBootRequestHandler with the request and response types and this provides the
 * AWS lambda entry point
 */
public class SpringLambdaHandler extends SpringBootRequestHandler<String, String> {
}
