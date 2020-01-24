#!/bin/bash
docker push ryukato/config-service:latest
docker push ryukato/discovery-service:latest
docker push ryukato/gateway-service:latest
docker push ryukato/command-service:latest
docker push ryukato/query-service:latest