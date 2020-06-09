package org.camunda.bpm.engine.test.assertions.examples.jobannouncement;

public interface JobAnnouncementService {
    void postToWebsite(Long jobAnnouncementId);
    void postToTwitter(Long jobAnnouncementId);
    void postToFacebook(Long jobAnnouncementId);
    void notifyAboutPostings(Long jobAnnouncementId);
    String findRequester(Long jobAnnouncementId);
    String findEditor(Long jobAnnouncementId);
}
