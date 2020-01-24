package com.bpwizard.boot.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bpwizard.boot.db.entities.PersonEntity;

/**
 * 
 * @author Satish Sharma
 * <pre>
 *  	JPA repository interface for {@link PersonEntity} class
 * </pre>
 */
@Repository
public interface PersonRepository  extends JpaRepository<PersonEntity, Integer>{

}
