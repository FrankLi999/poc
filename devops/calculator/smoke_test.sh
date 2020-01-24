#!/bin/bash
echo "Running smoke test..."
#CALCULATOR_PORT=$(ssh -o StrictHostKeychecking=no ubuntu@$@ "docker-compose port calculator 8080 | cut -d: -f2")
CALCULATOR_PORT=8080
echo "Host: $@:$CALCULATOR_PORT"
#./gradlew smokeTest -Dcalculator.url=http://$@:$CALCULATOR_PORT
# mvn clean verify -Pacceptance-tests -Dcalculator.url=http://192.168.79.212:8080
mvn clean verify -Psmoke-tests -Dcalculator.url=http://$@:$CALCULATOR_PORT
