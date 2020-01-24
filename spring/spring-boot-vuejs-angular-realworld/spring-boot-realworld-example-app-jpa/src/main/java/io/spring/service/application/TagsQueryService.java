package io.spring.service.application;

import org.springframework.stereotype.Service;

import io.spring.service.data.jpa.TagReadService;

import java.util.List;

@Service
public class TagsQueryService {
    private TagReadService tagReadService;

    public TagsQueryService(TagReadService tagReadService) {
        this.tagReadService = tagReadService;
    }

    public List<String> allTags() {
        return tagReadService.all();
    }
}
