## Install sam local
sam.xml
https://github.com/awslabs/serverless-application-model


npm install -g aws-sam-local
##. ASW serveless with Spring boot 2
https://github.com/awslabs/aws-serverless-java-container/wiki/Quick-start---Spring-Boot2

mvn archetype:generate -DgroupId=my.service -DartifactId=my-service -Dversion=1.0-SNAPSHOT \
       -DarchetypeGroupId=com.amazonaws.serverless.archetypes \
       -DarchetypeArtifactId=aws-serverless-springboot2-archetype \
       -DarchetypeVersion=1.4
	   
mvn archetype:generate -DgroupId=my.service -DartifactId=my-service -Dversion=1.0-SNAPSHOT 	 -DarchetypeGroupId=com.amazonaws.serverless.archetypes -DarchetypeArtifactId=aws-serverless-springboot2-archetype  -DarchetypeVersion=1.4


## start the API with the SAM Local CLI.

from the project root folder - where the sam.yaml file is located - start the API with the SAM Local CLI.
$ sam local start-api --template sam.yaml

curl -s http://127.0.0.1:3000/ping | python -m json.tool

