package patterns.structrual.proxy;


public class ProxyPatternDemo {
    public static void main(String[] args) {
        ExpensiveObject object = new ExpensiveObjectProxy();
        object.process();
        object.process();
    }
}