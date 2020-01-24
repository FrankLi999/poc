package io.spring.service.data.jpa;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

@Service
public class UserRelationshipQueryService {
    public boolean isUserFollowing(Long userId, Long anotherUserId) {
    	return false;
    }

    public Set<Long> followingAuthors(Long userId, List<Long> ids) {
    	return null;
    }

    public List<Long> followedUsers(Long userId) {
    	return null;
    }
}
