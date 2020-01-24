package com.bpwizard.springcloudfunction.functions;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bpwizard.springcloudfunction.daos.UrlDAO;
import com.bpwizard.springcloudfunction.exceptions.RedirectException;

@Component("getURL")
public class GetURLFunction implements Function<String, String> {

	@Autowired
	private UrlDAO urlDAO;
	
	@Override
	public String apply(String shortCode) {
		String url = urlDAO.getUrl(shortCode);
		
		throw new RedirectException(url);
	}

}
