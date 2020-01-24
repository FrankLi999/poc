//
// A Structured Logger for Fluent
//
// Copyright (C) 2011 - 2013 OZAWA Tsuyoshi
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
//
package org.fluentd.logger;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;
import java.util.Properties;
import java.util.WeakHashMap;

import org.fluentd.logger.sender.ExponentialDelayReconnector;
import org.fluentd.logger.sender.RawSocketSender;
import org.fluentd.logger.sender.Reconnector;
import org.fluentd.logger.sender.Sender;

public class FluentLoggerFactory {

    private final Map<FluentLogger, String> loggers;

    public FluentLoggerFactory() {
        loggers = new WeakHashMap<FluentLogger, String>();
    }

    public FluentLogger getLogger(String tagPrefix) {
        return getLogger(tagPrefix, "localhost", 24224);
    }

    public FluentLogger getLogger(String tagPrefix, String host, int port) {
        return getLogger(tagPrefix, host, port, 3 * 1000, 1 * 1024 * 1024, new ExponentialDelayReconnector());
    }

    public FluentLogger getLogger(String tagPrefix, String host, int port, int timeout, int bufferCapacity) {
        return getLogger(tagPrefix, host, port, timeout, bufferCapacity, new ExponentialDelayReconnector());
    }

    public synchronized FluentLogger getLogger(String tagPrefix, String host, int port, int timeout, int bufferCapacity,
            Reconnector reconnector) {
        String key = String.format("%s_%s_%d_%d_%d", new Object[] { tagPrefix, host, port, timeout, bufferCapacity });
        System.out.println("************* getLogger 1: " + key);
        for (Map.Entry<FluentLogger, String> entry : loggers.entrySet()) {
            if (entry.getValue().equals(key)) {
                FluentLogger found = entry.getKey();
                if(found != null) {
                    System.out.println("************* getLogger 0: " + found.getSender());
                    if (found.getSender() == null) {
                        found.setSender(this.getSender(tagPrefix, host, port, 
                            timeout, bufferCapacity, reconnector));
                    }
                    System.out.println("************* getLogger 0,1: " + found);
                    return found;
                }
                break;
            }
        }
        System.out.println("************* getLogger 2");
        Sender sender = this.getSender(tagPrefix, host, port, 
            timeout, bufferCapacity, reconnector);
        System.out.println("************* getLogger 6: " + sender);
        FluentLogger logger = new FluentLogger(tagPrefix, sender);
        loggers.put(logger, key);
        System.out.println("************* getLogger 7: " + logger.getSender());
        System.out.println("************* getLogger 8: " + key);
        System.out.println("************* getLogger 9: " + logger);
        return logger;
    }
    
    private Sender getSender(String tagPrefix, String host, int port, int timeout, int bufferCapacity,
            Reconnector reconnector) {
        Sender sender = null;
        Properties props = System.getProperties();
        System.out.println("************* getLogger 3: " + props.containsKey(Config.FLUENT_SENDER_CLASS));
        if (!props.containsKey(Config.FLUENT_SENDER_CLASS)) {
            // create default sender object
            System.out.println("************* getLogger 4: ");
            sender = new RawSocketSender(host, port, timeout, bufferCapacity, reconnector);
            System.out.println("************* getLogger 5: ");
        } else {
            String senderClassName = props.getProperty(Config.FLUENT_SENDER_CLASS);
            try {
                sender = createSenderInstance(senderClassName, new Object[] { host, port, timeout, bufferCapacity });
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return sender;
    }
    @SuppressWarnings("unchecked")
    private Sender createSenderInstance(final String className, final Object[] params) throws ClassNotFoundException,
            SecurityException, NoSuchMethodException, IllegalArgumentException, InstantiationException,
            IllegalAccessException, InvocationTargetException {
        Class<Sender> cl = (Class<Sender>) FluentLogger.class.getClassLoader().loadClass(className);
        Constructor<Sender> cons = cl.getDeclaredConstructor(new Class[] { String.class, int.class, int.class,
                int.class });
        return (Sender) cons.newInstance(params);
    }

    /**
     * the method is for testing
     */
    Map<FluentLogger, String> getLoggers() {
        return loggers;
    }

    public synchronized void closeAll() {
        for (FluentLogger logger : loggers.keySet()) {
            logger.close();
        }
        loggers.clear();
    }

    public synchronized void flushAll() {
        for (FluentLogger logger : loggers.keySet()) {
            logger.flush();
        }
    }

}
