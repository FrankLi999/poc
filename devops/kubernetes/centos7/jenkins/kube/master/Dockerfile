from jenkins/jenkins:lts


# install Notifications and Publishing plugins
RUN /usr/local/bin/install-plugins.sh email-ext:2.63
RUN /usr/local/bin/install-plugins.sh mailer:1.21
RUN /usr/local/bin/install-plugins.sh slack:2.3

# Artifacts
RUN /usr/local/bin/install-plugins.sh htmlpublisher:1.16

# UI
RUN /usr/local/bin/install-plugins.sh greenballs:1.15
RUN /usr/local/bin/install-plugins.sh simple-theme-plugin:0.5.1
RUN /usr/local/bin/install-plugins.sh workflow-job:2.25
RUN /usr/local/bin/install-plugins.sh workflow-aggregator:2.5
RUN /usr/local/bin/install-plugins.sh credentials-binding:1.16
RUN /usr/local/bin/install-plugins.sh git:2.91:3.9.1

# Scaling
RUN /usr/local/bin/install-plugins.sh kubernetes:1.12.6
RUN /usr/local/bin/install-plugins.sh docker-plugin:1.1.5

# Distributed Builds plugins
RUN /usr/local/bin/install-plugins.sh ssh-slaves:1.28.1

# install Maven
USER root
RUN apt-get update && apt-get install -y maven
USER jenkins
