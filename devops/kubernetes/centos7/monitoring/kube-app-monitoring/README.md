

kubectl port-forward  ms-grafana-59bb4d8db5-5c699 9090 -n ms-monitoring

http://10.233.24.250:3000
login as admin/admin 

and add prometheus data source

    url, server, http://10.233.31.88:9090

    or http://ms-prometheus:9090

cd /home/fli/kube/monitoring/person-application
mvn spring-boot:run
http://localhost:9000/
http://localhost:9000/person
http://localhost:9000/person/1