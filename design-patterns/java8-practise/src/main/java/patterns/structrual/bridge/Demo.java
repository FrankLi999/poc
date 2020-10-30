package patterns.structrual.bridge;
/**
 * Bridge is a structural design pattern that divides business logic or huge class into separate 
 * class hierarchies that can be developed independently.
 * 
 * Such as Device and RemoteControl interact via interfaces.
 * @author frank
 *
 */
public class Demo {

	public static void main(String[] args) {
		testDevice(new Tv());
		testDevice(new Radio());
	}

	public static void testDevice(Device device) {
		System.out.println("Tests with basic remote.");
		BasicRemote basicRemote = new BasicRemote(device);
		basicRemote.power();
		device.printStatus();

		System.out.println("Tests with advanced remote.");
		AdvancedRemote advancedRemote = new AdvancedRemote(device);
		advancedRemote.power();
		advancedRemote.mute();
		device.printStatus();
	}
}