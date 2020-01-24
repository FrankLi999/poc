package app.events.product;

import app.events.AbstractEvent;

public class ProductSaleableEvent extends AbstractEvent {
    public ProductSaleableEvent(String id) {
        super(id);
    }
}
