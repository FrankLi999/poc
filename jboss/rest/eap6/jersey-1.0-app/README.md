#Run Jersey on JBoss

https://access.redhat.com/solutions/395293

https://access.redhat.com/solutions/107983

https://www.javatips.net/blog/jersey-2-jboss-tutorial
https://varuntayur.wordpress.com/2015/01/20/jersey-2-x-on-jboss-6-1-avoiding-resteasy-conflict/
https://stackoverflow.com/questions/6953516/deploying-a-jersey-webapp-on-jboss-as-7

or 
one is to disable the default REST implementation in JBOSS (in standalone.xml)
		    <extension module=”org.jboss.as.jaxrs”/>
            <subsystem xmlns=”urn:jboss:domain:jaxrs:1.0″/>
            
mvn install jboss-as:deploy 
#Example Project for using Jersey to create a RESTful API, running on Apache Tomcat
Just an example project that helped me learn how to set up a REST API in IntelliJ.

#Link to the tutorial:

See [this tutorial](https://medium.com/@jamsesso/starting-out-with-jersey-apache-tomcat-using-intellij-6338d93ffd40) for screenshots and setup instructions.

#The jar files are removed to reduce the archive size. You can find the required libraries on Jersey project home.

	> activation-1.1.jar
	> asm-3.1.jar
	> jaxb-api-2.1.jar
	> jaxb-impl-2.1.jar
	> jersey-client-1.0.3.jar
	> jersey-core-1.0.3.jar
	> jersey-json-1.0.3.jar
	> jersey-server-1.0.3.jar
	> jersey-spring-1.0.3.jar
	> jsr311-api-1.0.jar
	> stax-api-1.0-2.jar
	> wstx-asl-3.2.1.jar
#JBoss Cli
 EAP_HOME/bin/jboss-cli.sh --connect --controller=localhost:9999
 /subsystem=logging/root-logger=ROOT:read-attribute(name=level)
 /subsystem=logging/root-logger=ROOT:write-attribute(name=level,value=DEBUG)