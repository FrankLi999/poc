package com.bpwizard.bpm.content.helper;

import org.camunda.bpm.engine.impl.history.HistoryLevel;
import org.camunda.bpm.engine.impl.persistence.StrongUuidGenerator;
import org.camunda.bpm.engine.test.mock.MockExpressionManager;
import org.camunda.bpm.extension.process_test_coverage.junit.rules.ProcessCoverageInMemProcessEngineConfiguration;

/**
 * Default in memory configuration, pre-configured with mock, dbSchema and
 * metrics.
 */
public class StandaloneInMemoryTestConfigurationWithMock extends ProcessCoverageInMemProcessEngineConfiguration {
	public StandaloneInMemoryTestConfigurationWithMock() {
		// super();
		this.databaseSchemaUpdate = DB_SCHEMA_UPDATE_DROP_CREATE;
		this.jdbcUrl = "jdbc:h2:mem:camundatest;DB_CLOSE_ON_EXIT=FALSE";
		
		this.jobExecutorActivate = false;
		this.expressionManager = new MockExpressionManager();
		this.idGenerator = new StrongUuidGenerator();
		// isDbMetricsReporterActivate = false;
		historyLevel = HistoryLevel.HISTORY_LEVEL_FULL;
		
		
	}
}