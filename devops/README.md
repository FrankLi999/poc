Docker config files on centos 75
: 
/usr/lib/systemd/system/docker.service

/etc/systemd/system/docker.service.d/docker-options.conf
   under [service] stanza
   Environment="DOCKER_OPTS=--insecure-registry=10.233.0.0/18 --insecure-registry=docker.bpwizard.com  --graph=/var/lib/docker  --log-opt max-size=50m --log-opt max-file=5 \
--iptables=false"

   docker login docker.bpwizard.com
   
   ~.docker/config.json
   {
		"auths": {
			"10.233.0.117:5000": {
				"auth": "YWRtaW46YWRtaW4xMjM="
			},
			"docker.bpwizard.com": {
				"auth": "YWRtaW46YWRtaW4xMjM="
			}
		},
		"HttpHeaders": {
			"User-Agent": "Docker-Client/18.06.0-ce (linux)"
		}
	}

================================================
ansible-playbook -i inventory/mycluster/hosts.ini cluster.yml# Install Java 8 on Ububntu 16.04
https://websiteforstudents.com/how-to-install-oracle-java-jdk8-on-ubuntu-16-04-17-10-18-04-desktops/
sudo add-apt-repository ppa:webupd8team/java
sudo apt update
sudo apt install oracle-java8-installer
javac -version

#Install maven on ubuntu 16.04
cd /opt/
sudo wget http://www-eu.apache.org/dist/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz
sudo tar -xvzf apache-maven-3.5.4-bin.tar.gz
sudo rm -f apache-maven-3.5.4-bin.tar.gz
sudo mv apache-maven-3.5.4 maven 
sudo vi /etc/profile.d/mavenenv.sh
export M2_HOME=/opt/maven
export PATH=${M2_HOME}/bin:${PATH}
sudo chmod +x /etc/profile.d/mavenenv.sh
sudo source /etc/profile.d/mavenenv.sh

set up ~/.m2/settings.xml

#Install Jenkins on Ubuntu 16.04

wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
sudo systemctl stop jenkins
sudo vi /etc/default/jenkins
change HTTP_PORT=49001
sudo systemctl start jenkins

sudo systemctl status jenkins

#Install Ansible on Ubuntu 16.04
  $ sudo apt-get install -y software-properties-common
  $ sudo apt-add-repository ppa:ansible/ansible
  $ sudo apt-get update
  $ sudo apt-get install ansible
  $ sudo apt-get install python-pip
  #Needed for ELK and Helm
  sudo pip install netaddr

This package installation will:

    Setup Jenkins as a daemon launched on start. See /etc/init.d/jenkins for more details.

    Create a jenkins user to run this service.

    Direct console log output to the file /var/log/jenkins/jenkins.log. Check this file if you
	are troubleshooting Jenkins.

    Populate /etc/default/jenkins with configuration parameters for the launch, e.g JENKINS_HOME

    Set Jenkins to listen on port 8080. Access this port with your browser to start configuration.

	

If your /etc/init.d/jenkins file fails to start Jenkins, edit the /etc/default/jenkins 
to replace the line ----HTTP_PORT=8080---- with ----HTTP_PORT=8081---- Here, "8081" was chosen 
but you can put another port available.



sudo ufw allow 8080
sudo ufw status

	docker plugin
	HTML Publisher Plugin
		https://wiki.jenkins.io/display/JENKINS/HTML+Publisher+Plugin
		for publishHTML step
	Build Timestamp Plugin 
      set the timestamp format in the Jenkins configuration (for example, to "yyyyMMdd-HHmm")
#Install node.js on Ubuntu 16.04
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN apt-get install -y nodejs
# Server machine
  >> Enable SSH in Ubuntu 16.04 LTS
     sudo apt-get install openssh-server     

  sudo su -
    vi /etc/docker/daemon.json
    {
      "insecure-registries" : ["nexus.bpwizard.com:8950"]
    }

    sudo no password
  > sudo visudo
  > add the following line
     fli ALL=(ALL) NOPASSWD:ALL

    edit /etc/hosts
    add:
       192.168.79.210 maven.bpwizard.com maven
       192.168.79.210 git.bpwizard.com git
       192.168.79.210 nexus.bpwizard.com nexus
   > Ansible script: need to login first before pull images
   
   > set host name
   http://ubuntuhandbook.org/index.php/2016/06/change-hostname-ubuntu-16-04-without-restart/
   
   sudo vi /etc/hostname /etc/hosts
   systemctl restart systemd-logind.service
   or 
   hostnamectl set-hostname NEW_NAME_HERE
# Docker
## install docker
    https://medium.com/@Grigorkh/how-to-install-docker-on-ubuntu-16-04-3f509070d29c
  
    o curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    o sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    o sudo apt-get update
    o apt-cache policy docker-ce
    o sudo apt-get install -y docker-ce
    o sudo systemctl status docker

    o sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    o sudo chmod +x /usr/local/bin/docker-compose
    o docker-compose --version

## Executing the Docker Command Without Sudo 
   
  If you want to avoid typing sudo whenever you run the docker command, 
  add your username to the docker group:

  sudo usermod -aG docker ${USER}
  id -nG
## sudo no password
  > sudo visudo
  > add the following line
  fli ALL=(ALL) NOPASSWD:ALL

## ssh to remote no password
  Enable SSH in Ubuntu 16.04 LTS
  http://ubuntuhandbook.org/index.php/2016/04/enable-ssh-ubuntu-16-04-lts/
    sudo apt-get install openssh-server
    sudo service ssh status

    config file: /etc/ssh/sshd_config

  https://www.thegeekstuff.com/2008/11/3-steps-to-perform-ssh-login-without-password-using-ssh-keygen-ssh-copy-id/

  o on local host
  > ssh-keygen
  > default id file: /home/fli/.ssh/id_rsa
    default pub key file: /home/fli/.ssh/id_rsa.pub

    no keyphrase

    The key fingerprint is:
      SHA256:LFxwgajMoq305il7VsVlPX+22bIyhzX2C00PDZlYvbQ fli@ubuntu
      The key's randomart image is:
      +---[RSA 2048]----+
      |     ...o..   .. |
      |    . .o o o o +.|
      | o .  . +   + = o|
      |. +  . =     . E |
      |.o    + S     +.=|
      |...  . .      B+o|
      |... .        = *.|
      |.. =.       + + .|
      | .Bo         + ..|
      +----[SHA256]-----+


  > Copy the public key to remote-host using ssh-copy-id

   on localhost:
   ssh-copy-id -i ~/.ssh/id_rsa.pub remote-host 
   
   for example:
   ssh-copy-id -i ~/.ssh/id_rsa.pub 192.168.126.168


## Docker images

  Jenkins
  Jenkins slave with maven, gradle, npm/yarn, docker, git and ansible
  Nexus 3
  Gitlab
  
##Host ubuntu 16.04

  sudo su -
  vi /lib/systemd/system/docker.service
  add "-H 0.0.0.0:2375" to ExecStart
    for example:
      ExecStart=/usr/bin/dockerd --log-opt max-size=50m --log-opt max-file=10 -H 0.0.0.0:2375
 
  
## Jenkins

    
  Use this: docker -H 172.17.0.1 pull jenkins/jenkins:2.121
  June 18: 2.126

  Jenkins port: 49001
  admin/admin

  $ mkdir $HOME/jenkins_home
  $ chown 1000 $HOME/jenkins_home
  docker  run -v $HOME/jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:2.121
  docker  run -d -p 49001:8080 -v $HOME/jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:2.121
  
  
  http://192.168.79.210:49001
   $ docker logs jenkins to find the password

   or 

   docker exec -i <container-id> /bin/bash
   cat /var/jenkins_home/secrets/initialAdminPassword
  
  jenkins docker plugin
      add docker slave:
          manage jenkins -> config system -> add new cloud at the bottom and select docker
          name: jenkins-slave-ansible-docker-git
          docker host uri: tcp://172.17.0.1:2375
          
          Remote Filing System Root: /home/jenkins
          docker images: nexus.bpwizard.com:8950/bpw/jenkins-slave-ansible-docker-git:1
           
          
  jenkins maven plugin
  https://wiki.jenkins.io/display/JENKINS/HTML+Publisher+Plugin
      for publishHTML step

  Build Timestamp Plugin 
      set the timestamp format in the Jenkins configuration (for example, to "yyyyMMdd-HHmm")
##Jenkins slave

https://github.com/FrankLi999/devops/tree/master/ansible-jenkins-slave-docker
forked from:
https://github.com/AlbanAndrieu/ansible-jenkins-slave-docker  

o updated "Dockerfile-jenkins-slave-ubuntu-16.04", the last line so that Jenkins slave is aware of nexus amd git repos.
    ENTRYPOINT sudo sh -c 'echo 172.17.0.1 nexus.bpwizard.com >> /etc/hosts && echo 172.17.0.1 git.bpwizard.com >> /etc/hosts' && bash
o added .m2/settings.xml pointing to nexus 3 maven repo
o added .npmrc pointing to nexus 3 npm repo.


docker -H 172.17.0.1:2375 build -f Dockerfile-jenkins-slave-ubuntu-16.04 -t "jenkins-slave-ansible-git-mvn" . --no-cache
docker 17.04+:
docker -H 172.17.0.1:2375 build \
    --add-host nexus.bpwizard.com:172.17.0.1 \
    --add-host git.bpwizard.com:172.17.0.1 \
	--no-cache --tag "latest" \
	-t "jenkins-slave-ansible-git-mvn" \
	-f Dockerfile-jenkins-slave-ubuntu-16.04 .

##Git 
  install git on ubuntn

  sudo apt-get install -y git
  
  port number: 8929
  root/Passw0rd

  o mkdir $HOME/volume-gitlab/config
  o mkdir $HOME/volume-gitlab/logs
  o mkdir $HOME/volume-gitlab/data
  chmod 777 $HOME/volume-gitlab/config
  chmod 777 $HOME/volume-gitlab/logs
  chmod 777 $HOME/volume-gitlab/data
  
  // o $ chown 1000 $HOME/gitlab/config

  o docker -H 172.17.0.1:2375 run --detach \
    --hostname gitlab.bpwizard.com \
    --publish 8929:80 --publish 8930:443 --publish 8931:22 \
    --name gitlab \
    --restart always \
    --volume $HOME/gitlab/config:/etc/gitlab \
    --volume $HOME/gitlab/logs:/var/log/gitlab \
    --volume $HOME/gitlab/data:/var/opt/gitlab \
    gitlab/gitlab-ce:latest


## nexus 3

admin/admin123

port number: 
    maven/npm repo: 8981
    docker hosted repo: 8950
    docker group repo: 8960
mkdir $HOME/nexus-data 
chown -R 200 $HOME/nexus-data
chown 1000 $HOME/nexus-data
docker -H 172.17.0.1:2375 run -d -p 8981:8081 -p 8950:8950 -p 8960:8960 --name nexus -v $HOME/nexus-data:/nexus-data sonatype/nexus3

sudo su -
vi /etc/docker/daemon.json
{
  "insecure-registries" : ["docker.bpwizard.com:5000"]
}

or for kunernetes, edit
'etc/systemd/system/docker.service.d/docker-options.conf'

such as:

 Environment="DOCKER_OPTS=--insecure-registry=docker.bpwizard.com:5000 --graph=/var/lib/docker  --log-opt max-size=50m --log-opt max-file=5 \
--iptables=false"

sudo systemctl restart docker



### Maven repo
  ============================================================================
  Maven build lifecycle:
    validate - validate the project is correct and all necessary information is available
    compile - compile the source code of the project
    test - test the compiled source code using a suitable unit testing framework. These tests should not require the code be packaged or deployed
    package - take the compiled code and package it in its distributable format, such as a JAR.
    verify - run any checks on results of integration tests to ensure quality criteria are met
    install - install the package into the local repository, for use as a dependency in other projects locally
    deploy - done in the build environment, copies the final package to the remote repository for sharing with other developers and projects.
  ============================================================================
  http://codeheaven.io/using-nexus-3-as-your-repository-part-1-maven-artifacts/

  Configuring your clients and projects to use your Nexus repos
  Put this in your ~/.m2/settings.xml file. This will configure the credentials to publish to your hosted repos, and will tell your mvn to use your repo as a mirror of central:

    <?xml version="1.0" encoding="UTF-8"?>
    <settings xmlns="http://maven.apache.org/SETTINGS/1.1.0"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.1.0 http://maven.apache.org/xsd/settings-1.1.0.xsd">

      <servers>
        <server>
          <id>nexus-snapshots</id>
          <username>admin</username>
          <password>admin123</password>
        </server>
        <server>
          <id>nexus-releases</id>
          <username>admin</username>
          <password>admin123</password>
        </server>
      </servers>

      <mirrors>
        <mirror>
          <id>central</id>
          <name>central</name>
          <url>http://nexus.bpwizard.com:8981/repository/maven-public/</url>
          <mirrorOf>*</mirrorOf>
        </mirror>
      </mirrors>

    </settings>
    And now configure your projects.

    If you want only to download dependencies from Nexus, put this in the pom.xml:

    <project ...>

      ...

      <repositories>
        <repository>
          <id>maven-group</id>
          <url>http://nexus.bpwizard.com:8981/repository/maven-public/</url>
        </repository>
      </repositories>
      ...
    </project>
    And if you want also to publish your project, add:

    <project ...>

      ...

      <distributionManagement>
        <snapshotRepository>
          <id>nexus-snapshots</id>
          <url>http://nexus.bpwizard.com:8981/repository/maven-snapshots/</url>
        </snapshotRepository>
        <repository>
          <id>nexus-releases</id>
          <url>http://nexus.bpwizard.com:8981/repository/maven-releases/</url>
        </repository>
      </distributionManagement>
    </project>


### NPM repo
https://blog.sonatype.com/using-nexus-3-as-your-repository-part-2-npm-packages
  three npm repo:
  npm-hosted - allow redeploy
  npm-proxy - http://registry.npmjs.org
  npm-group - above two

  o Configuring your clients and projects to use your Nexus repos
    
    If you have a project where you only want to download dependencies from Nexus, 
    create a .npmrc file at your project’s root with:

    registry=http://your-host:8081/repository/npm-group/
    _auth=YWRtaW46YWRtaW4xMjM=
  
    _auth=YWRtaW46YWRtaW4xMjM= is the base64 hash for the credentials (admin/admin123).
    If you use a different set of credentials, you should compute your own hash with:

    echo -n 'myuser:mypassword' | openssl base64

  o ~/.npmrc

    You have to set a user so you can publish packages. If you do this from your 
    local machine, npm publish will use your user configured in ~/.npmrc (in your home,
    not in your project). If you don’t have this configuration, or if you want to 
    publish from CI, you can set an email=any@email.com configuration in your
    project’s .npmrc. Really, any email.
  o npm publish
    If you have a project that you want to publish to your Nexus, put this in 
    package.json:

      {
        ...

        "publishConfig": {
          "registry": "http://nexus.bpwizard.com:8981/repository/npm-hosted/"
        }
      }

    o Now if you run in your projects:

      npm install
      # or
      npm publish
    your npm will point to your Nexus instance.

    o Installing npm packages globally
      Run:

      npm --registry http://nexus.bpwizard.com:8981/repository/npm-group/ install -g your-pac  

### Docker registry
https://blog.sonatype.com/using-nexus-3-as-your-repository-part-3-docker-images

  o docker login docker.bpwizard.com:5000
    admin/admin123
	
	for now, use: 
	docker login 10.233.40.249:5000
  o docker -H 172.17.0.1:2375 tag jenkins-slave-ansible-git-mvn docker.bpwizard.com:5000/bpw/jenkins-slave-ansible-git-mvn:1
  o docker -H 172.17.0.1:2375 push docker.bpwizard.com:5000/bpw/jenkins-slave-ansible-git-mvn:1
	o docker -H 172.17.0.1:2375 rmi jenkins-slave-ansible-git-mvn
  o docker -H 172.17.0.1:2375 rmi docker.bpwizard.com:5000/bpw/jenkins-slave-ansible-git-mvn:1
  o docker -H 172.17.0.1:2375 pull docker.bpwizard.com:5000/bpw/jenkins-slave-ansible-git-mvn:1

## Docker registry container
  
  $ docker run -d -p 5000:5000 --restart=always --name registry registry:2

  Having the certificates either signed by CA or self-signed, we can move 
  domain.crt and domain.key to the certs directory and start the registry.

  $ docker run -d -p 5000:5000 --restart=always --name registry -v `pwd`/certs:/certs -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key registry:2

  In case of a self-signed certificate, clients have to explicitly trust the certificate. 
  In order to do this, they can copy the domain.crt file to 
  /etc/docker/certs.d/<docker_host_domain>:5000/ca.crt.


## Pushing the image
  In order to push the created image, we need to tag it according to the naming convention:

  <registry_address>/<image_name>:<tag>
  
  The "registry_address" can be:

    User name in case of Docker Hub
    Domain name or IP address with port for a private registry (for example, localhost:5000)
    In most cases, <tag> is in the form of image/application version.

    $ docker tag ubuntu_with_python admin/ubuntu_with_python:1

## Ansible
  
  ### run Ansile in Jenkins pipeline
  
  It runs Ansile in Jenkins pipeline as "jenkins" urser, home at "/var/lib/jenkins/".
  So need to define private key file for the user to run ansibel.
  
  before run Jenkins pipeline:
  > chmod 707 ~fli/services
  > cp ~/.ssh/id_rsa ~fli/services/jenkins_private.key 
  > sudo chown jenkins ~fli/services/jenkins_private.key
  > sudo su - jenkins
  > cd ~/workspace/Calculator
  > ansible-playbook playbook.yml -i inventory/staging -u fli --private-key=~fli/.ssh/id_rsa
  
  Ansible is set up on Jenkins slave socker image.

  $ sudo apt-get install software-properties-common
  $ sudo apt-add-repository ppa:ansible/ansible
  $ sudo apt-get update
  $ sudo apt-get install ansible
  $ sudo apt-get install python-pip

  ### Creating inventory
    sudo vi /etc/ansible/hosts and and it has the following structure:

    [group_name]
    <server1_address>
    <server2_address>
    ...

    such as 
    [webservers]
    web1 ansible_host=192.168.0.241 ansible_user=admin
    web2 ansible_host=192.168.0.242 ansible_user=admin

    In its simplistic form, the Ansible ad hoc command syntax looks as follows:
      ansible <target> -m <module_name> -a <module_arguments>  

  ### Playbook
    ---
    - hosts: web1
      become: yes
      become_method: sudo
      tasks:
      - name: ensure apache is at the latest version
        apt: name=apache2 state=latest
      - name: ensure apache is running
        service: name=apache2 state=started enabled=yes  

    ansible-playbook playbook.yml

    Handlers:
      Ansible provides an event-oriented mechanism to notify about the changes. 
      In order to use it, we need to know two keywords:

      handlers: This specifies the tasks executed when notified
      notify: This specifies the handlers that should be executed

    Variables
      ---
      - hosts: web1
        vars:
          http_port: 8080

      tasks:
      - name: print port number
        debug:
          msg: "Port number: {{http_port}}"

    Apart from user-defined variables, there are also predefined automatic variables. For example, 
        the hostvars variable stores a map with the information regarding all hosts from the inventory. 
        Using the Jinja2 syntax, we could iterate and print the IP addresses of all hosts in the inventory.

    
      ---
      - hosts: web1
        tasks:
        - name: print IP address
          debug:
            msg: "{% for host in groups['all'] %} {{
                    hostvars[host]['ansible_host'] }} {% endfor %}"
     Roles
       The Ansible role is a well-structured playbook part prepared to be included in the playbooks. 
       Roles are separate units that always have the following directory structure:

        templates/
        tasks/
        handlers/
        vars/
        defaults/
        meta/
      
        for example: GitHub: https://github.com/geerlingguy/ansible-role-mysql.
          ---
          - hosts: all
            become: yes
            become_method: sudo
            roles:
            - role: geerlingguy.mysql
              become: yes
      Ansible Galaxy
        Ansible Galaxy is to Ansible what Docker Hub is for Docker-it stores common roles, so that they can be reused 
        by others. You can browse the available roles on the Ansible Galaxy page at: https://galaxy.ansible.com/.
        
        To install the role from Ansible Galaxy, we can use the ansible-galaxy command.

        $ ansible-galaxy install username.role_name
   
        such as
        $ ansible-galaxy install geerlingguy.mysql
  ## Ansible for docker
    There are a few very useful Docker-related modules provided by Ansible: 
      docker_image (build/manage images), 
      docker_container (run containers), 
      docker_image_facts (inspect images), 
      docker_login (log into Docker registry), 
      docker_network (manage Docker networks), 
      docker_service (manage Docker Compose).        

  ## Environments
    Production, Staging, QA, DEV

    Securing environments: 
      Put SSH key into slave: If we don't use dynamic Docker slave provisioning, 
          then we can configure Jenkins slave machines to contain private SSH keys.
          
      Put SSH key into slave image: If we use dynamic Docker slave provisioning, we could 
          add the SSH private key into the Docker slave image. However, it creates a possible 
          security hole, since anyone who has access to that image would have access to the 
          production servers.

      Jenkins credentials: We can configure Jenkins to store credentials and use them 
          in the pipeline.
      Copy to Slave Jenkins plugin: We can copy the SSH key dynamically into the slave while 
          starting the Jenkins build.

    
# Acceptence test pipeline
  o Docker build
    >  The developer pushes a code change to Git repo.
    > Jenkins detects the change, triggers the build, and checks out the current code.
    > Jenkins executes the commit phase and builds the Docker image.
  
  o Docker push
    > Jenkins pushes the image to Docker registry.
  o Acceptance test
    > Jenkins runs the Docker container in the staging environment.
    > Staging the Docker host needs to pull the image from the Docker registry.
    > Jenkins runs the acceptance test suite against the application running 
      in the staging environment.

# Nonfunctional test
  Types of nonfunctional test
    Performace Test such as Round-trip time (RTT): The JMeter plugin for Jenkins can show performance 
        trends over the time.
    Load testing: measure the average request-response time of many concurrent calls common in QA phase.
    Stress testing: not feasure to run it in the Continuous Delivery pipeline.
    Scalability testing: not feasure to run it in the Continuous Delivery pipeline
    Endurance testing: not feasure to run it in the Continuous Delivery pipeline
    Security testing: Security tests should be included in Continuous Delivery as a pipeline stage. 
        They can be written using the same frameworks as the acceptance tests or with dedicated security 
        testing frameworks, for example, BDD security.
    Maintainability testing
      Maintainability tests explain how simple a system is to maintain. In other words, they judge 
      code quality. We already have related stages in the commit phase that check the test coverage 
      and perform static code analysis. The Sonar tool can also give some overview of the code quality 
      and the technical debt.
    Recovery testing: Recovery testing is not part of the Continuous Delivery process, but rather 
      a periodic event to check the overall health.  
# Application versioning
  Semantic versioning: The most popular solution is to use sequence-based identifiers 
  (usually in the form of x.y.z). This method requires a commit to the repository done by 
  Jenkins in order to increase the current version number, which is usually stored in the 
  build file. This solution is well supported by Maven, Gradle, and other build tools. 
  The identifier usually consists of three numbers:
    x: This is the major version; the software does not need to
        be backward-compatible when this version is incremented
    y: This is the minor version; the software needs to be backward compatible when the 
      version is incremented
    z: This is the build number; this is sometimes also considered as a backward and 
      forward-compatible change

  Hash
  Timestamp
  Mixed
# Kubernetes

  Kubectl:
  https://storage.googleapis.com/kubernetes-release/release/v1.10.3/bin/windows/amd64/kubectl.exe
  
  Minikube:
  https://github.com/kubernetes/minikube/releases
  
  minikube version
  kubectl version --short
  
  minikube start - install kubeadm/kubelet
  minikube stop
  minikube ip/minikube dashboard
  kubectl get nodes
  
  ///////////////////////////////////////////////////////////////
  Ubuntu:
	sudo apt-get update && sudo apt-get install -y apt-transport-https
	curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
	sudo bash -c 'echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" > /etc/apt/sources.list.d/kubernetes.list'
  
	// on Kubernetes master
	$ sudo apt-get update && sudo apt-get install -y kubelet kubeadm kubectl
	// on Kubernetes node
	$ sudo apt-get update && sudo apt-get install -y kubelet
	sudo apt-get update && sudo apt-get install -y kubeadm

	install docker on both master and node
	
	Configure cgroup driver used by kubelet on Master Node
	
	on Master:
		turn off swap
			sudo swapoff -a 
			remove any swap entry from /etc/fstab.
			reboot
		
		sudo systemctl enable kubelet && sudo systemctl start kubelet
		
		sudo kubeadm init 
		sudo kubeadm init --apiserver-advertise-address 192.168.77.10 
			 --ignore-preflight-errors=swap
			[WARNING SystemVerification]: docker version is greater than the most recently validated version. Docker version: 18.03.1-ce. Max validated version: 17.03
			[WARNING Swap]: running with swap on is not supported. Please disable swap
			[WARNING FileExisting-crictl]: crictl not found in system path
					 Suggestion: go get github.com/kubernetes-incubator/cri-tools/cmd/crictl
			
		$ mkdir -p $HOME/.kube
		$ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
		$ sudo chown $(id -u):$(id -g) $HOME/.kube/config
		$ sudo systemctl status kubelet
		
		set up the network for container communication. kubeadm supports the CNI 
			(https://github.com/containernetworking/cni). 
		Calico (https://www.projectcalico.org), one CNI provide stable container networking. 
		Calico is light and simple, but still well implemented by the CNI standard and 
		integrated with Kubernetes:

			kubectl apply -f https://docs.projectcalico.org/v2.6/getting-started/kubernetes/installation/hosted/kubeadm/1.6/calico.yaml
		
			Your Kubernetes master has initialized successfully!

			To start using your cluster, you need to run the following as a regular user:

			  mkdir -p $HOME/.kube
			  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
			  sudo chown $(id -u):$(id -g) $HOME/.kube/config

			You should now deploy a pod network to the cluster.
			Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
			  https://kubernetes.io/docs/concepts/cluster-administration/addons/

			  
			  
			You can now join any number of machines by running the following on each node
			as root:

				kubeadm join 192.168.79.214:6443 --token s5g3lh.e8pnlxqhu3ironkz --discovery-token-ca-cert-hash sha256:0e21bd01ae52b4c29a6b1dcb58c7e1cf25b9f34d24c29bc0d0dba34a9eb20cb7

		on a node:
			turn off swap
				sudo swapoff -a 
				remove any swap entry from /etc/fstab.
				reboot
			
			sudo systemctl enable kubelet && sudo systemctl start kubelet
				// on master node, list the token you have in the cluster
				$ sudo kubeadm token list
				TOKEN                     TTL       EXPIRES                     USAGES                   DESCRIPTION                                                EXTRA GROUPS
				s5g3lh.e8pnlxqhu3ironkz   22h       2018-06-21T16:39:53-07:00   authentication,signing   The default bootstrap token generated by 'kubeadm init'.   system:bootstrappers:kubeadm:default-node-token

				What if you call kubeadm token list to list the tokens, and see they are all expired? 
				You can create a new one manually by this command: 
					sudo kubeadm token create .
				// rejoining the same cluster
					$ HASH=$(openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //')
					$ sudo kubeadm join --token da3a90.9a119695a933a867 192.168.122.101:6443 --discovery-token-ca-cert-hash sha256:$HASH
			$ sudo kubeadm join --token da3a90.9a119695a933a867 192.168.122.101:6443 --discovery-token-unsafe-skip-ca-verification
			sudo kubeadm join 192.168.79.214:6443 --token s5g3lh.e8pnlxqhu3ironkz --discovery-token-ca-cert-hash sha256:0e21bd01ae52b4c29a6b1dcb58c7e1cf25b9f34d24c29bc0d0dba34a9eb20cb7
		On master:
			kubectl get nodes	
			
		certifcate files and keys: under /etc/kubernetes/pki
		
  ///////////////////////////////////////////////////////////////
  Install via ansible
  
	  Python, pip, ansible
	  sudo pip install netaddr
	  on the Ansible machine	
		ssh-keygen -q
	  kubespray is provided through the GitHub repository 
	      https://github.com/kubernetes-incubator/kubespray/releases
		  
		 curl -LO https://github.com/kubernetes-incubator/kubespray/archive/v2.5.0.tar.gz
		 tar zxvf v2.5.0.tar.gz 
		 cp -rfp inventory/sample inventory/mycluster
		 cp -rfp inventory/sample inventory/mycluster
		 vi inventory/mycluster/hosts.ini
			my-master-1 ansible_ssh_host=192.168.79.219 ansible_user=fli ansible_ssh_private_key_file=~fli/.ssh/id_rsa
			my-node-1 ansible_ssh_host=192.168.79.218 ansible_user=fli ansible_ssh_private_key_file=~fli/.ssh/id_rsa


			[kube-master]
			my-master-1

			[etcd]
			my-master-1

			[kube-node]
			my-master-1
			my-node-1

			[k8s-cluster:children]
			kube-node
			kube-master
		
		ssh-copy-id -i ~/.ssh/id_rsa.pub 192.168.126.136
		ansible -i inventory/mycluster/hosts.ini -m ping all
		ansible -b -i inventory/mycluster/hosts.ini -m ping all
		
		add -K (ask for the sudo password) ato ask for your sudo password when running the 
		    Ansible command if needed.
		vi /home/fli/services/kubespray/kubespray-2.5.0/inventory/mycluster/group_vars/all.yml
		    bootstrap_os: ubuntu
			
		set host names to my-node-1 and my-master-1 respectively.
		hostnamectl set-hostname NEW_NAME_HERE
		
		on each node, turn off swap
			sudo swapoff -a #for this session
			remove any swap entry from /etc/fstab.
			reboot
			
		ansible-playbook -b -i inventory/mycluster/hosts.ini cluster.yml 
		ansible-playbook -b -i inventory/myapp/hosts.ini cluster.yml 
		ansible-playbook -i inventory/sample/hosts.ini cluster.yml -e  "ansible_python_interpreter=/usr/bin/python3"
		
			If you see failed=0 like in the preceding screenshot, you have been successful 
			in setting up a Kubernetes cluster.
			
			[WARNING]: Could not match supplied host pattern, ignoring: calico-rr

			 [WARNING]: when statements should not include jinja2 templating delimiters such as {{ }} or {% %}. Found: {{ need_bootstrap.results | map(attribute='rc') | sort | last | bool }}

			[WARNING]: when statements should not include jinja2 templating delimiters such as {{ }} or {% %}. Found: {{ need_bootstrap.results | map(attribute='rc') | sort | last | bool }}

			changed: [my-node-1]
			changed: [my-master-1]

		kubectl get nodes	
        to run a container:
			kubectl run my-first-nginx --image=nginx --replicas=2 --port=80
			kubectl get pods
			kubectl get deployment
		Exposing the port for external access
			kubectl expose deployment my-first-nginx --port=80 --type=LoadBalancer
			kubectl get service
		???get external ip for the service/that support an external load balancer
		kubectl describe service my-first-nginx
		kubectl delete deployment my-first-nginx
		kubectl delete service my-first-nginx
		
		kubectl [command] [TYPE] [NAME] [flags]
			kubectl exec my-first-pod -it -c my-centos -- /bin/bash
			curl -L http://localhost:80
		kubectl get rs
		
		Install heapster/HPA (HorizontalPodAutoscaler)
		// https://github.com/kubernetes/kops/tree/master/addons/monitoring-standalone
		kubectl create -f https://raw.githubusercontent.com/kubernetes/kops/master/addons/monitoring-standalone/v1.7.0.yaml
		kubectl autoscale deployment my-nginx --cpu-percent=50 --min=2 --max=5 
		
		// generate the load
		# kubectl run -it --rm --restart=Never <pod_name> --image=busybox -- sh -c "while true; do wget -O - -q http://my-nginx; done"
		
		kubectl logs two-container centos | grep "title"
		
  //////////////////////////////////////////////////////////////
  									
  /////////////////////////////////////////////////////////////
  kubectl create secret docker-registry my-nexus-secret --docker-server=http://docker.bpwizard.com:5000 --docker-email=frank.x.li@gmail.com --docker-username=admin --docker-password=admin123
  
  sudo vi /etc/systemd/system/docker.service.d/docker-options.conf
  --insecure-registries=docker.bpwizard.com:5000
  
  
  $ kubectl create secret docker-registry my-ecr-secret \
    > --docker-server=https://************.dkr.ecr.us-east-1.amazonaws.com \
	> --docker-email=hideto.saito@example.com \
	> --docker-username=AWS \
	> --docker-password=eyJwYXlsb2FkIjoiS...
	
	secret "my-ecr-secret" created
  $ kubectl get secret my-ecr-secret
    private-nginx-ecr.yaml 

    apiVersion: v1
	kind: Pod
	metadata:
	  name: private-nginx-ecr
	spec:
	  containers:
	  - name: private-nginx-ecr
		image: ************.dkr.ecr.us-east-1.amazonaws.com/my-nginx
	  imagePullSecrets:
	  - name: my-ecr-secret	

  //////////////////////////////////////////////////////////////
  Kubernetes - nexus repo
    Creating a self-signed SSL certificate
		$ openssl req -newkey rsa:4096 -nodes -sha256 -keyout secrets/domain.key -x509 -days 365 -out secrets/domain.crt

		CA/Ontario/Windsor/BPW/frank.x.li@gmail.com
	
    Creating HTTP secret
        //create 8 byte random HEX string by OpenSSL 
		$ openssl rand -hex -out secrets/http.secret 8	
		
	
	Creating the HTTP basic authentication file
		//for example, set user=user01, passwd=my-super-secure-password
		$ docker run -i httpd /bin/bash -c 'echo my-super-secure-password | /usr/local/apache2/bin/htpasswd -nBi user01' > secrets/registry_passwd
	
	Creating a Kubernetes secret to store security files
		kubectl create secret generic registry-secrets --from-file secrets/
		
		or private_registry.yaml 
			apiVersion: apps/v1
			kind: Deployment
			metadata:
			  name: my-private-registry
			spec:
			  replicas: 1
			  selector:
				matchLabels:
				  run: my-registry
			  template:
				metadata:
				  labels:
					run: my-registry
				spec:
				  containers:
				  - name: my-registry
					image: registry
					env:
					  - name: REGISTRY_HTTP_HOST
						value: 10.138.0.3:30500
					  - name: REGISTRY_HTTP_SECRET
						valueFrom:
						   secretKeyRef:
							 name: registry-secrets
							 key: http.secret
					  - name: REGISTRY_HTTP_TLS_CERTIFICATE
						value: /mnt/domain.crt
					  - name: REGISTRY_HTTP_TLS_KEY
						value: /mnt/domain.key
					  - name: REGISTRY_AUTH_HTPASSWD_REALM
						value: basic-realm
					  - name: REGISTRY_AUTH_HTPASSWD_PATH
						value: /mnt/registry_passwd
					ports:
					  - containerPort: 5000
					volumeMounts:
					  - mountPath: /var/lib/registry
						name: registry-storage
					  - mountPath: /mnt
						name: certs
				  volumes:
				  - name: registry-storage
					persistentVolumeClaim:
					  claimName: "pvc-1"
				  - name: certs
					secret:
					   secretName: registry-secrets
					   items:
					   - key: domain.key
						 path: domain.key
					   - key: domain.crt
						 path: domain.crt
					   - key: registry_passwd
						 path: registry_passwd
			---
			apiVersion: v1
			kind: Service
			metadata:
			  name: private-registry-svc
			spec:
			  ports:
				- protocol: TCP
				  port: 5000
				  nodePort: 30500
			  type: NodePort
			  selector:
				 run: my-registry
		
		
		kubectl describe secret registry-secrets
	Run Sonatype Nexus Repository Manager OSS on top of Kubernetes (GKE).
		https://github.com/travelaudience/kubernetes-nexus.git
  
	Kubernetes Recipe: Sonatype Nexus 3 as a private docker registry
		https://blog.sonatype.com/kubernetes-recipe-sonatype-nexus-3-as-a-private-docker-registry

		mkdir $HOME/nexus-data
		chmod -R 777 $HOME/nexus-data
		nexus-volumn.yaml
		
	    kind: PersistentVolume
		apiVersion: v1
		metadata:
		  name: nexus-volum--local
		  labels:
			type: local
		spec:
		  storageClassName: manual
		  capacity:
			storage: 10Gi
		  accessModes:
			- ReadWriteMany
		  hostPath:
			path: "/home/fli/nexus-data"

	
		cat <<EOF | kubectl create -f -
		apiVersion: v1
		kind: Namespace
		metadata:
		  name: hello-world 
		EOF
		
		kubectl create -f nexus-volumn.yaml
		
		kubectl get pv
		
		#nexus-repo.yaml
		apiVersion: v1
		kind: Namespace
		metadata:
		  name: nexus
		---
		apiVersion: v1
		kind: PersistentVolumeClaim
		metadata:
		  name: nexus-pvc
		  namespace: nexus
		  labels:
			app: nexus
		spec:
		  storageClassName: manual
		  accessModes:
			- ReadWriteMany
		  resources:
			requests:
			  storage: 10Gi
		---
		apiVersion: extensions/v1beta1
		kind: Deployment
		metadata:
		  name: nexus
		  namespace: nexus
		spec:
		  replicas: 1
		  template:
			metadata:
			  labels:
				app: nexus
			spec:
			  containers:
			  - image: sonatype/nexus3
				imagePullPolicy: Always
				name: nexus
				ports:
				- containerPort: 8081
				- containerPort: 5000
				volumeMounts:
				  - mountPath: /nexus-data
					name: nexus-data-volume
			  volumes:
				- name: nexus-data-volume
				  persistentVolumeClaim:
					claimName: nexus-pvc
		---
		apiVersion: v1
		kind: Service
		metadata:
		  name: nexus-service
		  namespace: nexus
		spec:
		  ports:
		  - port: 80
			targetPort: 8081
			protocol: TCP
			name: http
		  - port: 5000
			targetPort: 5000
			protocol: TCP
			name: docker
		  selector:
			app: nexus
		---
		apiVersion: extensions/v1beta1
		kind: Ingress
		metadata:
		  name: nexus-ingress
		  namespace: nexus
		  annotations:
			ingress.kubernetes.io/proxy-body-size: 100m
			kubernetes.io/tls-acme: "true"
			kubernetes.io/ingress.class: "nginx"
		spec:
		  tls:
		  - hosts:
			- docker.bpwizard.com
			- nexus3.bpwizard.com
			secretName: nexus-tls
		  rules:
		  - host: nexus3.bpwizard.com
			http:
			  paths:
			  - path: /
				backend:
				  serviceName: nexus-service
				  servicePort: 80
		  - host: docker.bpwizard.com
			http:
			  paths:
			  - path: /
				backend:
				  serviceName: nexus-service
				  servicePort: 5000

		
			
		kubectl get pods -n nexus
		
		kubectl create secret docker-registry regsecret --docker-server=nexus.bpwizard.com:8950 --docker-username=admin --docker-password=admin123 --docker-email=frank.x.li@gmail.com --namespace hello-world
		
		cat <<EOF | kubectl create -f -
		apiVersion: extensions/v1beta1
		kind: Deployment
		metadata:
		  name: hello-world
		  namespace: hello-world
		spec:
		  replicas: 1
		  template:
			metadata:
			  labels:
				app: hello-world
			spec:
			  containers:
			  - name: hello-world
				image: docker.YOURDOMAIN.com/admin/hello-world:0.1
				imagePullPolicy: Always
				ports:
				- containerPort: 80
			  imagePullSecrets:
			  - name: regsecret
		---
		apiVersion: v1
		kind: Service
		metadata:
		  name: hello-world-service
		  namespace: hello-world
		spec:
		  ports:
		  - port: 80
			nodePort: 30000
		  selector:
			app: hello-world
		  type: NodePort
		EOF

		kubectl get pods -n hello-world -o wide
  
  //////////////////////////////////////////////////////////////  
  Jenkins on Kubernetes
  "docker in docker"
  ///////////////////////////////////////////////////////////////
# IBM Cloud Private

# Ansible

# Zipkin

# ZLK/ZFK

# Prometheus

# JHipster
