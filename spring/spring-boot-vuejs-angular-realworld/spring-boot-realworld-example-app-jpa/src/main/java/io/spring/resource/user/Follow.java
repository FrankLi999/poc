package io.spring.resource.user;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
//import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "follows")
@Data
@NoArgsConstructor
@AllArgsConstructor
// @IdClass(FollowId.class)
public class Follow implements Serializable {
	
	private static final long serialVersionUID = -736143962221100959L;
//	@Id
//	@Column(name="user_id")
//    private Long userId;
//	
//	@Id
//	@Column(name="target_id")
//	private Long targetId;

	@EmbeddedId
    private FollowId id;
	
//    public FollowRelation(Long userId, Long targetId) {
//        this.userId = userId;
//        this.targetId = targetId;
//    }
}
