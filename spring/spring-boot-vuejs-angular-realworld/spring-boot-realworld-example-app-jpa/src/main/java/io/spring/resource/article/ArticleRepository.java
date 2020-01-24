package io.spring.resource.article;

import java.util.Collection;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataAccessException;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ArticleRepository extends CrudRepository<Article, Long> {

    // Article save(Article article);

    // Optional<Article> findById(Integer id);

    Optional<Article> findBySlug(String slug);

    @Transactional(readOnly = true)
    @Cacheable("articles")
    Collection<Article> findAll() throws DataAccessException;
    // void remove(Article article); // use delete(article)
}
