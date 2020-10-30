package _lang;

import java.util.Arrays;
import java.util.Objects;

public class ArraysTest {

	public static void main(String argc[]) {

		int a1[] = null;
		int a2[] = null;

		System.out.println("equals - " + Objects.equals(a1, a2));
		System.out.println("deepEquals - " + Objects.deepEquals(a1, a2));

		a1 = new int[] { 1, 3, 5 };
		a2 = new int[] { 1, 3, 5 };

		System.out.println("equals - " + Objects.equals(a1, a2));
		System.out.println("deepEquals - " + Objects.deepEquals(a1, a2));

		// initializing unsorted array
		Object arr[] = { 10, 2, 22, 69 };

		// sorting array
		Arrays.sort(arr);

		// let us print all the elements available
		System.out.println("The sorted array is:");
		for (Object number : arr) {
			System.out.println("Number = " + number);
		}

		// entering the value to be searched
		int searchVal = 22;

		int retVal = Arrays.binarySearch(arr, searchVal);

		System.out.println("The index of element 22 is : " + retVal);
	}
}
