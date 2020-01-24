package io.spring.resource.comment;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface  CommentRepository extends CrudRepository<Comment, Integer> {
    //void save(Comment comment);

    Optional<Comment> findByArticleIdAndId(Long articleId, Long id);

    // void remove(Comment comment);
}
