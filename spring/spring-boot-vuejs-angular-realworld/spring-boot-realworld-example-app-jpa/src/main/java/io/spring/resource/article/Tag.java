package io.spring.resource.article;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tags")
// @Data
@Getter @NoArgsConstructor
// @NoArgsConstructor
@EqualsAndHashCode(of = "name")
public class Tag implements Serializable {
    private static final long serialVersionUID = 1678671243507931747L;
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // @Setter(AccessLevel.PROTECTED)
    private Long id;
	@Column(name="name", length=255)
    private String name;
    
    // @ManyToMany(mappedBy = "tags")
    // private Set<Article> articles;
    public Tag(String name) {
        // this.id = UUID.randomUUID().toString();
        this.name = name;
    }
}
