package com.bpwizard.springcloudfunction.autoconfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;

@Configuration
public class DynamoDBAutoConfig {
	
	@Bean(name="amazonDynamoDB")
    public AmazonDynamoDB amazonDynamoDBService(AWSCredentialsProvider credentialsProvider) {
        return AmazonDynamoDBClientBuilder.standard()
        		.withCredentials(credentialsProvider)
        		.withRegion(Regions.US_EAST_1).build();
    }
}
