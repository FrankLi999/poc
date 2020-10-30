package patterns.structrual.flyweight;

import java.awt.Color;

/**
 * Use sharing to support large numbers of fine-grained objects efficiently.
The Motif GUI strategy of replacing heavy-weight widgets with light-weight gadgets.
 */
public class FlyweightDemo {


	public static void main( String[] args ) {
		VehicleFactory.createVehicle(Color.WHITE);
		VehicleFactory.createVehicle(Color.YELLOW);
		VehicleFactory.createVehicle(Color.WHITE);
		VehicleFactory.createVehicle(Color.RED);
		VehicleFactory.createVehicle(Color.YELLOW);
		VehicleFactory.createVehicle(Color.RED);
    }
}