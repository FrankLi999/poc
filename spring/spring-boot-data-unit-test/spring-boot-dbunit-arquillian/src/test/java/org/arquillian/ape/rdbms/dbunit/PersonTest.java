package org.arquillian.ape.rdbms.dbunit;

import java.net.URI;
import java.nio.charset.Charset;
import java.sql.SQLException;
import org.arquillian.ape.rdbms.core.RdbmsPopulator;
import org.assertj.db.type.Source;
import org.assertj.db.type.Table;
import org.h2.Driver;
import org.h2.tools.RunScript;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.EnvironmentTestUtils;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import static org.arquillian.ape.rdbms.dbunit.DbUnitOptions.options;
import static org.assertj.db.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;


@RunWith(SpringRunner.class)
@SpringBootTest(classes =  PersonTest.class)
@ContextConfiguration(initializers = PersonTest.Initializer.class)
//@RunWith(Arquillian.class)
public class PersonTest {

    @DbUnit
    @ArquillianResource
    RdbmsPopulator rdbmsPopulator;

    @BeforeClass
    public static void createSchema() throws SQLException {
        // H2 tool for creating schema

    	System.out.println(">>>>>>>>>>>>>>>>#####>>>>>>>>>>>>>>>>> 0.1");
        RunScript.execute("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1",
            "sa", "", "src/test/resources/schema.sql", Charset.forName("UTF-8"), false);
        System.out.println(">>>>>>>>>>>>>>>>>>>WWWW>>>>>>>>>>>>>> 0.2");
    }

    /*
    @Test
    public void should_find_all_persons() {
        rdbmsPopulator.forUri(URI.create("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1"))
            .withDriver(Driver.class)
            .withUsername("sa")
            .withPassword("")
            .usingDataSet("person.xml")
            .withOptions(options()
                            //.caseSensitiveTableNames(true)
                            .build())
            .execute();

        Table table = new Table(new Source("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "sa", ""), "person");
        assertThat(table).column("name")
            .value().isEqualTo("Bob")
            .value().isEqualTo("Alice")
            .value().isEqualTo("Charlie");

        rdbmsPopulator.forUri(URI.create("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1"))
            .withDriver(Driver.class)
            .withUsername("sa")
            .withPassword("")
            .usingDataSet("person.xml")
            .clean();
    }

    @Test
    public void should_find_all_heroes() {
        rdbmsPopulator.forUri(URI.create("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1"))
            .withDriver(Driver.class)
            .withUsername("sa")
            .withPassword("")
            .usingDataSet("heroes.yml")
            .execute();

        Table table = new Table(new Source("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "sa", ""), "person");
        assertThat(table).column("name")
            .value().isEqualTo("Clark")
            .value().isEqualTo("Lex");

        rdbmsPopulator.forUri(URI.create("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1"))
            .withDriver(Driver.class)
            .withUsername("sa")
            .withPassword("")
            .usingDataSet("heroes.yml")
            .clean();
    }
    */
    @Test
    public void should_find_all_captains() {
    	System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 1");
        rdbmsPopulator.forUri(URI.create("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1"))
            .withDriver(Driver.class)
            .withUsername("sa")
            .withPassword("")
            .usingDataSet("captains.json")
            .execute();
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 2");
        Table table = new Table(new Source("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "sa", ""), "person");
        assertThat(table).column("name")
            .value().isEqualTo("Jean-Luc")
            .value().isEqualTo("James");
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 3");
        rdbmsPopulator.forUri(URI.create("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1"))
            .withDriver(Driver.class)
            .withUsername("sa")
            .withPassword("")
            .usingDataSet("captains.json")
            .clean();
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>4");
    }
    
    public static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        @Override
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
//            EnvironmentTestUtils.addEnvironment("testcontainers", configurableApplicationContext.getEnvironment(),
//                "spring.redis.host=" + redis.getIpAddress(),
//                "spring.redis.port=" + redis.getBindPort(6379)
//            );
        }
    }
}
