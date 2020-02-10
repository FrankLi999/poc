package com.test;

import org.hamcrest.Matchers;
//import org.junit.Test;
//import org.junit.runner.RunWith;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static io.restassured.RestAssured.get;
import static org.hamcrest.CoreMatchers.is;

//@RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.DEFINED_PORT)
public class DemoApplicationTests {

	@Test
	public void testCustomerList() {

		get("http://localhost:8080/list")
				.then()
				.assertThat()
				.statusCode(200)
				.body("size()", is(2));


		get("http://localhost:8080/one/0")
				.then()
				.assertThat()
				.statusCode(200)
				.body("name", Matchers.equalTo("frank"));

		get("http://localhost:8080/one/1")
				.then()
				.assertThat()
				.statusCode(200)
				.body("name", Matchers.equalTo("john"));

	}

}
