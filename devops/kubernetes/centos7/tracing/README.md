#Set up zipkin on kube

docker pull openzipkin/zipkin:2.11.5
docker pull openzipkin/zipkin-dependencies:2.0.1
curl https://raw.githubusercontent.com/openzipkin/zipkin/2.11.5/zipkin-storage/mysql-v1/src/main/resources/mysql.sql > zipkin.sql

https://github.com/spring-cloud/spring-cloud-kubernetes/tree/master/spring-cloud-kubernetes-examples/kubernetes-zipkin-example

3-zipkin-kubernetes.yml is derived from:
wget http://repo1.maven.org/maven2/io/fabric8/zipkin/zipkin-starter-minimal/0.1.9/zipkin-starter-minimal-0.1.9-kubernetes.yml


Kubernetest deployment:

kubectl -f 0-ns.yaml
kubectl -f 1-volume.yaml
kubectl -f 2-pvc.yaml
kubectl -f 3-zipkin-kubernetes.yml

local testing:
   docker run -d -p 9411:9411 openzipkin/zipkin:2.11.5
   
   curl http://user-greeting-service:3000/api/user/greet