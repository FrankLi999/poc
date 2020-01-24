package app.config.axon;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "external.event-sourcing")
public class EventSourcingCollectionProperties {
    private String eventsCollectionName;
    private String snapshotCollectionName;

    public String getEventsCollectionName() {
        return eventsCollectionName;
    }

    public void setEventsCollectionName(String eventsCollectionName) {
        this.eventsCollectionName = eventsCollectionName;
    }

    public String getSnapshotCollectionName() {
        return snapshotCollectionName;
    }

    public void setSnapshotCollectionName(String snapshotCollectionName) {
        this.snapshotCollectionName = snapshotCollectionName;
    }
}
