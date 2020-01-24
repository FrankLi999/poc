FROM anapsix/alpine-java:8_jdk

ENV DOTCMS_HOME /opt/dotcms
ENV DOTCMS_VERSION 5.0.2
ENV TOMCAT_VERSION 8.5.32

RUN apk add --update bash curl && rm -rf /var/cache/apk/* \
    && mkdir -p $DOTCMS_HOME \
    && curl -O http://192.168.0.103:8000/dotcms_$DOTCMS_VERSION.tar.gz \
    && tar xzf dotcms_$DOTCMS_VERSION.tar.gz -C $DOTCMS_HOME \
    && rm dotcms_$DOTCMS_VERSION.tar.gz \
    && chmod +x $DOTCMS_HOME/bin/*.sh \
    && chmod +x $DOTCMS_HOME/dotserver/tomcat-$TOMCAT_VERSION/bin/*.sh

ADD server.xml /opt/dotcms/dotserver/tomcat-8.5.32/conf/server.xml
ADD log4j2.xml /opt/dotcms/dotserver/tomcat-8.5.32/webapps/ROOT/WEB-INF/log4j/log4j2.xml
ADD context.xml /opt/dotcms/dotserver/tomcat-8.5.32/webapps/ROOT/META-INF/context.xml
ADD dotmarketing-config-ext.properties /opt/dotcms/plugins/com.dotcms.config/conf/dotmarketing-config-ext.properties
ADD dotcms-config-cluster-ext.properties /opt/dotcms/plugins/com.dotcms.config/conf/dotcms-config-cluster-ext.properties

EXPOSE 8080 8009 8000

CMD ["/opt/dotcms/bin/startup.sh", "run"]
