package org.bpwizard.myresource.oath2.jwt.dto;

import javax.validation.constraints.NotBlank;

public class LocalLoginPayload {
    @NotBlank
    String clientId;

    private String username;
    private String password;
    @NotBlank
    private String scope;

    public String getClientId() {
		return clientId;
	}
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getUsername() {
		return username;
	}
	public void setUserName(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
  }