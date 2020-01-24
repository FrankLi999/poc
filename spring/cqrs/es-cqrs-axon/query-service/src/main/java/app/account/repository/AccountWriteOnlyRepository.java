package app.account.repository;

import app.account.entity.AccountEntity;
import app.repo.WriteOnlyRepository;

public interface AccountWriteOnlyRepository extends WriteOnlyRepository<AccountEntity, String> {
}
