package hello;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.cloud.sleuth.Tracer;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
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
			return new Greeting(counter.incrementAndGet(),
								String.format(template, name));
		} catch (InterruptedException e) {
			return new Greeting(counter.incrementAndGet(),
                            "Interrupted");
		}
    }
}
