package creator.patterns.prototype;

abstract class Color implements Cloneable {

	protected String colorName;

	abstract void addColor();

	public Object clone() {
		Object clone = null;
		try {
			clone = super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return clone;
	}
}

class blueColor extends Color {
	public blueColor() {
		this.colorName = "blue";
	}

	@Override
	void addColor() {
		System.out.println("Blue color added");
	}
}

class blackColor extends Color {

	public blackColor() {
		this.colorName = "black";
	}

	@Override
	void addColor() {
		System.out.println("Black color added");
	}
}


