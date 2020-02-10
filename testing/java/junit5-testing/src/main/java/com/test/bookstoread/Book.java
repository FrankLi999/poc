package com.test.bookstoread;

import java.time.LocalDate;

public class Book implements Comparable<Book> {
	private final String title;
	private final String author;
	private final LocalDate publishedOn;
	private LocalDate startedReadingOn;
	private LocalDate finishedReadingOn;
	
	public Book(String title, String author, LocalDate publishedOn) {
		this.title = title;
		this.author = author;
		this.publishedOn = publishedOn;
	}

	public String getTitle() {
		return title;
	}

	public String getAuthor() {
		return author;
	}

	public LocalDate getPublishedOn() {
		return publishedOn;
	}

	@Override
	public int compareTo(Book that) {
		return this.title.compareTo(that.title);
	}

	public void startedReadingOn(LocalDate startedOn) {
		this.startedReadingOn = startedOn;
	}

	public void finishedReadingOn(LocalDate finishedOn) {
		this.finishedReadingOn = finishedOn;
	}

	public boolean isRead() {
		return startedReadingOn != null && finishedReadingOn != null;
	}
	
    public boolean isProgress() {
        return startedReadingOn != null && finishedReadingOn == null;
    }
    
    @Override
    public int hashCode() {
        int result = title != null ? title.hashCode() : 0;
        result = 31 * result + (author != null ? author.hashCode() : 0);
        result = 31 * result + (publishedOn != null ? publishedOn.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Book{" +
                "title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", publishedOn=" + publishedOn +
                '}';
    }
}