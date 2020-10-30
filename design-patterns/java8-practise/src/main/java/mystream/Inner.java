package mystream;

public class Inner {
	public static class StaticInner {
		private static int I = 0;
		public static String create() {
			return "xxxx";
		}
	}
	public class Nested {
		public void test() {
			
		}
	}
	
	public void aaa(final int c) {
		
		StaticInner nested = new StaticInner() {
			// public static int aa = 0;
			
			public void test() {
				
			}
			
			public void test1() {
				
			}
		};
		System.out.println(nested.create());
		final int a = 0;
		int t = 0;
		class bbb {

			public void create() {
				int i = a;
				i = c;
				
			}
		}
		StaticInner  inner = new StaticInner ();
		Nested n = new Nested();
		bbb b = new bbb();
	}
	
	public static void main(String argc[]) {
		Inner i = new Inner();
		i.aaa(0);
	}
}
