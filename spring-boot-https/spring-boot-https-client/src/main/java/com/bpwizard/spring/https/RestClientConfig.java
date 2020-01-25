package com.bpwizard.spring.https;

import java.io.IOException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;

import javax.net.ssl.SSLContext;

import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.ResourceUtils;

@Configuration
public class RestClientConfig {
	
	
	@Autowired
	private ApplicationContext context;
	
	// TODO: user an array or map
	@Value("${service1.ssl.trust-store}")
	private String service1TrustStore;
	@Value("${service1.ssl.protocol}")
	private String service1SslProtocol = "TLS";
	@Value("${service1.ssl.trust-store-password}")
	private String service1TrustStorePassword;	
	@Value("${service1.ssl.connect-timeout:10000}")
	private int service1ConnectTimeout = 10000;	
	@Value("${service1..ssl.read-timeout:10000}")
	private int service1ReadTimeout = 10000;
	
	@Value("${service2.ssl.trust-store}")
	private String service2TrustStore;
	@Value("${service2.ssl.key-store}")
	private String service2KeyStore;
	@Value("${service2.ssl.key-password}")
	private String service2KeyPassword;
	@Value("${service2.ssl.store-password}")
	private String service2StorePassword;
	@Value("${service2.ssl.protocol}")
	private String service2SslProtocol = "TLS";
	@Value("${service2.ssl.trust-store-password}")
	private String service2TrustStorePassword;	
	@Value("${service2.ssl.connect-timeout:10000}")
	private int service2ConnectTimeout = 10000;	
	@Value("${service2..ssl.read-timeout:10000}")
	private int service2ReadTimeout = 10000;

	@Bean(name="restTemplate1")
	public RestTemplate restTemplate1() throws IOException, KeyManagementException, NoSuchAlgorithmException, KeyStoreException, CertificateException {
	    URL trustStoreUrl = context.getResource(this.service1TrustStore).getURL();
	    // TrustStrategy acceptingTrustStrategy = (cert, authType) -> true;
	    // TrustStrategy trustStrategy = new TrustSelfSignedStrategy();
		SSLContext sslContext = new SSLContextBuilder()
				.setProtocol(this.service1SslProtocol)
				//.loadTrustMaterial(trustStoreUrl , trustStorePassword.toCharArray(), acceptingTrustStrategy)
				.loadTrustMaterial(trustStoreUrl , this.service1TrustStorePassword.toCharArray())
				.build();
		
		//SSLConnectionSocketFactory sslConnectionSocketFactory = new SSLConnectionSocketFactory(sslContext);
		// specify host verifier (NoopHostnameVerifier) to allow accepting certificates from different hosts
	    SSLConnectionSocketFactory sslConnectionSocketFactory = new SSLConnectionSocketFactory(sslContext, NoopHostnameVerifier.INSTANCE);
	    CloseableHttpClient httpClient = HttpClients.custom()
	            .setSSLSocketFactory(sslConnectionSocketFactory)
	            .build();
	    HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
	    requestFactory.setConnectTimeout(this.service1ConnectTimeout); // 10 seconds
	    requestFactory.setReadTimeout(this.service1ReadTimeout); // 10 seconds
	    RestTemplate restTemplate = new RestTemplate(requestFactory);
	    return restTemplate;
	}

	@Bean(name="restTemplate2")
	public RestTemplate restTemplate2() throws java.security.UnrecoverableKeyException, IOException, KeyManagementException, NoSuchAlgorithmException, KeyStoreException, CertificateException {
		URL trustStoreUrl = context.getResource(this.service2TrustStore).getURL();
		URL keystoreUrl = context.getResource(this.service2KeyStore).getURL();
	    // TrustStrategy acceptingTrustStrategy = (cert, authType) -> true;
	    // TrustStrategy trustStrategy = new TrustSelfSignedStrategy();
		SSLContext sslContext = new SSLContextBuilder()
				// .setProtocol(this.service2SslProtocol)
				// .loadTrustMaterial(trustStoreUrl , this.service2TrustStorePassword.toCharArray(), acceptingTrustStrategy)
				//.loadKeyMaterial(ResourceUtils.getFile("classpath:keystore/keystore.p12"), "changeit".toCharArray(), "changeit".toCharArray())
				.loadKeyMaterial(keystoreUrl , this.service2StorePassword.toCharArray(), this.service2KeyPassword.toCharArray())
				.loadTrustMaterial(trustStoreUrl, this.service2TrustStorePassword.toCharArray())
				.build();
		
		// SSLConnectionSocketFactory sslConnectionSocketFactory = new SSLConnectionSocketFactory(sslContext);
		// specify host verifier (NoopHostnameVerifier) to allow accepting certificates from different hosts
	    SSLConnectionSocketFactory sslConnectionSocketFactory = new SSLConnectionSocketFactory(sslContext, NoopHostnameVerifier.INSTANCE);
	    CloseableHttpClient httpClient = HttpClients.custom()
	            .setSSLSocketFactory(sslConnectionSocketFactory)
	            .build();
	    HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
	    requestFactory.setConnectTimeout(this.service2ConnectTimeout); // 10 seconds
	    requestFactory.setReadTimeout(this.service2ReadTimeout); // 10 seconds
	    RestTemplate restTemplate = new RestTemplate(requestFactory);
	    return restTemplate;
	}
}
