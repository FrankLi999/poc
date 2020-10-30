package _lang;

public class AnonymousClass {
	
	public int intValue = 1;
	interface HelloWorld {
        public void greet();
        public void greetSomeone(String someone);
    }
  
    public void sayHello(int paramValue) {
        //local class
        class EnglishGreeting implements HelloWorld {
            String name = "world";
            public void greet() {
                greetSomeone("world");
            }
            public void greetSomeone(String someone) {
            	intValue = 7;
            	//method argument has to be effective final
            	//paramValue = 7; 
                name = someone;
                System.out.println("Hello " + name + ", outer intValue:" + intValue + ", param intValue:" + paramValue);
            }
        }
      
        HelloWorld englishGreeting = new EnglishGreeting();
        
        //Anonymous class
        HelloWorld frenchGreeting = new HelloWorld() {
            String name = "tout le monde";
            public void greet() {
                greetSomeone("tout le monde");
            }
            public void greetSomeone(String someone) {
            	intValue = 6;
            	// method argument has to be effective final
            	// paramValue = 6;
                name = someone;
                System.out.println("Salut " + name + ", outer intValue:" + intValue + ", param intValue:" + paramValue);
            }
        };
        
        //Anonymous class
        HelloWorld spanishGreeting = new HelloWorld() {
        	// static member is not allowed
        	// static String statcString = "";
            String name = "mundo";
        
            
            public void greet() {
                greetSomeone("mundo");
            }
            
            public void greetSomeone(String someone) {
                intValue = 5;
                // method argument has to be effective final
            	// paramValue = 5;
                name = someone;
                System.out.println("Hola, " + name + ", outer intValue:" + intValue + ", param intValue:" + paramValue);
            }
        };
        englishGreeting.greet();
        frenchGreeting.greetSomeone("Fred");
        spanishGreeting.greet();
    }

    public static void main(String... args) {
        AnonymousClass myApp = new AnonymousClass();
        myApp.sayHello(2);
    }            
}