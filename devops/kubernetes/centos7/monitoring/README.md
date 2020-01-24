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
   

# Dynamically add spring boot targets

   oprion 1: https://www.robustperception.io/using-json-file-service-discovery-with-prometheus   

   in the prometheus config, add
   scrape_configs:
      ...
	  - job_name: 'spring-boot'
		metrics_path: '/actuator/prometheus'
		file_sd_configs:
		- files:
		  - targets.json
   options 2: Prometheus operators
       https://coreos.com/tectonic/docs/latest/tectonic-prometheus-operator/user-guides/application-monitoring.html
       https://coreos.com/operators/prometheus/docs/latest/user-guides/getting-started.html
       
       steps:
       1> for a sprong cloud app, such as camunda-boot, create a servicemonitor.yaml file
          Use the Prometheus Operator's ServiceMonitor object to select the Service objects to be monitored by the  
          Prometheus server. 
          
       2> Finally to configure Prometheus with the ServiceMonitors, the Prometheus object must select them.
       
          for a group of services, such as selector "tier: springcloud-service", create prometheus-config.yaml
          Tip: New Services matching the label-selector may be added, and the underlying Pods will automatically 
          be monitored as well.
          
       3> Prometheus requires access to the Kubernetes API for discovering the Pods. Therefore it requires sufficient
          RBAC roles for this. 
       
       Now Prometheus will monitor each service with the label "tier: springcloud-service"
       
       service monition spec:
           https://github.com/coreos/prometheus-operator/blob/master/example/prometheus-operator-crd/servicemonitor.crd.yaml
        selector:
           matchLabels:
             tire: springcloud
        endpoints:   
           path:
               description: HTTP path to scrape for metrics.
               type: string
           port:
               description: Name of the service port this endpoint refers to.
                 Mutually exclusive with targetPort.
               type: string
        jobLabel:
              description: The label to use to retrieve the job name from.
              type: string
        namespaceSelector:
          matchNames:
          --springcloud
                    
# Prometheus components
   Prometheus
   Prometheus-Operators
   prometheus-exporter
   prometheus-exporter-kube-status
   alert manager
   grafana
      https://akomljen.com/get-kubernetes-cluster-metrics-with-prometheus-in-5-minutes/
      https://itnext.io/kubernetes-monitoring-with-prometheus-in-15-minutes-8e54d1de2e13
#using helm charts
   
   > helm install --name monitoring-prometheus prometheus --namespace monitoring
   > helm install --name nonitoring-grafana grafana --namespace monitoring
   
# using coreos Helm
  > https://github.com/coreos/prometheus-operator.git
  > helm repo add s3-eu-west-1.amazonaws.com https://s3-eu-west-1.amazonaws.com/coreos-charts/stable/
  
  > cd /home/admin/kube/monitoring/coreos-prometheus-operator-helm-0.23.2/kube-prometheus
    helm dependency build
	
	
 
  > cd /home/admin/kube/monitoring
	kubectl create -f 0-monitoring-ns.yaml
	kubectl create -f 1-prometheus.volume.yaml
	kubectl create -f 2-grafana.volume.yaml
 
  > cd helm install prometheus-operator --name prometheus-operator --namespace coreos-monitoring

	helm install prometheus-operator --name prometheus-operator --namespace coreos-monitoring
	helm install kube-prometheus --name coreos-prometheus --set global.rbacEnable=true --namespace coreos-monitoring
 
  kubectl port-forward -n coreos-monitoring prometheus-coreos-prometheus-0  9090
  
  #$ kubectl port-forward $(kubectl get  pods --selector=app=coreos-prometheus-grafana -n  coreos-monitoring --output=jsonpath="{.items..metadata.name}") -n coreos-monitoring 3000
  
  
  kubectl get svc -n coreos-monitoring
  
  > goes to grafana console: http://localhost:3000, login as admin/admin
  > verify datasource,
    http://coreos-prometheus:9090
    access: proxy
  
  ---------------------------------------------------------
  https://itnext.io/kubernetes-monitoring-with-prometheus-in-15-minutes-8e54d1de2e13
  $ helm repo add coreos https://s3-eu-west-1.amazonaws.com/coreos-charts/stable/
  $ helm install coreos/prometheus-operator --name prometheus-operator --namespace coreos-monitoring
  $ helm install coreos/kube-prometheus --name coreos-prometheus --set global.rbacEnable=true --namespace coreos-monitoring
  kubectl get pods  -n coreos-monitoring
  kubectl get services  -n coreos-monitoring
  
 
  
# Kubernetes setup
kubectl port-forward -n monitoring prometheus-kube-prometheus-0 9090
$ kubectl port-forward $(kubectl get  pods --selector=app=kube-prometheus-grafana -n  monitoring --output=jsonpath="{.items..metadata.name}") -n monitoring  3000


# Spring boot

Monitoring Using Spring Boot 2.0, Prometheus, and Grafana (Part 1 — REST API)
	https://dzone.com/articles/monitoring-using-spring-boot-2-prometheus-amp-graf
Monitoring Using Spring Boot 2.0, Prometheus and Grafana (Part 2 — Exposing Metrics)
    https://dzone.com/articles/monitoring-using-spring-boot-2-prometheus-and-graf
Set Up and Integrate Prometheus With Grafana for Monitoring
	https://dzone.com/articles/monitoring-using-spring-boot-20-prometheus-and-gra

	<!-- Spring boot actuator to expose metrics endpoint -->
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-actuator</artifactId>
	</dependency>
	<!-- Micormeter core dependecy  -->
	<dependency>
		<groupId>io.micrometer</groupId>
		<artifactId>micrometer-core</artifactId>
	</dependency>
	<!-- Micrometer Prometheus registry  -->
	<dependency>
		<groupId>io.micrometer</groupId>
		<artifactId>micrometer-registry-prometheus</artifactId>
	</dependency>

	
	#Metrics related configurations
	management.endpoint.metrics.enabled=true
	management.endpoints.web.exposure.include=*
	management.endpoint.prometheus.enabled=true
	management.metrics.export.prometheus.enabled=true
	
	To see the actuator endpoints, browse
		http://localhost:9000/actuator 
	
	You will notice spring-boot 2 and actuator has enabled an endpoint 
	    http://localhost:9000/actuator/prometheus
		
	person-app.yml
		#Global configurations
		global:
		  scrape_interval:     5s # Set the scrape interval to every 5 seconds.
		  evaluation_interval: 5s # Evaluate rules every 5 seconds.
		scrape_configs:
		  - job_name: 'person-app'
			metrics_path: '/actuator/prometheus'
			static_configs:
			  - targets: ['172.17.0.1:9000']
		
		> perometheus.exe --config.file=YAML_FILE_PATH
		http://localhost:9090
		http://localhost:9090/graph
		
		> Grafana
		 http://localhost:3000, admin/admin
		 
		>  Add Prometheus as a Data Source in Grafana
		Grafana allows you to query, visualize, and alert your metrics from 
		about 30+ open source and commercial data sources. 
		
		1) Log into Grafana with the username and password configured 
			(the default is admin/admin).
		2) Click the gear icon in the left sidebar and from the menu 
			select "Data Sources." This will list all the configured 
			data sources (if you have configured any).
		3). Click on "Add Data Source." This will open a page to add a data source.
			name: prometheus-local
			type selection: Prometheus
			 URL: http://localhost:9090
		5).Fill other details if you have any security or HTTP related settings.
		4) Click "Save & Test."
		
Monitoring Spring boot applications with Prometheus and Grafana
	https://g00glen00b.be/monitoring-spring-prometheus-grafana/
	
	
#Spring metrics
https://docs.spring.io/spring-metrics/docs/current/public/prometheus
	<dependency>
	  <groupId>org.springframework.metrics</groupId>
	  <artifactId>spring-metrics</artifactId>
	  <version>${metrics.version}</version>
	</dependency>
	<dependency>
	  <group>io.prometheus</group>
	  <artifact>simpleclient_common</artifact>
	  <version>${prom.version}</version>
	</dependency>
	
	@SpringBootApplication
	@EnablePrometheusMetrics
	public class MyApp {
	}

	@RestController
	@Timed
	class PersonController {
		Map<Integer, Person> people = new Map<Integer, Person>();

		public PersonController(MeterRegistry registry) {
			// constructs a gauge to monitor the size of the population
			registry.mapSize("population", people);
		}

		@GetMapping("/api/people")
		public List<Person> listPeople() {
			return people;
		}

		@GetMapping("/api/person/")
		public Person findPerson(@PathVariable Integer id) {
			return people.get(id);
		}
	}
	
	@EnablePrometheusMetrics also applies @EnablePrometheusScraping to your 
	Spring Boot application which enables a Spring Boot Actuator endpoint at 
	/prometheus that presents a Prometheus scrape with the appropriate format.

	Here is an example scrape_config to add to prometheus.yml:

	scrape_configs:
	  - job_name: 'spring'
		metrics_path: '/prometheus'
		static_configs:
		  - targets: ['HOST:PORT']

 /////////////////////////////////////
 
 helm repo add coreos https://s3-eu-west-1.amazonaws.com/coreos-charts/stable/
 helm install \
    --name prometheus-operator \
    --namespace monitoring \
    --set rbacEnable=false \
    coreos/prometheus-operator

 kubectl get CustomResourceDefinition
 helm install \
    --name mon \
    --namespace monitoring \
    -f custom-values.yaml \
    coreos/kube-prometheus
///////////////////////////////////////	
# heapster => InfluxDB ==> Grafan --> phasing out
https://www.safaribooksonline.com/library/view/kubernetes-cookbook-2nd/9781788837606/bc132202-1f52-4758-a03b-b2b9dc540f78.xhtml
https://brancz.com/2018/01/05/prometheus-vs-heapster-vs-kubernetes-metrics-apis/
heapster => InfluxDB ==> Grafana

# Prometheus (https://prometheus.io) <= kubespray
Basically, if you have Prometheus, there's almost no reason to use heapster.

#Kubernetes Metrics API: They are installed into a Kubernetes cluster 
as aggregated APIs since 1.8 beta

the resource and custom metrics APIs were defined

The canonical implementation of the resource metrics API is the metrics-server. 
The metrics-server simply gathers what is referred to as the resource metrics: 
CPU, memory (and possibly more in the future). It gathers these from all the 
kubelets in a cluster through the kubelet’s stats API. When gathered the 
metrics-server simply keeps all values on Pods and Nodes in memory.

The custom metrics API, as the name says, allows requesting arbitrary metrics. 
Custom metrics API implementations are specific to the respective backing 
monitoring system. Prometheus was the first monitoring system that an adapter 
was developed for, simply due to it being a very popular choice to monitor 
Kubernetes. This adapter can be found in the k8s-prometheus-adapter repository 
on GitHub. Requests to the k8s-prometheus-adapter (aka the Prometheus 
implementation of the custom-metrics API), are converted to a Prometheus 
query and executed against the respective Prometheus server. The result 
Prometheus returns is then returned by the custom metrics API adapter.

With the use of the k8s-prometheus-adapter we can now autoscale on 
arbitrary metrics that we already collect with Prometheus, without the 
need to run Heapster at all. In fact, one of the areas sig-instrumentation 
is currently working on is, phasing out Heapster, meaning it will eventually 
be unsupported. 

#Historical metrics APIs
   
# JHipser-Prometheus
   user/pwd: jhipster/jhipster
   
   grafana data source:
      proxy, http://jhipster-prometheus:9090
	      or
	  direct or proxy, http://10.233.23.179:9090