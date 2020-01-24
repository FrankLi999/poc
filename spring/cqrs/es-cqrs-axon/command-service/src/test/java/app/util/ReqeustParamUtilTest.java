package app.util;

import app.utils.RequestParamUtil;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;

import static junit.framework.TestCase.assertEquals;

public class ReqeustParamUtilTest {

    @Test
    public void testParamToStr() {
        Map<String, String[]> paramMap = new HashMap<>();
        paramMap.put("1", new String[]{"a", "b"});
        paramMap.put("2", new String[]{"c", "d"});

        String result = "key: 1" + " values: a, b" + "\n" +
                "key: 2" + " values: c, d";
        String actualResult = RequestParamUtil.paramToStr(paramMap);
        assertEquals(result, actualResult);

    }

    @Test
    public void testParamToStr_WithEmtpty() {
        Map<String, String[]> paramMap = new HashMap<>();

        String result = "NO-PARAMETERS";
        String actualResult = RequestParamUtil.paramToStr(paramMap);
        assertEquals(result, actualResult);

    }

    @Test
    public void completableFutureTest() throws Exception {
        Function<String, String> f = s -> s + " applied";
//        Function<String, String> f = s -> {throw new RuntimeException("test");};
        CompletableFuture<String> completableFuture = CompletableFuture.supplyAsync(() -> "test")
                .thenApply(f)
                .exceptionally(e -> {
                    throw new RuntimeException(e);
                });

        String result = completableFuture.get();
        System.out.println(result);
    }
}
