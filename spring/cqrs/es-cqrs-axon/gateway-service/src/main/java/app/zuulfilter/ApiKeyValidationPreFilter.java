package app.zuulfilter;

import com.netflix.zuul.context.RequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;

public class ApiKeyValidationPreFilter extends AbstractZuulTypeOrderedFilter {
    private Logger logger = LoggerFactory.getLogger(getClass());

    public ApiKeyValidationPreFilter(FilterType filterType, int order, boolean shouldFilter) {
        super(filterType, order, shouldFilter);
    }

    @Override
    public Object run() {
        RequestContext context = RequestContext.getCurrentContext();
        HttpServletRequest request = context.getRequest();
        String apiKey = request.getHeader("API_KEY");
        logger.debug("{} request to {} with api key {}", request.getMethod(), request.getRequestURL().toString(), apiKey);
        return null;
    }
}
