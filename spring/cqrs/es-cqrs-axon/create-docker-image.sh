#!/usr/bin/env bash
eval "$(docker-machine env default)"

cd config-service
./mvnw clean package docker:build -Dmaven.test.skip=true

cd ../discovery-service
./mvnw clean package docker:build -Dmaven.test.skip=true

cd ../gateway-service
./mvnw clean package docker:build -Dmaven.test.skip=true

cd ../command-service
./mvnw clean package docker:build -Dmaven.test.skip=true

cd ../query-service
./mvnw clean package docker:build -Dmaven.test.skip=true

docker rmi $(docker images -f "dangling=true" -q)