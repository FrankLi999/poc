package org.bpwizard.myresource.oath2.jwt.dto;

import javax.validation.constraints.NotBlank;

public class SocialLoginPayload {
	@NotBlank
	String localClientId;
	 
    @NotBlank
    String clientId;

    @NotBlank
    String redirectUri;

    @NotBlank
    String code;

    public String getClientId() {
      return clientId;
    }

    public String getRedirectUri() {
      return redirectUri;
    }

    public String getCode() {
      return code;
    }

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public void setRedirectUri(String redirectUri) {
		this.redirectUri = redirectUri;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLocalClientId() {
		return localClientId;
	}

	public void setLocalClientId(String localClientId) {
		this.localClientId = localClientId;
	}
	
  }