package io.spring;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

import org.joda.time.DateTime;

import io.spring.dto.ArticleData;
import io.spring.dto.ProfileData;
import io.spring.resource.article.Article;
import io.spring.resource.user.User;

public class TestHelper {
    public static ArticleData articleDataFixture(Long seed, User user) {
        DateTime now = new DateTime();
        return new ArticleData(
            seed + new Random().nextLong(),
            "title-" + seed,
            "title " + seed,
            "desc " + seed,
            "body " + seed, false, 0, now, now, new ArrayList<>(),
            new ProfileData(user.getId(), user.getUsername(), user.getBio(), user.getImage(), false));
    }

    public static ArticleData getArticleDataFromArticleAndUser(Article article, User user) {
        return new ArticleData(
            article.getId(),
            article.getSlug(),
            article.getTitle(),
            article.getDescription(),
            article.getBody(),
            false,
            0,
            article.getCreatedAt(),
            article.getUpdatedAt(),
            Arrays.asList("joda"),
            new ProfileData(user.getId(), user.getUsername(), user.getBio(), user.getImage(), false));
    }
}
