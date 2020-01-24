#!/bin/bash
#test $(curl localhost:8765/sum?a=1\&b=2) -eq 3
echo "Running acceptance test..."
# CALCULATOR_PORT=$(ssh -o StrictHostKeychecking=no ubuntu@$@ "docker-compose port calculator 8080 | cut -d: -f2")
CALCULATOR_PORT=8080
echo "Host: $@:$CALCULATOR_PORT"
#./gradlew acceptanceTest -Dcalculator.url=http://$@:$CALCULATOR_PORT
# mvn clean verify -Pacceptance-tests -Dcalculator.url=http://192.168.79.213:8080
mvn clean verify -Pacceptance-tests -Dcalculator.url=http://$@:$CALCULATOR_PORT
