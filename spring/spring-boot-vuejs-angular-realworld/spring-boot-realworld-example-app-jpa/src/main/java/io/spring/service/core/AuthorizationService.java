package io.spring.service.core;

import io.spring.resource.article.Article;
import io.spring.resource.comment.Comment;
import io.spring.resource.user.User;

public class AuthorizationService {
    public static boolean canWriteArticle(User user, Article article) {
        return user.getId().equals(article.getUserId());
    }

    public static boolean canWriteComment(User user, Article article, Comment comment) {
        return user.getId().equals(article.getUserId()) || user.getId().equals(comment.getUserId());
    }
}
