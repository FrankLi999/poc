package app.events.account;

import app.events.AbstractEvent;

public class MoneyDepositedEvent extends AbstractEvent {
    private final double amount;

    public MoneyDepositedEvent(String id, double amount) {
        super(id);
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }
}
