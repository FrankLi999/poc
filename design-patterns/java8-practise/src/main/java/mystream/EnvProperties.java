package mystream;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.IdentityHashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.Properties;
import java.util.Stack;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.Vector;
import java.util.WeakHashMap;

public class EnvProperties {
	enum AAA {
		a,
		b,
		c
		
	}
	public static void main (String[] args) {
		ArrayList<String> l = new ArrayList<>();
		l.add(null);
		
		LinkedList<String> l1 = new LinkedList<>();
		l1.add(null);
		
		Vector v = new Vector();
		v.add(null);
		
		Stack<String> s = new Stack();
		s.push(null);
		
		HashSet<String> stack = new HashSet<>();
		stack.add(null);
		
		LinkedHashSet<String> s1 = new LinkedHashSet<>();
		s1.add(null);
		TreeSet<String> s2 = new TreeSet<>();
		// s2.add(null);
		
		 
		
		
		EnumSet<AAA> s3 = EnumSet.of(AAA.a);
		s3.add(AAA.b);
		
		System.out.println("set size:" + s3.size());
		
		LinkedHashMap<String, String> m = new LinkedHashMap<>();
		m.put("a", null);
		m.put(null, null);
		m.put(null, "a");

		HashMap<String, String> m1 = new HashMap<>();
		m1.put("a", null);
		m1.put(null, null);
		m1.put(null, "a");
		
		WeakHashMap<String, String> m11 = new WeakHashMap<>();
		m11.put("a", null);
		m11.put(null, null);
		m11.put(null, "a");
		
		
		TreeMap<String, String> m2 = new TreeMap<>();
		m2.put("a", null);
		//m2.put(null, null);
		//m2.put(null, "a");
		
		EnumMap<AAA, String> m3 = new EnumMap<>(AAA.class);
		m3.put(AAA.a, null);
		// m3.put(null, "xxx");
		
		IdentityHashMap<String, String> m4 = new IdentityHashMap<>();
		m4.put("xxx", null);
		m4.put(null, "xxx");
		
		Hashtable m5 = new Hashtable();
		
		// m5.put("xxx", null);
		// m5.put(null, "xxx");
		
		Map<String, String> env = System.getenv();
        for (String envName : env.keySet()) {
            System.out.format("%s=%s%n",
                              envName,
                              env.get(envName));
        }
        
        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        Properties properties = System.getProperties();
        for (Object keyName : properties.keySet()) {
            System.out.format("%s=%s%n",
            		keyName,
                             properties.get(keyName));
        }
    }
}
