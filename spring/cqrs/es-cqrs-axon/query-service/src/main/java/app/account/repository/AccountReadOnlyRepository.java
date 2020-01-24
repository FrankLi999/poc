package app.account.repository;

import app.account.entity.AccountEntity;
import app.repo.ReadOnlyRepository;

public interface AccountReadOnlyRepository extends ReadOnlyRepository<AccountEntity, String> {
}
