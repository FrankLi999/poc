
public interface Named {
	default String getName() { return getClass().getName() + "_" + hashCode(); };
}
