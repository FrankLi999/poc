package org.camunda.bpm.engine.test.assertions.examples;
import javax.annotation.PostConstruct;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.test.Deployment;
import org.camunda.bpm.engine.test.ProcessEngineRule;
import org.camunda.bpm.extension.process_test_coverage.junit.rules.TestCoverageProcessEngineRuleBuilder;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.bpwizard.bpm.content.helper.BaseProcessWithMockTestCase;

/**
 * Sanity test to verify the example process is syntactical correct and can be
 * deployed to the engine. All "real" tests should be implemented in the
 * according modules (jbehave, assertions, needle, ...).
 */
public class ReceiveInvoiceProcessTest extends BaseProcessWithMockTestCase {

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
  @Deployment(resources = "camunda-testing-invoice-en.bpmn")
  public void shouldDeployWithoutErrors() throws Exception {
    // nothing here, test successful if deployment works
  }
}
