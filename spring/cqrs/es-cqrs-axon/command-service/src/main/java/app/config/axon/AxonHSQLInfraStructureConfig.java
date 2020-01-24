package app.config.axon;

import org.axonframework.common.jdbc.ConnectionProvider;
import org.axonframework.common.transaction.NoTransactionManager;
import org.axonframework.eventhandling.saga.repository.SagaStore;
import org.axonframework.eventhandling.saga.repository.jdbc.HsqlSagaSqlSchema;
import org.axonframework.eventhandling.saga.repository.jdbc.JdbcSagaStore;
import org.axonframework.eventhandling.saga.repository.jdbc.SagaSqlSchema;
import org.axonframework.eventsourcing.eventstore.EmbeddedEventStore;
import org.axonframework.eventsourcing.eventstore.EventStorageEngine;
import org.axonframework.eventsourcing.eventstore.EventStore;
import org.axonframework.eventsourcing.eventstore.jdbc.EventSchema;
import org.axonframework.eventsourcing.eventstore.jdbc.EventTableFactory;
import org.axonframework.eventsourcing.eventstore.jdbc.HsqlEventTableFactory;
import org.axonframework.eventsourcing.eventstore.jdbc.JdbcEventStorageEngine;
import org.axonframework.spring.jdbc.SpringDataSourceConnectionProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseFactoryBean;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import javax.sql.DataSource;

@Configuration
@Profile("hsql")
public class AxonHSQLInfraStructureConfig {

    @Bean(name = "dataSource")
    public EmbeddedDatabaseFactoryBean dataSource() {
        EmbeddedDatabaseFactoryBean embeddedDatabaseFactoryBean = new EmbeddedDatabaseFactoryBean();
        embeddedDatabaseFactoryBean.setDatabaseType(EmbeddedDatabaseType.HSQL);
        return embeddedDatabaseFactoryBean;
    }

    @Bean
    public SpringDataSourceConnectionProvider springDataSourceConnectionProvider(DataSource dataSource) {
        return new SpringDataSourceConnectionProvider(dataSource);
    }

    @Bean
    public JdbcEventStorageEngine eventStorageEngine(ConnectionProvider connectionProvider) {
        return new JdbcEventStorageEngine(connectionProvider, NoTransactionManager.INSTANCE);
    }

    @Bean
    EventStore eventStore(EventStorageEngine eventStorageEngine) {
        return new EmbeddedEventStore(eventStorageEngine);
    }

    @Bean
    public EventTableFactory eventSchemaFactory() {
        return HsqlEventTableFactory.INSTANCE;
    }

    @Bean
    public EventSchema eventSchema() {
        return new EventSchema();
    }

    @Bean
    public SagaSqlSchema sagaSqlSchema() {
        return new HsqlSagaSqlSchema();
    }

    @Bean
    public SagaStore<Object> sagaStoreRepository(DataSource dataSource, SagaSqlSchema sagaSqlSchema) {
        return new JdbcSagaStore(dataSource, sagaSqlSchema);
    }
}
