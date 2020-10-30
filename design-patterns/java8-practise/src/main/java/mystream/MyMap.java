package mystream;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

public class MyMap {
	public static void main(String argc[]) {
		LinkedHashMap<String, String> m = new LinkedHashMap<>();
		Map<String, String> m2 = new HashMap<>();
		Map<String, String> m3 = new TreeMap<>();
		m.put("v1", "44");
		
		m.put("m3", "22");
		m.put("k2", "33");
		m.put("y4", "11");
		for (String k: m.keySet()) {
			System.out.println("key:" + k);
		}
		
		for (String v: m.values()) {
			System.out.println("v:" + v);
		}

		for (Map.Entry<String, String> e: m.entrySet()) {
			System.out.println("kv:" + e.getKey());
			System.out.println("ev:" + e.getValue());
		}
		System.out.println("+++++++++++++++++++++++++++");
		m.put("k2", "8888");
		for (String k: m.keySet()) {
			System.out.println("key:" + k);
		}
		
		for (String v: m.values()) {
			System.out.println("v:" + v);
		}

		for (Map.Entry<String, String> e: m.entrySet()) {
			System.out.println("kv:" + e.getKey());
			System.out.println("ev:" + e.getValue());
		}
		System.out.println("+++++++++++++++++++++++++++");
		
		System.out.println(136&23456);
		System.out.println(23456%126);
		
		System.out.println(126<<1);
		System.out.println(126>>1);
		System.out.println(126>>>1);
		System.out.println(-2>>1); //111111
		System.out.println(-2>>>1); //0xxxxx
		System.out.println(-126>>>1); //0xxxxxxxxx
	}
}
