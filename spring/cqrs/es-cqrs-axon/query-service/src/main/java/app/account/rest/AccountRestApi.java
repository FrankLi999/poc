package app.account.rest;

import app.account.entity.AccountEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.concurrent.CompletableFuture;

@RequestMapping(value = "/accounts")
public interface AccountRestApi {
    @GetMapping
    CompletableFuture<Page<AccountEntity>> findAll(Pageable pageable);

    @GetMapping(path = "{id}")
    CompletableFuture<AccountEntity> findById(@PathVariable("id") String id);
}
