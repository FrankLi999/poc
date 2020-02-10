package com.test.bookstoread;

public class BookShelfCapacityReached extends Exception {

	private static final long serialVersionUID = 9214776608493666174L;
	
	public BookShelfCapacityReached(String message) {
		super(message);
	}
}
