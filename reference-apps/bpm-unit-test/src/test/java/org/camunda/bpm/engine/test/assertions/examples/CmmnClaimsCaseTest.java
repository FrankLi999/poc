package org.camunda.bpm.engine.test.assertions.examples;

import static org.camunda.bpm.engine.test.assertions.cmmn.CmmnAwareTests.assertThat;

import javax.annotation.PostConstruct;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.runtime.CaseExecution;
import org.camunda.bpm.engine.test.Deployment;
import org.camunda.bpm.engine.test.ProcessEngineRule;
import org.camunda.bpm.engine.test.assertions.examples.jobannouncement.JobAnnouncement;
import org.camunda.bpm.engine.test.assertions.examples.jobannouncement.JobAnnouncementService;
import org.camunda.bpm.extension.process_test_coverage.junit.rules.TestCoverageProcessEngineRuleBuilder;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import com.bpwizard.bpm.content.helper.BaseProcessWithMockTestCase;

public class CmmnClaimsCaseTest extends BaseProcessWithMockTestCase {

	@Autowired
	public ProcessEngine processEngine;

	@Rule
	@ClassRule
	public static ProcessEngineRule processEngineRule;

	@PostConstruct
	void initRule() {
		//// With Coverage:
		processEngineRule = TestCoverageProcessEngineRuleBuilder.create(processEngine).build();
		// processEngineRule = new ProcessEngineRule(processEngine);
	}

	@Test
	@Deployment(resources = "camunda-testing-claims.cmmn")
	public void testDeployment() throws Exception {
		// nothing here, test successful if deployment works
		assertThat(Mockito.mock(CaseExecution.class)).isNotNull();
	}

}
