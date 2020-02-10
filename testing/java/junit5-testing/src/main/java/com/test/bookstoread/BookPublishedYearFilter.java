package com.test.bookstoread;

import java.time.LocalDate;

class BookPublishedYearFilter implements BookFilter {
	private LocalDate date;
	private boolean before = false;
	static BookPublishedYearFilter After(int year) {
		BookPublishedYearFilter filter = new BookPublishedYearFilter();
		filter.date = LocalDate.of(year, 12, 31);
		return filter;
	}

	static BookPublishedYearFilter Before(int year) {
		BookPublishedYearFilter filter = new BookPublishedYearFilter();
		filter.date = LocalDate.of(year, 12, 31);
		filter.before = true;
		return filter;
	}
	
	@Override
	public boolean apply(final Book b) {
		return this.before ? b.getPublishedOn().isBefore(this.date) : 
			b.getPublishedOn().isAfter(this.date);
	}
}