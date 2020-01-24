package io.spring.service.data.jpa;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.spring.dto.ArticleFavoriteCount;
import io.spring.resource.favorite.ArticleFavoriteRepository;
import io.spring.resource.favorite.FavoriteId;
import io.spring.resource.user.User;

@Service
public class ArticleFavoritesReadService {
	private ArticleFavoriteRepository articleFavoriteRepository;
	@Autowired
    public ArticleFavoritesReadService(ArticleFavoriteRepository articleFavoriteRepository) {
        this.articleFavoriteRepository = articleFavoriteRepository;
    }
	
    public boolean isUserFavorite(Long userId, Long articleId) {
    	return articleFavoriteRepository.findById(new FavoriteId(userId, articleId)).isPresent();
    }

    public int articleFavoriteCount(Long articleId) {
    	return articleFavoriteRepository.countByArticleId(articleId);
    }

    public List<ArticleFavoriteCount> articlesFavoriteCount(List<Long> ids) {
    	List<ArticleFavoriteCount> counts = ids.stream().map(articleId -> this.getFavoriteCount(articleId)).collect(Collectors.toList());
    	return counts;
    }

    public Set<Long> userFavorites(List<Long> ids, User currentUser) {
    	return articleFavoriteRepository.userFavorites(ids, currentUser.getId());
    }
    
    private ArticleFavoriteCount getFavoriteCount(Long articleId) {
    	int articleCount = articleFavoriteRepository.countByArticleId(articleId);
    	return new ArticleFavoriteCount(articleId, articleCount);
    }
}
