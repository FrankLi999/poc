package creator.patterns.prototype;

import java.util.HashMap;
import java.util.Map;

class ColorStore {
	private static Map<String, Color> colorMap = new HashMap<String, Color>();
	static {
		colorMap.put("blue", new blueColor());
		colorMap.put("black", new blackColor());
	}

	public static Color getColor(String colorName) {
		return (Color) colorMap.get(colorName).clone();
	}
}