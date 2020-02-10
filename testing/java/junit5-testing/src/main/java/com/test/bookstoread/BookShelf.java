package com.test.bookstoread;

import java.time.Year;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class BookShelf {
	private List<Book> books = new ArrayList<>();
	private int capacity;
	
	public BookShelf(int capacity) {
		this.capacity = capacity;
	}
	
	public List<Book> books() {
		return Collections.unmodifiableList(this.books);
	}

	public void add(Book... booksToAdd) throws BookShelfCapacityReached {
		if (books.size() + booksToAdd.length > capacity) {
			throw new BookShelfCapacityReached(String.format("BookShelf capacity of %d is reached. You can't add more books.", this.capacity));
		}
		Arrays.stream(booksToAdd).forEach(this.books::add);
//		Arrays.stream(booksToAdd).forEach(book -> {
//	        if (books.size() == capacity) {
//	            throw new BookShelfCapacityReached(String.format("BookShelf capacity of %d is reached. You can't add more books.", this.capacity));
//	        }
//	        books.add(book);
//	    });
	}

	public List<Book> arrange() {
		return Collections.unmodifiableList(books.stream().sorted().collect(Collectors.toList()));
	}

	public List<Book> arrange(Comparator<Book> comparator) {
		return Collections.unmodifiableList(books.stream().sorted(comparator).collect(Collectors.toList()));
	}

	public Map<Year, List<Book>> groupByPublicationYear() {
		return groupBy(book -> Year.of(book.getPublishedOn().getYear()));
	}

	public <K> Map<K, List<Book>> groupBy(Function<Book, K> fx) {
		Map<K, List<Book>> map = books.stream().collect(Collectors.groupingBy(fx));
		return Collections.unmodifiableMap(map);
	}

	public Progress progress() {
		int booksRead = Long.valueOf(books.stream().filter(Book::isRead).count()).intValue();
		int booksToRead = books.size() - booksRead;
		int percentageCompleted = booksRead * 100 / books.size();
		int percentageToRead = booksToRead * 100 / books.size();
		return new Progress(percentageCompleted, percentageToRead, 0);
	}

	public List<Book> findBooksByTitle(String title) {
		return findBooksByTitle(title, b -> true);
	}

	public List<Book> findBooksByTitle(String title, Predicate<Book> filter) {
		return books.stream().filter(b -> b.getTitle().toLowerCase().contains(title)).filter(filter)
				.collect(Collectors.toList());
	}

	public List<Book> findBooksByTitleWithFilter(String title, BookFilter filter) {
		return books.stream().filter(b -> b.getTitle().toLowerCase().contains(title)).filter(b -> filter.apply(b))
				.collect(Collectors.toList());
	}
}
