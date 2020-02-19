## Install sam local
sam.xml
https://github.com/awslabs/serverless-application-model

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html


npm install -g aws-sam-local
##. ASW serveless with Spring boot 2
https://github.com/awslabs/aws-serverless-java-container/wiki/Quick-start---Spring-Boot2

mvn archetype:generate -DgroupId=my.service -DartifactId=my-service -Dversion=1.0-SNAPSHOT \
       -DarchetypeGroupId=com.amazonaws.serverless.archetypes \
       -DarchetypeArtifactId=aws-serverless-springboot2-archetype \
       -DarchetypeVersion=1.4
	   
mvn archetype:generate -DgroupId=my.service -DartifactId=my-service -Dversion=1.0-SNAPSHOT 	 -DarchetypeGroupId=com.amazonaws.serverless.archetypes -DarchetypeArtifactId=aws-serverless-springboot2-archetype  -DarchetypeVersion=1.4

mvn clean package
## start the API with the SAM Local CLI.
They can be triggered by events on S3 buckets, SNS, Kinesis Streams, and DynamoDB tables. In addition, 
AWS API Gateway can be used to trigger Lambda code.


from the project root folder - where the sam.yaml file is located - start the API with the SAM Local CLI.
$ sam local start-api --template sam.yaml

curl -s http://127.0.0.1:3000/ping | python -m json.tool

## deploy
create a s3 bucket for deployment
aws s3 mb s3://spring-boot-lambda-0403

aws cloudformation package --template-file sam.yaml --output-template-file target/output-sam.yaml --s3-bucket spring-boot-lambda-0403

Execute the following command to deploy the packaged template
aws cloudformation deploy --template-file /your/path/output-sam.yaml --stack-name <YOUR STACK NAME>

run `aws cloudformation deploy` command from the output of the package command.

$ aws cloudformation deploy --template-file target/output-sam.yaml --stack-name ServerlessSpringApi --capabilities CAPABILITY_IAM

## find out the endpoint
 
$ aws cloudformation describe-stacks --stack-name ServerlessSpringApi
"OutputValue": "https://xxxxxxx.execute-api.us-west-2.amazonaws.com/Prod/ping"
  
## Update
ind the full name of the Lambda:
aws lambda list-functions
mvn clean package

aws lambda update-function-code --function-name spring-boot-lambdaSpringBootFunction --zip-file fileb://target/spring-boot-lambda-1.0.0-SNAPSHOT.jar

## Monitoring

One final AWS Resource to investigate is CloudWatch. CloudWatch stores the logs of the Lambda application and provides filtering. Navigate to CloudWatch in the AWS Console and select "Logs" from the left menu. Next, select the "LogGroup" for the Lambda to see the available log stream.

Another more direct route is to navigate to Lambda services in the AWS console. Then, select the spring-boot-lambda. Next, select the Monitoring tab. To jump directly to the logs, select any of the "Jump to Logs" links.

## Clean up
aws cloudformation delete-stack --stack-name spring-boot-lambda

-----------------------------------------------------------------------------------------------------

## generally

<dependency>
    <groupId>com.amazonaws</groupId>
    <artifactId>aws-lambda-java-core</artifactId>
    <version>1.1.0</version>
</dependency>

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>2.4.3</version>
    <configuration>
        <createDependencyReducedPom>false</createDependencyReducedPom>
    </configuration>
    <executions>
        <execution>
            <phase>package</phase>
        <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
</plugin>


Create Handler
Simply put, to invoke a lambda function, we need to specify a handler; there are 3 ways of creating a handler:

Creating a custom MethodHandler
Implementing the RequestHandler interface
Implementing the RequestStreamHandler interface

