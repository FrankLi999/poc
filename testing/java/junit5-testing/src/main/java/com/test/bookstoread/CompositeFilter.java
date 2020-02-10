package com.test.bookstoread;

import java.util.ArrayList;
import java.util.List;

class CompositeFilter implements BookFilter {
	private List<BookFilter> filters;

	CompositeFilter() {
		filters = new ArrayList<>();
	}

	@Override
	public boolean apply(final Book b) {
		// return filters.stream().map(bookFilter -> bookFilter.apply(b)).reduce(true, (b1, b2) -> b1 && b2);
		boolean result = true;
		for (BookFilter filter: filters) {
			result = filter.apply(b);
			if (!result) { 
				break;
			}
		}
		return result;
	}

	void addFilter(final BookFilter bookFilter) {
		filters.add(bookFilter);
	}
}
