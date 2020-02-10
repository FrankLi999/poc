package com.test.bookstoread;

import org.junit.jupiter.api.extension.ConditionEvaluationResult;
import org.junit.jupiter.api.extension.ExecutionCondition;
import org.junit.jupiter.api.extension.ExtensionContext;
public class RunOnCIExtension implements ExecutionCondition {
    @Override
    public ConditionEvaluationResult evaluateExecutionCondition(ExtensionContext context) {
        String jenkinsHome = System.getenv("JENKINS_HOME");
        if (jenkinsHome != null) {
            return ConditionEvaluationResult.enabled("Test enabled on CI");
        }
        return ConditionEvaluationResult.disabled("Test disabled as the environment is not CI");
    }
}