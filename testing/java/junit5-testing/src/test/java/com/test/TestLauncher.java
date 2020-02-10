package com.test;
import java.io.PrintWriter;

import org.junit.platform.engine.discovery.DiscoverySelectors;
import org.junit.platform.launcher.Launcher;
import org.junit.platform.launcher.LauncherDiscoveryRequest;
import org.junit.platform.launcher.core.LauncherDiscoveryRequestBuilder;
import org.junit.platform.launcher.core.LauncherFactory;
import org.junit.platform.launcher.listeners.SummaryGeneratingListener;

public class TestLauncher {

    public static void main(String[] args) {
        Launcher launcher = LauncherFactory.create();
        SummaryGeneratingListener summaryGeneratingListener = new SummaryGeneratingListener();
        launcher.registerTestExecutionListeners(summaryGeneratingListener);
        
        LauncherDiscoveryRequest discoveryRequest =
                LauncherDiscoveryRequestBuilder
                        .request()
                        .selectors(DiscoverySelectors.selectPackage("com.test.bookstoread"))
                        .build();
        // We send the request to registered engines using the execute method.
        launcher.execute(discoveryRequest);
        summaryGeneratingListener.getSummary().printTo(new PrintWriter(System.out));
    }
}