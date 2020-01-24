package app.config.axon;

import org.axonframework.boot.AMQPProperties;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.transaction.RabbitTransactionManager;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.amqp.RabbitProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.support.ResourceTransactionManager;

@Configuration
//@Profile({"prod", "cloud"})
@Profile({"local"})
public class AMQPConfig {
    @Value("${external.amqp.queue}")
    private String queueName;

    @Value("${external.amqp.exchange.fanout.auto-delete}")
    private boolean autoDelete;

    @Value("${external.amqp.bind.route-key}")
    private String routeKey;

    private final RabbitProperties rabbitProperties;
    private final AMQPProperties amqpProperties;

    public AMQPConfig(RabbitProperties rabbitProperties, AMQPProperties amqpProperties) {
        this.rabbitProperties = rabbitProperties;
        this.amqpProperties = amqpProperties;
    }

    @Bean
    Queue queue() {
        return new Queue(queueName, amqpProperties.isDurableMessages());
    }

    @Bean
    Exchange exchange() {
        ExchangeBuilder builder = ExchangeBuilder
                .fanoutExchange(amqpProperties.getExchange())
                .durable(amqpProperties.isDurableMessages());
        if (this.autoDelete) {
            builder.autoDelete();
        }
        return builder.build();
    }

    @Bean
    Binding binding(Queue queue, Exchange exchange) {
        return BindingBuilder
                .bind(queue)
                .to(exchange)
                .with(routeKey)
                .noargs();
    }

    @Bean
    ConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory(rabbitProperties.getHost());
        connectionFactory.setUsername(rabbitProperties.getUsername());
        connectionFactory.setPassword(rabbitProperties.getPassword());
        return connectionFactory;
    }

    @Bean(name = "rabbitAdmin")
    @Required
    public AmqpAdmin amqpAdmin(Queue queue, Exchange exchange) {
        RabbitAdmin admin = new RabbitAdmin(connectionFactory());
        admin.setAutoStartup(true);
        admin.declareExchange(exchange);
        admin.declareQueue(queue);
        admin.declareBinding(binding(queue, exchange));
        admin.afterPropertiesSet();
        return admin;
    }
    @Bean(name = "rabbitTransactionManager")
    ResourceTransactionManager transactionManager(ConnectionFactory connectionFactory) {
        return new RabbitTransactionManager(connectionFactory);
    }
}
