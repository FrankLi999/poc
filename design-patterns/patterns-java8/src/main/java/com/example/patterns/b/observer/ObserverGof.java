package com.example.patterns.b.observer;


import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ObserverGof {

    interface Listener {
        void onEvent(Object event);
    }

    public static class Observable {
        private final Map<Object, Listener> listeners = new ConcurrentHashMap<>();

        public void register(Object key, Listener listener) {
            listeners.put(key, listener);
        }

        public void unregister(Object key) {
            listeners.remove(key);
        }

        public void sendEvent(Object event) {
            for (Listener listener : listeners.values()) {
                listener.onEvent( event );
            }
        }
    }

    public static class Observer1 {
        Observer1(Observable observable) {
            observable.register( this, new Listener() {
                @Override
                public void onEvent( Object event ) {
                    System.out.println(event);
                }
            } );
        }
    }

    public static class Observer2 implements Listener {
        Observer2(Observable observable) {
            observable.register( this, this );
        }
        @Override
        public void onEvent( Object event ) {
            System.out.println(event);
        }
    }

    public static void main( String[] args ) {
        Observable observable = new Observable();
        new Observer1( observable );
        new Observer2( observable );

        observable.sendEvent( "Hello World!" );
    }
}