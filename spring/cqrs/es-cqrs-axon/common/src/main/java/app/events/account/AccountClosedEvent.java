package app.events.account;

import app.events.AbstractEvent;

public class AccountClosedEvent extends AbstractEvent {
    public AccountClosedEvent(String id) {
        super(id);
    }
}
