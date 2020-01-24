package app.command.account;

public class WithdrawMoneyCommand extends AbstractAccountCommand<String> {
    private final double amount;

    WithdrawMoneyCommand(String id, double amount) {
        super(id);
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }

    @Override
    public String toString() {
        return "WithdrawMoneyCommand{" +
                "id='" + super.identifier() + '\'' +
                ", amount=" + amount +
                '}';
    }
}
