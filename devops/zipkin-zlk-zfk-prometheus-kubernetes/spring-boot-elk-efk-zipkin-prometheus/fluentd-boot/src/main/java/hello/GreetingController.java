package hello;

// import java.util.HashMap;
// import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.cloud.sleuth.Tracer;
// import org.fluentd.logger.FluentLogger;

@RestController
public class GreetingController {
    private final Logger logger = LoggerFactory.getLogger(GreetingController.class);
    private static final String template = "Hello, %s!";
	// private static FluentLogger LOG = FluentLogger.getLogger("fluentd.test");
    // private static FluentLogger LOG = FluentLogger.getLogger(label != null ? tag : null, remoteHost, port);
    private final AtomicLong counter = new AtomicLong();

	@Autowired
	private Tracer tracer;
	
	@Autowired
	private Random random;
	
    @RequestMapping("/greeting")
	public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        try {

			String zipkinHost = System.getenv("ZIPKIN_HOST");
			int millis = this.random.nextInt(1000);
			Thread.sleep(millis);
			this.tracer.addTag("random-sleep-millis", String.valueOf(millis));
			name = (zipkinHost != null) ? zipkinHost : name;
			this.tracer.addTag("ZIPKIN_name", name);

			// Map<String, Object> data = new HashMap<String, Object>();
			// data.put("from", "GreetingController-fluentd.test");
			// data.put("to", "name");
			// // The logs should be output to /var/log/td-agent/td-agent.log or 
			// // stdout of the Fluentd process via the stdout Output plugin.
			// LOG.log("follow", data);
			System.out.println(">>>>>>>>>>>>>>>>> 1:" + this.logger.getClass());
            this.randomLog(">>>>>>>>>>>>> GreetingController from: " + name);
			System.out.println(">>>>>>>>>>>>>>>>> 2");
			return new Greeting(counter.incrementAndGet(),
								String.format(template, name));
		} catch (Exception e) {
			return new Greeting(counter.incrementAndGet(),
                            "Exception");
		}
    }

	private void randomLog(String msg) {
		this.logger.error(msg);
        // switch (this.random.nextInt(3)) {
        //     case 0:
        //         this.logger.debug(msg);
        //     case 1:
        //         this.logger.info(msg);
        //     case 2:
        //         this.logger.error(msg);
        //     default:
        //         this.logger.info(msg);
        // }
    }
}
