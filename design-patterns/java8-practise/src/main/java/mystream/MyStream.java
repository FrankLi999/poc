package mystream;

import java.io.Serializable;
import java.lang.annotation.Annotation;
import java.lang.reflect.AnnotatedType;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class MyStream {
	public interface aaa {
		
	}
	private static class MyClass implements Serializable, aaa {
	}
	private static class MyThread extends Thread {}
	public class subclass1 {  
	      public subclass1() {  
	         System.out.println("subclass Class1");  
	      }  
	   }  
	  
	   public class subclass2 {  
	      public subclass2() {  
	         System.out.println("subclass2 Class2");  
	      }  
	   }  
	  
	   private class PrivatesubClass {  
	      public PrivatesubClass() {  
	         System.out.println("subclass Private Class");  
	      }  
	   }  
	public static void main(String argc[]) throws Exception {
		{
			 try {  
		           
		         Class clsobj = Class.forName("mystream.MyStream");  
		  
		         // Class[] totcls = clsobj.getClasses();
		         Class[] totcls = clsobj.getDeclaredClasses();
		         for (int i = 0; i < totcls.length; i++) {  
		            System.out.println("Class  " +i+ "  = " + totcls[i].getName());  
		         }  
		      } catch (ClassNotFoundException e) {  
		         System.out.println(e.toString()); //coverting exception object to string and printing it  
		      }  
			 System.out.println("========getClasses==============");
		}
		{
		AnnotatedType annotatedType = MyThread.class.getAnnotatedSuperclass();
        System.out.println("Type: " + annotatedType.getType().getTypeName());
        System.out.println("Annotations: " +
                Arrays.toString(annotatedType.getAnnotations()));
        System.out.println("Declared Annotations: " +
                Arrays.toString(annotatedType.getDeclaredAnnotations()));
        AnnotatedType annotatedOwnerType = annotatedType.getAnnotatedOwnerType();//Java 9
        System.out.println("Annotated owner type: " + annotatedOwnerType);
        System.out.println("AnnotatedType class: " + annotatedType.getClass().getName());
        System.out.println("AnnotatedType class implementing interfaces: " +
                Arrays.toString(annotatedType.getClass().getInterfaces()));
        System.out.println("========atedSu==============");
		}
        for (AnnotatedType annotatedType : MyClass.class.getAnnotatedInterfaces()) {
            Type type = annotatedType.getType();
            System.out.println("Type :" + type);

            Annotation[] annotations = annotatedType.getAnnotations();
            System.out.println(Arrays.toString(annotations));

            Annotation[] declaredAnnotations = annotatedType.getDeclaredAnnotations();
            System.out.println(Arrays.toString(declaredAnnotations));
        }
		System.out.println("================================");
		
		System.out.println(B.class);
		System.out.println(B.class.getDeclaredClasses());
		System.out.println(B.class.getEnclosingClass());
		System.out.println("================================");
		System.out.println(A.class.getDeclaredClasses());
		System.out.println(A.class.getEnclosingClass());
		System.out.println("================================");
		System.out.println(argc);
		System.out.println( argc.length);
		System.out.println(Counter.class.descriptorString());
//		synchronized(argc) {
//			System.out.println("xxx");
//			try {
//				argc.wait();
//			} catch(Exception e) {
//				System.out.println(e);
//			}
//			System.out.println("yyy");
//		}
		String dogs[] = { "d1", "a1", "d2", "d3", "e1" };
		
		String dogs2[][] = { {"d1", "a1", "d2", "d3"}, {"e1"} };
		
		System.out.println("arrays.simplename:" + dogs.getClass().getSimpleName());
		System.out.println("arrays.hashCode:" + Arrays.hashCode(dogs));
		System.out.println("arrays.toString:" + Arrays.toString(dogs));

		System.out.println("arrays2.toString:" + Arrays.toString(dogs2));
		System.out.println("arrays2.deepToString:" + Arrays.deepToString(dogs2));
		
		System.out.println("arrays2.hashCode:" + Arrays.hashCode(dogs2));
		System.out.println("arrays2.deepHashCode:" + Arrays.deepHashCode(dogs2));
//		Stream<String> dogStream0 = Stream.of(dogs).filter(s->s.startsWith("d"));				
//		System.out.println(dogStream0.count());
//		
//		Stream<String> dogStream = Stream.of(dogs).sorted().dropWhile(s->s.startsWith("d"));				
//		System.out.println(dogStream.count());
//		
//		Stream<String> dogStream1 = Stream.of(dogs).dropWhile(s->s.startsWith("d"));				
//		System.out.println(dogStream1.count());
//		
//		Stream.of(dogs).parallel().forEach(System.out::println);
//		Stream.of(dogs).parallel().forEachOrdered(System.out::println);
//		
		System.out.println("================================");
//		Stream.of(dogs).parallel().peek(System.out::println).count();
//		Stream.of(dogs).parallel().peek(System.out::println).count();

		long c = Stream.of(dogs).parallel().filter(s -> s.startsWith("d"))
				.peek(e -> System.out.println("Filtered value: " + e)).count();
		System.out.println("==============c==================c:" + c);

		long c1 = Stream.of(dogs).filter(s -> s.startsWith("d")).peek(e -> System.out.println("Filtered value: " + e))
				.count();
		System.out.println("===============c1=================c:" + c1);

		long c2 = Stream.of(dogs).peek(e -> System.out.println("Filtered value: " + e)).filter(s -> s.startsWith("d"))
				.count();
		System.out.println("================c2================c:" + c2);

		Optional<String> c3 = Stream.of(dogs).peek(e -> System.out.println("Filtered value: " + e))
				.filter(s -> s.startsWith("d")).findFirst();
		System.out.println("================c3================c:" + c3);

		Optional<String> c4 = Stream.of(dogs).peek(e -> System.out.println("Filtered value: " + e))
				.filter(s -> s.startsWith("d")).findAny();
		System.out.println("================c4================c:" + c4);

		Optional<String> s = Optional.of("input");
		System.out.println(s.map(MyStream::getOutput));
		System.out.println(s.flatMap(MyStream::getOutputOpt));

		// DoubleStream ds = DoubleStream.of(120.12, 220.20, 234.34);
		System.out.println(DoubleStream.of(120.12).reduce((v1, v2) -> v1 + v2 + 100.0).getAsDouble());
		System.out.println(DoubleStream.of(120.12).reduce(200.0, (v1, v2) -> v1 + v2 + 100.0));
		System.out.println(DoubleStream.of(120.12, 220.20, 234.34).reduce((v1, v2) -> v1 + v2 + 100.0).getAsDouble());
		System.out.println(DoubleStream.of(120.12, 220.20, 234.34).reduce(200.00, (v1, v2) -> v1 + v2 + 100.0));
		System.out.println(DoubleStream.of(120.12, 220.20, 234.34).reduce((v1, v2) -> (v1 + v2) / 2));

		List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
		int result = numbers.stream().reduce(0, (subtotal, element) -> subtotal + element);
		System.out.println("result:" + result);

		List<Integer> ages = Arrays.asList(25, 30, 45, 28, 32);
		int computedAges = ages.parallelStream().reduce(0, (a, b) -> a + b, Integer::sum);
		System.out.println("computedAges:" + computedAges);

		List<String> vowels = List.of("a", "e", "i", "o", "u");

		// sequential stream - nothing to combine
		StringBuilder result1 = vowels.stream().collect(StringBuilder::new, (x, y) -> x.append(y),
				(a, b) -> a.append(",").append(b));
		System.out.println(result1.toString());

		// parallel stream - combiner is combining partial results
		StringBuilder result2 = vowels.parallelStream().collect(StringBuilder::new, (x, y) -> x.append(y),
				(a, b) -> a.append(",").append(b));
		System.out.println(result2.toString());
		
		try (Stream<String> input = Files.lines(Paths.get(ClassLoader.getSystemResource("mystream/Java.txt").toURI()))) {
			input.map(line -> line.split(" ")).flatMap(a -> Arrays.stream(a)).forEach(System.out::println);
		}
		List<Person> list = Stream
				.of(List.of(new Person("p1", 1), new Person("p2", 2), new Person("p3", 3), new Person("p4", 4)),
						List.of(new Person("p5", 5), new Person("p6", 6), new Person("p7", 7), new Person("p8", 8)))
				.collect(Collectors.flatMapping(l -> l.stream().filter(p -> p.getAge() % 2 == 0), Collectors.toList()));
		System.out.println(list);

		List<Person> list1 = Stream
				.of(List.of(new Person("p1", 1), new Person("p2", 2), new Person("p3", 3), new Person("p4", 4)),
						List.of(new Person("p5", 5), new Person("p6", 6), new Person("p7", 7), new Person("p8", 8)))
				.flatMap(List::stream).filter(p -> p.getAge() % 2 == 0).collect(Collectors.toList());
		System.out.println(list1);

		Map<Integer, List<Integer>> map = Stream.of(List.of(1, 2, 3, 4, 5, 6), List.of(7, 8, 9, 10))
				.collect(Collectors.groupingBy(Collection::size, Collectors.flatMapping(
						// l -> l.stream().filter(i -> i % 2 == 0),
						l -> l.stream(), Collectors.toList())));
		System.out.println(map);

		List<Integer> list2 = IntStream.of(2, 4, 6, 8, 10, 12).boxed()
				.collect(Collectors.filtering(i -> i % 4 == 0, Collectors.toList()));
		System.out.println(list2);

		Map<Department, Set<Employee>> wellPaidEmployeesByDepartment = getEmployees().stream()
				.collect(Collectors.groupingBy((Employee employee) -> employee.dept,
						Collectors.filtering(e -> e.salary >= 2000, Collectors.toSet())));
		wellPaidEmployeesByDepartment.forEach((k, v) -> System.out.printf("%8s: %s%n", k.name, v));

		Stream<Integer> is = Stream.of(5, 10, 20, 50);
		Integer i = is.collect(Collectors.reducing((integer, integer2) -> integer2 - integer)).orElse(-1);

		System.out.println(i);

		Stream<Integer> ss = Stream.of(5, 10, 20, 50).parallel();
		String str = ss.collect(Collectors.reducing("", x -> Integer.toString(x), (s1, s2) -> s1 + s2));
		System.out.println(str);

		Map<String, Integer> output = Stream.of("this", "word", "is", "the", "best").collect(Collectors
				.groupingBy(x -> x.substring(0, 1), Collectors.reducing(0, x -> x.length(), (x, y) -> x + y)));
		System.out.println(output);

		List<Employee> employeeList = Arrays.asList(
				new Employee("A", new Department("DT"), 100),
				new Employee("B", new Department("DT"), 200), 
				new Employee("C", new Department("DT"), 300),
				new Employee("D", new Department("DT"), 400));
		System.out.println("-----------------------------------");
		employeeList.stream().map(Employee::getName).forEach(d -> System.out.print(d+ " "));

		System.out.println("-----------------------------------");
		employeeList.stream().map(d -> d.getName()).forEach(d -> System.out.print(d+ " "));;
		System.out.println("-----------------------------------");
		HashMap<String, Employee> results = employeeList.stream()
				.collect(Collectors.teeing(
						Collectors.maxBy(Comparator.comparing(Employee::getSalary)),
						Collectors.minBy(Comparator.comparing(Employee::getSalary)), 
						(e1, e2) -> {
							HashMap<String, Employee> minMaxMap = new HashMap<>();
							minMaxMap.put("MAX", e1.get());
							minMaxMap.put("MIN", e2.get());
							return minMaxMap;
						}

				));
		System.out.println(results);
		int num[] = {1, 2, 3, 4, 5, 6, 7, 8, 9 ,10};
		OptionalInt sum1 = Arrays.stream(num).reduce((n1, n2) -> n1 + n2);
		int sum2 = Arrays.stream(num).reduce(0, (n1, n2) -> n1 + n2);
		
		System.out.println("sum1:" + sum1);
		System.out.println("sum2:" + sum2);
		
		System.out.println(Stream.iterate(1, x -> ++x).limit(5).map(x -> "" + x).collect(Collectors.joining()));
		System.out.println(Stream.iterate(1, x -> x++).limit(5).map(x -> "" + x).collect(Collectors.joining()));
		
		System.out.println(Stream.generate(() -> "growl! ").limit(5).collect(Collectors.joining()));
		
		Stream<String> s1 = Stream.empty();
		Stream<String> s2 = Stream.empty();
		Map<Boolean, List<String>> p = s1.collect(Collectors.partitioningBy(b -> b.startsWith("c")));
		Map<Boolean, List<String>> g = s2.collect( Collectors.groupingBy(b -> b.startsWith("c")));
		System.out.println(p + " " + g);
		
		DoubleStream s3 = DoubleStream.of(1.2, 2.4);
		s3.peek(System.out::println).filter(x -> x > 2).count();
		System.out.println("-----------------------------------");
		DoubleStream s4 = DoubleStream.of(1.2, 2.4);
		s4.filter(x -> x > 2).peek(System.out::println).count();
		
		 Counter counter = new Counter();
		 System.out.println(counter.counter);
		 System.out.println(counter.increment(counter.counter));
		 System.out.println(counter.counter);
		 System.out.println("-----------------------------------");
		 System.out.println(Runtime.getRuntime().availableProcessors());
		 System.out.println(Runtime.getRuntime().freeMemory());
		 System.out.println(Runtime.getRuntime().totalMemory());
		 System.out.println(Runtime.version());
		 System.out.println(Runtime.version().feature());
		 System.out.println(Runtime.version().interim());
		 System.out.println(Runtime.version().patch());
		 System.out.println(Runtime.version().update());
		 System.out.println(Runtime.version().build());
	}

	static String getOutput(String input) {
		return input == null ? null : "output for " + input;
	}

	static Optional<String> getOutputOpt(String input) {
		return input == null ? Optional.empty() : Optional.of("output for " + input);
	}

	private static List<Employee> getEmployees() {
		return List.of(new Employee("Sara", new Department("Admin"), 3000),
				new Employee("Joe", new Department("IT"), 1000), new Employee("Mike", new Department("Account"), 2000),
				new Employee("Tony", new Department("Account"), 1500),
				new Employee("Linda", new Department("IT"), 5000));
	}

	private static class Employee {
		private String name;
		private Department dept;
		private int salary;

		public Employee(String name, Department dept, int salary) {
			this.name = name;
			this.dept = dept;
			this.salary = salary;
		}
		
		public String getName() {
			return this.name;
		}
		
		public int getSalary() {
			return this.salary;
		}

		@Override
		public String toString() {
			return "Employee{" + "name='" + name + '\'' + ", dept=" + dept + ", salary=" + salary + '}';
		}
	}

	private static class Department {
		private String name;

		public Department(String name) {
			this.name = name;
		}

		@Override
		public String toString() {
			return "Department{" + "name='" + name + '\'' + '}';
		}

		@Override
		public boolean equals(Object o) {
			Department that = (Department) o;
			return Objects.equals(name, that.name);
		}

		@Override
		public int hashCode() {
			return Objects.hash(name);
		}
	}
}

class Person {
	private String name;
	private long age;

	Person(String name, long age) {
		this.name = name;
		this.age = age;
	}

	String getname() {
		return name;
	}

	long getAge() {
		return age;
	}

}

class MyException extends Exception {

	private static final long serialVersionUID = 1776278164256910346L;
	
}

class A {
	public void function() throws Exception {
		return;
	}
}

class B extends A {
	@Override
	public void function() throws MyException {
		return;
	}
}

class Counter {
	int counter = 0;
	public int increment(int i) {
		//return i++;
		return ++i;
	}
	
	public <S, D> D map(S sourceObject, java.lang.Class<D> destinationClass) {
		return null;
	}
	
	public <D, S> D map1(S sourceObject, java.lang.Class<D> destinationClass) {
		return null;
	}
}

class D<S, D> {
	public <S, D>D map1(S sourceObject, java.lang.Class<D> destinationClass) {
		return null;
	}
	
	public <D, S>D map12(S sourceObject, java.lang.Class<D> destinationClass) {
		return null;
	}
}
