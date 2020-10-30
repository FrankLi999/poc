package _lang;

import java.util.Objects;

public class ObjectsTest {
	public static void main(String[] argc) {
		
		Object a = null;
		Object b = null;
		
		int a1[] = new int[] {1, 3, 5};
		int a2[] = new int[] {1, 3, 5};
		
		System.out.println("equals - " + Objects.equals(a, b));
		System.out.println("deepEquals - " + Objects.deepEquals(a, b));
		
		//Objects.deepEquals compares array elements but Objects.equals does not
		System.out.println("equals - " + Objects.equals(a1, a2));
		System.out.println("deepEquals - " + Objects.deepEquals(a1, a2));
	}
}
