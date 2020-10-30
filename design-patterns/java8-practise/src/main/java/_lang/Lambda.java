package _lang;

import java.util.function.Consumer;
public class Lambda {
	public int x = 0;

	class FirstLevel {

		//not necessaey has to be effective final for lambda
		public int x = 1;

		//method argument has to be effective final
		void methodInFirstLevel(int x) {
			this.x = 2;
			Lambda.this.x = 3;
			// The following statement causes the compiler to generate
			// the error "local variables referenced from a lambda expression
			// must be final or effectively final" in statement A:
			//
			// x = 99;

			Consumer<Integer> myConsumer = (y) -> {
				System.out.println("x = " + x); // Statement A
				System.out.println("y = " + y);
				System.out.println("this.x = " + this.x);
				System.out.println("LambdaScopeTest.this.x = " + Lambda.this.x);
			};

			myConsumer.accept(x);

		}
	}

	public static void main(String... args) {
		Lambda st = new Lambda();
		Lambda.FirstLevel fl = st.new FirstLevel();
		fl.methodInFirstLevel(23);
	}
}