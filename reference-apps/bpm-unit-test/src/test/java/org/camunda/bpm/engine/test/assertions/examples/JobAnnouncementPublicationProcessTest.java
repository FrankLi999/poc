package org.camunda.bpm.engine.test.assertions.examples;

import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.assertThat;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.findId;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.runtimeService;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.withVariables;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import javax.annotation.PostConstruct;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.test.Deployment;
import org.camunda.bpm.engine.test.ProcessEngineRule;
import org.camunda.bpm.engine.test.assertions.examples.jobannouncement.JobAnnouncement;
import org.camunda.bpm.engine.test.assertions.examples.jobannouncement.JobAnnouncementService;
import org.camunda.bpm.engine.test.mock.Mocks;
import org.camunda.bpm.extension.process_test_coverage.junit.rules.TestCoverageProcessEngineRuleBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import com.bpwizard.bpm.content.helper.BaseProcessWithMockTestCase;

public class JobAnnouncementPublicationProcessTest extends BaseProcessWithMockTestCase {

	@Autowired
	public ProcessEngine processEngine;

	@Rule
	@ClassRule
	public static ProcessEngineRule processEngineRule;

	@Mock
	public JobAnnouncementService jobAnnouncementService;
	@Mock
	public JobAnnouncement jobAnnouncement;

	@PostConstruct
	void initRule() {
		//// With Coverage:
		processEngineRule = TestCoverageProcessEngineRuleBuilder.create(processEngine).build();
		// processEngineRule = new ProcessEngineRule(processEngine);
	}

	// Some boilerplate - we can easily get rid of again by
	@Before // deciding where to ultimately put the jUnit integration
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		Mocks.register("jobAnnouncementService", jobAnnouncementService);
		Mocks.register("jobAnnouncement", jobAnnouncement);
	}

	@After
	public void tearDown() {
		Mocks.reset();
	}

	@Test
	@Deployment(resources = { "camunda-testing-job-announcement-publication.bpmn" })
	public void testPublishOnlyOnCompanyWebsite() {

		when(jobAnnouncement.getId()).thenReturn(1L);

		ProcessInstance processInstance = runtimeService().startProcessInstanceByKey(
				"camunda-testing-job-announcement-publication",
				withVariables("jobAnnouncementId", jobAnnouncement.getId(), "twitter", false, "facebook", false));

		verify(jobAnnouncementService).postToWebsite(jobAnnouncement.getId());
		verify(jobAnnouncementService, never()).postToTwitter(any(Long.class));
		verify(jobAnnouncementService, never()).postToFacebook(any(Long.class));

		assertThat(processInstance).hasPassed(findId("Anzeige auf Firmenwebsite publizieren"));

		assertThat(processInstance).isEnded();

		verifyNoMoreInteractions(jobAnnouncementService);

	}

	@Test
	@Deployment(resources = { "camunda-testing-job-announcement-publication.bpmn" })
	public void testPublishAlsoOnTwitter() {

		ProcessInstance processInstance = runtimeService().startProcessInstanceByKey(
				"camunda-testing-job-announcement-publication",
				withVariables("jobAnnouncementId", jobAnnouncement.getId(), "twitter", true, "facebook", false));

		verify(jobAnnouncementService).postToWebsite(jobAnnouncement.getId());
		verify(jobAnnouncementService).postToTwitter(jobAnnouncement.getId());
		verify(jobAnnouncementService, never()).postToFacebook(any(Long.class));

		assertThat(processInstance).hasPassed(findId("Anzeige auf Firmenwebsite publizieren"),
				findId("Anzeige auf Twitter publizieren"));

		assertThat(processInstance).isEnded();

		verifyNoMoreInteractions(jobAnnouncementService);

	}

	@Test
	@Deployment(resources = { "camunda-testing-job-announcement-publication.bpmn" })
	public void testPublishAlsoOnFacebook() {

		ProcessInstance processInstance = runtimeService().startProcessInstanceByKey(
				"camunda-testing-job-announcement-publication",
				withVariables("jobAnnouncementId", jobAnnouncement.getId(), "twitter", false, "facebook", true));

		verify(jobAnnouncementService).postToWebsite(jobAnnouncement.getId());
		verify(jobAnnouncementService, never()).postToTwitter(any(Long.class));
		verify(jobAnnouncementService).postToFacebook(jobAnnouncement.getId());

		assertThat(processInstance).hasPassed(findId("Anzeige auf Firmenwebsite publizieren"),
				findId("Anzeige auf Facebook Page publizieren"));

		assertThat(processInstance).isEnded();

		verifyNoMoreInteractions(jobAnnouncementService);

	}

	@Test
	@Deployment(resources = { "camunda-testing-job-announcement-publication.bpmn" })
	public void testPublishAlsoOnFacebookAndTwitter() {

		ProcessInstance processInstance = runtimeService().startProcessInstanceByKey(
				"camunda-testing-job-announcement-publication",
				withVariables("jobAnnouncementId", jobAnnouncement.getId(), "twitter", true, "facebook", true));

		verify(jobAnnouncementService).postToWebsite(jobAnnouncement.getId());
		verify(jobAnnouncementService).postToTwitter(jobAnnouncement.getId());
		verify(jobAnnouncementService).postToFacebook(jobAnnouncement.getId());

		assertThat(processInstance).hasPassed(findId("Anzeige auf Firmenwebsite publizieren"),
				findId("Anzeige auf Twitter publizieren"), findId("Anzeige auf Facebook Page publizieren"));

		assertThat(processInstance).isEnded();

		verifyNoMoreInteractions(jobAnnouncementService);

	}
}
