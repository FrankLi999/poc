package app.product.repository;

import app.product.entity.ProductEntity;
import app.repo.WriteOnlyRepository;

public interface ProductWriteOnlyRepository extends WriteOnlyRepository<ProductEntity, String> {
}
