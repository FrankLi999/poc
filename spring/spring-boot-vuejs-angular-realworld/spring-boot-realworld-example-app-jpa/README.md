# Run the app

java -Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n -jar target/spring-boot-realworld-example-app-0.0.1-SNAPSHOT.jar
 mvn spring-boot:run

# H2 console

http://localhost:8080/h2-console

in application.properties add:

    spring.h2.console.enabled=true
    spring.h2.console.path=/h2-console

# flywaydb    

# ![RealWorld Example App using Kotlin and Spring](example-logo.png)

> ### Spring boot + MyBatis codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.

This codebase was created to demonstrate a fully fledged fullstack application built with Spring boot + Mybatis including CRUD operations, authentication, routing, pagination, and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works

The application uses Spring boot (Web, Mybatis).

* Use the idea of Domain Driven Design to separate the business term and infrastruture term.
* Use MyBatis to implement the [Data Mapper](https://martinfowler.com/eaaCatalog/dataMapper.html) pattern for persistence.
* Use [CQRS](https://martinfowler.com/bliki/CQRS.html) pattern to separate the read model and write model.
  
  CQRS should only be used on specific portions of a system (a BoundedContext in DDD lingo) and not the system 
  as a whole. In this way of thinking, each Bounded Context needs its own decisions on how it should be modeled.

  So far I see benefits in two directions. Firstly is that a few complex domains may be easier to tackle by using 
  CQRS. I must stress, however, that such suitability for CQRS is very much the minority case. Usually there's 
  enough overlap between the command and query sides that sharing a model is easier. Using CQRS on a domain that 
  doesn't match it will add complexity, thus reducing productivity and increasing risk.

  The other main benefit is in handling high performance applications. 

And the code organize as this:

1. `api` is the web layer to implement by Spring MVC
2. `core` is the business model including entities and services
3. `application` is the high level services for query with the data transfer objects
4. `infrastructure`  contains all the implementation classes as the technique details

# Security

Integration with Spring Security and add other filter for jwt token process.

The secret key is stored in `application.properties`.

# Database

It uses a H2 in memory database (for now), can be changed easily in the `application.properties` for any other database.

# Getting started

You need Java installed.

    ./gradlew bootRun
    open http://localhost:8080

# Try it out with [Docker](https://www.docker.com/)

You need Docker installed.
	
	docker-compose up -d

# Run test

The repository contains a lot of test cases to cover both api test and repository test.

    ./gradlew test

# Help

Please fork and PR to improve the code.