package com.myservice;

import javax.ws.rs.core.MultivaluedMap;
//import javax.ws.rs.ext.Provider;

//import javax.ws.rs.container.ContainerRequestFilter;
//import javax.ws.rs.container.ContainerResponseFilter;
//import javax.ws.rs.container.ContainerRequestContext;
//import javax.ws.rs.container.ContainerResponseContext;
import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerRequestFilter;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;

// @Provider
public class LogFilter implements ContainerRequestFilter, ContainerResponseFilter {

  @Override
  public ContainerRequest filter(ContainerRequest request) {
      System.out.println("-- req info --");
      log(request.getPath(), request.getRequestHeaders());
      return request;

  }

  @Override
  public ContainerResponse filter(ContainerRequest request, ContainerResponse response) {
      System.out.println("-- res info --");
      log(request.getPath(), response.getHttpHeaders());
      return response;
  }

  private void log(String path, MultivaluedMap<String, ?> headers) {
      System.out.println("Path: " + path);
      for (String header: headers.keySet()) {
    	  System.out.println(header + ": " + headers.get(header));
      }
  }
}