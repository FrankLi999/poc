https://blog.pavelsklenar.com/how-to-create-pkcs-12-for-your-application/

How To Create PKCS #12 For Your Application 1
This entry was posted in security on August 18, 2018 by pavelsklenar
This post is about creating PKCS #12 to serve e.g. your content via HTTPS in your application itself or in another web container (such a Tomcat or another application server).

The PKCS #12 format is a binary format for storing cryptography objects. It usually contains the server certificate, any intermediate certificates (i.e. chain of trust), and the private key, all of them in a single file. A PKCS #12 file may be encrypted and signed. PKCS #12 files are usually found with the extensions .pfx and .p12.

The PKCS #12 is similar to JKS format, but you can use it not only in Java but also in other libraries in C, C++ or C# etc, so I prefer this type of a keystore to be more general.

To use PKCS #12 inside your application, you have two way how to do it:

Create your own self-signed SSL certificate
Create a certificate using the Certificate Signing Request (CSR, a.k.a PKCS #10)
The first option is fast and simple, but not suitable for production environment. The second option is about creating CSR to be signed by any trusted Certificate Authority (CA).

Create your own self-signed SSL certificate
When you need to create a new certificate as quickly as possible, run the following two commands:

Generate a private key and a certificate in separated files using PEM format
1
openssl req -x509 -newkey rsa:4096 -keyout myPrivateKey.pem -out myCertificate.crt -days 3650 -nodes
openssl – the command for executing OpenSSL.
req – certificate request and certificate generating utility in OpenSSL.
-x509 – used to generate a self-signed certificate.
-newkey rsa:4096 – option to create a new certificate request and a new private key, rsa:4096 means generating an RSA key nbits in size.
-keyout myPrivateKey.pem – use the private key file myPrivateKey.pem as the private key to combining with the certificate.
-out myCertificate.crt – use myCertificate.crt as the output certificate name.
-days 3650 – specifies the number of days to certify the certificate for.
-nodes – a created private key will not be encrypted.

Combine a private key and a certificate into one key store in the PKCS #12 format
1
openssl pkcs12 -export -out keyStore.p12 -inkey myPrivateKey.pem -in myCertificate.crt
openssl – the command for executing OpenSSL.
pkcs12 – the PKCS #12 utility in OpenSSL.
-export – the option specifies that a PKCS #12 file will be created.
-out keyStore.p12 – specifies a filename to write the PKCS #12 file to.
-inkey myPrivateKey.pem – file to read private key from.
-in myCertificate.crt – the filename to read the certificate.

The wizard will prompt you for an export password. If filled, this password will be used as a key store password.

And that is all you need, use keyStore.p12 in your application.

Create a certificate using the Certificate Signing Request
Generate a private key and a certificate signing request into separated files
1
openssl req -new -newkey rsa:4096 -out request.csr -keyout myPrivateKey.pem -nodes
openssl – the command for executing OpenSSL.
req – certificate request and certificate generating utility in OpenSSL.
-newkey rsa:4096 – option to create a new certificate request and a new private key, rsa:4096 means generating an RSA key nbits in size.
-keyout myPrivateKey.pem – use the private key file myPrivateKey.pem as the private key to combining with the certificate.
-out request.csr – use request.csr as the certificate signing request in the PKCS #10 format.
-nodes – a created private key will not be encrypted.

Generate a certificate signing request from an existing private key
1
openssl req -new -key myPrivateKey.pem -out request.csr
openssl – the command for executing OpenSSL.
req – certificate request and certificate generating utility in OpenSSL.
-new – generates a new certificate request.
-key myPrivateKey.pem – specifies the file to read the private key from.
-out request.csr – use request.csr as the certificate signing request in the PKCS#10 format.

Now it is time to send request.csr as a result of the previous step to your CA (Certificate Authority) to be signed.

You are almost done. When you get a new certificate for your request.csr from your CA, use it together with a private key to create a PKCS#12 file:

Combine a private key and a certificate into one key store in the PKCS #12 format
1
openssl pkcs12 -export -out keyStore.p12 -inkey privateKey.pem -in certificate.crt -certfile CA.crt
openssl – the command for executing OpenSSL.
pkcs12 – the PKCS #12 utility in OpenSSL.
-export – the option specifies that a PKCS #12 file will be created.
-out keyStore.p12 – specifies a filename to write the PKCS #12 file to.
-inkey myPrivateKey.pem – file to read private key from.
-in myCertificate.crt – the filename to read the certificate.
-certfile CA.crt – optional parameter to read additional certificates from, useful to create a complete trust chain.

The output file keyStore.p12 is what you need to add to your application. When you filled an export password use it as a key store password in a configuration file.