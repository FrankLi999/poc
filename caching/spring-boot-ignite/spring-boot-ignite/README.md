#Ref:
 https://github.com/sumanentc/spring-boot-ignite
 https://medium.com/swlh/spring-cache-with-apache-ignite-def103cae35
 
 https://dzone.com/articles/apache-ignite-cluster-together-with-spring-boot
 https://dzone.com/articles/in-memory-data-grid-with-apache-ignite
 https://dzone.com/articles/8-things-every-developer-should-know-about-the-apa
# Sample Apache Ignite - Spring Boot application
The purpose of this project is to demonstrate Ignite as a Cache Provider for Spring Cache in one package.

# How to build and run

Java 8 lambdas are used here and there and thus the project can be compiled only with JDK 8 `javac`.
To compile just do `mvn clean install`.
To run a three node cluster excute the following:
```
java -DIGNITE_QUIET=false -DIGNITE_JETTY_PORT=8081 -jar target/ignite-cache*.jar
```

You can also use the Swagger-ui.html to test the application.

![alt text](A.png)

![alt text](B.png)

for more detailed technical information please check my post :

