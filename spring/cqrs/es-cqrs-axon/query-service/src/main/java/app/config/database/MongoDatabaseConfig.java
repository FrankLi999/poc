package app.config.database;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.mongodb.repository.support.MongoRepositoryFactory;
import org.springframework.data.repository.query.QueryLookupStrategy;

@Configuration
@EnableMongoRepositories(
        basePackages = "app.*.repository",
        includeFilters = {
                @Filter(type = FilterType.REGEX, pattern = ".*Repository")
        },
        excludeFilters = {
                @Filter(type = FilterType.REGEX, pattern = ".*Test.*Repository")
        },
        queryLookupStrategy = QueryLookupStrategy.Key.CREATE_IF_NOT_FOUND
)
//@Profile({"mongo", "default"})
public class MongoDatabaseConfig {
    @Bean
    MongoRepositoryFactory mongoRepositoryFactory(MongoTemplate mongoTemplate) {
        return new MongoRepositoryFactory(mongoTemplate);
    }
}
