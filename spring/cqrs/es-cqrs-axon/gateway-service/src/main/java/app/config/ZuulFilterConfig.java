package app.config;

import app.zuulfilter.ApiKeyValidationPreFilter;
import app.zuulfilter.SimpleLoggingFilter;
import com.netflix.zuul.ZuulFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static app.zuulfilter.AbstractZuulTypeOrderedFilter.FilterType;

@Configuration
public class ZuulFilterConfig {
    @Bean
    ZuulFilter simpleLoggingFilter() {
        return new SimpleLoggingFilter(FilterType.PRE_ROUTING, 1, true);
    }

    @Bean
    ZuulFilter apiKeyValidationFilter() {
        return new ApiKeyValidationPreFilter(FilterType.PRE_ROUTING, 2, true);
    }
}
