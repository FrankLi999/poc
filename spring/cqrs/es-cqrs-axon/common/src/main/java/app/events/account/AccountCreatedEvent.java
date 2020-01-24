package app.events.account;

import app.events.AbstractEvent;

public class AccountCreatedEvent extends AbstractEvent {
    private final String accountCreator;
    private final double balance;

    public AccountCreatedEvent(String id, String accountCreator, double balance) {
        super(id);
        this.accountCreator = accountCreator;
        this.balance = balance;
    }

    public String getAccountCreator() {
        return accountCreator;
    }

    public double getBalance() {
        return balance;
    }

    @Override
    public String toString() {
        return "AccountCreatedEvent{" +
                "id='" + super.getId() + '\'' +
                ", accountCreator='" + accountCreator + '\'' +
                ", balance=" + balance +
                '}';
    }
}
