package io.spring.resource.comment;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.joda.time.DateTime;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "comments")
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "id")
public class Comment {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // @Setter(AccessLevel.PROTECTED)
    private Long id;
	
	@Column(name="user_id")
    private Long userId;
	
	@Column(name="body", columnDefinition="text")
    private String body;
    
    @Column(name="article_id")
    private Long articleId;
    
    @Column(name="created_at", nullable=false, columnDefinition="TIMESTAMP NOT NULL")
    private DateTime createdAt;

    public Comment(String body, Long userId, Long articleId) {
        this.body = body;
        this.userId = userId;
        this.articleId = articleId;
        this.createdAt = new DateTime();
    }
}
