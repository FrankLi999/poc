package com.redhat.gss.rs;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("rest")
public class App extends Application {
	private Set<Object> singletons = new HashSet<Object>();

	public App() {
		singletons.add(new CheckImplementationClassesResource());
	}

	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}
}
