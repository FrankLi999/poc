package app.web.api.account;

import app.aggregate.account.AccountOwner;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RequestMapping(value = "/accounts")
public interface AccountCommandApi {
    @PostMapping
    CompletableFuture<String> createAccount(@RequestBody AccountOwner user);

    @PostMapping(path = "{accountId}/balance")
    CompletableFuture deposit(@PathVariable("accountId") String accountId, @RequestBody double amount);

    @DeleteMapping(path = "{accountId}")
    CompletableFuture delete(@PathVariable("accountId") String accountId);
}
