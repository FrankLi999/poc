
https://github.com/nginxinc/kubernetes-ingress/tree/master/examples/complete-example

mkdir kube
cd kube
wget https://github.com/nginxinc/kubernetes-ingress/archive/v1.2.0.zip
unzip v1.2.0.tar.gz
rm -f v1.2.0.tar.gz

cd install
kubectl apply -f common/ns-and-sa.yaml
kubectl apply -f common/default-server-secret.yaml
kubectl apply -f common/nginx-config.yaml
kubectl apply -f rbac/rbac.yaml
kubectl apply -f deployment/nginx-ingress.yaml
kubectl get pods --namespace=nginx-ingress

kubectl apply -f daemon-set/nginx-ingress.yaml
kubectl get pods --namespace=nginx-ingress


complete-example:

Save the public IP address of the Ingress controller into a shell variable:

cd ../examples/complete-example

$ IC_IP=192.168.126.129
kubectl create -f cafe.yaml
kubectl create -f cafe-secret.yaml
kubectl create -f cafe-ingress.yaml

curl --resolve cafe.example.com:443:$IC_IP https://cafe.example.com/coffee --insecure
curl --resolve cafe.example.com:443:$IC_IP https://cafe.example.com/tea --insecure



======================================================================================
https://kubernetes.io/docs/concepts/services-networking/ingress/#ingress-controllers
https://github.com/kubernetes/ingress-nginx/blob/master/README.md

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/mandatory.yaml
kubectl get pods --all-namespaces -l app=ingress-nginx --watch

//////////////////////////////////////////////////////////////////////////

https://github.com/kubernetes-incubator/kubespray/blob/master/roles/kubernetes-apps/ingress_controller/ingress_nginx/README.md
Mandatory commands
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/namespace.yaml \
    | kubectl apply -f -

curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/default-backend.yaml \
    | kubectl apply -f -

curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/configmap.yaml \
    | kubectl apply -f -

curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/tcp-services-configmap.yaml \
    | kubectl apply -f -

curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/udp-services-configmap.yaml \
    | kubectl apply -f -

Install without RBAC roles
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/without-rbac.yaml \
    | kubectl apply -f -
Install with RBAC roles

Please check the RBAC document.

curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/rbac.yaml \
    | kubectl apply -f -

curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/with-rbac.yaml \
    | kubectl apply -f -
	
==================================================================
kubectl run web --image=nginx --port=80
kubectl expose deployment web --target-port=80 --type=NodePort
kubectl get service web

curl http://10.233.22.98:80
where 10.233.22.98 is the cluster-ip of the service.

# defines an Ingress resource that directs traffic to your web Service:
# basic-ingress.yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: basic-ingress
spec:
  backend:
    serviceName: web
    servicePort: 80
	
kubectl apply -f basic-ingress.yaml
kubectl get ingress basic-ingress