package com.test.bookstoread;

import java.time.Duration;
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.assertj.core.api.Assertions;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
// import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ArgumentsSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mockito;

@ExtendWith({
	// IgnoreIOExceptionExtension.class,
	BookParameterResolver.class,
	LoggingTestExecutionExceptionHandler.class,
	RunOnCIExtension.class,
	TestSummaryExtension.class
})
@ExtendWith(LoggingExtension.class)
@DisplayName("A bookshelf")

// @EnableRuleMigrationSupport
public class BookShelfSpec {

	private BookShelf shelf;
	private Book effectiveJava;
	private Book codeComplete;
	private Book mythicalManMonth;
	private Book cleanCode;

	@BeforeEach
	void init(Map<String, Book> books) {
		shelf = new BookShelf(12);
		this.effectiveJava = books.get("Effective Java");
		this.codeComplete = books.get("Code Complete");
		this.mythicalManMonth = books.get("The Mythical Man-Month");
		this.cleanCode = books.get("Clean Code");
	}

	// Feature one
	// As a user, I want to add multiple books to my bookshelf so that I
	// can read them later.
	@Test
	@DisplayName("is empty when no book ist added to it")
	public void shelfEmptyWhenNoBookAdded() throws Exception {
		// Arrange

		// Act
		List<Book> books = this.shelf.books();
		// Asert
		org.junit.jupiter.api.Assertions.assertTrue(books.isEmpty(), () -> "BookShelf should be empty.");
		org.assertj.core.api.Assertions.assertThat(books).isEmpty();
		MatcherAssert.assertThat("books", books.size(), Matchers.equalTo(0));
	}

	@Test
	public void bookshelfContainsTwoBooksWhenTwoBooksAdded() {
		try {
			this.shelf.add(effectiveJava, codeComplete);
			List<Book> books = shelf.books();
			org.junit.jupiter.api.Assertions.assertEquals(2, books.size(), () -> "BookShelf should have two books.");
		} catch (BookShelfCapacityReached ex) {
			org.junit.jupiter.api.Assertions.fail(() -> "Should not throw BookShelfCapacityReached exception.");
		}
	}

	@Test
	public void emptyBookShelfWhenAddIsCalledWithoutBooks() throws BookShelfCapacityReached {
		this.shelf.add();
		List<Book> books = this.shelf.books();
		org.junit.jupiter.api.Assertions.assertTrue(books.isEmpty(), () -> "BookShelf should be empty.");
	}

	@Test
	void booksReturnedFromBookShelfIsImmutableForClient() throws BookShelfCapacityReached {
		this.shelf.add(effectiveJava, codeComplete);
		List<Book> books = this.shelf.books();
		try {
			books.add(mythicalManMonth);
			org.junit.jupiter.api.Assertions.fail(() -> "Should not be able to add book to books");
		} catch (Exception e) {
			org.junit.jupiter.api.Assertions.assertTrue(e instanceof UnsupportedOperationException,
					() -> "Should throw UnsupportedOperationException.");
		}
	}

	// Feature two
	// As a user, I should be able to arrange my bookshelf based on certain criteria
	// @Disabled("Needs to implement Comparator")
	@Test
	@DisplayName("bookshelf is arranged lexicographically by book title")
	void bookshelfArrangedByBookTitle() throws BookShelfCapacityReached {
		this.shelf.add(effectiveJava, codeComplete, mythicalManMonth);
		List<Book> books = this.shelf.arrange();
		org.junit.jupiter.api.Assertions.assertEquals(Arrays.asList(codeComplete, effectiveJava, mythicalManMonth),
				books, () -> "Books in a bookshelf should be arranged lexicographically by book title");
	}

	@Test
	void booksInBookShelfAreInInsertionOrderAfterCallingArrange() throws BookShelfCapacityReached {
		this.shelf.add(effectiveJava, codeComplete, mythicalManMonth);
		this.shelf.arrange();
		List<Book> books = this.shelf.books();
		org.junit.jupiter.api.Assertions.assertEquals(Arrays.asList(effectiveJava, codeComplete, mythicalManMonth),
				books, () -> "Books in bookshelf are in insertion order");
	}

	@Test
	void arrangedBookShelfIsImmutableForClient() throws BookShelfCapacityReached {
		this.shelf.add(effectiveJava, codeComplete, mythicalManMonth);
		List<Book> books = this.shelf.arrange();
		try {
			books.add(mythicalManMonth);
			org.junit.jupiter.api.Assertions.fail(() -> "Should not be able to add book to books");
		} catch (Exception e) {
			org.junit.jupiter.api.Assertions.assertTrue(e instanceof UnsupportedOperationException,
					() -> "Should throw UnsupportedOperationException.");
		}
	}

	@Test
	void bookshelfArrangedByUserProvidedCriteria() throws BookShelfCapacityReached {
		shelf.add(effectiveJava, codeComplete, mythicalManMonth);
		List<Book> books = this.shelf.arrange(Comparator.<Book>naturalOrder().reversed());
		org.junit.jupiter.api.Assertions.assertEquals(Arrays.asList(mythicalManMonth, effectiveJava, codeComplete),
				books, () -> "Books in a bookshelf are arranged in descending order of book title");

		Comparator<Book> reversed = Comparator.<Book>naturalOrder().reversed();
		books = this.shelf.arrange(reversed);
		Assertions.assertThat(books).isSortedAccordingTo(reversed);
	}

	// THIRD FEATURE
	// As a user, I should be able to group books in my bookshelf based on certain
	// criteria

	@Test
	@DisplayName("books inside bookshelf are grouped by publication year")
	void groupBooksInsideBookShelfByPublicationYear() throws BookShelfCapacityReached {
		shelf.add(effectiveJava, codeComplete, mythicalManMonth, cleanCode);

		Map<Year, List<Book>> booksByPublicationYear = this.shelf.groupByPublicationYear();

		Assertions.assertThat(booksByPublicationYear).containsKey(Year.of(2008))
				.containsValues(Arrays.asList(effectiveJava, cleanCode));

		Assertions.assertThat(booksByPublicationYear).containsKey(Year.of(2004))
				.containsValues(Collections.singletonList(codeComplete));

		Assertions.assertThat(booksByPublicationYear).containsKey(Year.of(1975))
				.containsValues(Collections.singletonList(mythicalManMonth));
	}

	@Test
	@DisplayName("books inside bookshelf are grouped according to user provided criteria(group by author name)")
	void groupBooksByUserProvidedCriteria() throws BookShelfCapacityReached {
		shelf.add(effectiveJava, codeComplete, mythicalManMonth, cleanCode);

		Map<String, List<Book>> booksByAuthor = this.shelf.groupBy(Book::getAuthor);

		Assertions.assertThat(booksByAuthor).containsKey("Joshua Bloch")
				.containsValues(Collections.singletonList(effectiveJava));

		Assertions.assertThat(booksByAuthor).containsKey("Steve McConnel")
				.containsValues(Collections.singletonList(codeComplete));

		Assertions.assertThat(booksByAuthor).containsKey("Frederick Phillips Brooks")
				.containsValues(Collections.singletonList(mythicalManMonth));

		Assertions.assertThat(booksByAuthor).containsKey("Robert C. Martin")
				.containsValues(Collections.singletonList(cleanCode));
	}

	@Nested
	@DisplayName("is empty")
	class IsEmpty {

		@Test
		@DisplayName("when no book is added to it")
		public void emptyBookShelfWhenNoBookAdded() {
			// Test case removed for brevity
		}

		@Test
		@DisplayName("when add is called without books")
		void emptyBookShelfWhenAddIsCalledWithoutBooks() {
			// Test case removed for brevity
		}

	}

	@Nested
	@DisplayName("after adding books")
	class BooksAreAdded {

		@Test
		@DisplayName("contains two books")
		void bookshelfContainsTwoBooksWhenTwoBooksAdded() {
			// Test case removed for brevity
		}

		@Test
		@DisplayName("returns an immutable books collection to client")
		void bookshelfIsImmutableForClient() {
			// Test case removed for brevity
		}
	}

	@Nested
	@DisplayName("progress")
	@ExtendWith(BookParameterResolver.class)
	public class BookShelfProgressSpec {
		private BookShelf shelf;
		private Book effectiveJava;
		private Book codeComplete;
		private Book mythicalManMonth;
		private Book cleanCode;

		@BeforeEach
		void init(Map<String, Book> books) throws BookShelfCapacityReached {
			shelf = new BookShelf(12);
			this.effectiveJava = books.get("Effective Java");
			this.codeComplete = books.get("Code Complete");
			this.mythicalManMonth = books.get("The Mythical Man-Month");
			this.cleanCode = books.get("Clean Code");
			shelf.add(codeComplete, effectiveJava, mythicalManMonth, cleanCode);
		}

		@Test
		@DisplayName("is 0% completed and 100% to-read when no book is read yet")
		void progress100PercentUnread() {
			Progress progress = this.shelf.progress();
			Assertions.assertThat(progress.completed()).isEqualTo(0);
			Assertions.assertThat(progress.toRead()).isEqualTo(100);
		}

		@Test
		@DisplayName("is 40% completed and 60% to-read when 2 books are finished and 3 books not read yet")
		void progressWithCompletedAndToReadPercentages() {
			effectiveJava.startedReadingOn(LocalDate.of(2016, Month.JULY, 1));
			effectiveJava.finishedReadingOn(LocalDate.of(2016, Month.JULY, 31));
			cleanCode.startedReadingOn(LocalDate.of(2016, Month.AUGUST, 1));
			cleanCode.finishedReadingOn(LocalDate.of(2016, Month.AUGUST, 31));
			Progress progress = shelf.progress();
			Assertions.assertThat(progress.completed()).isEqualTo(50);
			Assertions.assertThat(progress.toRead()).isEqualTo(50);
		}
	}

	@Nested
	@DisplayName("search")
	class BookShelfSeachSpec {
		private BookShelf shelf;
		private Book effectiveJava;
		private Book codeComplete;
		private Book mythicalManMonth;
		private Book cleanCode;

		@BeforeEach
		void init(Map<String, Book> books) throws BookShelfCapacityReached {
			shelf = new BookShelf(12);
			this.effectiveJava = books.get("Effective Java");
			this.codeComplete = books.get("Code Complete");
			this.mythicalManMonth = books.get("The Mythical Man-Month");
			this.cleanCode = books.get("Clean Code");
			shelf.add(codeComplete, effectiveJava, mythicalManMonth, cleanCode);
		}

		@Test
		@DisplayName(" should find books with title containing text")
		void shouldFindBooksWithTitleContainingText() {
			List<Book> books = this.shelf.findBooksByTitle("code");
			Assertions.assertThat(books.size()).isEqualTo(2);
		}

		@Test
		@DisplayName(" should find books with title containing text and published after specified date.")
		void shouldFilterSearchedBooksBasedOnPublishedDate() {
			List<Book> books = this.shelf.findBooksByTitle("code",
					b -> b.getPublishedOn().isBefore(LocalDate.of(2014, 12, 31)));
			Assertions.assertThat(books.size()).isEqualTo(2);
		}
	}

	@Nested
	@DisplayName("book published date")
	class BookPulishedFilterSpec {
		@Test
		@DisplayName("is after specified year")
		void validateBookPublishedDatePostAskedYear() {
			BookFilter filter = BookPublishedYearFilter.After(2007);
			org.junit.jupiter.api.Assertions.assertTrue(filter.apply(cleanCode));
			org.junit.jupiter.api.Assertions.assertFalse(filter.apply(codeComplete));
		}
		
        @Test
	    @DisplayName("Composite criteria is based on multiple filters")
	    void shouldFilterOnMultiplesCriteria(){
	        CompositeFilter compositeFilter = new CompositeFilter();
	        compositeFilter.addFilter( b -> false);
	        org.junit.jupiter.api.Assertions.assertFalse(compositeFilter.apply(cleanCode));
	    }
        
        @Test
        @DisplayName("Composite criteria does not invoke after first failure")
        void shouldNotInvokeAfterFirstFailure() {
            CompositeFilter compositeFilter = new CompositeFilter();

            BookFilter invokedMockedFilter = Mockito.mock(BookFilter.class);
            Mockito.when(invokedMockedFilter.apply(cleanCode)).thenReturn(false);
            compositeFilter.addFilter(invokedMockedFilter);

            BookFilter nonInvokedMockedFilter = Mockito.mock(BookFilter.class);
            Mockito.when(nonInvokedMockedFilter.apply(cleanCode)).thenReturn(true);
            compositeFilter.addFilter(nonInvokedMockedFilter);

            org.junit.jupiter.api.Assertions.assertFalse(compositeFilter.apply(cleanCode));
            Mockito.verify(invokedMockedFilter).apply(cleanCode);
            Mockito.verifyNoInteractions(nonInvokedMockedFilter);
        }

        @Test
        @DisplayName("Composite criteria invokes all filters")
        void shouldInvokeAllFilters() {
            CompositeFilter compositeFilter = new CompositeFilter();
            BookFilter firstInvokedMockedFilter = Mockito.mock(BookFilter.class);
            Mockito.when(firstInvokedMockedFilter.apply(cleanCode)).thenReturn(true);
            compositeFilter.addFilter(firstInvokedMockedFilter);

            BookFilter secondInvokedMockedFilter = Mockito.mock(BookFilter.class);
            Mockito.when(secondInvokedMockedFilter.apply(cleanCode)).thenReturn(true);
            compositeFilter.addFilter(secondInvokedMockedFilter);
            org.junit.jupiter.api.Assertions.assertTrue(compositeFilter.apply(cleanCode));
            Mockito.verify(firstInvokedMockedFilter).apply(cleanCode);
            Mockito.verify(secondInvokedMockedFilter).apply(cleanCode);
        }
	}
	
	@Test
	void throwsExceptionWhenBooksAreAddedAfterCapacityIsReached() {
	    BookShelf bookShelf = new BookShelf(2);
	    
	    try {
	    	bookShelf.add(effectiveJava, codeComplete);
	        bookShelf.add(mythicalManMonth);
	        org.junit.jupiter.api.Assertions.fail("Should throw BookShelfCapacityReached exception as more books are added than shelf capacity.");
	    } catch (BookShelfCapacityReached expected) {
	    	org.junit.jupiter.api.Assertions.assertEquals("BookShelf capacity of 2 is reached. You can't add more books.", expected.getMessage());
	    }
	}

// V4 approach
//	
//	@Test(expected=BookShelfCapacityReached.class)
//	public void throwsExceptionWhenBooksAreAddedAfterCapacityIsReachedV4() {
//	    BookShelf bookShelf = new BookShelf(2);
//	    bookShelf.add(effectiveJava, codeComplete);
//	    bookShelf.add(mythicalManMonth);
//	}
	
//	@Rule
//    public ExpectedException expectedException = ExpectedException.none();
//
//    @Test
//    void throwsExceptionWhenBooksAreAddedAfterCapacityIsReachedWithRule() throws BookShelfCapacityReached {
//        BookShelf bookShelf = new BookShelf(1);
//        expectedException.expect(BookShelfCapacityReached.class);
//        expectedException.expectMessage("BookShelf capacity of 1 is reached. You can't add more books.");
//
//        bookShelf.add(effectiveJava, codeComplete);
//    }
	
// JUnit 5 Way: Using assertThrows Assertion Method
	@Test
	void throwsExceptionWhenBooksAreAddedAfterCapacityIsReachedV5() throws BookShelfCapacityReached {
	    BookShelf bookShelf = new BookShelf(2);
	    bookShelf.add(effectiveJava, codeComplete);
	    BookShelfCapacityReached throwException = org.junit.jupiter.api.Assertions.assertThrows(BookShelfCapacityReached.class, () -> bookShelf.add(mythicalManMonth));
	    org.junit.jupiter.api.Assertions.assertEquals("BookShelf capacity of 2 is reached. You can't add more books.", throwException.getMessage());
	}
	
	
	//timeout
	@Test
	void test_should_complete_in_one_second() {
		// This will lead to test failure after two seconds. 
	    // assertTimeout(Duration.of(1, ChronoUnit.SECONDS), () -> Thread.sleep(2000));
	    String message = org.junit.jupiter.api.Assertions.assertTimeout(Duration.of(1, ChronoUnit.SECONDS), () -> "Hello, World!");
	    org.junit.jupiter.api.Assertions.assertEquals("Hello, World!", message);
	    
	    // ASSERTTIMEOUTPREEMPTIVELY, It makes sure that the test completes before the timeout. 
	    // org.junit.jupiter.api.Assertions.assertTimeoutPreemptively(Duration.of(1, ChronoUnit.SECONDS), () -> Thread.sleep(2000));
	}
	
	@RepeatedTest(10)
	void i_am_a_repeated_test() {
		org.junit.jupiter.api.Assertions.assertTrue(true);
	}
	
	@RepeatedTest(value = 10, name = "i_am_a_repeated_test__{currentRepetition}/{totalRepetitions}")
	void i_am_a_repeated_test_with_name() {
		org.junit.jupiter.api.Assertions.assertTrue(true);
	}
	
	@ParameterizedTest
	@ValueSource(strings = {"Effective Java", "Code Complete", "Clean Code"})
	void shouldGiveBackBooksForTitle(String title) throws BookShelfCapacityReached {
	    BookShelf shelf = new BookShelf(12);
	    Book effectiveJava = new Book("Effective Java", "Joshua Bloch", LocalDate.of(2008, Month.MAY, 8));
	    Book codeComplete = new Book("Code Complete", "Steve McConnel", LocalDate.of(2004, Month.JUNE, 9));
	    Book mythicalManMonth = new Book("The Mythical Man-Month", "Frederick Phillips Brooks", LocalDate.of(1975, Month.JANUARY, 1));
	    Book cleanCode = new Book("Clean Code", "Robert C. Martin", LocalDate.of(2008, Month.AUGUST, 1));
	    shelf.add(effectiveJava, codeComplete, mythicalManMonth, cleanCode);
	    List<Book> foundBooks = shelf.findBooksByTitle(title.toLowerCase());
	    org.junit.jupiter.api.Assertions.assertNotNull(foundBooks);
	    org.junit.jupiter.api.Assertions.assertEquals(1,foundBooks.size());
	    foundBooks = shelf.findBooksByTitle(title.toUpperCase());
	    org.junit.jupiter.api.Assertions.assertNotNull(foundBooks);
	    org.junit.jupiter.api.Assertions.assertEquals(0,foundBooks.size());
	}
	
	@ParameterizedTest
	@MethodSource("bookFilterProvider")
	void validateFilterWithNullData(BookFilter filter) {
		Assertions.assertThat(filter.apply(null)).isFalse();
	}

	static Stream<BookFilter> bookFilterProvider() {
	    return Stream.of(BookPublishedYearFilter.Before(2007), BookPublishedYearFilter.After(2007));
	}
	
	@ParameterizedTest
    @ArgumentsSource(BookFilterCompositeArgsProvider.class)
    void validateBookFiltersWithBooks(BookFilter filter, Book[] books) {
		org.junit.jupiter.api.Assertions.assertNotNull(filter);
		org.junit.jupiter.api.Assertions.assertFalse(filter.apply(books[0]));
		org.junit.jupiter.api.Assertions.assertTrue(filter.apply(books[1]));
    }
}
