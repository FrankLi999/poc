package app.events.product;

import app.events.AbstractEvent;

public class ProductUnsaleableEvent extends AbstractEvent {
    public ProductUnsaleableEvent(String id) {
        super(id);
    }
}
