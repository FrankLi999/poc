## debug 
java -Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n -jar target/my-authorization-server-0.0.1-SNAPSHOT.jar
java -Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n -jar target/my-resources-server-0.0.1-SNAPSHOT.jar

<h1>Login</h1>
    <div class="container unauthenticated">
        <div>
            With Facebook: <a href="/login/google">click here</a>
        </div>
        <div>
            With Facebook: <a href="/login/okta">click here</a>
        </div>
        <div>
            With Facebook: <a href="/login/facebook">click here</a>
        </div>
        <div>
            With Github: <a href="/login/github">click here</a>
        </div>
    </div>

## test
#!/bin/sh
TOKEN=`curl -s -u curl_client:user -X POST localhost:8081/oauth/token\?grant_type=client_credentials | egrep -o '[a-f0-9-]{20,}'`
echo "Got token for curl client as : $TOKEN"
curl localhost:8083/product/products -H "Authorization: Bearer $TOKEN"

## Step 1
	config oauth store:
	@Configuration
	@EnableAuthorizationServer
	public class AuthorizationServerConfiguration extends AuthorizationServerConfigurerAdapter {
	    ...
	    @Override
       public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        
            endpoints
                .approvalStore(approvalStore())
                .authorizationCodeServices(authorizationCodeServices())
                //org.springframework.security.oauth2.provider.token.store.JdbcTokenStore
                .tokenStore(tokenStore()); 
                
    }
    
	}    
	
	in case of JWT, it is like,
	@Override
    public void configure(final AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        final TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
        tokenEnhancerChain.setTokenEnhancers(Arrays.asList(tokenEnhancer(), accessTokenConverter()));
        // org.springframework.security.oauth2.provider.token.store.JwtTokenStore
        endpoints.tokenStore(tokenStore()) 
        
            .tokenEnhancer(tokenEnhancerChain)
            .authenticationManager(authenticationManager);
    }
    
    
## Spring Security OAuth

If you're already a student of Learn Spring Security, you can get started diving deeper into OAuth2 with Module 10, and then Modules 12, 13, and the upcoming module 17. </br></br>
If you're not yet a student, you can get access to the course here: http://bit.ly/github-lss
</br></br></br>



## Build the Project
```
mvn clean install
```



## Projects/Modules
This project contains a number of modules, but here are the main ones you should focus on and run: 
- `spring-security-oauth-server` - the Authorization Server (port = 8081)
- `spring-security-oauth-resource` - the Resource Server (port = 8082)

And, depending on what grant type you want to try out, you'll work with one of these UI/Clients:  
- `angularjs/spring-security-oauth-ui-implicit` (port = 8083)
- `angularjs/spring-security-oauth-ui-password` (port = 8084)

Other Modules: 
- `spring-security-5-oauth-resource` - another version of the Resource Server
- `spring-security-oauth-ui-implicit-angular4` - another version of the Implicit Grant UI Module - using Angular 4
- `spring-security-oauth-ui-password-angular4` - another version of the Password Grant UI Module - using Angular 4

Finally, you can ignore all other modules. 



## Run the Modules
You can run any sub-module using command line: 
```
mvn spring-boot:run
```

If you're using Spring STS, you can also import them and run them directly, via the Boot Dashboard 

You can then access the UI application - for example the module using the Password Grant - like this: 
`http://localhost:8084/`



## Run the Angular 4 Modules

- To run any of Angular4 front-end modules (_spring-security-oauth-ui-implicit-angular4_ and _spring-security-oauth-ui-password-angular4_) , we need to build the app first:
```
mvn clean install
```

- Then we need to navigate to our Angular app directory:
```
cd src/main/resources
```

And run the command to download the dependencies:
```
npm install
```

- Finally, we will start our app:
```
npm start
```
- Note: Angular4 modules are commented out because these don't build on Jenkins as they need npm installed, but they build properly locally
- Note for Angular version < 4.3.0: You should comment out the HttpClient and HttpClientModule import in app.module and app.service.ts. These version rely on the HttpModule.


## Relevant Articles: 
- [Spring REST API + OAuth2 + AngularJS](http://www.baeldung.com/rest-api-spring-oauth2-angularjs)
- [Using JWT with Spring Security OAuth](http://www.baeldung.com/spring-security-oauth-jwt)
- [OAuth2 for a Spring REST API – Handle the Refresh Token in AngularJS](http://www.baeldung.com/spring-security-oauth2-refresh-token-angular-js)
- [Spring Security OAuth2 – Simple Token Revocation](http://www.baeldung.com/spring-security-oauth-revoke-tokens)
- [OAuth2.0 and Dynamic Client Registration](http://www.baeldung.com/spring-security-oauth-dynamic-client-registration)
- [Testing an OAuth Secured API with the Spring MVC Test Support](http://www.baeldung.com/oauth-api-testing-with-spring-mvc)
- [Logout in a OAuth Secured Application](http://www.baeldung.com/logout-spring-security-oauth)
- [OAuth2 Remember Me with Refresh Token](http://www.baeldung.com/spring-security-oauth2-remember-me)
- [Angular 4 Upgrade for Spring Security OAuth](http://www.baeldung.com/angular-4-upgrade-for-spring-security-oauth/)
- [New in Spring Security OAuth2 – Verify Claims](http://www.baeldung.com/spring-security-oauth-2-verify-claims)

