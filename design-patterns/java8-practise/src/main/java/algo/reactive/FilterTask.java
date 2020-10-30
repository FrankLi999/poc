package algo.reactive;

import algo.functional.OneArgumentExpressionWithException;

/**
 * Created by debasishc on 30/1/17.
 */
public class FilterTask implements Task{
    OneArgumentExpressionWithException filter;
    Task nextTask;

    public FilterTask(
            OneArgumentExpressionWithException filter,
            Task nextTask) {
        this.filter = filter;
        this.nextTask = nextTask;
    }
}
