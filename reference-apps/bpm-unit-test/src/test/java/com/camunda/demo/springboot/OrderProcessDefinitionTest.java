package com.camunda.demo.springboot;

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

public class OrderProcessDefinitionTest extends BaseProcessWithMockTestCase {

    // private static final String ORDER_PROCESS_KEY = "order";
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
    @Deployment(resources = "order.bpmn")
    public void startTestProcess() throws InterruptedException {
	    
//    	RuntimeService runtimeService = processEngineRule.getRuntimeService();
//	    ProcessInstance pi = runtimeService.startProcessInstanceByKey(ORDER_PROCESS_KEY);
//	    assertThat(pi).isNotNull();
//        runtimeService.deleteProcessInstance(pi.getId(), "JUnit test");
    }
}