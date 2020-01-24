package com.bpwizard.springcloudfunction.exceptions;

public class RedirectException extends RuntimeException {
	private static final long serialVersionUID = -7973626779851791034L;

	public RedirectException(String location) {
		super(location);
	}
}
