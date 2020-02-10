package com.test.bookstoread;

import java.util.Collections;

import org.junit.jupiter.api.extension.AfterAllCallback;
import org.junit.jupiter.api.extension.AfterTestExecutionCallback;
import org.junit.jupiter.api.extension.BeforeAllCallback;
import org.junit.jupiter.api.extension.BeforeTestExecutionCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.ExtensionContext.Namespace;

public class TestSummaryExtension
		implements BeforeAllCallback,  AfterAllCallback, BeforeTestExecutionCallback, AfterTestExecutionCallback {

	@Override
	public void beforeAll(ExtensionContext context) throws Exception {
		context.getStore(Namespace.GLOBAL).put("TEST_CLASS", System.currentTimeMillis());
	}
	
	@Override
	public void beforeTestExecution(ExtensionContext context) throws Exception {
		context.getStore(Namespace.GLOBAL).put("TEST", System.currentTimeMillis());
	}
	
	@Override
	public void afterTestExecution(ExtensionContext context) throws Exception {
		long startTime = context.getStore(Namespace.GLOBAL).get("TEST", long.class);
	    long timeTook = System.currentTimeMillis() - startTime;
	    context.publishReportEntry(Collections.singletonMap(
	            "Summary",
	            String.format("%s took %d ms", context.getDisplayName(), timeTook)));
	}

	@Override
	public void afterAll(ExtensionContext context) throws Exception {
		long startTime = context.getStore(Namespace.GLOBAL).get("TEST_CLASS", long.class);
	    long timeTook = System.currentTimeMillis() - startTime;
	    context.publishReportEntry(Collections.singletonMap(
	            "Summary",
	            String.format("%s took %d ms", context.getDisplayName(), timeTook)));
		
	}
}