package org.bpwizard.myresource.oath2.jwt.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AccessToken {
	@JsonProperty("access_token")
    private String accessToken;
	private String name;
	
    public AccessToken(String accessToken, String name) {
    	this.accessToken = accessToken;
    	this.name = name;
    }
    
	public String getAccessToken() {
		return accessToken;
	}

	public String getName() {
		return name;
	}
}
