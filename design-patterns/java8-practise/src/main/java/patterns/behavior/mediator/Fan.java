package patterns.behavior.mediator;

public class Fan implements HomeComponent {
    private int level;
    private SmartHomeMediator smartHomeMediator;
    @Override
    public void on() {
        System.out.println("Turning on the fan");
        level = 1;
        smartHomeMediator.changed(this);
    }
    @Override
    public void off() {
        System.out.println("Turning off the fan");
        level = 0;
        smartHomeMediator.changed(this);
    }
    @Override
    public boolean isOn() {
        return this.level != 0;
    }
    public void adjustLevel(int level) {
        this.level = level;
    }
    public void setSmartHomeMediator(SmartHomeMediator smartHomeMediator) {
        this.smartHomeMediator = smartHomeMediator;
    }
}