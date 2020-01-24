
1. mvn clean install -Dmaven.test.skip=true
2. export DOCKER_ID_USER="xli9999"
   export ZIPKIN_HOST=192.168.99.101
4. docker login
4. mvn docker:build
5. docker tag zipkin-boot:0.1.0 $DOCKER_ID_USER/zipkin-boot
6. docker push $DOCKER_ID_USER/zipkin-boot

7. minikube start --extra-config=apiserver.ServiceNodePortRange=1-55000  --cpus 4 --memory 8192 --network-plugin=cni

==================================================================
ZIPKIN Trace
http://callistaenterprise.se/blogg/teknik/2017/07/29/building-microservices-part-7-distributed-tracing/
==================================================================
8. minikube create -f 1-manifests-zipkin
9. minikube create -f 2-manifests-service


10. http://192.168.99.101:3380/greeting?name=xxx
11. http://192.168.99.101:9411

===============================================================
EFK logging: Elesticsearch, Fluentd, Kibana
https://dzone.com/articles/kubernetes-log-analysis-with-fluentd-elasticsearch
https://logz.io/learn/complete-guide-elk-stack/

https://docs.fluentd.org/v0.12/articles/kubernetes-fluentd

https://geowarin.github.io/spring-boot-logs-in-elastic-search.html

https://docs.fluentd.org/v0.12/articles/java
===============================================================

docker-machine ssh
sudo sysctl -w vm.max_map_count=262144
==========================================================
12. kubectl create -f 3-manifests-logging-service
13. on every node 
    kubectl create -f 3-manifests-logging-fluentd


    minikube ssk
    docker ps|grep fluentd
    $ docker exec -it 21feecdb2f8f ls /var/log/containers
    docker exec -it 21feecdb2f8f ls /var/lib/docker/containers

    kubectl get svc -n kube-system
       elasticsearch          ClusterIP   10.102.145.198   <none>        9200/TCP  
    minikube ssh   
    curl 10.102.145.198:9200/_search?q=*&pretty 
    curl 10.102.145.198:9200/_search?q=*warning    

    docker ps |grep fluentd
    docker exec -it 21feecdb2f8f sh
        ping elasticsearch - no response from 10.102.145.198
        wget http://10.102.145.198:9200/_search?q=*warning
        wget http://elasticsearch:9200/_search?q=*warning
        ls
        rm *warn*
        exit
    
    > apt-get install nginx
      Change the NGINX configuration files in /etc/nginx/sites-available/default and etc/nginx/sites-enabled/default as shown here:

      {
            listen 80 ;
            root /usr/share/nginx;
            index index.html index.htm;
            server_name localhost;
            location / {
                proxy_pass http://< Service-IP >:5601;
            }
        }

    > Kibaba console
      http://192.168.99.101:5601/

==================================================
Spring boot actutator - prometheus - grafana -> AlertManager -> NodeExporter -> cAdviser
https://dzone.com/articles/prometheus-monitoring-with-grafana


via: io.prometheus:simpleclient_spring_boot
https://reflectoring.io/monitoring-spring-boot-with-prometheus/ 

via spring boot actuator
http://blog.monkey.codes/actuator-and-prometheus/
https://github.com/monkey-codes/spring-boot-restful
https://github.com/thomasdarimont/spring-boot-prometheus-example
==================================================

14. cd prometheus-boot
    mvn clean install -Dmaven.test.skip=true
    mvn spring-boot:run

15. cd promtheus-boot/prometheus-grafana

    copy prometheus.yml file to ~\Documents\docker\prometheus\etc
    docker-compose up

16. curl http://localhost:8080/prometheus    

17. http://192.168.99.100:9090/targets
     prometheus itself as well as the spring boot app as targets

     To allow traffic from interface docker0 to access the local dockerhost create the following IPTables rule:

        sudo iptables -A INPUT -i docker0 -j ACCEPT
    To remove the IPTables rule run this:

        sudo iptables -D INPUT -i docker0 -j ACCEPT
18. http://192.168.99.100:3000
    login as admin/admin

    integrate with Prometheus follow the instruction from 
    https://prometheus.io/docs/visualization/grafana/
=============================================
Key cloak
https://github.com/thomasdarimont/awesome-keycloak