package algo.functional;

/**
 * Created by debasishc on 31/8/16.
 */
@FunctionalInterface
public interface OneArgumentStatement<E> {
    void doSomething(E argument);
}
