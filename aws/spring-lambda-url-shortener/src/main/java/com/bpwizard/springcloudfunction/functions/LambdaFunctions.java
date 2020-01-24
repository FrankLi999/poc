package com.bpwizard.springcloudfunction.functions;

import com.amazonaws.services.lambda.invoke.LambdaFunction;
import com.bpwizard.springcloudfunction.functiontypes.EmailDetails;

public interface LambdaFunctions {
	@LambdaFunction(functionName="SendShortcodeEmail")
    Boolean sendShortcodeGeneratedEmail(EmailDetails emailDetails);
}
