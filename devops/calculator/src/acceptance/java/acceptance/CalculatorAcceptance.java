package acceptance;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

/** Runner for the acceptance test. */
@RunWith(Cucumber.class)
@CucumberOptions(features = "classpath:acceptance")
public class CalculatorAcceptance {
}