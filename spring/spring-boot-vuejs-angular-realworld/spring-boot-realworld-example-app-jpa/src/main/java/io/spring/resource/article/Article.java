package io.spring.resource.article;
import static java.util.stream.Collectors.toSet;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
// import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.joda.time.DateTime;

// import lombok.NoArgsConstructor;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "articles")
// @Getter @Setter @NoArgsConstructor
// @ToString(exclude = {"tags"})
@ToString
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Article implements Serializable {
    private static final long serialVersionUID = 5928750140269963691L;
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // @Setter(AccessLevel.PROTECTED)
    private Long id;
	
	@Column(name="user_id")
	private Long userId;
	
	@Column(name="slug", length=255, unique=true)
    private String slug;
	
	@Column(name="title", length=255)
    private String title;
	
	@Column(name="description", columnDefinition="text")
    private String description; //text
	
	@Column(name="body", columnDefinition="text")
	// @Column(name="body", columnDefinition="CLOB")
	// @Lob
	// Consider class PGSQLMapDialect extends PostgreSQL9Dialect
	private String body; //text
    
	@ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "article_tags", joinColumns = @JoinColumn(name = "article_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    private Set<Tag> tags;
    
	@Column(name="created_at", nullable=false, columnDefinition="TIMESTAMP NOT NULL")
	// @Temporal(TemporalType.TIMESTAMP)
    private DateTime createdAt;
    @Column(name="updated_at", nullable=false, columnDefinition="TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP")
    // @Temporal(TemporalType.TIMESTAMP)
    private DateTime updatedAt;

    public Article(String title, String description, String body, String[] tagList, Long userId) {
        this(title, description, body, tagList, userId, new DateTime());
    }

    public Article(String title, String description, String body, String[] tagList, Long userId, DateTime createdAt) {
        this.slug = toSlug(title);
        this.title = title;
        this.description = description;
        this.body = body;
        this.tags = Arrays.stream(tagList).collect(toSet()).stream().map(Tag::new).collect(toSet()); // collect(toList());
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
    }

    public void update(String title, String description, String body) {
        if (!"".equals(title)) {
            this.title = title;
            this.slug = toSlug(title);
        }
        if (!"".equals(description)) {
            this.description = description;
        }
        if (!"".equals(body)) {
            this.body = body;
        }
        this.updatedAt = new DateTime();
    }

    private String toSlug(String title) {
        return title.toLowerCase().replaceAll("[\\&|[\\uFE30-\\uFFA0]|\\’|\\”|\\s\\?\\,\\.]+", "-");
    }
}
