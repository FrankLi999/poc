package com.test.bookstoread;

import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.ParameterContext;
import org.junit.jupiter.api.extension.ParameterResolutionException;
import org.junit.jupiter.api.extension.ParameterResolver;

class TypedParameterResolver<T> implements ParameterResolver {
    T data;

    TypedParameterResolver(T data) {
        this.data = data;
    }

    @Override
    public boolean supportsParameter(ParameterContext parameterContext, ExtensionContext extensionContext) 
    		throws ParameterResolutionException {
        @SuppressWarnings("rawtypes")
		Class parameterClass = parameterContext.getParameter().getType();
        return parameterClass.isInstance(data);
    }

    @Override
    public Object resolveParameter(ParameterContext parameterContext, ExtensionContext extensionContext) 
    		throws ParameterResolutionException {
        return data;
    }
}