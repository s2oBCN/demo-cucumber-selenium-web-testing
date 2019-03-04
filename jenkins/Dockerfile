FROM jenkins/jenkins:lts
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
COPY jenkins.yaml /var/jenkins_home/jenkins.yaml

USER root

RUN apt-get -qq update \
   && apt-get -qq -y install \
   curl

RUN curl -sSL https://get.docker.com/ | sh

RUN usermod -a -G staff,docker jenkins

USER jenkins
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

