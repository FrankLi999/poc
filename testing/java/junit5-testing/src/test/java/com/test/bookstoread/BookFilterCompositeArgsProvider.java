package com.test.bookstoread;

import java.time.LocalDate;
import java.time.Month;
import java.util.stream.Stream;

import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;

class BookFilterCompositeArgsProvider implements ArgumentsProvider {
    @Override
    public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
        Book cleanCode = new Book("Clean Code", "Robert C. Martin", LocalDate.of(2008, Month.AUGUST, 1));
        Book codeComplete = new Book("Code Complete", "Steve McConnel", LocalDate.of(2004, Month.JUNE, 9));
        return Stream.of(Arguments.of(BookPublishedYearFilter.Before(2007), Arrays.array(cleanCode, codeComplete)),
                Arguments.of(BookPublishedYearFilter.After(2007), Arrays.array(codeComplete, cleanCode)));
    }
}