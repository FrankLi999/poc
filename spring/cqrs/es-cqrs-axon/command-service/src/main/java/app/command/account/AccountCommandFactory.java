package app.command.account;

public enum AccountCommandFactory {
    INSTANCE;

    public AbstractAccountCommand<String> newCreateAccountCommand(String id, String creator) {
        return new CreateAccountCommand(id, creator);
    }

    public AbstractAccountCommand<String> newCloseAccountCommand(String id) {
        return new CloseAccountCommand(id);
    }

    public AbstractAccountCommand<String> newDepositMoneyCommand(String id, double amount) {
        return new DepositMoneyCommand(id, amount);
    }
    public AbstractAccountCommand<String> newWithdrawMoneyCommand(String id, double amount) {
        return new WithdrawMoneyCommand(id, amount);
    }
}
