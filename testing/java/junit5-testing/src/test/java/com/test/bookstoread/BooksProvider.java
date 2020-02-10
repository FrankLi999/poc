package com.test.bookstoread;

import java.time.LocalDate;
import java.time.Month;

import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.ParameterContext;
import org.junit.jupiter.api.extension.ParameterResolutionException;
import org.junit.jupiter.api.extension.ParameterResolver;

public class BooksProvider implements ParameterResolver {

    @Override
    public boolean supportsParameter(final ParameterContext parameterContext, final ExtensionContext extensionContext) throws ParameterResolutionException {
        return parameterContext.getParameter().getType().equals(Book[].class);
    }

    /**
     * The method will create a new array every time. This is not a desired behaviour
     * in a test case  we have asked books multiple times  i.e dbefore each and  the test method  and both arrays will be different.
     * This cause test case failures
     *
     * FIX : the execution context can be used to create a store which can hold values to be used multiple times in the test case.
     * The change injects same books array when asked multiple times in a test execution
     */
    @Override
    public Object resolveParameter(final ParameterContext parameterContext, final ExtensionContext extensionContext) throws ParameterResolutionException {
        ExtensionContext.Store books = extensionContext.getStore(ExtensionContext.Namespace.create(Book.class));
        return books.getOrComputeIfAbsent("booksList", key -> getBooks());
    }

    Book[] getBooks(){
        Book effectiveJava = new Book("Effective Java", "Joshua Bloch", LocalDate.of(2008, Month.MAY, 8));
        Book codeComplete = new Book("Code Complete", "Steve McConnel", LocalDate.of(2004, Month.JUNE, 9));
        Book mythicalManMonth = new Book("The Mythical Man-Month", "Frederick Phillips Brooks", LocalDate.of(1975, Month.JANUARY, 1));
        Book cleanCode = new Book("Clean Code", "Robert C. Martin", LocalDate.of(2008, Month.AUGUST, 1));
        Book refactoring = new Book("Refactoring: Improving the Design of Existing Code", "Martin Fowler", LocalDate.of(2002, Month.MARCH, 9));
        return  new Book[]{effectiveJava, codeComplete, mythicalManMonth, cleanCode, refactoring};
    }
}