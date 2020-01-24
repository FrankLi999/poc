package io.spring.service.data.jpa;

import java.util.List;

import org.springframework.stereotype.Service;

import io.spring.dto.CommentData;

@Service
public class CommentReadService {
    public CommentData findById(Long id) {
    	return null;
    }

    public List<CommentData> findByArticleId(Long articleId) {
    	return null;
    }
}
