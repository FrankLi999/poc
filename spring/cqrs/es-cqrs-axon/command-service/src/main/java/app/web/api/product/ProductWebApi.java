package app.web.api.product;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.concurrent.CompletableFuture;

@RequestMapping(value = "/products")
public interface ProductWebApi {
    @PostMapping
    CompletableFuture<String> addProduct(@RequestBody AddProductRequest addProductRequest);
}
