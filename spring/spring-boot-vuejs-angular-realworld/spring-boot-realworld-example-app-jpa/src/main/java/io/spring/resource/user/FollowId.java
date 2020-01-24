package io.spring.resource.user;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@EqualsAndHashCode
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

//@EqualsAndHashCode
//@Getter
//@Setter
//@AllArgsConstructor
public class FollowId implements Serializable {
	private static final long serialVersionUID = 1629449494691313127L;
	
	// @Id
	@Column(name="user_id")
	private Long userId;
	
	// @Id
	@Column(name="target_id")
    private Long targetId;
}
