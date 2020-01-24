package com.concretepage.service;

import java.util.List;

import com.concretepage.entity.Article;

public interface IArticleService {
     List<Article> getAllArticles();
     Article getArticleById(long articleId);
     Article addArticle(Article article);
     Article updateArticle(Article article);
     void deleteArticle(long articleId);
}
