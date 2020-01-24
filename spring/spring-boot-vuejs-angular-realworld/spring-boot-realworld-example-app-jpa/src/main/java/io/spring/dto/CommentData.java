package io.spring.dto;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//import org.joda.time.DateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentData {
    private Long id;
    private String body;
    @JsonIgnore
    private Long articleId;
    private DateTime createdAt;
    private DateTime updatedAt;
    @JsonProperty("author")
    private ProfileData profileData;
}
