package de.jonashackt.springbootvuejs;

public class Greeting {

    private String content;
    private String invokeId;

    public Greeting() {
    }

    public Greeting(String content, String invokeId) {
        this.content = content;
        this.invokeId = invokeId;
    }

    public String getContent() {
        return content;
    }

    public String getInvokeId() {
        return invokeId;
    }
     
    public void setInvokeId(String invokeId) {
        this.invokeId = invokeId;
    }
}