package com.bpwizard.springcloudfunction.functiontypes;

public class EmailDetails {
	private String fromEmailAddress;
	private String toEmailAddress;
	private String subject;
	private String shortCode;
	private String longURL;
	
	/**
	 * Required by AWS Lambda
	 */
	public EmailDetails() {
	}
	
	public EmailDetails(String fromEmailAddress, String toEmailAddress, String subject, String shortCode,
			String longURL) {
		super();
		this.fromEmailAddress = fromEmailAddress;
		this.toEmailAddress = toEmailAddress;
		this.subject = subject;
		this.shortCode = shortCode;
		this.longURL = longURL;
	}
	public String getFromEmailAddress() {
		return fromEmailAddress;
	}
	public void setFromEmailAddress(String fromEmailAddress) {
		this.fromEmailAddress = fromEmailAddress;
	}
	public String getToEmailAddress() {
		return toEmailAddress;
	}
	public void setToEmailAddress(String toEmailAddress) {
		this.toEmailAddress = toEmailAddress;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getShortCode() {
		return shortCode;
	}
	public void setShortCode(String shortCode) {
		this.shortCode = shortCode;
	}
	public String getLongURL() {
		return longURL;
	}
	public void setLongURL(String longURL) {
		this.longURL = longURL;
	}
}

