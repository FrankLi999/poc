package _lang;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CollectionsTest {

	public static void main(String argc[]) {
		
		 String[] a = new String [] {"a", "b", "c", "d", "e"};
		 List<String> l2 = Arrays.asList(a);
		 Collections.rotate(l2, -1);
		 System.out.println(l2);
		 a = new String [] {"a", "b", "c", "d", "e"};
		 List<String> l1 = Arrays.asList(a);
		 Collections.rotate(l1, 1);
		 System.out.println(l1);

	}
}
