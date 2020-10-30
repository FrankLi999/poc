package patterns.behavior.mediator;

public class SmartHomeController implements SmartHomeMediator {
    private final SmartControl smartControl;
    private final AirConditioner airConditioner;
    private final Fan fan;
    public SmartHomeController(SmartControl smartControl, AirConditioner airConditioner, Fan fan) {
        this.smartControl = smartControl;
        this.airConditioner = airConditioner;
        this.fan = fan;
    }
    @Override
    public void changed(HomeComponent changedHomeComponent) {
        if (changedHomeComponent == smartControl && smartControl.isSmartControlOn()) {
            if (airConditioner.isOn() && fan.isOn()) {
                //Turn off fan if both AC and fan are on
                fan.off();
            }
        } else {
            if (smartControl.isSmartControlOn()) {
                if (changedHomeComponent == airConditioner && airConditioner.isOn() && fan.isOn()) {
                    /*
                    Smart control is ON
                    AC has been been turned on now
                    Switch off the fan
                     */
                    fan.off();
                } else if (airConditioner.isOn() && fan.isOn()) { //changedHomeComponent is fan
                    /*
                    Smart control is ON
                    Fan has been been turned on now
                    Switch off the AC
                     */
                    airConditioner.off();
                }
            }
        }
    }
}