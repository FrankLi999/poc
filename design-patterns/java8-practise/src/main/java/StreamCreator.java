import java.util.Optional;
import java.util.Scanner;
// import static org.junit.jupiter.api.Assertions.*;
public class StreamCreator {
	public static void main(String argc[]) {
		
		String input = "Hello 1, F 3.5";
	    try (Scanner scanner = new Scanner(input).useDelimiter(",")) {
	    	scanner.tokens().forEach(System.out::println);
	    }
	    
	    Optional<Integer> i = Optional.of(0);
	    System.out.println(i.orElse(2));
	    
	    Optional<Integer> i2 = Optional.empty();
	    System.out.println(i2.orElse(2));
	}
}
