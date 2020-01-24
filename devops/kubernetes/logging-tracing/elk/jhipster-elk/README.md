try this:
Creating microservice using Spring Cloud, Eureka and Zuul
https://piotrminkowski.wordpress.com/2017/02/05/part-1-creating-microservice-using-spring-cloud-eureka-and-zuul/

Monitoring Microservices With Spring Cloud Sleuth, ELK, and Zipkin
https://piotrminkowski.wordpress.com/2017/04/05/part-2-creating-microservices-monitoring-with-spring-cloud-sleuth-elk-and-zipkin/

https://dzone.com/articles/monitoring-microservices-with-spring-cloud-sleuth
https://codeburst.io/receive-spring-boot-exception-alerts-via-email-using-logstash-c29b83368275

git clone https://github.com/piomin/sample-spring-microservices.git
git checkout logstash
git branch -a


maven clean install

kubectl port-forward  ms-logstash-679867756f-jdksk 5000 -n jhipster-system
kubectl port-forward  jhipster-logstash-dcc954666-qqpm4 5000 -n jhipster-system
kubectl port-forward jhipster-zipkin-66dbf785fb-xq7nv 9411 -n jhipster-system
kubectl port-forward  jhipster-elasticsearch-client-57887556b8-lt697 9200 -n jhipster-system

http://localhost:8765/api/customer/customers
http://localhost:3333/customers
localhost:2222/accounts/111111


sudo docker run -d -it --name logstash -p 5000:5000 logstash -e 'input { tcp { port => 5000 codec => "json" } } output { elasticsearch { hosts => ["127.0.0.1:9200"] index => "micro-%{serviceName}"} }'
sudo docker run -d -it --name logstash -p 5000:5000 logstash -e 'input { tcp { port => 5000 codec => "json" } } output { elasticsearch { hosts => ["127.0.0.1:9200"] index => "logstash-%{serviceName}"} }'


nc localhost 5000 < /path/to/logfile.log

docker build -t xli9999/ms-logstash .

http://10.233.8.250:5061
=========================================================================
#Sample logstash config

Create a logstash.conf file in the root directory of 
the Logstash installation and copy the following code 
into it

	input {
		tcp {
			port => 9600
			type => syslog
		}
		udp {
			port => 9600
			type => syslog
		}
	}
	filter {
	grok {
		match => [ "message", "%{GREEDYDATA}" ]
	  } 
	}
	output {
	   elasticsearch {
		  hosts => ["localhost:9200"]
		  index => "logstash-%{+YYYY.MM.dd}"
		  workers => 1
		}
	}

	run logstash:
	bin/logstash -f logstash.conf
	
	#Create log-drain service in PCF
	$ cf cups logstash-drain -l syslog://[logstashserver]:9600
	$ cf bind-service [app-name] logstash-drain
	$ cf restart [app-name]

#DOCKER LOG DRIVERS
In Docker v1.6.0 (released 2015-04-07) a logging mechanisms 
called Log Drivers was introduced to handle log events as a 
stream. A number of formats are today supported out of the 
box, see supported logging drivers.	

Both Gelf and Syslog formats are supported by Docker and Logstash. 
Syslog is an old and restricted standard for log events, 
something that the newer Gelf format aims to overcome.

Gelf is clearly preferred over Syslog. When using the Gelf 
format, Logstash does unfortunately not support (from my 
understanding) multiline log events, e.g. log events with 
stack traces

To configure a container to send its log events using Syslog 
in Docker you can specify something like the following in 
the Docker Compose file:

	logging:
	  driver: syslog
	  options:
		syslog-address: "tcp://host:port"
	
Since we gave the Logstash container the name logstash and 
published the port 25826 you might think that the syslog-address 
should be set to: "tcp://logstash:25826", but that does not 
work :-(

The reason for this is that the the Syslog driver is running 
in the Docker daemon and the Docker daemon can’t access our 
application’s specific network where the hostname logstash 
is defined. Instead we can use port-mapping, i.e. expose 
the Syslog port in the Logstash container in the Docker host. 
This means that the Docker daemon can address the Logstash 
Syslog port using the local IP address 127.0.0.1.

So, the configuration looks like this:

logging:
  driver: syslog
  options:
    syslog-address: "tcp://127.0.0.1:25826"
	
#Spring boot logback logstash appender

https://github.com/Evan1120/springboot-logback-logstash-demo

# Spring boot log4j logstash plugin

log4j to file + filebeat + logstash + elastic + kibana
filebeat.yml 
filebeat:
  prospectors:
    -
      paths:
        - /var/log/my-app/app.*.log
      input_type: log
output:
  logstash:
    hosts: ["localhost:5000"]
  elasticsearch:
    hosts: ["localhost:9200"]
TODO other options (logstash support elastic and email output):
> log4j to file + filebeat + elastic + kibana
> log4j with local logstash + elastic + kibana
> logback + logstash + elastic + kibana
https://github.com/repeatedly/fluent-plugin-beats
NOTE: According to the following link,

https://www.elastic.co/blog/log4j-input-logstash
we are deprecating the Log4j input. Our recommendation is for 
current Log4j input users to stop using log4j’s SocketAppender 
in their applications. For safe transport of log4j logs, users 
should configure log4j to write logs to disk and use Filebeat 
to forward to log information to Logstash.
setting up Filebeat to ship your local logs is easy and 
we've provided migration steps in these docs. This solution 
removes object deserialization from being used in an insecure 
manner. Additionally we have marked the Log4j plugin as deprecated 
and are going to remove Log4j support in Logstash 6.0.

https://www.elastic.co/guide/en/logstash/current/plugins-inputs-log4j.html
# Your app's log4j.properties (log4j 1.2 only)
log4j.rootLogger=daily
log4j.appender.daily=org.apache.log4j.rolling.RollingFileAppender
log4j.appender.daily.RollingPolicy=org.apache.log4j.rolling.TimeBasedRollingPolicy
log4j.appender.daily.RollingPolicy.FileNamePattern=/var/log/your-app/app.%d.log
log4j.appender.daily.layout = org.apache.log4j.PatternLayout
log4j.appender.daily.layout.ConversionPattern=%d{YYYY-MM-dd HH:mm:ss,SSSZ} %p %c{1}:%L - %m%n

Configuring filebeat. Next, install filebeat. Based on the 
above log4j.properties, we can use this filebeat configuration:

# filebeat.yml
	filebeat:
	  prospectors:
		-
		  paths:
			- /var/log/your-app/app.*.log
		  input_type: log
	output:
	  logstash:
		hosts: ["your-logstash-host:5000"]

Configuring Logstash to receive from filebeat. Finally, 
configure Logstash with a beats input:

	# logstash configuration
	input {
	  beats {
		port => 5000
	  }
	}		
It is strongly recommended that you also enable TLS in filebeat 
and logstash beats input for protection and safety of your 
log data..
https://www.elastic.co/guide/en/logstash/current/plugins-inputs-beats.html

https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-configuration.html

///////////////////////////////////////////////////////
https://howtodoinjava.com/microservices/elk-stack-tutorial-example/
	application.properties
		logging.level.org.springframework=DEBUG
		logging.level.com.howtodoinjava=DEBUG
		 
		#output to a temp_folder/file
		logging.file=${java.io.tmpdir}/application.log
		 
		# Logging pattern for the console
		logging.pattern.console= %d{yyyy-MM-dd HH:mm:ss} - %msg%n
		 
		# Logging pattern for file
		logging.pattern.file= %d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%

		logging.file=elk-example.log
		spring.application.name = elk-example
		
	logstash config:
		input {
		  file {
			type => "java"
			path => "F:/Study/eclipse_workspace_mars/elk-example-spring-boot/elk-example.log"
			codec => multiline {
			  pattern => "^%{YEAR}-%{MONTHNUM}-%{MONTHDAY} %{TIME}.*"
			  negate => "true"
			  what => "previous"
			}
		  }
		}
		 
		filter {
		  #If log line contains tab character followed by 'at' then we will tag that entry as stacktrace
		  if [message] =~ "\tat" {
			grok {
			  match => ["message", "^(\tat)"]
			  add_tag => ["stacktrace"]
			}
		  }
		 
		 grok {
			match => [ "message",
					   "(?<timestamp>%{YEAR}-%{MONTHNUM}-%{MONTHDAY} %{TIME})  %{LOGLEVEL:level} %{NUMBER:pid} --- \[(?<thread>[A-Za-z0-9-]+)\] [A-Za-z0-9.]*\.(?<class>[A-Za-z0-9#_]+)\s*:\s+(?<logmessage>.*)",
					   "message",
					   "(?<timestamp>%{YEAR}-%{MONTHNUM}-%{MONTHDAY} %{TIME})  %{LOGLEVEL:level} %{NUMBER:pid} --- .+? :\s+(?<logmessage>.*)"
					 ]
		  }
		 
		  
		  date {
			match => [ "timestamp" , "yyyy-MM-dd HH:mm:ss.SSS" ]
		  }
		}
		 
		output {
		   
		  stdout {
			codec => rubydebug
		  }
		 
		  # Sending properly parsed log events to elasticsearch
		  elasticsearch {
			hosts => ["localhost:9200"]
		  }
		}
http://callistaenterprise.se/blogg/teknik/2017/09/13/building-microservices-part-8-logging-with-ELK/


# output data to output data to email, websockets, and to Elasticsearch.

##output data to output data to email
### Log4h v2 smtp appender

    <!-- SMTP Appender -->
	<SMTP name="MailAppender"
		  subject="Log4j2 Demo [PROD]"
		  to="youremail@example.com"
		  from="log4j2-demo-alerts@example.com"
		  smtpHost="yourSMTPHost"
		  smtpPort="587"
		  smtpUsername="yourSMTPUsername"
		  smtpPassword="yourSMTPPassword"
		  bufferSize="1">
		<ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
		<PatternLayout>
			<Pattern>${LOG_PATTERN}</Pattern>
		</PatternLayout>
	</SMTP>
	
###Logstash email plugin.

https://codeburst.io/receive-spring-boot-exception-alerts-via-email-using-logstash-c29b83368275

##output data to output data to websockets
##output data to output data to Elasticsearch

#Distributed tracing with Zipkin and Spring Cloud Sleuth
http://callistaenterprise.se/blogg/teknik/2017/07/29/building-microservices-part-7-distributed-tracing/