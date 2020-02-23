package com.bpwizard.boot.oauth1;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.bpwizard.boot.oauth1.woocommerce.ApiVersionType;
import com.bpwizard.boot.oauth1.woocommerce.EndpointBaseType;
import com.bpwizard.boot.oauth1.woocommerce.WooCommerce;
import com.bpwizard.boot.oauth1.woocommerce.WooCommerceAPI;
import com.bpwizard.boot.oauth1.woocommerce.oauth.OAuthConfig;

@SpringBootApplication
public class BootWoocommerceOauth1Application {

	public static void main(String[] args) {
		SpringApplication.run(BootWoocommerceOauth1Application.class, args);
	}
    
	@EventListener(ApplicationReadyEvent.class)
	public void doSomethingAfterStartup() {
	    System.out.println(">>>>>>>>>>> Spring boot is ready, testing WooCommerce Oauth1");
	    
	 // Setup client
        OAuthConfig config = new OAuthConfig(
        		"http://192.168.0.104:18280/my-shop/wordpress", 
        		"ck_94101d8485922eeb22a6725568f5c1105a88579b", 
        		"cs_4a8b74a1e1a7c391dfa0872a991bc972276c8eb6");
        WooCommerce wooCommerce = new WooCommerceAPI(config, ApiVersionType.V3);

        // Prepare object for request
        Map<String, Object> productInfo = new HashMap<>();
        productInfo.put("name", "Premium Quality");
        productInfo.put("type", "simple");
        productInfo.put("regular_price", "21.99");
        productInfo.put("description", "Pellentesque habitant morbi tristique senectus et netus");

        // Make request and retrieve result
        Map<?, ?> product = wooCommerce.create(EndpointBaseType.PRODUCTS.getValue(), productInfo);

        System.out.println(product.get("id"));

        // Get all with request parameters
        Map<String, String> params = new HashMap<>();
        params.put("per_page","100");
        params.put("offset","0");
		List<?> products = wooCommerce.getAll(EndpointBaseType.PRODUCTS.getValue(), params);

        System.out.println(String.format("Got %d products", products.size()));
        for (Object prod: products) {
        	System.out.println(String.format("product %s :", prod));
        }
	}
}
