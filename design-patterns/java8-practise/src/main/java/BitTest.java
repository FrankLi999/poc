import java.util.BitSet;
import java.util.stream.Collectors;

public class BitTest {
	public static void main(String argc[]) {
		BitSet bits1 = new BitSet();
		BitSet bits2 = new BitSet();
		BitSet bits3 = new BitSet();
		BitSet bits4 = new BitSet();
		BitSet bits5 = new BitSet();
		BitSet bits6 = new BitSet();
		BitSet bits7 = new BitSet();
		BitSet bits8 = new BitSet();
		bits2.set(1, 8);
		bits3.set(1, 8);
		bits3.set(1, 8);
		bits4.set(1, 8);
		bits5.set(1, 8);
		bits6.set(1, 8);
		bits7.set(1, 8);
		bits8.set(1, 8);
		bits1.set(1, 8);
		bits1.set(1, false);
		bits1.set(3, false);
		bits1.set(5, false);
		bits1.set(7, false);
		bits2.or(bits1);
		bits3.and(bits1);
		bits4.andNot(bits1);
		bits5.intersects(bits1);
		bits7.xor(bits1);
		bits1.stream().filter(s -> true).peek(s -> {String ss = "peek b:" + s; System.out.println(ss);}).count();
		bits1.stream().forEach(s -> {String ss = "b:" + s; System.out.println(ss);});
		System.out.println("1-" + bits1.size());
		System.out.println("2-" + bits2);
		System.out.println("3-" + bits3);
		System.out.println("4-" + bits4);
		System.out.println("5-" + bits5);
		bits6.clear(3);
		System.out.println("6-" + bits6);
		System.out.println("7-" + bits7);
		bits8.set(3);
		System.out.println("8-" + bits8);
		
		int ibits2 = 0b1000001;
		int ibits1 = 0b1111111;
		ibits2 &= ibits1;
		System.out.printf("ibits2-%b" , Integer.toBinaryString(ibits2));
		
		System.out.println("-+-" + (-16 >> 2));
		System.out.println("---" + (-16 >>> 2));
		System.out.println(16 << 2);
	}
}
