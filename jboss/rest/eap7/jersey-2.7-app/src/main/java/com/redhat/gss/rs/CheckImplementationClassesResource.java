package com.redhat.gss.rs;

import java.lang.reflect.Method;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.RuntimeDelegate;


@Path("/check")
public class CheckImplementationClassesResource {
	
	@Context
	HttpHeaders httpHeaders;
	
	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;	
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String doGet() {		
		StringBuffer output = new StringBuffer();
		output.append("<h1>" + getJAXRSVersion() + " with "  + getImpl()+" </h1>");
		output.append("<h2> Implementation class </h2>");
		output.append("<b>RuntimeDelegate </b> " + clName(RuntimeDelegate.getInstance()));
		output.append("<br />");
		output.append("<b>ResponseBuilder:</b> " + clName(Response.ok()));
		output.append("<br />");		
		output.append("<b>UriBuilder:</b> " + clName(UriBuilder.fromUri("test")));
		output.append("<br />");
		
		return output.toString();
	}	

	private String clName(Object obj){
		return obj == null? "Null": obj.getClass().getCanonicalName();
	}
	
	private String getJAXRSVersion(){
		// to get the JAX-RS version, we need to check if the javax.ws.rs.core.Application class has the method getProperties
		// which is only present in JAX-RS 2.0
		Method[] methods = Application.class.getMethods();
		
		for (int i = 0; i < methods.length; i++) {
			if(methods[i].getName().equals("getProperties"))
				return "JAX-RS 2.0";
		}		
		return "JAX-RS 1.x";		
	}
	
	private String getImpl() {	
		// TODO: Add cxf
		String clName = clName(RuntimeDelegate.getInstance());
		if(clName.contains("resteasy")){
			return "RESTEasy";			
		}else if(clName.contains("jersey")){
			return "Jersey";
		}else {
			return "Unknow";
		}
		
	}

}
