package com.myservice;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.spi.resource.Singleton;

@Singleton
@Path("/hello")
public class HelloWorld {
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getMessage() {
		org.slf4j.Logger slf4jLogger = org.slf4j.LoggerFactory.getLogger(HelloWorld.class);
		org.apache.logging.log4j.Logger log4j2Logger = org.apache.logging.log4j.LogManager.getLogger(HelloWorld.class);

		slf4jLogger.info("SLF Info - HelloWorld.getMessage");
		log4j2Logger.info("Log4J Info - HelloWorld.getMessage");
		
		slf4jLogger.debug("SLF Debug - HelloWorld.getMessage");
		log4j2Logger.debug("Log4J Debug - HelloWorld.getMessage");
		
		slf4jLogger.warn("SLF Warn - HelloWorld.getMessage");
		log4j2Logger.warn("Log4J Warn - HelloWorld.getMessage");
		
		slf4jLogger.error("SLF Error - HelloWorld.getMessage");
		log4j2Logger.error("Log4J Error - HelloWorld.getMessage");
		
		return "Hello world!!!";
	}
}