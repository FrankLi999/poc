package app.events;

import java.io.Serializable;

public class AbstractEvent implements Serializable {
    private final String id;

    public AbstractEvent(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
