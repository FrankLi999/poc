package com.test.scheduled;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.test.config.ScheduledConfig;
import com.test.scheduled.Counter;

import static org.assertj.core.api.Assertions.assertThat;

@SpringJUnitConfig(ScheduledConfig.class)
public class ScheduledIntegrationTest {

    @Autowired Counter counter;

    @Test
    public void givenSleepBy100ms_whenGetInvocationCount_thenIsGreaterThanZero() throws InterruptedException {
        Thread.sleep(100L);

        assertThat(counter.getInvocationCount()).isGreaterThan(0);
    }

}
