package io.spring.dto;

import lombok.Value;

@Value
// @Builder
public class ArticleFavoriteCount {
    private Long id;
    private Integer count;
}
