package com.test.bookstoread;

import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;

public class BookFilterTemplateSpec {
	@TestTemplate
    @ExtendWith(BookFilterTestInvocationContextProvider.class)
    void validateFilters(BookFilter filter, Book[] books) {
		org.junit.jupiter.api.Assertions.assertNotNull(filter);
		org.junit.jupiter.api.Assertions.assertFalse(filter.apply(books[0]));
		org.junit.jupiter.api.Assertions.assertTrue(filter.apply(books[1]));
    }
}