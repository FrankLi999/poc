package com.test.bookstoread;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class TestSample {
	@Test
	@DisplayName("Three ways to all Assertions.assertXXX")
	void nullAssertionTest() {
	    String str = null;
	    Assertions.assertNull(str);
	    Assertions.assertNull(str, "str should be null");
	    Assertions.assertNull(str, () -> "str should be null");
	    
	    String a = "abc";
	    String b = "abc";
	    
	    Integer i1 = new Integer(1);
	    Integer i2 = new Integer(1);
	    Assertions.assertEquals(a, b);
	    Assertions.assertSame(a, b);
	    
	    Assertions.assertEquals(i1, i2);
	    Assertions.assertNotSame(i1, i2);
	}
}
