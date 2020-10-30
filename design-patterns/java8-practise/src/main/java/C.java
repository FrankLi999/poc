import java.lang.annotation.Annotation;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.UnaryOperator;

interface Operation {
	double apply(double x, double y);
}

public class C {
	
	

	
	Class<? extends Exception>[] value() {
		return null;
	}
	
	List<String>[] stringLists() {
		return null;
	}
			
	@MyTest public void test() {};
	@MyTest public static void test1() {};
	public static <E> Set<E> union(Set<? extends E> s1, Set<? extends E> s2) {
		return null;
	}

	private static <T extends Enum<T> & Operation> void test(
	        Class<T> opEnumType, double x, double y) {
	    for (Operation op : opEnumType.getEnumConstants())
	        System.out.printf("%f %s %f = %f%n", x, op, y, op.apply(x, y));
	}
	
	public static void main(String argc[]) {
		Set<Integer>  integers =  Set.of(1, 3, 5);
		Set<Double>   doubles  =  Set.of(2.0, 4.0, 6.0);
		Set<Number>   numbers  =  union(integers, doubles);
		
		BigDecimal oneZero = new BigDecimal("1.0");
		BigDecimal oneZeroZero = new BigDecimal("1.00");
		
		System.out.println(oneZero.doubleValue());
		System.out.println(oneZeroZero.doubleValue());
		System.out.println(oneZero.doubleValue() == oneZeroZero.doubleValue());
		System.out.println(oneZero.equals(oneZeroZero));
		System.out.println(oneZero.compareTo(oneZeroZero));
		System.out.println(Utensil.NAME);
		System.out.println(Dessert.NAME);
		
		HashSet<Integer> set = new HashSet<>();
		set.add(null);
//		set.add(new Object());
//		set.add("xxxxxxxxx");
		set.add(Integer.valueOf(123));
		
		set.forEach(System.out::println);
		Set ss = new HashSet();
		ss.add("xxxx");
		TreeSet<Integer> treeSet = new TreeSet<>();
//		treeSet.add(null);
//		set.add(new Object());
//		set.add("xxxxxxxxx");
		treeSet.add(Integer.valueOf(123));
		
		treeSet.forEach(System.out::println);
		
		Set<?> s = treeSet;
		s.forEach(System.out::println);
		
		Set<?> s1 = set;
		s1.forEach(System.out::println);
		
		Set<?> s2 = ss;
		s2.forEach(System.out::println);
		
		Set<?> s3 = s2;
		s3.forEach(System.out::println);
		
		Set s4 = s2;
		s4.forEach(System.out::println);
		
		Set s5 = set;
		s5.forEach(System.out::println);
		
//		List[] lists = new List[3];
//		// List<String>[] stringLists = new List<String>[1];
//		
//		MyStack<Number> stack = null;
//		List<Number> numbers = null;
//		Collection<Number> numbers1 = null;
//		stack.popAll(numbers);
//		stack.popAll(numbers1);
//		List<Object> objects = null;
//		Collection<Object> objects1 = null;
//		
//		stack.popAll(objects);
//		stack.popAll(objects1);
		List<String> strings = new ArrayList<>();
		strings.add("xxx");
		dangerous(strings);
		
		//String[] attributes = pickTwo("Good", "Fast", "Cheap");
		Object[] attributes = pickTwo("Good", "Fast", "Cheap");
		System.out.println(attributes[0]);
		System.out.println(attributes[0].getClass());
		
		Favorites f = new Favorites();

	    f.putFavorite(Double.class, Double.valueOf(12.3));

	    f.putFavorite(Integer.class, 0xcafebabe);

	    // f.putFavorite(Class.class, Favorites.class);


	    Double favoriteString = f.getFavorite(Double.class);

	    int favoriteInteger = f.getFavorite(Integer.class);
	    System.out.printf("%s %x%n", favoriteString,
		        favoriteInteger);
	    //Class<?> favoriteClass = f.getFavorite(Class.class);
	    //System.out.printf("%s %x %s%n", favoriteString,
	        // favoriteInteger, favoriteClass.getName());
	    
	    AAA aaa = new BBB();
	    Collection<?>[] collections = {
				new HashSet<String>(),
				new ArrayList<BigInteger>(),
				new HashMap<String, String>().values()
			};

			for (Collection<?> c : collections) {
				new AAA(c);
				System.out.println(aaa.classify(c));
				System.out.println(aaa.staticClassify(c));
			}
			
		new Thread(() -> System.out.println("aaa")).start();
		ExecutorService exec = Executors.newCachedThreadPool();
		exec.submit(() -> System.out.println("eeee"));
		// exec.submit(System.out::println);
	}
	
	private static class Test<T> {
		private static UnaryOperator<Object> IDENTITY_FN = (t) -> t;
		// private static <T> UnaryOperator<T> IDENTITY_FN1 = (t) -> t;
		@SuppressWarnings({ "unused", "unchecked" })
		public static <T> UnaryOperator<T> identityFunction() {
		    return (UnaryOperator<T>) IDENTITY_FN;
		}
		
		@SuppressWarnings("unused")
		static <T> UnaryOperator<T> identityF() {
	        return t -> t;
	    }
	}
	
	@SafeVarargs
	static <T> T[] toArray(T... args) {

	    return args;

	}
	
	static <T> T[] pickTwo(T a, T b, T c) {

	    switch(ThreadLocalRandom.current().nextInt(3)) {
	      case 0: return toArray(a, b);
	      case 1: return toArray(a, c);
	      case 2: return toArray(b, c);
	    }

	    throw new AssertionError(); // Can't get here

	}
	
	static void dangerous(List<String>... stringLists) {

	    // List<Integer> intList = List.of(42);

	    // Object[] objects = stringLists;
	    List<String>[] objects = stringLists;

	    //objects[0] = intList;             // Heap pollution

	    String s = stringLists[0].get(0); // ClassCastException
	    System.out.println(s);
	}
}

class Utensil {

    static final String NAME = "pot";
    public <T extends Annotation> T getAnnotation(Class<T> annotationType) {
    	return null;
    }
}



class Dessert {

    static final String NAME = "pie";

}

//Typesafe heterogeneous container pattern - implementation
class Favorites {
	private Map<Class<? extends Number>, Object> favorites = new HashMap<>();

	public <T extends Number> void putFavorite(Class<T> type, T instance) {
		favorites.put(Objects.requireNonNull(type), instance);
	}

	public <T> T getFavorite(Class<T> type) {
		return type.cast(favorites.get(type));
	}
}
		
interface MyStack<E> {

	public void push(E e);

	public E pop();

	public boolean isEmpty();
	
	void pushAll(Iterable<? extends E> src);
	void popAll(Collection<? super E> dst);

}

class AAA {
	AAA() {
		
	}
	
	AAA(Set<?> s) {
		System.out.println("Set C");
	}
	
	AAA(List<?> s) {
		System.out.println("List C");
	}

	AAA(Collection<?> s) {
		System.out.println("Collection C");
	}
	
	public static String staticClassify(Set<?> s) {
		return "Set";
	}
	
	public static String staticClassify(List<?> lst) {
		return "List";
	}

	public static String staticClassify(Collection<?> c) {
		return "Unknown Collection";
	}
	
	public String classify(Set<?> s) {
		return "Set";
	}
	
	public String classify(List<?> lst) {
		return "List";
	}

	public String classify(Collection<?> c) {
		return "Unknown Collection";
	}
}

class BBB extends AAA {
	public static String staticClassify(Set<?> s) {
		return "Set BBB";
	}
	
	public static String staticClassify(List<?> lst) {
		return "List BBB";
	}

	public static  String staticClassify(Collection<?> c) {
		return "Unknown Collection BBB";
	}
	
	public String classify(Set<?> s) {
		return "Set BBB";
	}
	
	public String classify(List<?> lst) {
		return "List BBB";
	}

	public String classify(Collection<?> c) {
		return "Unknown Collection BBB";
	}
}