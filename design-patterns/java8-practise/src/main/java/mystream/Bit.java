package mystream;

import java.util.BitSet;

public class Bit {
	public static void main(String[] args) {
		// Constructors of BitSet class
		BitSet bs1 = new BitSet();
		BitSet bs2 = new BitSet(6);

		/*
		 * set is BitSet class method expalined in next articles
		 */
		bs1.set(0);
		bs1.set(1);
		bs1.set(2);
		bs1.set(4);
		System.out.println("bs1 length  : " + bs1.length());
		System.out.println("bs1 at 0 : " + bs1.get(0));
		System.out.println("bs1 at 1 : " + bs1.get(1));
		System.out.println("bs1 at 2 : " + bs1.get(2));
		System.out.println("bs1 at 3 : " + bs1.get(3));
		System.out.println("bs1 at 4: " + bs1.get(4));
		// assign values to bs2
		bs2.set(4);
		bs2.set(6);
		bs2.set(5);
		bs2.set(1);
		bs2.set(2);
		bs2.set(3);
		System.out.println("bs2 length  : " + bs2.length());
		System.out.println("bs2 at 0 : " + bs2.get(0));
		System.out.println("bs2 at 1 : " + bs2.get(1));
		System.out.println("bs2 at 2 : " + bs2.get(2));
		System.out.println("bs2 at 3 : " + bs2.get(3));
		System.out.println("bs2 at 4: " + bs2.get(4));
		System.out.println("bs2 at 5 : " + bs2.get(5));
		System.out.println("bs2 at 6 : " + bs2.get(6));

		// Printing the 2 Bitsets
		System.out.println("bs1  : " + bs1);
		System.out.println("bs2  : " + bs2);
		
		Integer y = Integer.valueOf(12);
		y++;
		int z = y;
		System.out.println("y=" + y.getClass().isPrimitive());
		System.out.println("y=" + (z == y));
		
		int x1 = 12;
		
	
		Integer x2 = Integer.valueOf(x1);
		Integer x3 = Integer.valueOf(12);
		Integer x5 = Integer.valueOf(12);
		Integer x4 = Integer.valueOf(x1);
		System.out.println("x1 == x2:" + (x1 == x2));
		System.out.println("x3 == x2:" + (x3 == x2));
		System.out.println("x2 == x4:" + (x2 == x4));
		System.out.println("x3 == x5:" + (x3 == x5));
		System.out.println("x2 == x4:" + (x2 == x4));
		Integer m1 = Integer.valueOf(12);
		Integer m2 = Integer.valueOf(12);
		System.out.println(m1 == m2);
		x1++;
		Integer n1 = 12;
		Integer n2 = 12;
		System.out.println("n1 == n2:" + (n1 == n2));
		
		long nl = 12l;
		int ni = 12;
		System.out.println("Long =12= x4:" + (Long.valueOf(12L) == Long.valueOf(12L)));
		System.out.println("Long =121= x4:" + (Long.valueOf(12L) == Long.valueOf(nl)));
		System.out.println("int =121= x4:" + (Integer.valueOf(12) == Integer.valueOf(ni)));
		Long nl1 = 12l;
		Long nl2 = 12l;
		System.out.println("nl1 == nl2:" + (nl1 == nl2));
		
		Long nl3 = new Long(12l);
		Long nl4 = new Long(12l);
		System.out.println("nl3 == nl4:" + (nl3 == nl4));
		
		long l1 = 12L;
		Long l2 = Long.valueOf(l1);
		Long l3 = Long.valueOf(12L);
		
		System.out.println(l1 == l2);
		System.out.println(l1 == l3);
		System.out.println(l2 == l3);
		
	}
}