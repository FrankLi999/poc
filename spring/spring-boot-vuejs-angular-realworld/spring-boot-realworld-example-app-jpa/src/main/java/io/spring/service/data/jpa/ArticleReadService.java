package io.spring.service.data.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.spring.dto.ArticleData;
import io.spring.resource.article.Article;
import io.spring.resource.article.ArticleRepository;
import io.spring.service.application.Page;

@Service
public class ArticleReadService {
	private ArticleRepository articleRepository;
	@Autowired
    public ArticleReadService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }
	
    public ArticleData findById(Long id) {
        Optional<Article> article = this.articleRepository.findById(id);
        return null;
    }

    public ArticleData findBySlug(String slug) {
    	return null;
    }

    public List<Long> queryArticles(String tag, String author, String favoritedBy, Page page) {
    	return null;
    }

    public int countArticle(String tag, String author, String favoritedBy) {
    	return 0;
    }

    public List<ArticleData> findArticles(List<Long> articleIds) {
    	return null;
    }

    public List<ArticleData> findArticlesOfAuthors(List<Long> authors, Page page) {
    	return null;
    }

    public int countFeedSize(List<Long> authors) {
    	return 0;
    }
}
