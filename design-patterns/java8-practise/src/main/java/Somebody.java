
public class Somebody implements Person, Named {
	public String getName() {
		return Person.super.getName();
	}
	
	public static void main(String argc[]) {
		Somebody s = new Somebody();
		System.out.println(">>>>>>>>>>>> student name" + s.getName());
	}
}