package io.spring.resource.favorite;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ArticleFavoriteRepository extends CrudRepository<Favorite, FavoriteId> {
    //void save(Favorite articleFavorite);

    //Optional<Favorite> find(String articleId, String userId);

    //void remove(Favorite favorite);
	@Query("SELECT COUNT(u) FROM Favorite f WHERE f.id.articleId= :articleId")
	int countByArticleId(@Param("articleId") Long articleId);
	
	@Query("SELECT a.id FROM Article a LEFT JOIN Favorite f ON a.id = f.id.articleId AND f.id.userId = :userId WHERE a.id in :ids")
	Set<Long> userFavorites(@Param("ids") List<Long> ids, @Param("userId") Long userId);
}
