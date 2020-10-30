package _strings;

import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.stream.Stream;

public class CommonWords {
	public static void main(String argc[]) {
//		String str1 = "This is the first string";
//		String str2 = "This is the second string";
//		commonWords1(str1, str2);
		commonWords2();
	}
	
	public static void commonWords(String str1, String str2) {
		Set<String> str1Map = new HashSet<>();
		Stream.of(str1.split(" ")).forEach(s -> str1Map.add(s));
		Stream.of(str2.split(" ")).forEach(s -> {if (str1Map.contains(s) ) {System.out.println(s);}});
	}
	
	public static void commonWords1(String str1, String str2) {
		Set<String> str1Map = new HashSet<>();
		Stream.of(str1.split(" ")).forEach(s -> str1Map.add(s));
		StringTokenizer tokenizer = new StringTokenizer(str2);
		while (tokenizer.hasMoreTokens()) {
			String currentWord = tokenizer.nextToken();
			if (str1Map.contains(currentWord)) {
				System.out.println(":" + currentWord);
			}
		}
	}
	
	public static void commonWords2() {
		String str1[] = new String[] {"This", "is", "the", "first", "string"}; 
		String str2[] = new String[] {"This", "is", "the", "second", "string"}; 
		
		for(String str: str1) {
			if (contains(str2, str)) {
				System.out.println(str);
			}
		}
		
	}
	
	private static boolean contains(String strs[], String checked) {
		for(String str: strs) {
			if (str.equals(checked)) {
				return true;
			}
		}
		return false;
	}
}
