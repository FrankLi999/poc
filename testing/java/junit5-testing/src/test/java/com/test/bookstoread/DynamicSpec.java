package com.test.bookstoread;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.stream.Stream;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.junit.jupiter.api.extension.ExtendWith;

public class DynamicSpec {

	@TestFactory
	Collection<DynamicTest> generateFirstTest() {
		return Arrays.asList(
				DynamicTest.dynamicTest("Week Test", () -> Assertions.assertEquals(DayOfWeek.MONDAY, DayOfWeek.of(1))),
				DynamicTest.dynamicTest("Month Test", () -> Assertions.assertEquals(Month.JANUARY, Month.of(1))));
	}

	@TestFactory
	Stream<DynamicTest> generateParameterizedTest() {
		LocalDate startDate = LocalDate.now();
		Iterator<LocalDate> daysIter = Stream.iterate(startDate, date -> date.plusDays(1)).limit(10).iterator();
		return DynamicTest.stream(daysIter, d -> DateTimeFormatter.ISO_LOCAL_DATE.format(d),
				d -> Assertions.assertNotNull(d));
	}
	
	@TestFactory
	@ExtendWith(BooksProvider.class)
	Stream<DynamicTest> generateBooksTest(Book[] books) {
	  return  DynamicTest.stream(Arrays.<Book>asList(books).iterator(), b  -> String.format("Validating : %s",b.getTitle()), b -> Assertions.assertFalse(b.isProgress()));
	}
}