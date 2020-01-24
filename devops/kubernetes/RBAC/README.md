# To check whether RBAC is enabled and also if the cluster-admin ClusterRole exists or not, 
	type the kubectl get clusterrole command:

	$ kubectl get clusterrole cluster-admin
# enable RBAC in a kube cluster

   check /etc/kubernetes/manifests//etc/kubernetes/manifests
   
   you will see in the file:
   
   command:
    - /hyperkube
    - apiserver
    - --advertise-address=192.168.126.136
    - --etcd-servers=https://192.168.126.136:2379
    - --etcd-cafile=/etc
	....
	
	make sure it has 
	- --authorization-mode=RBAC 
	
	or 
	
	- --authorization-mode=Node,RBAC
   
   