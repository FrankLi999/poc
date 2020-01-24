package app;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.Collections;
import java.util.List;

@EnableAutoConfiguration
@EnableZuulProxy // Act as reverse proxy, forwarding requests to other services based on routes.
@SpringBootApplication
public class GatewayServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayServiceApplication.class, args);
    }
}

@RestController(value = "/service-instances")
class ServiceInstanceResource {
    @Value("${spring.application.name}")
    private String appName;

    private final DiscoveryClient discoveryClient;

    @Inject
    public ServiceInstanceResource(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @HystrixCommand(fallbackMethod = "defaultServiceInstances")
    @GetMapping
    public List<ServiceInstance> serviceUrl() {
        List<ServiceInstance> serviceInstances = discoveryClient.getInstances(appName);
        return serviceInstances;
    }

    public List<ServiceInstance> defaultServiceInstances() {
        return Collections.emptyList();
    }

}