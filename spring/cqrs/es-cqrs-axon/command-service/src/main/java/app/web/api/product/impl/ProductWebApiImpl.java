package app.web.api.product.impl;

import app.command.product.ProductCommandFactory;
import app.web.api.product.AddProductRequest;
import app.web.api.product.ProductWebApi;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@RestController
public class ProductWebApiImpl implements ProductWebApi {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final CommandGateway commandGateway;
    private final ProductCommandFactory commandFactory = ProductCommandFactory.INSTANCE;

    public ProductWebApiImpl(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @Override
    public CompletableFuture<String> addProduct(AddProductRequest newProduct) {
        String productId = UUID.randomUUID().toString();
        Assert.hasLength(newProduct.getName(), "Missing product name");

        CompletableFuture<String> completableFuture = CompletableFuture.supplyAsync(() ->
                commandGateway.sendAndWait(commandFactory.newAddProductCommand(productId, newProduct.getName()))
        );
        return completableFuture
                .thenApply(s -> s)
                .exceptionally((e) -> {
                    logger.warn("Add product {} failed", newProduct);
                    throw new RuntimeException(String.format("Add product %s failed because of %s ", newProduct, e.getMessage()), e);
                });
    }
}
