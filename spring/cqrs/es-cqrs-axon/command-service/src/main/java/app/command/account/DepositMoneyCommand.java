package app.command.account;

public class DepositMoneyCommand extends AbstractAccountCommand<String> {
    private final double amount;

    DepositMoneyCommand(String id, double amount) {
        super(id);
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }

    @Override
    public String toString() {
        return "DepositMoneyCommand{" +
                "id='" + super.identifier() + '\'' +
                ", amount=" + amount +
                '}';
    }
}
