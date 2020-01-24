package io.spring.resource.favorite;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@EqualsAndHashCode
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

//@EqualsAndHashCode
//@Getter
//@Setter
//@AllArgsConstructor
public class FavoriteId implements Serializable {
	private static final long serialVersionUID = -6650268684285557916L;

	// @Id
	@Column(name="article_id")
    private Long articleId;
	
	// @Id
	@Column(name="user_id")
    private Long userId;
}
