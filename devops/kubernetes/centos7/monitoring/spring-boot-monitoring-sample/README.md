#Reference
	https://dzone.com/articles/monitoring-using-spring-boot-2-prometheus-amp-graf
	https://github.com/hellosatish/monitoring

   https://itnext.io/kubernetes-monitoring-with-prometheus-in-15-minutes-8e54d1de2e13
   
   http://localhost:8096/actuator
   http://localhost:8096/actuator/prometheus


#Local
   perometheus.exe --config.file=.\setup\spring-boot-monitoring-sample.yml
   http://localhost:9090/targets
   
   
   grafana-server.exe
   
   ##Add Prometheus as a Data Source in Grafana

   > Log into Grafana with the username and password configured (the default is admin/admin).
     http://localhost:3000/login
   > Click the gear icon in the left sidebar and from the menu select "Data Sources." This will list all the  
     configured data sources (if you have configured any).
   > Click on "Add Data Source." This will open a page to add a data source.    
   > Select Prometheus in the "type" drop down.
   > The URL shall be "http://localhost:9090" as we have Prometheus running on local host on port 9090.
   > Save and test
   
   
   ## Create a new dashboard and add a graph to it
   add metrics, such as jvm_memory_used_bytes{job="spring-boot-monitoring-sample",area="heap"} and jvm_memory_max_bytes{job="spring-boot-monitoring-sample",area="heap"}
   
   
#Kubenetes

  

  
