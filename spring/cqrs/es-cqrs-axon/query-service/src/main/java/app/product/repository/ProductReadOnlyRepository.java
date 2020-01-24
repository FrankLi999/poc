package app.product.repository;

import app.repo.ReadOnlyRepository;
import app.product.entity.ProductEntity;

public interface ProductReadOnlyRepository extends ReadOnlyRepository<ProductEntity, String> {
}
