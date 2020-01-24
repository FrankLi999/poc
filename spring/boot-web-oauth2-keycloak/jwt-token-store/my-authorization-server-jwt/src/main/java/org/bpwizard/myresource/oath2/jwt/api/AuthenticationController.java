package org.bpwizard.myresource.oath2.jwt.api;

import java.io.IOException;

import javax.validation.Valid;

import org.apache.commons.codec.binary.Base64;
import org.bpwizard.myresource.oath2.jwt.dto.AccessToken;
import org.bpwizard.myresource.oath2.jwt.dto.LocalLoginPayload;
import org.bpwizard.myresource.oath2.jwt.dto.SocialLoginPayload;
import org.bpwizard.myresource.oath2.jwt.utils.AuthUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
//TODO: could under attack?
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	@PostMapping(value = "/local")
    public ResponseEntity<AccessToken> localLogin(@Valid @RequestBody LocalLoginPayload payload) throws IOException {
		RestTemplate restTemplate = new RestTemplate();
		final MultiValueMap<String, String> accessData= new LinkedMultiValueMap<String, String>();
	    accessData.add(AuthUtils.GRANT_TYPE_KEY, AuthUtils.GRANT_TYPE_PASSWORD); 
		accessData.add(AuthUtils.CLIENT_ID_KEY, "productClientIdCode");
		// accessData.add(AuthUtils.CLIENT_SECRET_KEY, "secret"); //TODO
		// accessData.add(AuthUtils.SCOPE_KEY, payload.getScope());
		accessData.add(AuthUtils.USERNAME_KEY, payload.getUsername());
		accessData.add(AuthUtils.PASSWORD_KEY, payload.getPassword());
		MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
		headers.add("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
		headers.add("Authorization", String.format("Basic %s", Base64.encodeBase64String("productClientIdCode:secret".getBytes()))); // cHJvZHVjdENsaWVudElkUGFzc3dvcmQ6c2VjcmV0");
		
		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(accessData, headers);
		ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8081/spring-security-oauth-server/oauth/token", request, String.class);
	    ObjectMapper mapper = new ObjectMapper();
	    JsonNode respObject = mapper.readTree(response.getBody());
	    String accessToken = respObject.get("access_token").textValue();
//	    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa(this.clientId+":secret")});
//	     this._http.post('http://localhost:8081/spring-security-oauth-server/oauth/token', params.toString(), { headers: headers })
//	    .subscribe(
//	      data => this.saveToken(data),
//	      err => alert('Invalid Credentials')
//	    ); 
//	     
		
		return ResponseEntity.ok(new AccessToken(accessToken, payload.getUsername()));
	}
	@PostMapping(value = "/{provider}")
    public ResponseEntity<AccessToken> authToken(@Valid @RequestBody SocialLoginPayload payload, @PathVariable String provider) throws IOException {
		
		final String accessTokenUrl = "https://accounts.google.com/o/oauth2/token";
		//TODO. optimize it
		RestTemplate restTemplate = new RestTemplate();
		final MultiValueMap<String, String> accessData= new LinkedMultiValueMap<String, String>();
		accessData.add(AuthUtils.CLIENT_ID_KEY, payload.getClientId());
	    accessData.add(AuthUtils.REDIRECT_URI_KEY, payload.getRedirectUri());
	    accessData.add(AuthUtils.CLIENT_SECRET_KEY, "T2-nmQq6RoMO4QFVyOIF1aAp"); //TODO
	    accessData.add(AuthUtils.CODE_KEY, payload.getCode());
	    accessData.add(AuthUtils.GRANT_TYPE_KEY, AuthUtils.GRANT_TYPE_AUTH_CODE);

	    
	    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(accessData, null);
	    
	    // Step 2. Retrieve profile information about the current user.
	    ResponseEntity<String> response = restTemplate.postForEntity(accessTokenUrl, request, String.class);
	    //access_token, id_token, scope, expires_in, token_type
	    ObjectMapper mapper = new ObjectMapper();
	    JsonNode respObject = mapper.readTree(response.getBody());
	    String accessToken = respObject.get("access_token").textValue();
	    //final String peopleApiUrl = "https://www.googleapis.com/plus/v1/people/me/openIdConnect";
	    final String peopleApiUrl = String.format("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=%s", accessToken);
//	    HttpHeaders headers = new HttpHeaders();
//	    headers.set(AuthUtils.AUTH_HEADER_KEY, String.format("Bearer %s", accessToken));
//	    ResponseEntity<String> userInfoResp = restTemplate.exchange(peopleApiUrl, HttpMethod.GET, new HttpEntity<byte[]>(headers), String.class);
	    ResponseEntity<String> userInfoResp = restTemplate.getForEntity(peopleApiUrl, String.class);

	    /*
	    {
    	 "id": "108201634064120780299",
    	 "email": "frank.x.li@gmail.com",
    	 "verified_email": true,
    	 "name": "Frank Li",
    	 "given_name": "Frank",
    	 "family_name": "Li",
    	 "link": "https://plus.google.com/108201634064120780299",
    	 "picture": "https://lh6.googleusercontent.com/-y5r3OVLte-s/AAAAAAAAAAI/AAAAAAAABPk/NT0shccDENA/photo.jpg",
    	 "gender": "male",
    	 "locale": "en"
    	}
    	*/
	    JsonNode userJsonData = mapper.readTree(userInfoResp.getBody());
	    /*
	    List<Authority> authorities = new ArrayList<>();
	    Authority authority = new Authority();
	    authority.setAuthority("ROLE_PRODUCT_ADMIN");
	    authority.setId(3L);
	    authorities.add(authority);
	    UserDetails user = new User(
	    		userJsonData.get("email").textValue(), 
	    		"N/A", 
	    		true,
	    		true,
	    		true,
	    		true,
	    		authorities);

	    OAuth2AccessToken jwtToken = jwtTokenServices.createAccessToken(
	    		this.convertAuthentication(payload.getLocalClientId(), user));
	    */
	    //TODO: add the external user to the user registry, or create a shared external user/role account
	    MultiValueMap<String, String> tokenData = new LinkedMultiValueMap<String, String>();
	    tokenData.add(AuthUtils.GRANT_TYPE_KEY, AuthUtils.GRANT_TYPE_PASSWORD); 
	    tokenData.add(AuthUtils.CLIENT_ID_KEY, "productClientIdCode");
		// accessData.add(AuthUtils.CLIENT_SECRET_KEY, "secret"); //TODO
		// accessData.add(AuthUtils.SCOPE_KEY, payload.getScope());
	    tokenData.add(AuthUtils.USERNAME_KEY, "external_user");
	    tokenData.add(AuthUtils.PASSWORD_KEY, "user");
		MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
		headers.add("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
		headers.add("Authorization", String.format("Basic %s", Base64.encodeBase64String("productClientIdCode:secret".getBytes()))); // cHJvZHVjdENsaWVudElkUGFzc3dvcmQ6c2VjcmV0");
		
		request = new HttpEntity<MultiValueMap<String, String>>(tokenData, headers);
		response = restTemplate.postForEntity("http://localhost:8081/spring-security-oauth-server/oauth/token", request, String.class);
	    mapper = new ObjectMapper();
	    respObject = mapper.readTree(response.getBody());
	    accessToken = respObject.get("access_token").textValue();
	    
        return ResponseEntity.ok(new AccessToken(accessToken, userJsonData.get("name").textValue()));
    }
	
//	private OAuth2Authentication convertAuthentication(String localClientId, UserDetails userDetails) {
//        OAuth2Request request = new OAuth2Request(null, localClientId, null, true, null, null, null, null, null);
//        return new OAuth2Authentication(request, new UsernamePasswordAuthenticationToken(userDetails, "N/A", userDetails.getAuthorities()));
//    }
}
