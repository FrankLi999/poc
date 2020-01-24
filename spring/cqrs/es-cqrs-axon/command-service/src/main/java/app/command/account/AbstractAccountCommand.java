package app.command.account;

import org.axonframework.commandhandling.TargetAggregateIdentifier;

public abstract class AbstractAccountCommand<ID> {
    @TargetAggregateIdentifier
    private final ID id;

    AbstractAccountCommand(ID id) {
        this.id = id;
    }

    public ID identifier() {
        return id;
    }
}
