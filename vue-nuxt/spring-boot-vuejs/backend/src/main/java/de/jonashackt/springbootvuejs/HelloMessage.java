package de.jonashackt.springbootvuejs;

public class HelloMessage {

    private String name;
    private String invokeId;

    public HelloMessage() {
    }

    public HelloMessage(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getInvokeId() {
        return invokeId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setInvokeId(String invokeId) {
        this.invokeId = invokeId;
    }
}