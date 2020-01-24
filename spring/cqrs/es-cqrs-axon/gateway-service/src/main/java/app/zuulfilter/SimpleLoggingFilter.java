package app.zuulfilter;

import com.netflix.zuul.context.RequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;

public class SimpleLoggingFilter extends AbstractZuulTypeOrderedFilter {
    private Logger logger = LoggerFactory.getLogger(getClass());

    public SimpleLoggingFilter(FilterType filterType, int order, boolean shouldFilter) {
        super(filterType, order, shouldFilter);
        this.logger = logger;
    }

    @Override
    public Object run() {
        RequestContext context = RequestContext.getCurrentContext();
        HttpServletRequest request = context.getRequest();
        logger.debug("{} request to {}", request.getMethod(), request.getRequestURL().toString());
        return null;
    }
}
