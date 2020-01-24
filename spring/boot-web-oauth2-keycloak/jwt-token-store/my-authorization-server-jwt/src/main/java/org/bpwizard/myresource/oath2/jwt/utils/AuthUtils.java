package org.bpwizard.myresource.oath2.jwt.utils;

public class AuthUtils {
	public static final String AUTH_HEADER_KEY = "Authorization";

	public static final String SCOPE_READ = "read";
	public static final String SCOPE_WRITE = "write";
	
	public static final String CLIENT_ID_KEY = "client_id";
	public static final String REDIRECT_URI_KEY = "redirect_uri";
	public static final String CLIENT_SECRET_KEY = "client_secret";
	public static final String SCOPE_KEY = "scope";
	public static final String CODE_KEY = "code";
	public static final String USERNAME_KEY = "username";
	public static final String PASSWORD_KEY = "password";
	
	public static final String GRANT_TYPE_KEY = "grant_type";
	public static final String GRANT_TYPE_AUTH_CODE = "authorization_code";
	public static final String GRANT_TYPE_PASSWORD = "password";
	public static final String GRANT_TYPE_REFRESH_TOKEN = "refresh_token";
	public static final String GRANT_TYPE_IMPLICIT = "implicit";
}
