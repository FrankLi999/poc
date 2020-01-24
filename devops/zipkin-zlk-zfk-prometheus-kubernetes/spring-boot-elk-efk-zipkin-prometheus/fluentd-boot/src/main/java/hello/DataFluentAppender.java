package hello;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.fluentd.logger.FluentLogger;

import ch.qos.logback.classic.pattern.CallerDataConverter;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.classic.spi.ThrowableProxyUtil;
import ch.qos.logback.core.UnsynchronizedAppenderBase;

public class DataFluentAppender extends UnsynchronizedAppenderBase<ILoggingEvent> {
    private FluentLogger fluentLogger;

    @Override
    public void start() {
        super.start();
        System.out.println(">>>>>>>>>DataFluentAppender remote host:" + remoteHost);
        fluentLogger = FluentLogger.getLogger(tag != null ? tag : label, remoteHost, port);
    }


    @Override
    public void stop() {
        try {
            super.stop();
        } finally {
            if (fluentLogger != null) {
                fluentLogger.close();
            }
        }
    }

    @Override
    protected void append(ILoggingEvent rawData) {
        final Map<String, Object> data = new HashMap<String, Object>();
        data.put("message", rawData.getFormattedMessage());
        data.put("logger", rawData.getLoggerName());
        data.put("thread", rawData.getThreadName());
        data.put("level", rawData.getLevel());
        if (rawData.getMarker() != null) {
            data.put("marker", rawData.getMarker());
        }
        if (rawData.hasCallerData()) {
            data.put("caller", new CallerDataConverter().convert(rawData));
        }
        if (rawData.getThrowableProxy() != null) {
            data.put("throwable", ThrowableProxyUtil.asString(rawData.getThrowableProxy()));
        }
        if (additionalFields != null) {
            data.putAll(additionalFields);
        }
        for (Entry<String, String> entry : rawData.getMDCPropertyMap().entrySet()) {
            data.put(entry.getKey(), entry.getValue());
        }

        System.out.println(">>>>>>>>>> fluentd logger 0:" + fluentLogger.getClass());
        if (label == null) {
            System.out.println(">>>>>>>>>> fluentd logger 2:" + tag);
            fluentLogger.log(tag, data, rawData.getTimeStamp() / 1000);
        } else {
            System.out.println(">>>>>>>>>> fluentd logger 1:" + label);
            fluentLogger.log(label, data, rawData.getTimeStamp() / 1000);
        }
        System.out.println(">>>>>>>>>> fluentd logger 4");
    }

    private String tag;
    private String label;
    private String remoteHost;
    private int port;
    private Map<String, String> additionalFields;

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getRemoteHost() {
        return remoteHost;
    }

    public void setRemoteHost(String remoteHost) {
        this.remoteHost = remoteHost;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public void addAdditionalField(Field field) {
        if (additionalFields == null) {
            additionalFields = new HashMap<String, String>();
        }
        additionalFields.put(field.getKey(), field.getValue());
    }

    public static class Field {
        private String key;
        private String value;

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }
}