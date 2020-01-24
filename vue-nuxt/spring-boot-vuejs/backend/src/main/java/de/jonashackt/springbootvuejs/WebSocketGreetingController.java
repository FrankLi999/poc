package de.jonashackt.springbootvuejs;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketGreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        // Thread.sleep(1000); // simulated delay
        System.out.println("Received message: " + message.getName() + "-" + message.getInvokeId());
        return new Greeting("Hello, " + message.getName() + "!", message.getInvokeId());
    }

}
