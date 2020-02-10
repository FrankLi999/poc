package org.lordofthejars.pingpong;

import java.util.List;
import org.arquillian.ape.junit.rule.ArquillianPersistenceRule;
import org.arquillian.ape.nosql.NoSqlPopulator;
import org.arquillian.ape.nosql.redis.Redis;
import org.arquillian.cube.docker.junit.rule.ContainerDslRule;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.junit.After;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.EnvironmentTestUtils;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = PingPongController.class, webEnvironment = RANDOM_PORT)
@ContextConfiguration(initializers = PingPongSpringBootTest.Initializer.class)
public class PingPongSpringBootTest {

    @ClassRule
    public static ContainerDslRule redis = new ContainerDslRule("redis:3.2.6")
                                                .withPortBinding(6379);

    @Rule
    public ArquillianPersistenceRule arquillianPersistenceRule = new ArquillianPersistenceRule();

    @Autowired
    TestRestTemplate restTemplate;

    @Redis
    @ArquillianResource
    NoSqlPopulator populator;

    @Test
    public void should_get_pongs() {

        // given

        populator.forServer(redis.getIpAddress(), redis.getBindPort(6379))
                 .usingDataSet("pings.json")
                 .execute();

        // when

        final List<String> pings = restTemplate.getForObject("/ping", List.class);

        // then

        assertThat(pings)
            .hasSize(2)
            .containsExactlyInAnyOrder("pong", "pung");
    }

    @After
    public void clean_database() {
        populator.forServer(redis.getIpAddress(), redis.getBindPort(6379))
            .clean();
    }

    public static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        @Override
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            EnvironmentTestUtils.addEnvironment("testcontainers", configurableApplicationContext.getEnvironment(),
                "spring.redis.host=" + redis.getIpAddress(),
                "spring.redis.port=" + redis.getBindPort(6379)
            );
        }
    }

}
