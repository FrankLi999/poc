package com.bpwizard.boot.oauth1.woocommerce.integration;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Ignore;
//import org.junit.Test;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import com.bpwizard.boot.oauth1.woocommerce.ApiVersionType;
import com.bpwizard.boot.oauth1.woocommerce.EndpointBaseType;
import com.bpwizard.boot.oauth1.woocommerce.WooCommerce;
import com.bpwizard.boot.oauth1.woocommerce.WooCommerceAPI;
import com.bpwizard.boot.oauth1.woocommerce.oauth.OAuthConfig;

public class WooCommerceClientTest {

    private static final String CONSUMER_KEY = "ck_d35e7be7cc695d87f23490729dd80e173f88c8f5";
    private static final String CONSUMER_SECRET = "cs_53a835760712ebf0c8bcf2a21197af4b2323a052";
    private static final String WC_URL = "http://localhost/index.php";

    private WooCommerce wooCommerce;

    @BeforeEach
    public void setUp() {
        wooCommerce = new WooCommerceAPI(new OAuthConfig(WC_URL, CONSUMER_KEY, CONSUMER_SECRET), ApiVersionType.V2);
    }

    @Disabled
    @Test
    public void apiCreateProductTest() {
        Map<String, Object> productInfo = new HashMap<>();
        productInfo.put("name", "Premium Quality");
        productInfo.put("type", "simple");
        productInfo.put("regular_price", "21.99");
        productInfo.put("description", "Pellentesque habitant morbi tristique senectus et netus");
        @SuppressWarnings("rawtypes")
		Map product = wooCommerce.create(EndpointBaseType.PRODUCTS.getValue(), productInfo);
        Assertions.assertNotNull(product);
    }

    @Disabled
    @Test
    public void apiGetAllProductsTest() {
        Map<String, String> params = new HashMap<>();
        params.put("per_page","100");
        params.put("offset","0");
        Object products = wooCommerce.getAll(EndpointBaseType.PRODUCTS.getValue(), params);
        Assertions.assertNotNull(products);
    }

    @Disabled
    @Test
    public void apiGetProductTest() {
    	@SuppressWarnings("rawtypes")
        Map product = wooCommerce.get(EndpointBaseType.PRODUCTS.getValue(), 79);
        Assertions.assertNotNull(product);
    }

    @Disabled
    @Test
    public void apiUpdateProductTest() {
        Map<String, Object> productInfo = new HashMap<>();
        productInfo.put("name", "Premium Quality UPDATED");
        @SuppressWarnings("rawtypes")
        Map product = wooCommerce.update(EndpointBaseType.PRODUCTS.getValue(), 10, productInfo);
        Assertions.assertNotNull(product);
    }

    @Disabled
    @Test
    public void apiDeleteProductTest() {
    	@SuppressWarnings("rawtypes")
        Map product = wooCommerce.delete(EndpointBaseType.PRODUCTS.getValue(), 10);
        Assertions.assertNotNull(product);
    }

    @Disabled
    @Test
    public void apiBatchVariationTest() {
        Integer productId = 20072;

        List<Map<String, Object>> variations = new ArrayList<>();
        for (int variationId = 20073; variationId <= 20081; variationId++){
            Map<String, Object> variation = new HashMap<>();
            variation.put("id", variationId+"");
            variation.put("regular_price", "10");
            variations.add(variation);
        }

        Map<String, Object> reqOptions = new HashMap<>();
        reqOptions.put("update", variations);
        @SuppressWarnings("rawtypes")
        Map response = wooCommerce.batch(String.format("products/%d/variations", productId), reqOptions);
        Assertions.assertNotNull(response);
    }

    @Disabled
    @Test
    public void apiBatchProductTest() {

        List<Map<String, Object>> products = new ArrayList<>();
        Map<String, Object> product = new HashMap<>();
        product.put("id", "19916");
        product.put("name", "MODIFIED NAME");
        products.add(product);

        Map<String, Object> reqOptions = new HashMap<>();
        reqOptions.put("update", products);
        @SuppressWarnings("rawtypes")
        Map response = wooCommerce.batch(EndpointBaseType.PRODUCTS.getValue(), reqOptions);
        Assertions.assertNotNull(response);
    }

}
