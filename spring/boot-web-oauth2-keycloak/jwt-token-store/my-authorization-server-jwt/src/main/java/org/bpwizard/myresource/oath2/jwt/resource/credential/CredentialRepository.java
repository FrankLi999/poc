package org.bpwizard.myresource.oath2.jwt.resource.credential;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by ahmed on 21.5.18.
 */
public interface CredentialRepository extends JpaRepository<Credentials,Long> {
    Credentials findByName(String name);
}
