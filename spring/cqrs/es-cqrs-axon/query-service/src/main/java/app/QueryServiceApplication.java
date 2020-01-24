package app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
public class QueryServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(QueryServiceApplication.class);
    }
}


@RefreshScope
@RestController
class MessageRestController {
    private String message = "test";

    @RequestMapping("/message")
    public String message() {
        return message;
    }
}

//@Profile({"prod", "cloud"})
@RestController
class ServiceInstanceRestController {

    @Value("${spring.application.name}")
    private String appName;
    private final DiscoveryClient discoveryClient;

    @Autowired
    public ServiceInstanceRestController(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @RequestMapping(value = "/instances", method = RequestMethod.GET)
    public List<ServiceInstance> serviceInstanceList() {
        return this.discoveryClient.getInstances(appName);
    }
}