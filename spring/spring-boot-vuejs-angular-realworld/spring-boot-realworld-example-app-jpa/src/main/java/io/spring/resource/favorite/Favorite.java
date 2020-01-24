package io.spring.resource.favorite;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "article_favorites")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Favorite implements Serializable {
	private static final long serialVersionUID = 5955224679949221504L;

//  private Long articleId;
//  private Long userId;

//    public Favorite(Long articleId, Long userId) {
//        this.articleId = articleId;
//        this.userId = userId;
//    }
	@EmbeddedId
    private FavoriteId id;
}
