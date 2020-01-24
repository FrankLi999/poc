package com.bpwizard.springcloudfunction.functions;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bpwizard.springcloudfunction.daos.UrlDAO;
import com.bpwizard.springcloudfunction.exceptions.InvalidURLFormatException;
import com.bpwizard.springcloudfunction.functiontypes.EmailDetails;

@Component("generateShortcode")
public class GenerateShortcodeFunction implements Function<String, String> {

	@Autowired
	private LambdaFunctions lambdaFunctions;
	
	@Autowired
	private UrlDAO urlDAO;

	@Override
	public String apply(String url) {
		try {
			new URL(url);
		} catch (MalformedURLException e) {
			throw new InvalidURLFormatException();
		}

		String shortCode = urlDAO.generateShortCode();
		urlDAO.storeUrl(shortCode, url);

		EmailDetails emailDetails = new EmailDetails("marc@mtdevuk.com",
				"marc@mtdevuk.com", "Congratulations, you have created a shortCode for: " + url,
				url, shortCode);
		lambdaFunctions.sendShortcodeGeneratedEmail(emailDetails);
		
		return shortCode;
	}
}