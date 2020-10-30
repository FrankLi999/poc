package patterns.structrual.adapter;


public class AdapterPatternDemo {
    
    public static void main(String args[]) {
    	Movable bugattiVeyron = new BugattiVeyron();
    	MovableAdapter bugattiVeyronAdapter = new MovableAdapterImpl(bugattiVeyron);
    	System.out.println("Bugatti Veyron Super Sport's top speed is " + bugattiVeyronAdapter.getSpeed() + " Kmph.");

        Movable mcLaren = new McLaren();
        MovableAdapter mcLarenAdapter = new MovableAdapterImpl(mcLaren);
        System.out.println("McLaren F1 top speed is " + mcLarenAdapter.getSpeed() + " Kmph.");

        Movable astonMartin = new AstonMartin();
        MovableAdapter astonMartinAdapter = new MovableAdapterImpl(astonMartin);
        System.out.println("McLaren F1 top speed is " + astonMartinAdapter.getSpeed() + " Kmph.");
    }
}