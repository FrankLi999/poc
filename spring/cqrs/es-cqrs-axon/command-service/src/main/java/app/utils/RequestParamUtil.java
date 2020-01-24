package app.utils;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class RequestParamUtil {
    private RequestParamUtil() {}
    private static final Function<String[], String> arrToStr = strings -> Arrays.stream(strings).collect(Collectors.joining(", "));
    private static final Function<Map.Entry<String, String[]>, String> entryToStr = (e) -> "key: " + e.getKey() + " values: " + arrToStr.apply(e.getValue());
    public static String paramToStr(Map<String, String[]> parameterMap) {
        final String noParamsStr = "NO-PARAMETERS";
        if (parameterMap.isEmpty()) {
            return noParamsStr;
        }
        return parameterMap.entrySet()
                .stream()
                .map(entryToStr)
                .collect(Collectors.joining("\n"));

    }
}
