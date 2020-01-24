https://itnext.io/deploy-jenkins-with-dynamic-slaves-in-minikube-8aef5404e9c1
https://www.blazemeter.com/blog/how-to-setup-scalable-jenkins-on-top-of-a-kubernetes-cluster
https://github.com/helm/charts.git
git clone  https://github.com/helm/charts.git
docker pull jenkins/jenkins:lts
docker pull jenkins/jnlp-slave:3.10-1
kubectl create -f 0-jenkins-namespace.yaml
kubectl create -f 1-jenkins-volume.yaml
helm install --name jenkins -f ~/kube/jenkins/2-jenkins-values.yaml stable/jenkins --namespace jenkins

helm install --name jenkins stable/jenkins --namespace jenkins

user/pwd: admin/admin
http://10.233.19.221:8080
kubectl cluster-info | grep master
https://kubernetes.default => https://192.168.126.136:6443

NAMESPACE: jenkins
STATUS: DEPLOYED

RESOURCES:
==> v1/Service
NAME           TYPE       CLUSTER-IP     EXTERNAL-IP  PORT(S)    AGE
jenkins-agent  ClusterIP  10.233.15.123  <none>       50000/TCP  0s
jenkins        ClusterIP  10.233.33.254  <none>       8080/TCP   0s

==> v1beta1/Deployment
NAME     DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
jenkins  1        1        1           0          0s

==> v1/ServiceAccount
NAME     SECRETS  AGE
jenkins  1        0s

==> v1/ClusterRoleBinding
NAME                  AGE
jenkins-role-binding  0s

==> v1/PersistentVolumeClaim
NAME     STATUS  VOLUME          CAPACITY  ACCESS MODES  STORAGECLASS  AGE
jenkins  Bound   volume-jenkins  20Gi      RWO           jenkins-pv    0s

==> v1beta1/Ingress
NAME     HOSTS                 ADDRESS  PORTS  AGE
jenkins  jenkins.bpwizard.com  80       0s

==> v1/Pod(related)
NAME                      READY  STATUS    RESTARTS  AGE
jenkins-7545bf874f-xcd6q  0/1    Init:0/1  0         0s

==> v1/Secret
NAME     TYPE    DATA  AGE
jenkins  Opaque  2     0s

==> v1/ConfigMap
NAME           DATA  AGE
jenkins        6     0s
jenkins-tests  1     0s




NOTES:
1. Get your 'admin' user password by running:
  printf $(kubectl get secret --namespace jenkins jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo

2. Visit http://jenkins.bpwizard.com

3. Login with the password from step 1 and the username: admin

For more information on running Jenkins on Kubernetes, visit:
https://cloud.google.com/solutions/jenkins-on-container-engine
Configure the Kubernetes plugin in Jenkins to use the following Service Account name jenkins using the following steps:
  Create a Jenkins credential of type Kubernetes service account with service account name jenkins
  Under configure Jenkins -- Update the credentials config in the cloud section to use the service account credential you created in the step above.


NOTES:
1. Get your 'admin' user password by running:
  printf $(kubectl get secret --namespace jenkins jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo
2. Get the Jenkins URL to visit by running these commands in the same shell:
  export POD_NAME=$(kubectl get pods --namespace jenkins -l "component=jenkins-master" -o jsonpath="{.items[0].metadata.name}")
  echo http://127.0.0.1:8080
  kubectl port-forward $POD_NAME 8080:8080

3. Login with the password from step 1 and the username: admin

For more information on running Jenkins on Kubernetes, visit:
https://cloud.google.com/solutions/jenkins-on-container-engine
Configure the Kubernetes plugin in Jenkins to use the following Service Account name jenkins using the following steps:
  Create a Jenkins credential of type Kubernetes service account with service account name jenkins
  Under configure Jenkins -- Update the credentials config in the cloud section to use the service account credential you created in the step above.


# Requirements
    In a Jenkins slave node:
    > Jenkins needs to run a docker command to build your application to compose \
	  your container image. This requires Docker-in-Docker (dind).
	  
	  It can be achieved by mounting /var/run/docker.sock from the Kubernetes node to 
	  the Jenkins pod that can communicate with Jenkins, the Kubernetes node, and 
	  the Docker daemon.
	  
    > Jenkins need to communicate with the Kubernetes master to control deployment
	> Jenkins need to run Ansible playbooks
	> Jenkins need to run maven scripts
	
	
	
	To run Jenkins by Kubernetes, use an official image (https://hub.docker.com/u/jenkins/) 
	but customize it to install the following applications on it:

		Docker CE
		kubectl binary
		Jenkins Docker plugin
		HTML Publisher Plugin
		Build Timestamp Plugin
		Ansible
		Java
		Maven 
		
	EntryPoint:
	    192.168.126.136 docker.bpwizard.com docker
		192.168.126.136 gitlab.bpwizard.com gitlab
		192.168.126.136 nexus.bpwizard.com nexus
		
		
#Setting up Kubernetes service account and ClusterRole
	To check whether RBAC is enabled and also if the cluster-admin ClusterRole exists or not, 
	type the kubectl get clusterrole command:

	$ kubectl get clusterrole cluster-admin

	Next, create a service account, jenkins-sa, which will be used by a Jenkins pod. 
	
	0-jenkins-serviceaccount.yaml
		apiVersion: v1
		kind: ServiceAccount
		metadata:
		  name: jenkins-sa
		  namespace: default
	kubectl create -f 0-jenkins-serviceaccount.yaml 
	
    Now we can associate the jenkins-sa service account with a cluster-admin ClusterRole.
	1-jenkins-cluster-admin.yaml
		apiVersion: rbac.authorization.k8s.io/v1
		kind: ClusterRoleBinding
		metadata:
		  name: jenkins-cluster-admin
		roleRef:
		  apiGroup: rbac.authorization.k8s.io
		  kind: ClusterRole
		  name: cluster-admin
		subjects:
		- kind: ServiceAccount
		  name: jenkins-sa
		  namespace: default
		  
	In the result, if a pod is launched with the service account jenkins-sa, this Pod has 
	the privilege to control a Kubernetes cluster because of the cluster-admin ClusterRole.
	
	TODO: It should create a custom ClusterRole that has minimal privilege for Jenkins usage.
	
#Launching the Jenkins server via Kubernetes deployment
	2-jenkins.yaml
	
	apiVersion: apps/v1beta1
	kind: Deployment
	metadata:
	  name: my-jenkins
	spec:
	  replicas: 1
	  selector:
		matchLabels:
		  run: my-jenkins
	  template:
		metadata:
		  labels:
			run: my-jenkins
		spec:
		  serviceAccountName: jenkins-sa
		  containers:
		  - name: my-jenkins
			image: hidetosaito/my-jenkins
			readinessProbe:
			  initialDelaySeconds: 40
			  tcpSocket:
				port: 8080
			volumeMounts: 
			- mountPath: /var/run/docker.sock
			  name: docker-sock 
			- mountPath: /var/jenkins_home
			  name: jenkins-data
		  volumes: 
		  - name: docker-sock
			hostPath: 
			  path: /var/run/docker.sock
		  - name: jenkins-data
			hostPath:
			  path: /data/jenkins-data
	---
	apiVersion: v1
	kind: Service
	metadata:
	  name: my-jenkins-service
	spec:
	  ports:
		- protocol: TCP
		  port: 8080
	  type: ClusterIP
	  selector:
		 run: my-jenkins  
		 
	kubectl create -f 2-jenkins.yaml 
	//access to Jenkins Pod
	$ kubectl exec -it my-jenkins-758b89849c-t2sm9 -- /bin/bash
	
	//within Jenkins Pod, you can run docker command
    root@my-jenkins-758b89849c-t2sm9:/# docker pull nginx
	
	//within Jenkins Pod, you can run kubectl command
	root@my-jenkins-758b89849c-t2sm9:/# kubectl get nodes
	
	$ kubectl get pods
	NAME                         READY     STATUS    RESTARTS   AGE
	my-jenkins-cbdd6446d-ttxj5   1/1       Running   0          1m

	//port forward from your machine :58080 to Jenkins :8080
	$ kubectl port-forward my-jenkins-cbdd6446d-ttxj5 58080:8080
	Forwarding from 127.0.0.1:58080 -> 8080
	
	Jenkin WEB UI can now be accessible via http://127.0.0.1:58080 
	
	To get password:
	//now you see initialAdminPassword
	$ kubectl exec my-jenkins-cbdd6446d-ttxj5 -- /bin/bash -c 'cat /var/jenkins_home/secrets/initialAdminPassword'
	47e236f0bf334f838c33f80aac206c22
	
	Config the system to add a slave docker,
	
	Docker Host URI:
	unix:///var/run/docker.sock