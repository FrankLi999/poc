package com.test.bookstoread;

import org.junit.jupiter.api.extension.TestExecutionExceptionHandler;
import org.junit.jupiter.api.extension. ExtensionContext;

import java.util.logging.Level;
import java.util.logging.Logger;

public class LoggingTestExecutionExceptionHandler implements TestExecutionExceptionHandler {

    private Logger logger = Logger.getLogger(LoggingTestExecutionExceptionHandler.class.getName());

    @Override
    public void handleTestExecutionException(ExtensionContext context, Throwable throwable) throws Throwable {
        logger.log(Level.INFO, "Exception thrown ", throwable);
        throw throwable;
    }
}
