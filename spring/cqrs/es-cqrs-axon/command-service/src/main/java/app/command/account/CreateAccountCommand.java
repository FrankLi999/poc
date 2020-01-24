package app.command.account;

public class CreateAccountCommand extends AbstractAccountCommand<String> {
    private final String creator;

    public CreateAccountCommand(String id, String creator) {
        super(id);
        this.creator = creator;
    }

    public String getCreator() {
        return creator;
    }

    @Override
    public String toString() {
        return "CreateAccountCommand{" +
                "id='" + super.identifier()+ '\'' +
                ", creator='" + creator + '\'' +
                '}';
    }
}
