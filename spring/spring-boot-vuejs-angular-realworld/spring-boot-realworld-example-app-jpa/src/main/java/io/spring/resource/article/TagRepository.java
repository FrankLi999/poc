package io.spring.resource.article;

import java.util.Collection;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataAccessException;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

public interface TagRepository extends Repository<Tag, Integer> {
	/**
     * Retrieve all <code>Vet</code>s from the data store.
     *
     * @return a <code>Collection</code> of <code>Vet</code>s
     */
    @Transactional(readOnly = true)
    @Cacheable("tags")
    Collection<Tag> findAll() throws DataAccessException;
}
