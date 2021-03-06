package patterns.behavior.memento;

import java.util.ArrayList;
/**
 * Intent
 *   Without violating encapsulation, capture and externalize an object's internal state so that the object can be returned to this state later.
 *   A magic cookie that encapsulates a "check point" capability.
 *   Promote undo or rollback to full object status.
 *
 */
public class MementoDemo {
	static class Memento {
	    private String state;

	    public Memento(String state) {
	        this.state = state;
	    }

	    public String getState() {
	        return state;
	    }
	}

	static class Originator {
	    private String state;
	   /* lots of memory consumptive private data that is not necessary to define the
	    * state and should thus not be saved. Hence the small memento object. */

	    public void setState(String state) {
	        System.out.println("Originator: Setting state to " + state);
	        this.state = state;
	    }

	    public Memento save() {
	        System.out.println("Originator: Saving to Memento.");
	        return new Memento(state);
	    }
	    public void restore(Memento m) {
	        state = m.getState();
	        System.out.println("Originator: State after restoring from Memento: " + state);
	    }
	}

	static class Caretaker {
	    private ArrayList<Memento> mementos = new ArrayList<>();

	    public void addMemento(Memento m) {
	        mementos.add(m);
	    }

	    public Memento getMemento(int i) {
	        return mementos.get(i);
	    }
	}
	
    public static void main(String[] args) {
        Caretaker caretaker = new Caretaker();
        Originator originator = new Originator();
        originator.setState("State1");
        originator.setState("State2");
        caretaker.addMemento( originator.save() );
        originator.setState("State3");
        caretaker.addMemento( originator.save() );
        originator.setState("State4");
        originator.restore( caretaker.getMemento(0) );
    }
}