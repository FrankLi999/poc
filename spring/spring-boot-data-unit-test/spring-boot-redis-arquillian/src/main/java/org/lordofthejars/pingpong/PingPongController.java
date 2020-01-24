package org.lordofthejars.pingpong;

import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Controller
@EnableAutoConfiguration
public class PingPongController {

    @Autowired
    StringRedisTemplate redisTemplate;

    @RequestMapping("/{ping}")
    @ResponseBody
    List<String> getPong(@PathVariable("ping") String ping) {

        final ListOperations<String, String> stringStringListOperations = redisTemplate.opsForList();
        final Long size = stringStringListOperations.size(ping);
        return stringStringListOperations.range(ping, 0, size);
    }

    @RequestMapping(value="/{ping}", method = RequestMethod.POST)
    ResponseEntity<?> addPong(@PathVariable("ping") String ping, @RequestBody String pong) {

        final ListOperations<String, String> stringStringListOperations = redisTemplate.opsForList();
        stringStringListOperations.leftPushAll(ping, pong);

        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .buildAndExpand(ping).toUri();

        return ResponseEntity.created(location).build();
    }


    public static void main(String[] args) {
        SpringApplication.run(PingPongController.class, args);
    }

}
