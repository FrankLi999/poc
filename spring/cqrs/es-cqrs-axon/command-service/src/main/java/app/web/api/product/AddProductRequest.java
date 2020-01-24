package app.web.api.product;

public class AddProductRequest {
    private String name;

    public AddProductRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "AddProductRequest{" +
                "name='" + name + '\'' +
                '}';
    }
}
