package app.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface WriteOnlyRepository<T, ID extends Serializable> extends MongoRepository<T, ID> {
    @Override
    <S extends T> List<S> saveAll(Iterable<S> entities);

    @Override
    <S extends T> S save(S entity);

    @Override
    void deleteById(ID id);

    @Override
    void delete(T entity);

    @Override
    void deleteAll(Iterable<? extends T> entities);
}