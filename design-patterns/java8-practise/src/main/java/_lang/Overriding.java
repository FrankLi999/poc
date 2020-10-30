package _lang;

public class Overriding {
	public static class Bobcat {	
	    public void findDen() { 
	    	System.out.println("Bobcat, find Den");
	    }
	    
	    public static void myStaticMethod() {
	    	System.out.println("Bobcat, myStaticMethod");
	    }
	}
	
	
	public static class BobcatKitten extends Bobcat {
		public void findDen() { 
	    	System.out.println("BobcatKitten, find Den");
		}
		
		public void findDen(boolean b) { 
			System.out.println("BobcatKitten, find Den - " + b);
		}
		
		public int findden() throws Exception { 
			System.out.println("BobcatKitten, find Den - return 0.");
			return 0; 
		}
		
		public static void myStaticMethod() {
	    	System.out.println("BobcatKitten, myStaticMethod");
	    }
	}

	@SuppressWarnings("static-access")
	public void testOverriding() {
		Bobcat bobcat = new Bobcat();
		bobcat.findDen();
		bobcat.myStaticMethod();
		BobcatKitten bobcatKitten = new BobcatKitten();
		bobcatKitten.findDen();
		bobcatKitten.myStaticMethod();
		Bobcat bobcatKitten1 = bobcatKitten;
		bobcatKitten1.myStaticMethod();
	}
	
	public static void main(String argc[]) {
		Overriding overriding = new Overriding();
		overriding.testOverriding();
	}
}
