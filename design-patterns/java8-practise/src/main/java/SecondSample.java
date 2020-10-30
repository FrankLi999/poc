import java.io.IOException;

public class SecondSample extends FirstSample {
	   public static final String aaa = "second";
	   
	   protected String xxxx() throws IOException {
		   return aaa;
	   }
	   
	   public static String getAaa() throws IOException {
		   return aaa;
	   }
	   
	   public static String getFirstAaa() {
		   return FirstSample.aaa;
	   }
	   
	   public static String getSecondAaa() {
		   return SecondSample.aaa;
	   }
	   
	   public static void updateStr(String str) {
		   str += " xxx";
		   System.out.println(str);
	   }
	   
	   public static void updateEmployee(Employee e) {
		   e.aaa += " xxx";
		   System.out.println(e.aaa);
	   }
	   
	   public static void main(String[] argc) throws Exception {
		   System.out.println(FirstSample.aaa);
		   System.out.println(FirstSample.getAaa());
		   
		   System.out.println(SecondSample.aaa);
		   System.out.println(SecondSample.getAaa());
		   
		   System.out.println(SecondSample.getFirstAaa());
		   System.out.println(SecondSample.getSecondAaa());
		   
		   FirstSample ss = new SecondSample();
		   System.out.println(">>>>>>>>>" + ss.aaa);
		   System.out.println(">>>>>>>>>" + ss.getAaa());
		   
		   SecondSample sss = new SecondSample();
		   System.out.println(">>>>-->>>>>" + sss.aaa);
		   System.out.println(">>>>--->>>>>" + sss.getAaa());
		   
		   System.out.println(aaa);
		   System.out.println(getAaa());
		   
		   String str = "aaa";
		   System.out.println(str);
		   updateStr(str);
		   System.out.println(str);
		
		   Employee eee = new Employee();
		   eee.aaa = "aaa";
		   System.out.println(eee.aaa);
		   System.out.println(eee.bbb);
		   updateEmployee(eee);
		   System.out.println(eee.aaa);
	   }
}
