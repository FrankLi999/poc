package app;

import com.netflix.eureka.EurekaServerContext;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit4.SpringRunner;

import javax.inject.Inject;

import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DiscoveryServiceApp.class)
public class DiscoveryServiceAppTest {
    @Inject
    ApplicationContext applicationContext;

    @Inject
    EurekaServerContext eurekaServerContext;

    @Test
    public void contextLoaded() {
        assertNotNull("application context loaded", applicationContext);
        assertNotNull("eurekaServerContext loaded", eurekaServerContext);
    }
}
