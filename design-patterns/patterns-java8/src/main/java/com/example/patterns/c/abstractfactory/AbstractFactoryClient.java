package com.example.patterns.c.abstractfactory;

/**
 * Abstract Factory to create a set of objects
 *
 */
public class AbstractFactoryClient {
	// class CPU
	static class CPU {}

	// class EmberCPU
	static class EmberCPU extends CPU {}

	// class EnginolaCPU
	static class EnginolaCPU extends CPU {}

	// class MMU
	static class MMU {}

	// class EmberMMU
	static class EmberMMU extends MMU {}

	// class EnginolaMMU
	static class EnginolaMMU extends MMU {}

	// class EmberFactory
	static class EmberToolkit extends AbstractFactory {
	    @Override
	    public CPU createCPU() {
	        return new EmberCPU();
	    }

	    @Override
	    public MMU createMMU() {
	        return new EmberMMU();
	    }
	}
	enum Architecture {
	    ENGINOLA, EMBER
	}

	// class EnginolaFactory
	static class EnginolaToolkit extends AbstractFactory {
	    @Override
	    public CPU createCPU() {
	        return new EnginolaCPU();
	    }

	    @Override
	    public MMU createMMU() {
	        return new EnginolaMMU();
	    }
	}
	
	static abstract class AbstractFactory {
	    private static final EmberToolkit EMBER_TOOLKIT = new EmberToolkit();
	    private static final EnginolaToolkit ENGINOLA_TOOLKIT = new EnginolaToolkit();

	    // Returns a concrete factory object that is an instance of the
	    // concrete factory class appropriate for the given architecture.
	    static AbstractFactory getFactory(Architecture architecture) {
	        AbstractFactory factory = null;
	        switch (architecture) {
	            case ENGINOLA:
	                factory = ENGINOLA_TOOLKIT;
	                break;
	            case EMBER:
	                factory = EMBER_TOOLKIT;
	                break;
	        }
	        return factory;
	    }

	    public abstract CPU createCPU();

	    public abstract MMU createMMU();
	}
	
	public static void main(String[] args) {
        AbstractFactory factory = AbstractFactory.getFactory(Architecture.EMBER);
        CPU cpu = factory.createCPU();
    }
}
