package app.aggregate.account;

import app.command.account.CloseAccountCommand;
import app.command.account.CreateAccountCommand;
import app.command.account.DepositMoneyCommand;
import app.command.account.WithdrawMoneyCommand;
import app.events.account.AccountClosedEvent;
import app.events.account.AccountCreatedEvent;
import app.events.account.MoneyDepositedEvent;
import app.events.account.MoneyWithdrawnEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.commandhandling.model.AggregateIdentifier;
import org.axonframework.commandhandling.model.AggregateLifecycle;
import org.axonframework.commandhandling.model.AggregateRoot;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.util.Assert;

import java.io.Serializable;
import java.util.UUID;

@Aggregate
public class AccountAggregate implements Serializable{
    private static final long serialVersionUID = 1L;

    @AggregateIdentifier
    private String id;

    private double balance;
    private String owner;

    public AccountAggregate() {
    }

    @CommandHandler
    public AccountAggregate(CreateAccountCommand command) {
        String id = command.identifier();
        String creator = command.getCreator();

        Assert.hasLength(id, "Missing id");
        Assert.hasLength(creator, "Missing account creator");

        AggregateLifecycle.apply(new AccountCreatedEvent(id, creator, 0));
    }

    @EventSourcingHandler
    protected void on(AccountCreatedEvent event) {
        this.id = event.getId();
        this.owner = event.getAccountCreator();
        this.balance = event.getBalance();
    }

    @CommandHandler
    protected void handle(CloseAccountCommand command) {
        AggregateLifecycle.apply(new AccountClosedEvent(id));
    }

    @EventSourcingHandler
    protected void on(AccountClosedEvent event) {
        AggregateLifecycle.markDeleted();
    }

    @CommandHandler
    protected void  handle(DepositMoneyCommand command) {
        Assert.isTrue(command.getAmount() > 0.0, "Deposit must be a positive number.");
        AggregateLifecycle.apply(new MoneyDepositedEvent(id, command.getAmount()));
    }

    @EventSourcingHandler
    protected void on(MoneyDepositedEvent event) {
        this.balance += event.getAmount();
    }

    @CommandHandler
    protected void handle(WithdrawMoneyCommand command) {
        Assert.isTrue(command.getAmount() > 0.0, "Deposit must be a positive number.");
        if (balance - command.getAmount() <  0) {
            throw new InsufficientBalanceException(String.format("Account: %s has insufficient balance", id));
        }
        AggregateLifecycle.apply(new MoneyWithdrawnEvent(id, command.getAmount()));
    }

    @EventSourcingHandler
    protected void on(MoneyWithdrawnEvent event) {
        this.balance -= event.getAmount();
    }

    public String getId() {
        return id;
    }

    public double getBalance() {
        return balance;
    }

    public String getOwner() {
        return owner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AccountAggregate that = (AccountAggregate) o;

        return id != null ? id.equals(that.id) : that.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "BankAccount{" +
                "id='" + id + '\'' +
                ", balance=" + balance +
                ", owner='" + owner + '\'' +
                '}';
    }

    public class InsufficientBalanceException extends RuntimeException {
        public InsufficientBalanceException(String message) {
            super(message);
        }
    }
}
