package patterns.behavior.state;

public class StateDemo {
	
	public static void main(String argc[]) {
		Package pkg = new Package();
		pkg.printStatus();

		pkg.nextState();
		pkg.printStatus();

		pkg.nextState();
		pkg.printStatus();

		pkg.nextState();
		pkg.printStatus();
	}
}
