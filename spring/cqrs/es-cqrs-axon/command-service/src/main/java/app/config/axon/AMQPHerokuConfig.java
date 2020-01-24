package app.config.axon;

import org.axonframework.boot.AMQPProperties;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

import static java.lang.System.getenv;

@Configuration
@Profile("heroku")
public class AMQPHerokuConfig {
    @Value("${external.amqp.queue}")
    private String queueName;

    @Value("${external.amqp.exchange.fanout.auto-delete}")
    private boolean autoDelete;

    @Value("${external.amqp.bind.route-key}")
    private String routeKey;

    private final AMQPProperties amqpProperties;

    public AMQPHerokuConfig(AMQPProperties amqpProperties) {
        this.amqpProperties = amqpProperties;
    }

    @Bean
    ConnectionFactory connectionFactory(
            @Value("${spring.rabbitmq.host}") String amqpHost,
            @Value("${external.heroku.rabbitmq-env-var}") String rabbitMqEnvVar
    ) {
        final URI amqpUrl = getAmqpUri(amqpHost, rabbitMqEnvVar);
        CachingConnectionFactory factory = new CachingConnectionFactory();
        factory.setUsername(amqpUrl.getUserInfo().split(":")[0]);
        factory.setPassword(amqpUrl.getUserInfo().split(":")[1]);
        factory.setHost(amqpUrl.getHost());
        factory.setPort(amqpUrl.getPort());
        factory.setVirtualHost(amqpUrl.getPath().substring(1));

        return factory;
    }

    @Bean(name = "rabbitAdmin")
    @Required
    public AmqpAdmin amqpAdmin(
            Queue queue,
            Exchange exchange,
            ConnectionFactory connectionFactory
    ) {
        RabbitAdmin admin = new RabbitAdmin(connectionFactory);
        admin.setAutoStartup(true);
        admin.declareExchange(exchange);
        admin.declareQueue(queue);
        admin.declareBinding(binding(queue, exchange));
        admin.afterPropertiesSet();
        return admin;
    }

    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory connectionFactory,
            @Value("${external.amqp.queue}") String queueName
            ) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setRoutingKey(queueName);
        template.setQueue(queueName);
        return template;
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

    private URI getAmqpUri(String defaultUri, String envVarName) {
        try {
            return new URI(getEnvOrThrow(envVarName, defaultUri));
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    private String getEnvOrThrow(String varName, String defaultUrl) {
        final String env = getenv(varName);

        return Optional
                .ofNullable(Optional.ofNullable(env).orElse(defaultUrl))
                .orElseThrow(() ->
            new IllegalStateException("Environment variable [" + varName + "] is not set.")
        );
    }

}
