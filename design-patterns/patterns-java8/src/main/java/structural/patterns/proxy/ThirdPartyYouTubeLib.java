package structural.patterns.proxy;

import java.util.HashMap;
/*
 * Proxies delegate all of the real work to some other object. Each proxy method should, 
 * in the end, refer to a service object unless the proxy is a subclass of a service.
 * 
 * Proxy can do things like caching etc.
 */
public interface ThirdPartyYouTubeLib {
    HashMap<String, Video> popularVideos();

    Video getVideo(String videoId);
}