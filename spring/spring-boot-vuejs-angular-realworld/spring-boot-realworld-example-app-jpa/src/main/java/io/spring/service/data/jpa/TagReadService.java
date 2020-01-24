package io.spring.service.data.jpa;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.spring.resource.article.Tag;
import io.spring.resource.article.TagRepository;

@Service
public class TagReadService {
	private TagRepository tagRepository;

    @Autowired
    public TagReadService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }
    
    public List<String> all() {
    	Collection<Tag> tags = tagRepository.findAll();
    	List<String> tagNames = tags.stream().map(tag -> tag.getName()).collect(Collectors.toList());
    	return tagNames;
    }
}
