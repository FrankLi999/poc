package app.product.handler;

import app.events.product.ProductAddedEvent;
import app.product.entity.ProductEntity;
import app.product.repository.ProductWriteOnlyRepository;
import org.axonframework.config.ProcessingGroup;
import org.axonframework.eventhandling.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@ProcessingGroup("productEvents")
public class ProductEventHandler {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final ProductWriteOnlyRepository repository;

    public ProductEventHandler(ProductWriteOnlyRepository repository) {
        this.repository = repository;
    }

    @EventHandler
    public void on(ProductAddedEvent event) {
        ProductEntity createdProduct = repository.save(new ProductEntity(
                event.getId(),
                event.getName()
        ));

        logger.info("Product {} is saved", createdProduct);
    }
}
