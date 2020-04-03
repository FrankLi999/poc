# Reference
https://dzone.com/articles/securing-rest-apis-with-client-certificates
https://www.baeldung.com/spring-boot-https-self-signed-certificate

# Use openssl to generate self signed certificates  
	https://blog.pavelsklenar.com/how-to-create-pkcs-12-for-your-application/

	#Create folders to generate all files (separated for client and server)
	# mkdir openssl && cd openssl && mkdir client && mkdir server
	## Server
	# Generate server private key and self-signed certificate in one step
	
	openssl req -x509 -newkey rsa:4096 -keyout server/serverPrivateKey.pem -out server/server.crt -days 3650 -nodes
	
	# Create PKCS12 keystore containing private key and related self-sign certificate
	
	openssl pkcs12 -export -out server/keyStore.p12 -inkey server/serverPrivateKey.pem -in server/server.crt
	
	# Generate server trust store from server certificate 
	
	keytool -import -trustcacerts -alias root -file server/server.crt -keystore server/trustStore.jks
	
	keytool -importkeystore -srckeystore trustStore.jks -destkeystore trustStore.p12 -deststoretype pkcs12
	
	
	## Client
	# Generate client's private key and a certificate signing request (CSR)
	
	openssl req -new -newkey rsa:4096 -out client/request.csr -keyout client/myPrivateKey.pem -nodes
	
	## Server
	# Sign client's CSR with server private key and a related certificate
	
	openssl x509 -req -days 3650 -in client/request.csr -CA server/server.crt -CAkey server/serverPrivateKey.pem -CAcreateserial -out client/myboot.crt -sha256

	
	## Client
	
	# Verify client's certificate
	openssl x509 -text -noout -in client/myboot.crt
	
	# Create PKCS12 keystore containing client's private key and related self-sign certificate 
    #openssl pkcs12 -export -out client/client_myboot.p12 -inkey client/myPrivateKey.pem -in client/myboot.crt -certfile server/#myCertificate.crt

    openssl pkcs12 -export -out client/client_myboot.p12 -inkey client/myPrivateKey.pem -in client/myboot.crt -certfile server/server.crt
#Use keytool to generate self signed certificates

   Certificate formats:
   
	o PKCS12: Public Key Cryptographic Standards is a password protected format that can 
	  contain multiple certificates and keys; it's an industry-wide used format
	  
	  keytool -genkeypair -alias myboot -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore myboot-keytool.p12 -validity 3650
	  
	  
	o JKS: Java KeyStore is similar to PKCS12; it's a proprietary format and is limited to the 
	  Java environment.
	
	keytool -genkeypair -alias myboot -keyalg RSA -keysize 2048 -keystore myboot.jks -validity 3650
	
	It is recommended to use the PKCS12 format which is an industry standard format. So in case 
	we already have a JKS keystore, we can convert it to PKCS12 format using the following command:
	
	keytool -importkeystore -srckeystore myboot.jks -destkeystore myboot.p12 -deststoretype pkcs12

	
	keytool -list -keystore  myboot.p12
	
# Enabling HTTPS in Spring Boot
  server.ssl.* properties.
  
  # The format used for the keystore. It could be set to JKS in case it is a JKS file
  server.ssl.key-store-type=PKCS12
  # The path to the keystore containing the certificate
  server.ssl.key-store=classpath:keystore/myboot.p12
  # The password used to generate the certificate
  server.ssl.key-store-password=password
  # The alias mapped to the certificate
  server.ssl.key-alias=myboot
  
  