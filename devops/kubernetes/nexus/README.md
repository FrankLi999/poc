------------------------
config local docker registry:

/etc/systemd/system/docker.service.d/docker-options.conf
   under [service] stanza
   Environment="DOCKER_OPTS=--insecure-registry=10.233.0.0/18 --insecure-registry=docker.bpwizard.com  --graph=/var/lib/docker  --log-opt max-size=50m --log-opt max-file=5 \
--iptables=false"

   docker login docker.bpwizard.com
  --------------------
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
	
-------------------------
local maven:

-=====================
https://stackoverflow.com/questions/42766349/run-nexus-3-with-docker-in-a-kubernetes-cluster
https://devopsinitiative.com/blog/2018/03/01/setting-up-nexus3-as-a-private-container-registry-inside-kubernetes/
Samples:
Sample 1:
                                                                               --(IF user agent docker) --> [nexus service]nexus:5000 --> docker registry
                                                                             |
[nexus ingress]nexus.bpwizard.com:80/ --> [proxy service]internal-proxy:80 -->|
                                                                             |
                                                                             --(ELSE                ) --> [nexus service]nexus:80   --> nexus UI
nexus-deployment.yaml									
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: nexus
  namespace: default

spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: nexus
    spec:
      containers:
        - name: nexus
          image: sonatype/nexus3:3.3.1
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8081
            - containerPort: 5000
          volumeMounts:
            - name: nexus-data
              mountPath: /nexus-data
          resources:
            requests:
              cpu: 440m
              memory: 3.3Gi
            limits:
              cpu: 440m
              memory: 3.3Gi
      volumes:
        - name: nexus-data
          azureFile:
            secretName: azure-file-storage-secret
            shareName: nexus-data
			
      # using the REST API to add health and readiness probes
	  readinessProbe:
        httpGet:
          path: /service/siesta/rest/v1/script
          port: 8081
          httpHeaders:
            - name: Authorization
              # The authorization token is simply the base64 encoding of the `healthprobe` user's credentials:
              # $ echo -n user:password | base64
              value: Basic dXNlcjpwYXNzd29yZA==
        initialDelaySeconds: 900
        timeoutSeconds: 60
      livenessProbe:
        httpGet:
          path: /service/siesta/rest/v1/script
          port: 8081
          httpHeaders:
            - name: Authorization
              value: Basic dXNlcjpwYXNzd29yZA==
        initialDelaySeconds: 900
        timeoutSeconds: 60
		
		
	nexus-service.yaml 

    apiVersion: v1
	kind: Service
	metadata:
	  labels:
		app: nexus
	  name: nexus
	  namespace: default
	  selfLink: /api/v1/namespaces/default/services/nexus

	spec:
	  ports:
	  - name: http
		port: 80
		targetPort: 8081
	  - name: docker
		port: 5000
		targetPort: 5000
	  selector:
		app: nexus
	  type: ClusterIP	
	  
	  
	reverse proxy (nginx): proxy-configmap.yaml The nginx.conf is added as ConfigMap data volume. 
	apiVersion: v1
	data:
	  nginx.conf: |
		worker_processes auto;

		events {
			worker_connections 1024;
		}

		http {
			error_log /var/log/nginx/error.log warn;
			access_log  /dev/null;
			proxy_intercept_errors off;
			proxy_send_timeout 120;
			proxy_read_timeout 300;

			upstream nexus {
				server nexus:80;
			}

			upstream registry {
				server nexus:5000;
			}

			server {
				listen 80;
				server_name nexus.example.com;

				keepalive_timeout  5 5;
				proxy_buffering    off;

				# allow large uploads
				client_max_body_size 1G;

				location / {
				# redirect to docker registry
				if ($http_user_agent ~ docker ) {
					proxy_pass http://registry;
				}
				proxy_pass http://nexus;
				proxy_set_header Host $host;
				proxy_set_header X-Real-IP $remote_addr;
				proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
				proxy_set_header X-Forwarded-Proto "https";
				}
			}
		}
	kind: ConfigMap
	metadata:
	  creationTimestamp: null
	  name: internal-proxy-conf
	  namespace: default
	  selfLink: /api/v1/namespaces/default/configmaps/internal-proxy-conf
	  
	
	proxy-deployment.yaml
	
	apiVersion: v1
	data:
	  nginx.conf: |
		worker_processes auto;

		events {
			worker_connections 1024;
		}

		http {
			error_log /var/log/nginx/error.log warn;
			access_log  /dev/null;
			proxy_intercept_errors off;
			proxy_send_timeout 120;
			proxy_read_timeout 300;

			upstream nexus {
				server nexus:80;
			}

			upstream registry {
				server nexus:5000;
			}

			server {
				listen 80;
				server_name nexus.example.com;

				keepalive_timeout  5 5;
				proxy_buffering    off;

				# allow large uploads
				client_max_body_size 1G;

				location / {
				# redirect to docker registry
				if ($http_user_agent ~ docker ) {
					proxy_pass http://registry;
				}
				proxy_pass http://nexus;
				proxy_set_header Host $host;
				proxy_set_header X-Real-IP $remote_addr;
				proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
				proxy_set_header X-Forwarded-Proto "https";
				}
			}
		}
	kind: ConfigMap
	metadata:
	  creationTimestamp: null
	  name: internal-proxy-conf
	  namespace: default
	  selfLink: /api/v1/namespaces/default/configmaps/internal-proxy-conf

	proxy-deployment.yaml

	apiVersion: extensions/v1beta1
	kind: Deployment
	metadata:
	  name: internal-proxy
	  namespace: default

	spec:
	  replicas: 1
	  template:
		metadata:
		  labels:
			proxy: internal
		spec:
		  containers:
			- name: nginx
			  image: nginx:1.11-alpine
			  imagePullPolicy: IfNotPresent
			  lifecycle:
				preStop:
				  exec:
					command: ["/usr/sbin/nginx","-s","quit"]
			  volumeMounts:
				- name: internal-proxy-conf
				  mountPath: /etc/nginx/
			  env:
				# This is a workaround to easily force a restart by incrementing the value (numbers must be quoted)
				# NGINX needs to be restarted for configuration changes, especially DNS changes, to be detected
				- name: RESTART_
				  value: "0"
		  volumes:
			- name: internal-proxy-conf
			  configMap:
				name: internal-proxy-conf
				items:
				  - key: nginx.conf
					path: nginx.conf
					
	
tl;dr
Nexus needs to be served over SSL, otherwise docker won't connect to it. This can be achieved with a k8s ingress + kube-lego for a Let's Encrypt certificate. Any other real certificate will work as well. However, in order to serve both the nexus UI and the docker registry through one ingress (thus, one port) one needs a reverse proxy behind the ingress to detect the docker user agent and forward the request to the registry.

                                                                             --(IF user agent docker) --> [nexus service]nexus:5000 --> docker registry
                                                                             |
[nexus ingress]nexus.example.com:80/ --> [proxy service]internal-proxy:80 -->|
                                                                             |
                                                                             --(ELSE                ) --> [nexus service]nexus:80   --> nexus UI
Start nexus server
nexus-deployment.yaml This makes use of an azureFile volume, but you can use any volume. Also, the secret is not shown, for obvious reasons.

apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: nexus
  namespace: default

spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: nexus
    spec:
      containers:
        - name: nexus
          image: sonatype/nexus3:3.3.1
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8081
            - containerPort: 5000
          volumeMounts:
            - name: nexus-data
              mountPath: /nexus-data
          resources:
            requests:
              cpu: 440m
              memory: 3.3Gi
            limits:
              cpu: 440m
              memory: 3.3Gi
      volumes:
        - name: nexus-data
          azureFile:
            secretName: azure-file-storage-secret
            shareName: nexus-data
It is always a good idea to add health and readiness probes, so that kubernetes can detect when the app goes down. Hitting the index.html page doesn't always work very well, so I'm using the REST API instead. This requires adding the Authorization header for a user with the nx-script-*-browse permission. Obviously you'll have to first bring the system up without probes to set up the user, then update your deployment later.

      readinessProbe:
        httpGet:
          path: /service/siesta/rest/v1/script
          port: 8081
          httpHeaders:
            - name: Authorization
              # The authorization token is simply the base64 encoding of the `healthprobe` user's credentials:
              # $ echo -n user:password | base64
              value: Basic dXNlcjpwYXNzd29yZA==
        initialDelaySeconds: 900
        timeoutSeconds: 60
      livenessProbe:
        httpGet:
          path: /service/siesta/rest/v1/script
          port: 8081
          httpHeaders:
            - name: Authorization
              value: Basic dXNlcjpwYXNzd29yZA==
        initialDelaySeconds: 900
        timeoutSeconds: 60
Because nexus can sometimes take a long time to start, I use a very generous initial delay and timeout.

nexus-service.yaml Expose port 80 for the UI, and port 5000 for the registry. This must correspond to the port configured for the registry through the UI.

apiVersion: v1
kind: Service
metadata:
  labels:
    app: nexus
  name: nexus
  namespace: default
  selfLink: /api/v1/namespaces/default/services/nexus

spec:
  ports:
  - name: http
    port: 80
    targetPort: 8081
  - name: docker
    port: 5000
    targetPort: 5000
  selector:
    app: nexus
  type: ClusterIP
Start reverse proxy (nginx)
proxy-configmap.yaml The nginx.conf is added as ConfigMap data volume. This includes a rule for detecting the docker user agent. This relies on the kubernetes DNS to access the nexus service as upstream.

apiVersion: v1
data:
  nginx.conf: |
    worker_processes auto;

    events {
        worker_connections 1024;
    }

    http {
        error_log /var/log/nginx/error.log warn;
        access_log  /dev/null;
        proxy_intercept_errors off;
        proxy_send_timeout 120;
        proxy_read_timeout 300;

        upstream nexus {
            server nexus:80;
        }

        upstream registry {
            server nexus:5000;
        }

        server {
            listen 80;
            server_name nexus.example.com;

            keepalive_timeout  5 5;
            proxy_buffering    off;

            # allow large uploads
            client_max_body_size 1G;

            location / {
            # redirect to docker registry
            if ($http_user_agent ~ docker ) {
                proxy_pass http://registry;
            }
            proxy_pass http://nexus;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto "https";
            }
        }
    }
kind: ConfigMap
metadata:
  creationTimestamp: null
  name: internal-proxy-conf
  namespace: default
  selfLink: /api/v1/namespaces/default/configmaps/internal-proxy-conf
proxy-deployment.yaml

apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: internal-proxy
  namespace: default

spec:
  replicas: 1
  template:
    metadata:
      labels:
        proxy: internal
    spec:
      containers:
        - name: nginx
          image: nginx:1.11-alpine
          imagePullPolicy: IfNotPresent
          lifecycle:
            preStop:
              exec:
                command: ["/usr/sbin/nginx","-s","quit"]
          volumeMounts:
            - name: internal-proxy-conf
              mountPath: /etc/nginx/
          env:
            # This is a workaround to easily force a restart by incrementing the value (numbers must be quoted)
            # NGINX needs to be restarted for configuration changes, especially DNS changes, to be detected
            - name: RESTART_
              value: "0"
      volumes:
        - name: internal-proxy-conf
          configMap:
            name: internal-proxy-conf
            items:
              - key: nginx.conf
                path: nginx.conf
				
				
	proxy-service.yaml
	
	kind: Service
	apiVersion: v1
	metadata:
	  name: internal-proxy
	  namespace: default

	spec:
	  selector:
		proxy: internal
	  ports:
		- name: http
		  port: 80
		  targetPort: 80
		- name: https
		  port: 443
		  targetPort: 443
	  type: ClusterIP
	  
	  
	
	Create Ingress
	
	apiVersion: extensions/v1beta1
	kind: Ingress
	metadata:
	  name: nexus
	  namespace: default
	  annotations:
		kubernetes.io/ingress.class: "nginx"
		kubernetes.io/tls-acme: "true"

	spec:
	  tls:
		- hosts:
		  - nexus.example.com
		  secretName: nexus-tls
	  rules:
		- host: nexus.example.com
		  http:
			paths:
			- path: /
			  backend:
				serviceName: internal-proxy
				servicePort: 80
				
				
	Sample 2: using the nginx ingress only
	
	#Service
	apiVersion: v1
	kind: Service
	metadata:
	  labels:
		app: nexus
	  name: nexus
	  namespace: default
	  selfLink: /api/v1/namespaces/default/services/nexus

	spec:
	  ports:
	  - name: http
		port: 80
		targetPort: 8081
	  - name: docker
		port: 5000
		targetPort: 5000
	  selector:
		app: nexus
	  type: ClusterIP
	
	
	#Ingress
	apiVersion: extensions/v1beta1
	kind: Ingress
	metadata:
	  name: nexus
	  namespace: default
	  annotations:
		kubernetes.io/ingress.class: "nginx"
		kubernetes.io/tls-acme: "true"

	spec:
	  tls:
		- hosts:
			- nexus.example.com
			- docker.example.com
		  secretName: nexus-tls
	  rules:
		- host: nexus.example.com
		  http:
			paths:
			- path: /
			  backend:
				serviceName: nexus
				servicePort: 80
		- host: docker.example.com
		  http:
			paths:
			- path: /
			  backend:
				serviceName: nexus
				servicePort: 5000
				
	Sample 3: Helm
	
	helm install stable/sonatype-nexus --name registry --namespace foo
	helm del --purge registry
	
	
	Adjust Nexus deployment:
	
		After installing Nexus with helm you'll find a deployment for Nexus. Add 
		containerPort: 5000 to it, right below the containterPort that is already there.
		
	Adjust Nexus Service

		You also need to add port 5000 to the Nexus service. Put it just below 
		the default port:

		- port: 5000
		  targetPort: 5000
		  protocol: TCP
		  name: docker 
		  

    Example Ingress config:

	This config points https://registry.example.com to the Nexus UI at port 8081 and it points https://docker.exmaple.com to the docker service at port 5000.

	Note: In my case port 8081 was the default port that was provided in the Nexus deployment, which you edited in the step above. Adjust it, if your installation uses another port.

	apiVersion: extensions/v1beta1
	kind: Ingress
	metadata:
	  name: example-com-ingress
	  namespace: foo
	  annotations:
		kubernetes.io/ingress.class: nginx

	spec:
	  rules:

	  # Provide the docker backend that is used for docker login.
	  - host: docker.example.com
		http:
		  paths:
		  - path: /
			backend:
			  serviceName: registry-sonatype-nexus
			  servicePort: 5000

	  # Provide the nexus backend that is used for the UI etc.
	  - host: registry.exmaple.com
		http:
		  paths:
		  - path: /
			backend:
			  serviceName: registry-sonatype-nexus
			  servicePort: 8081

	  tls:
	  - secretName: example-com-tls
		hosts:
		- registry.example.com
		- docker.example.com
		
		
	   Configure Nexus

		You should now be able to open the Nexus UI at https://registry.example.com. Login with default credentials. user: admin pw: admin123.

		Create a docker host repo and set HTTP under Repository Connector to 5000 and disable Force Basic Authentication.

		Login, tag and push an image

		You should now be able to log your docker client in to the registry using Nexus login credentials:

		docker login docker.example.com
		Use this pattern to tag and push an image:

		docker tag <image>:<tag> <nexus-hostname>/<namespace>/<image>:<tag>
		docker push <nexus-hostname>/<namespace>/<image>:<tag>
		E.g:

		docker tag myapp:1.0.0 docker.example.com/foo/myapp:1.0.0
		docker push docker.example.com/foo/myapp:1.0.0
		
		
	sample 4:
	https://blog.sonatype.com/kubernetes-recipe-sonatype-nexus-3-as-a-private-docker-registry
    
	0. create nexus ns
    0-nexus-ns.yaml
	
	apiVersion: v1
	kind: Namespace
	metadata:
	  name: nexus
	  
    1. Persistent Volume

		$ mkdir $HOME/volume-nexus
		$ chmod -R 777 $HOME/volume-nexus
		
		1-nexus-volume.yaml 
		
		kind: PersistentVolume
		apiVersion: v1
		metadata:
		  name: volume-nexus
		  labels:
			type: local
		spec:
		  capacity:
			storage: 20Gi
		  accessModes:
			- ReadWriteOnce
		  hostPath:
			path: "/home/fli/volume-local"

    
	2. 3-nexus3.yaml
	
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
		  accessModes:
			- ReadWriteOnce
		  resources:
			requests:
			  storage: 20Gi
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
			- nexus.bpwizard.com 
			secretName: tls-nexus
		  rules:
		  - host: nexus.bpwizard.com 
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
	
		
    docker login docker.bpwizard.com
	docker pull dockercloud/hello-world
	docker tag dockercloud/hello-world docker.bpwizard.com/dockercloud/hello-world:0.1
	docker push docker.bpwizard.com/dockercloud/hello-world:0.1
	
	
	
	3-hello-world-ns.yaml
	apiVersion: v1
	kind: Namespace
	metadata:
	  name: hello-world 
	kubectl create secret docker-registry nexussecret --docker-server=docker.bpwizard.com --docker-username=admin --docker-password=admin123 --docker-email=frank.x.li@gmail.com --namespace hello-world			  
	4-hello-world.yaml
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
			image: docker.bpwizard.com/dockercloud/hello-world:0.1
			imagePullPolicy: Always
			ports:
			- containerPort: 80
		  imagePullSecrets:
		  - name: nexussecret
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

	
	curl YOUR_CLUSTER_PUBLIC_IP:30000
	
	

    > sudo vi /etc/hosts
	add:
	192.168.126.129 nexus.bpwizard.com nexus
	192.168.126.129 docker.bpwizard.com docker
	
    > http://nexus.bpwizard.com
	added a hosted docker repo, and set http port to 5000.
	
	> sudo vi /etc/systemd/system/docker.service.d/docker-options.conf
	[Service]
    Environment="DOCKER_OPTS=--insecure-registry=docker.bpwizard.com --insecure-registry=10.233.0.0/18 --graph=/var/lib/docker  --log-opt max-size=50m --log-opt max-file=5 \
--iptables=false"

    > RESTART docker
	> docker login docker.bpwizard.com