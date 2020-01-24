package com.concretepage.repository;

import org.springframework.data.repository.CrudRepository;

import com.concretepage.entity.Article;

public interface ArticleRepository extends CrudRepository<Article, Long>  {
}
