
## Install
   
   kubectl create -f 0-ns.yaml
   kubectl create -f 1-kong-volume.yaml
   helm install --name kong kong --namespace kong
   kubectl create -f 2-konga-deployment.yaml
   3-konga-prepare-pod.yaml
   4-konga-service.yaml
##tls certificate:
	kong-admin.bpwizard.com-tls
        kong.bpwizard.com-tls
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /home/admin/kube-tls/kong-admin-bpwizard-com.key -out /home/admin/kube-tls/kong-admin-bpwizard-com.crt -subj "/CN=kong-admin.bpwizard.com"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /home/admin/kube-tls/kong-bpwizard-com.key -out /home/admin/kube-tls/kong-bpwizard-com.crt -subj "/CN=kong.bpwizard.com"

kubectl create secret tls kong-admin.bpwizard.com-tls --key /home/admin/kube-tls/kong-admin-bpwizard-com.key --cert /home/admin/kube-tls/kong-admin-bpwizard-com.crt

kubectl create secret tls kong.bpwizard.com-tls --key /home/admin/kube-tls/kong-bpwizard-com.key --cert /home/admin/kube-tls/kong-bpwizard-com.crt
