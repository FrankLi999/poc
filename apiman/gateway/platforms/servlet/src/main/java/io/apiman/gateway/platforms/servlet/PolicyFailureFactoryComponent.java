/*
 * Copyright 2013 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.apiman.gateway.platforms.servlet;

import io.apiman.gateway.engine.beans.PolicyFailure;
import io.apiman.gateway.engine.beans.PolicyFailureType;
import io.apiman.gateway.engine.components.IPolicyFailureFactoryComponent;

/**
 * Simple policy failure factory component implementation.  Uses the thread local
 * policy failure instance.  Only useful in the synchronous WAR implementation of the
 * apiman gateway.
 *
 * @author eric.wittmann@redhat.com
 */
public class PolicyFailureFactoryComponent implements IPolicyFailureFactoryComponent {

    /**
     * Constructor.
     */
    public PolicyFailureFactoryComponent() {
    }

    /**
     * @see io.apiman.gateway.engine.components.IPolicyFailureFactoryComponent#createFailure(io.apiman.gateway.engine.beans.PolicyFailureType, int, java.lang.String)
     */
    @Override
    public PolicyFailure createFailure(PolicyFailureType type, int failureCode, String message) {
        PolicyFailure failure = GatewayThreadContext.getPolicyFailure();
        failure.setFailureCode(failureCode);
        failure.setMessage(message);
        failure.setType(type);
//        failure.setResponseCode(500);
        return failure;
    }

}
