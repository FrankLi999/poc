package app.config.axon;

import org.axonframework.serialization.upcasting.event.EventUpcaster;
import org.axonframework.serialization.upcasting.event.NoOpEventUpcaster;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;


@Configuration
@Import({AxonMongoInfraStructureConfig.class, AxonHSQLInfraStructureConfig.class})

public class AxonConfig {
    @Bean
    EventUpcaster eventUpcaster() {
        return NoOpEventUpcaster.INSTANCE;
    }
}
