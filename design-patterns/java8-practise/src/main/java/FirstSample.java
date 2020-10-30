import java.util.Arrays;

public abstract class FirstSample
{	
   public static final String aaa = "first";
   
   public static String getAaa() throws Exception {
	   return aaa;
   }
   
   abstract String xxxx() throws Exception;
   
   public static void main(String[] args) throws Exception
   {
	   System.out.println(FirstSample.aaa);
	   System.out.println(FirstSample.getAaa());
	   
      System.out.println("We will not use 'Hello, World!'");
      char a = '1';
      long l = a;
      int i = a;
      System.out.println(l);
      System.out.println(i);
      
      float f = i;
      double d = l;
      
      System.out.println(f);
      System.out.println(d);
      byte s1 = 0b0100_0100;
      byte s2 = (byte)1100_0100;
      byte s3 = (byte)1000_0000;
      System.out.println(s1);
      System.out.println(s2);
      System.out.println(s3);
      
      System.out.println(Integer.toBinaryString(-60));
      System.out.println(0b01111111111111111111111111000100);
      System.out.println(0b11111111111111111111111111000100);
      System.out.println(0b10000000000000000000000000000000);

      int arr[] = new int[] {2, 3, 5, 7, 11, 13};
      System.out.println(Arrays.toString(arr));
   }
}