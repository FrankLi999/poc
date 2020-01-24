FROM openjdk:8-jdk-alpine
ENV DOTCMS_HOME /opt/dotcms
ENV TOMCAT_VERSION 8.5.32
ENV DOTCMS_VERSION 5.0.2
COPY dotcms_$DOTCMS_VERSION.tar.gz ./dotcms_$DOTCMS_VERSION.tar.gz
RUN mkdir -p $DOTCMS_HOME \
    && tar xzf dotcms_$DOTCMS_VERSION.tar.gz -C $DOTCMS_HOME \
    && rm dotcms_$DOTCMS_VERSION.tar.gz \
    && chmod +x $DOTCMS_HOME/bin/*.sh \
    && chmod +x $DOTCMS_HOME/dotserver/tomcat-$TOMCAT_VERSION/bin/*.sh

ADD server.xml $DOTCMS_HOME/dotserver/tomcat-$TOMCAT_VERSION/conf/server.xml
ADD log4j2.xml $DOTCMS_HOME/dotserver/tomcat-$TOMCAT_VERSION/webapps/ROOT/WEB-INF/log4j/log4j2.xml
ADD context.xml $DOTCMS_HOME/dotserver/tomcat-$TOMCAT_VERSION/webapps/ROOT/META-INF/context.xml
ADD dotmarketing-config-ext.properties $DOTCMS_HOME/plugins/com.dotcms.config/conf/dotmarketing-config-ext.properties

EXPOSE 8080 8009 8000

CMD ["/opt/dotcms/bin/startup.sh", "run"]
