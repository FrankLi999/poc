---
title: Microservices with Axon
date: 2017-10-16 09:46:00
tags: microservice, axon, spring-boot, spring-cloud

---

# Microservices with Axon
These projects are for the demonstration of how to build CQRS, ES(event-sourcing) microservice application that being consisted of several collaborating services. 

## Services
There are several service projects that are the followings elements to build one logical application.

* External Config Service using [Spring Cloud Config](https://cloud.spring.io/spring-cloud-config/)
* Service Discovery Service using [Spring Cloud Euerka](https://cloud.spring.io/spring-cloud-netflix/single/spring-cloud-netflix.html#spring-cloud-eureka-server)
* Service gateway service using [Spring Cloud Zuul](https://cloud.spring.io/spring-cloud-netflix/single/spring-cloud-netflix.html#_router_and_filter_zuul)
* Java microservices with [Spring boot](http://projects.spring.io/spring-boot/)
* Comand and Query Responsibility Separation with [Axon CQRS Framework](http://www.axonframework.org/)
* Event Sourcing with [RabbitMQ](https://www.rabbitmq.com/), [MongoDB](https://docs.mongodb.com/)

## Environment for Development
Those projects were developed with followings.
 
* Java SDK 8
* Docker (I'm using v17.03.0-ce)
* Docker-Machine( mine is v0.10.0)
* Docker-compose( mine is v1.11.2)
* Spring-boot (v1.5.7.RELEASE)

## Run the demo
The whole application has been packaged to be run as a series of Docker containers. So you can run the demo application with docker. 

***Before run whole application, if you have Mongo and RabbitMQ running locally, then shut them down in order to avoid port clashes***

### Clone the application codes
You need a new folder to clone the codes and you can get the codes from git repo.

```
git clone https://github.com/ryukato/es-cqrs-axon.git
```
### Build docker images
Then you can build docker container images.

```
sh ./create-docker-image.sh
```
After all builds are completed, you can see docker images

```
docker images
```

```
REPOSITORY                   TAG                 IMAGE ID            CREATED              SIZE
ryukato/query-service        latest              58ea82b9af9e        47 seconds ago       265 MB
ryukato/command-service      latest              9be4ccf50e1b        59 seconds ago       290 MB
ryukato/gateway-service      latest              228925f3028d        About a minute ago   250 MB
ryukato/discovery-service    latest              8956b5299c88        About a minute ago   251 MB
ryukato/config-service       latest              5b1218f3623f        About a minute ago   222 MB
```

### Run the demo micro services
There are seven docker containers in this microservice group, they are mongo, rabbitmq, config-service, discovery-service, gateway-service, command-service and query-service.

* MongoDB: for persistent event storage for command and query.
* RabbitMQ: for event streams and event distribution.
* Config service: for external config for each service.
*  Discovery service: for registering services to allow components to by flexibly located, which means provide location transparency of each servcie's instance.
*  Gateway service: for routing and load balancing traffic to command and query service.
*  Command service: for processing command such as "CreateAccount", "CloseAccount" and so on.
*  Query serivce: for providing query and view of an entity.

Using docker-compose, you can simply run the demo application with following command.

```
docker-compose -f docker-compose.yml up
```

**You better run eval "$(docker-machine env default)", to copy environment variables of virtual machine into the terminal**

Then you can see the running containers through following command.

```
docker ps
```

