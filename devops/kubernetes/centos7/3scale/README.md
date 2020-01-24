## Install minishift CDK

    https://dzone.com/articles/introducing-red-hat-cdk
	
	https://developers.redhat.com/products/cdk/overview/
	
	download CDK from 
			https://developers.redhat.com/products/cdk/download
###Windows

	
	
	mkdir -p ~/bin
	
	put minishift under ~/bin
	
	add ~/bin to PATH
	
	> delete ~/.minishift
	
	> minishift setup-cdk
	
	C:\> set MINISHIFT_USERNAME='<RED_HAT_USERNAME>'
	
	C:\> set MINISHIFT_PASSWORD='<RED_HAT_PASSWORD>'
	
	C:\> setx MINISHIFT_USERNAME %MINISHIFT_USERNAME%
	
	C:\> setx MINISHIFT_PASSWORD %MINISHIFT_PASSWORD%
	
	> set path=C:\Windows\System32\wbem;%PATH%
    
	> minishift config set vm-driver virtualbox
	
	> minishift start --memory 16GB --disk-size 60GB --cpus 4
	>  minishift ip --set-static
	minishift oc-env
### Linuxs

	linux:
	For Red Hat Enterprise Linux, set up the KVM driver
	# curl -L https://github.com/dhiltgen/docker-machine-kvm/releases/download/v0.7.0/docker-machine-driver-kvm -o /usr/local/bin/docker-machine-driver-kvm
	# chmod +x /usr/local/bin/docker-machine-driver-kvm
	# yum install libvirt qemu-kvm
	# usermod -a -G libvirt <username> - root and yourself
	# newgrp libvirt
	# systemctl start libvirtd
    # systemctl enable libvirtd
	mkdir -p ~/bin
	put minishift under ~/bin
	add ~/bin to PATH
	
	$ mkdir -p ~/bin
	$ cp ~/Downloads/cdk-3.5.0-1-minishift* ~/bin/minishift
	$ chmod +x ~/bin/minishift
	$ export PATH=$PATH:$HOME/bin
	$ echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc

	minishift setup-cdk
	$ export MINISHIFT_USERNAME='<RED_HAT_USERNAME>'
	$ export MINISHIFT_PASSWORD='<RED_HAT_PASSWORD>'
	$ echo export MINISHIFT_USERNAME=$MINISHIFT_USERNAME >> ~/.bashrc
	$ echo export MINISHIFT_PASSWORD=$MINISHIFT_PASSWORD >> ~/.bashrc
	minishift start --memory 8GB --disk-size 30GB --cpus 2
	minishift ip --set-static
# Setup 3scale 	
		ssh access:
		
		ssh docker@192.168.99.100
		pwd: tcuser
	
	oc login -u system:admin
	
	minishift ssh
	
	for amp 20:
	  docker pull 3scale-amp20/backend:1.0-2 && \
	  docker pull 3scale-amp20/system:1.0-2 && \
	  docker pull 3scale-amp20/memcached:1.4.15-7 && \
	  docker pull 3scale-amp20/apicast-gateway:1.0-3 && \
	  docker pull rhscl/redis-32-rhel7:3.2-5.7 && \
	  docker pull rhscl/mysql-56-rhel7:5.6-13.14
	  
	for amp 22GA:
	  
	  docker pull registry.access.redhat.com/3scale-amp20/memcached:1.4.15 && \
	  docker pull registry.access.redhat.com/3scale-amp22/system:1.7 && \
	  docker pull registry.access.redhat.com/3scale-amp22/backend:1.6 &&\
	  docker pull registry.access.redhat.com/3scale-amp22/apicast-gateway:1.8 && \
	  docker pull registry.access.redhat.com/3scale-amp22/wildcard-router:1.6 && \
	  docker pull registry.access.redhat.com/rhscl/postgresql-95-rhel7:9.5 && \
	  docker pull registry.access.redhat.com/3scale-amp22/zync:1.6 && \
	  docker pull registry.access.redhat.com/rhscl/redis-32-rhel7:3.2 && \
	  docker pull registry.access.redhat.com/rhscl/mysql-57-rhel7:5.7-5
	
	from amp 23ag:
	
	docker pull registry.access.redhat.com/rhscl/redis-32-rhel7:3.2
	docker pull registry.access.redhat.com/rhscl/mysql-57-rhel7:5.7
	docker pull registry.access.redhat.com/3scale-amp20/memcached:1.4.15
	docker pull registry.access.redhat.com/rhscl/postgresql-95-rhel7:9.5
	docker pull registry.access.redhat.com/3scale-amp22/system
	docker pull registry.access.redhat.com/3scale-amp22/backend
	docker pull registry.access.redhat.com/3scale-amp23/apicast-gateway
	docker pull registry.access.redhat.com/3scale-amp22/wildcard-router
	docker pull registry.access.redhat.com/3scale-amp22/zync
	
	exit
	
	oc new-project 3scale
	
	oc new-app --file amp20.yml --param WILDCARD_DOMAIN=192.168.99.100
	or 
	
	get apm22ga.yml from: https://github.com/3scale/3scale-amp-openshift-templates/archive/2.2.0.GA.zip
	oc new-app --file amp22ga.yml --param WILDCARD_DOMAIN=192.168.99.100

	> cd /var/lib/minishift/openshift.local.pv
	> chmod 777 * (TODO: otherwise, redis and mysql pods won't be created properly,
	               no permission to access the volume directory)
				   
	get apm23ga.yml from: https://github.com/3scale/3scale-amp-openshift-templates/archive/2.3.0.GA.zip
	oc new-app --file amp23ga.yml --param WILDCARD_DOMAIN=192.168.99.100

	> cd /var/lib/minishift/base/openshift.local.pv/
	> chmod 777 * (TODO: otherwise, redis and mysql pods won't be created properly,
	               no permission to access the volume directory)
	------------------------------------
	AMP 20:
	  system
     ---------
      --> Deploying template "myproject/system" for "amp20.yml" to project myproject

     system
     ---------
     Login on https://3scale-admin.192.168.99.100 as admin/hcs0ecdl

     * With parameters:
        * AMP_RELEASE=2.0.0-CR2-redhat-1
        * ADMIN_PASSWORD=hcs0ecdl # generated
        * ADMIN_USERNAME=admin
        * APICAST_ACCESS_TOKEN=vknhpxcj # generated
        * ADMIN_ACCESS_TOKEN=r2i5gydxio8ujqd5 # generated
        * WILDCARD_DOMAIN=192.168.99.100
        * TENANT_NAME=3scale
        * MySQL User=mysql
        * MySQL Password=1kv4j0ll # generated
        * MySQL Database Name=system
        * MySQL Root password.=jftuwkl1 # generated
        * SYSTEM_BACKEND_USERNAME=3scale_api_user
        * SYSTEM_BACKEND_PASSWORD=eiqqa3k1 # generated
        * REDIS_IMAGE=rhscl/redis-32-rhel7:3.2-5.7
        * MYSQL_IMAGE=rhscl/mysql-56-rhel7:5.6-13.14
        * SYSTEM_BACKEND_SHARED_SECRET=xg67bfpt # generated
        * SYSTEM_APP_SECRET_KEY_BASE=be26e755e67c514c158877d73b8d870e66bbebb46d403535aa1e08b0c53e23d07b0b1ee31a7b02840736b81e3a767ca553120d6a6ce056a38eb3cdb55bb3b822 # generated
        * APICAST_MANAGEMENT_API=status
        * APICAST_OPENSSL_VERIFY=false
        * APICAST_RESPONSE_CODES=true

--> Creating resources ...
    persistentvolumeclaim "system-storage" created
    persistentvolumeclaim "mysql-storage" created
    persistentvolumeclaim "system-redis-storage" created
    persistentvolumeclaim "backend-redis-storage" created
    deploymentconfig "backend-cron" created
    deploymentconfig "backend-redis" created
    deploymentconfig "backend-listener" created
    service "backend-redis" created
    service "backend-listener" created
    service "system-provider" created
    service "system-developer" created
    deploymentconfig "backend-worker" created
    service "system-mysql" created
    service "system-redis" created
    deploymentconfig "system-redis" created
    service "system-sphinx" created
    deploymentconfig "system-sphinx" created
    service "system-memcache" created
    deploymentconfig "system-memcache" created
    route "system-provider-admin-route" created
    route "backend-route" created
    route "system-developer-route" created
    deploymentconfig "apicast-staging" created
    service "apicast-staging" created
    deploymentconfig "apicast-production" created
    service "apicast-production" created
    route "api-apicast-staging-route" created
    route "api-apicast-production-route" created
    deploymentconfig "system-app" created
    deploymentconfig "system-resque" created
    deploymentconfig "system-sidekiq" created
    deploymentconfig "system-mysql" created
    configmap "redis-config" created
    configmap "smtp" created
--> Success
    Access your application via route '3scale-admin.192.168.99.100'
    Access your application via route 'backend-3scale.192.168.99.100'
    Access your application via route '3scale.192.168.99.100'
    Access your application via route 'api-3scale-apicast-staging.192.168.99.100'
    Access your application via route 'api-3scale-apicast-production.192.168.99.100'
    Run 'oc status' to view your app.
	------------------------------------
	amp22ga:
	 
	
	--> Deploying template "3scale/3scale-api-management" for "amp22ga.yml" to project 3scale

     3scale API Management
     ---------
     3scale API Management main system

     Login on https://3scale-admin.192.168.99.100 as admin/xqbm7303

     * With parameters:
        * PostgreSQL Connection Password=OjFpd4FkMvxtefvv # generated
        * ZYNC_SECRET_KEY_BASE=8xaG84634D8jIo4E # generated
        * ZYNC_AUTHENTICATION_TOKEN=OegdqVRYbfEi8LFu # generated
        * AMP_RELEASE=2.2.0
        * ADMIN_PASSWORD=xqbm7303 # generated
        * ADMIN_USERNAME=admin
        * APICAST_ACCESS_TOKEN=5j6gu6dj # generated
        * ADMIN_ACCESS_TOKEN=oiwv5gm6c6ed0cva # generated
        * WILDCARD_DOMAIN=192.168.99.100
        * WILDCARD_POLICY=None
        * TENANT_NAME=3scale
        * MySQL User=mysql
        * MySQL Password=ho8rju2v # generated
        * MySQL Database Name=system
        * MySQL Root password.=17nitnyp # generated
        * SYSTEM_BACKEND_USERNAME=3scale_api_user
        * SYSTEM_BACKEND_PASSWORD=kkbndof7 # generated
        * REDIS_IMAGE=registry.access.redhat.com/rhscl/redis-32-rhel7:3.2
        * MYSQL_IMAGE=registry.access.redhat.com/rhscl/mysql-57-rhel7:5.7-5
        * SYSTEM_BACKEND_SHARED_SECRET=fslqvumd # generated
        * SYSTEM_APP_SECRET_KEY_BASE=564aaa14eacb336d82445d6a7d6207d2c0bde668dead4b8b54533e21a536a531872ebbac3045bba72d6bd878714831d83143045dc35264d132cc07cbecd0e55c # generated
        * APICAST_MANAGEMENT_API=status
        * APICAST_OPENSSL_VERIFY=false
        * APICAST_RESPONSE_CODES=true
        * MASTER_NAME=master
        * MASTER_USER=master
        * MASTER_PASSWORD=drs1otii # generated
        * MASTER_ACCESS_TOKEN=uil4mrlk # generated
        * APICAST_REGISTRY_URL=http://apicast-staging:8090/policies

--> Creating resources ...
    imagestream "amp-system" created
    imagestream "amp-backend" created
    imagestream "amp-apicast" created
    imagestream "amp-wildcard-router" created
    persistentvolumeclaim "system-storage" created
    persistentvolumeclaim "mysql-storage" created
    persistentvolumeclaim "system-redis-storage" created
    persistentvolumeclaim "backend-redis-storage" created
    deploymentconfig "backend-cron" created
    deploymentconfig "backend-redis" created
    deploymentconfig "backend-listener" created
    service "backend-redis" created
    service "backend-listener" created
    service "system-provider" created
    service "system-master" created
    service "system-developer" created
    deploymentconfig "backend-worker" created
    service "system-mysql" created
    service "system-redis" created
    deploymentconfig "system-redis" created
    service "system-sphinx" created
    deploymentconfig "system-sphinx" created
    service "system-memcache" created
    deploymentconfig "system-memcache" created
    route "system-provider-admin-route" created
    route "system-master-admin-route" created
    route "backend-route" created
    route "system-developer-route" created
    deploymentconfig "apicast-staging" created
    service "apicast-staging" created
    deploymentconfig "apicast-production" created
    service "apicast-production" created
    route "api-apicast-staging-route" created
    route "api-apicast-production-route" created
    deploymentconfig "apicast-wildcard-router" created
    service "apicast-wildcard-router" created
    route "apicast-wildcard-router-route" created
    configmap "system" created
    configmap "mysql-extra-conf" created
    configmap "mysql-main-conf" created
    deploymentconfig "system-app" created
    deploymentconfig "system-resque" created
    deploymentconfig "system-sidekiq" created
    deploymentconfig "system-mysql" created
    configmap "redis-config" created
    configmap "smtp" created
    imagestream "postgresql" created
    imagestream "amp-zync" created
    secret "zync" created
    deploymentconfig "zync" created
    service "zync" created
    service "zync-database" created
    deploymentconfig "zync-database" created
--> Success
    Access your application via route '3scale-admin.192.168.99.100'
    Access your application via route 'master-admin.192.168.99.100'
    Access your application via route 'backend-3scale.192.168.99.100'
    Access your application via route '3scale.192.168.99.100'
    Access your application via route 'api-3scale-apicast-staging.192.168.99.100'
    Access your application via route 'api-3scale-apicast-production.192.168.99.100'
    Access your application via route 'apicast-wildcard.192.168.99.100'
    Run 'oc status' to view your app.
	=================================================================
	amp23ga:
	--> Deploying template "3scale/3scale-api-management" for "amp23ga.yml" to project 3scale

     3scale API Management
     ---------
     3scale API Management main system

     Login on https://3scale-admin.192.168.99.100 as admin/mk2og2dm

     * With parameters:
        * APP_LABEL=3scale-api-management
        * PostgreSQL Connection Password=kOySqaspKraKyG6H # generated
        * ZYNC_SECRET_KEY_BASE=3C2ES3KtIK58tIX3 # generated
        * ZYNC_AUTHENTICATION_TOKEN=QMf7pg1TwsvglVMS # generated
        * AMP_RELEASE=2.3.0
        * ADMIN_PASSWORD=mk2og2dm # generated
        * ADMIN_USERNAME=admin
        * APICAST_ACCESS_TOKEN=wgpskx57 # generated
        * ADMIN_ACCESS_TOKEN=fak5kwues4xb2n0r # generated
        * WILDCARD_DOMAIN=192.168.99.100
        * WILDCARD_POLICY=None
        * TENANT_NAME=3scale
        * MySQL User=mysql
        * MySQL Password=f7v2m452 # generated
        * MySQL Database Name=system
        * MySQL Root password.=tr8ywjuo # generated
        * SYSTEM_BACKEND_USERNAME=3scale_api_user
        * SYSTEM_BACKEND_PASSWORD=bqu6l5oq # generated
        * REDIS_IMAGE=registry.access.redhat.com/rhscl/redis-32-rhel7:3.2
        * MYSQL_IMAGE=registry.access.redhat.com/rhscl/mysql-57-rhel7:5.7
        * MEMCACHED_IMAGE=registry.access.redhat.com/3scale-amp20/memcached:1.4.15
        * POSTGRESQL_IMAGE=registry.access.redhat.com/rhscl/postgresql-95-rhel7:9.5
        * AMP_SYSTEM_IMAGE=registry.access.redhat.com/3scale-amp22/system
        * AMP_BACKEND_IMAGE=registry.access.redhat.com/3scale-amp22/backend
        * AMP_APICAST_IMAGE=registry.access.redhat.com/3scale-amp23/apicast-gateway
        * AMP_ROUTER_IMAGE=registry.access.redhat.com/3scale-amp22/wildcard-router
        * AMP_ZYNC_IMAGE=registry.access.redhat.com/3scale-amp22/zync
        * SYSTEM_BACKEND_SHARED_SECRET=fdsaljg3 # generated
        * SYSTEM_APP_SECRET_KEY_BASE=46e357e7435b206c3168375cda40d67482c7210c8de0c44a2c261b40ac54ee8ad0b4b671d5b1c7d6b1b6a2ea35dab1ade2eea6cb48647dab330bd7885ce42a46 # generated
        * APICAST_MANAGEMENT_API=status
        * APICAST_OPENSSL_VERIFY=false
        * APICAST_RESPONSE_CODES=true
        * MASTER_NAME=master
        * MASTER_USER=master
        * MASTER_PASSWORD=dhcalumg # generated
        * MASTER_ACCESS_TOKEN=3xlicc12 # generated
        * APICAST_REGISTRY_URL=http://apicast-staging:8090/policies
        * IMAGESTREAM_TAG_IMPORT_INSECURE=false

--> Creating resources ...
    imagestream "amp-system" created
    imagestream "amp-backend" created
    imagestream "amp-apicast" created
    imagestream "amp-wildcard-router" created
    persistentvolumeclaim "system-storage" created
    persistentvolumeclaim "mysql-storage" created
    persistentvolumeclaim "system-redis-storage" created
    persistentvolumeclaim "backend-redis-storage" created
    deploymentconfig "backend-cron" created
    deploymentconfig "backend-redis" created
    deploymentconfig "backend-listener" created
    service "backend-redis" created
    service "backend-listener" created
    service "system-provider" created
    service "system-master" created
    service "system-developer" created
    deploymentconfig "backend-worker" created
    service "system-mysql" created
    service "system-redis" created
    deploymentconfig "system-redis" created
    service "system-sphinx" created
    deploymentconfig "system-sphinx" created
    service "system-memcache" created
    deploymentconfig "system-memcache" created
    route "system-provider-admin" created
    route "system-master-admin" created
    route "system-developer" created
    route "backend" created
    route "api-apicast-staging" created
    service "apicast-staging" created
    deploymentconfig "apicast-staging" created
    route "api-apicast-production" created
    service "apicast-production" created
    deploymentconfig "apicast-production" created
    deploymentconfig "apicast-wildcard-router" created
    service "apicast-wildcard-router" created
    route "apicast-wildcard-router" created
    configmap "system" created
    configmap "mysql-extra-conf" created
    configmap "mysql-main-conf" created
    deploymentconfig "system-app" created
    deploymentconfig "system-resque" created
    deploymentconfig "system-sidekiq" created
    deploymentconfig "system-mysql" created
    configmap "redis-config" created
    configmap "smtp" created
    imagestream "postgresql" created
    imagestream "amp-zync" created
    secret "zync" created
    deploymentconfig "zync" created
    service "zync" created
    service "zync-database" created
    deploymentconfig "zync-database" created
--> Success
    Access your application via route '3scale-admin.192.168.99.100'
    Access your application via route 'master-admin.192.168.99.100'
    Access your application via route '3scale.192.168.99.100'
    Access your application via route 'backend-3scale.192.168.99.100'
    Access your application via route 'api-3scale-apicast-staging.192.168.99.100'
    Access your application via route 'api-3scale-apicast-production.192.168.99.100'
    Access your application via route 'apicast-wildcard.192.168.99.100'
    Run 'oc status' to view your app.

C:\workspaces\github\devops\kubernetes\centos7\3scale>



	on openshift 3.10
	========================
	#create 10 volumes
	oc create -f 1-volume.yaml
	
	
	docker pull registry.access.redhat.com/3scale-amp20/memcached:1.4.15 && \
	  docker pull registry.access.redhat.com/3scale-amp22/system:1.7 && \
	  docker pull registry.access.redhat.com/3scale-amp22/backend:1.6 &&\
	  docker pull registry.access.redhat.com/3scale-amp22/apicast-gateway:1.8 && \
	  docker pull registry.access.redhat.com/3scale-amp22/wildcard-router:1.6 && \
	  docker pull registry.access.redhat.com/rhscl/postgresql-95-rhel7:9.5 && \
	  docker pull registry.access.redhat.com/3scale-amp22/zync:1.6 && \
	  docker pull registry.access.redhat.com/rhscl/redis-32-rhel7:3.2 && \
	  docker pull registry.access.redhat.com/rhscl/mysql-57-rhel7:5.7-5
	
	oc new-app --file amp22ga.yml --param WILDCARD_DOMAIN=192.168.0.108
	
	TODO: MYSQL, REDIS not able to access volumes on openshift 3.10


======================================================================

How does 3scale work?
Your customer makes a request to the 3scale API gateway.
https://api-3scale-apicast-production.192.168.99.100:443/method?user_key=USER_KEY
3scale handles authentication & rate limiting according to your rules.
https://api.provider-name.com/method
Your API returns the response to the customer through the gateway.

Test with echo url, the url is, https://echo-api.3scale.net