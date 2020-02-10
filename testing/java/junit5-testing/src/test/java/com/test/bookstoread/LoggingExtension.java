package com.test.bookstoread;

import java.lang.reflect.Field;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.TestInstancePostProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingExtension implements TestInstancePostProcessor {
    @Override
    public void postProcessTestInstance(Object testInstance, ExtensionContext context) throws Exception {
        Logger logger = LoggerFactory.getLogger(testInstance.getClass());
        Field field = testInstance.getClass().getDeclaredField("logger");
        field.set(testInstance, logger);
    }
}
