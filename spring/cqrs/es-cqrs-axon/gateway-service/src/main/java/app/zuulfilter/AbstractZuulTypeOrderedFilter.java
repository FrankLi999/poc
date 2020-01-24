package app.zuulfilter;

import com.netflix.zuul.ZuulFilter;

public abstract class AbstractZuulTypeOrderedFilter extends ZuulFilter {
    private final int order;
    private final String filterType;
    private final boolean shouldFilter;

    public AbstractZuulTypeOrderedFilter(FilterType filterType, int order, boolean shouldFilter) {
        this.order = order;
        this.filterType = filterType.toName();
        this.shouldFilter = shouldFilter;
    }

    @Override
    public String filterType() {
        return this.filterType;
    }

    @Override
    public int filterOrder() {
        return this.order;
    }

    @Override
    public boolean shouldFilter() {
        return this.shouldFilter;
    }

    public enum FilterType {
        PRE_ROUTING("pre"), ROUTING("routing"), POST_ROUTING("post"), ERROR("error");
        private final String name;

        FilterType(String name) {
            this.name = name;
        }

        String toName() {
            return this.name;
        }
    }
}
