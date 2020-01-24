package io.spring.api;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.spring.api.exception.ResourceNotFoundException;
import io.spring.dto.ProfileData;
import io.spring.resource.user.Follow;
import io.spring.resource.user.FollowId;
import io.spring.resource.user.FollowRepository;
import io.spring.resource.user.User;
import io.spring.resource.user.UserRepository;
import io.spring.service.application.ProfileQueryService;

@RestController
@RequestMapping(path = "profiles/{username}")
public class ProfileApi {
    private ProfileQueryService profileQueryService;
    private UserRepository userRepository;
    private FollowRepository followRepository;
    
    @Autowired
    public ProfileApi(
    		ProfileQueryService profileQueryService, 
    		UserRepository userRepository,
    		FollowRepository followRepository) {
        this.profileQueryService = profileQueryService;
        this.userRepository = userRepository;
        this.followRepository = followRepository;
    }

    @GetMapping
    public ResponseEntity getProfile(@PathVariable("username") String username,
                                     @AuthenticationPrincipal User user) {
        return profileQueryService.findByUsername(username, user)
            .map(this::profileResponse)
            .orElseThrow(ResourceNotFoundException::new);
    }

    @PostMapping(path = "follow")
    public ResponseEntity follow(@PathVariable("username") String username,
                                 @AuthenticationPrincipal User user) {
        return userRepository.findByUsername(username).map(target -> {
            Follow followRelation = new Follow(new FollowId(user.getId(), target.getId()));
            followRepository.save(followRelation);
            return profileResponse(profileQueryService.findByUsername(username, user).get());
        }).orElseThrow(ResourceNotFoundException::new);
    }

    @DeleteMapping(path = "follow")
    public ResponseEntity unfollow(@PathVariable("username") String username,
                                   @AuthenticationPrincipal User user) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User target = userOptional.get();
            return followRepository.findById(new FollowId(user.getId(), target.getId()))
                .map(relation -> {
                	followRepository.delete(relation);
                    return profileResponse(profileQueryService.findByUsername(username, user).get());
                }).orElseThrow(ResourceNotFoundException::new);
        } else {
            throw new ResourceNotFoundException();
        }
    }

    private ResponseEntity profileResponse(ProfileData profile) {
        return ResponseEntity.ok(new HashMap<String, Object>() {{
            put("profile", profile);
        }});
    }
}
