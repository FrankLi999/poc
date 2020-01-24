package com.myservice;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("rest")
public class MyResourceConfig extends Application {
	private Set<Object> singletons = new HashSet<Object>();

	public MyResourceConfig() {
		singletons.add(new HelloWorld());
	}

	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}
}
