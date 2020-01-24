# JHipser-Prometheus
   user/pwd: jhipster/jhipster
   
   grafana data source:
      proxy, http://jhipster-prometheus:9090
	      or
	  direct or proxy, http://10.233.23.179:9090
   
# Prometheus
   Prometheus
   Prometheus-Operators
   prometheus-exporter
   prometheus-exporter-kube-status
   alert manager
   grafana
https://akomljen.com/get-kubernetes-cluster-metrics-with-prometheus-in-5-minutes/
https://itnext.io/kubernetes-monitoring-with-prometheus-in-15-minutes-8e54d1de2e13

> using Helm

  $ helm repo add coreos https://s3-eu-west-1.amazonaws.com/coreos-charts/stable/
  $ helm install coreos/prometheus-operator --name prometheus-operator --namespace monitoring
  $ helm install coreos/kube-prometheus --name kube-prometheus --set global.rbacEnable=true --namespace monitoring
  kubectl get pods  -n monitoring
  kubectl get services  -n monitoring
  
  prometheus: 
	kubectl port-forward -n monitoring prometheus-kube-prometheus-0 9090
	http://localhost:9090
	http://localhost:9090/alerts
  Grafana
	kubectl port-forward $(kubectl get  pods --selector=app=kube-prometheus-grafana -n  monitoring --output=jsonpath="{.items..metadata.name}") -n monitoring  3000
    http://localhost:3000
  Alertmanager
    kubectl port-forward -n monitoring alertmanager-kube-prometheus-0 9093
	http://localhost:9093
	
  //////////////////////////////////////////////////////////////////////////////////
  Installation record:
	$ helm install coreos/prometheus-operator --name prometheus-operator --namespace monitoring

	NAME:   prometheus-operator
	LAST DEPLOYED: Thu Jun 28 21:06:02 2018
	NAMESPACE: monitoring
	STATUS: DEPLOYED

	RESOURCES:
	==> v1/ConfigMap
	NAME                 DATA  AGE
	prometheus-operator  1     2m

	==> v1/ServiceAccount
	NAME                 SECRETS  AGE
	prometheus-operator  1        2m

	==> v1beta1/ClusterRole
	NAME                     AGE
	prometheus-operator      2m
	psp-prometheus-operator  2m

	==> v1beta1/ClusterRoleBinding
	NAME                     AGE
	prometheus-operator      2m
	psp-prometheus-operator  2m

	==> v1beta1/Deployment
	NAME                 DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
	prometheus-operator  1        1        1           1          2m

	==> v1beta1/PodSecurityPolicy
	NAME                 DATA   CAPS  SELINUX   RUNASUSER  FSGROUP    SUPGROUP   READONLYROOTFS  VOLUMES
	prometheus-operator  false  []    RunAsAny  RunAsAny   MustRunAs  MustRunAs  false           [configMap emptyDir projected secret downwardAPI persistentVolumeClaim]

	==> v1/Pod(related)
	NAME                                  READY  STATUS   RESTARTS  AGE
	prometheus-operator-7f58c745d6-9kksk  1/1    Running  0         2m


	NOTES:
	The Prometheus Operator has been installed. Check its status by running:
	  kubectl --namespace monitoring get pods -l "app=prometheus-operator,release=prometheus-operator"

	Visit https://github.com/coreos/prometheus-operator for instructions on how
	to create & configure Alertmanager and Prometheus instances using the Operator.

	
	$ helm install coreos/kube-prometheus --name kube-prometheus --set global.rbacEnable=true --namespace monitoring
	NAME:   kube-prometheus
	LAST DEPLOYED: Thu Jun 28 21:13:26 2018
	NAMESPACE: monitoring
	STATUS: DEPLOYED

	RESOURCES:
	==> v1beta1/RoleBinding
	NAME                                 AGE
	kube-prometheus-exporter-kube-state  1s

	==> v1/ServiceMonitor
	NAME                                              AGE
	kube-prometheus-alertmanager                      1s
	kube-prometheus-exporter-kube-controller-manager  1s
	kube-prometheus-exporter-kube-dns                 1s
	kube-prometheus-exporter-kube-etcd                1s
	kube-prometheus-exporter-kube-scheduler           1s
	kube-prometheus-exporter-kube-state               1s
	kube-prometheus-exporter-kubelets                 1s
	kube-prometheus-exporter-kubernetes               1s
	kube-prometheus-exporter-node                     1s
	kube-prometheus-grafana                           1s
	kube-prometheus                                   1s

	==> v1/Secret
	NAME                          TYPE    DATA  AGE
	alertmanager-kube-prometheus  Opaque  1     1s
	kube-prometheus-grafana       Opaque  2     1s

	==> v1/ConfigMap
	NAME                                              DATA  AGE
	kube-prometheus-alertmanager                      1     1s
	kube-prometheus-exporter-kube-controller-manager  1     1s
	kube-prometheus-exporter-kube-etcd                1     1s
	kube-prometheus-exporter-kube-scheduler           1     1s
	kube-prometheus-exporter-kube-state               1     1s
	kube-prometheus-exporter-kubelets                 1     1s
	kube-prometheus-exporter-kubernetes               1     1s
	kube-prometheus-exporter-node                     1     1s
	kube-prometheus-grafana                           10    1s
	kube-prometheus-rules                             1     1s
	kube-prometheus                                   1     1s

	==> v1/Service
	NAME                                              TYPE       CLUSTER-IP    EXTERNAL-IP  PORT(S)              AGE
	kube-prometheus-alertmanager                      ClusterIP  10.233.23.81  <none>       9093/TCP             1s
	kube-prometheus-exporter-kube-controller-manager  ClusterIP  None          <none>       10252/TCP            1s
	kube-prometheus-exporter-kube-dns                 ClusterIP  None          <none>       10054/TCP,10055/TCP  1s
	kube-prometheus-exporter-kube-etcd                ClusterIP  None          <none>       4001/TCP             1s
	kube-prometheus-exporter-kube-scheduler           ClusterIP  None          <none>       10251/TCP            1s
	kube-prometheus-exporter-kube-state               ClusterIP  10.233.20.14  <none>       80/TCP               1s
	kube-prometheus-exporter-node                     ClusterIP  10.233.52.32  <none>       9100/TCP             1s
	kube-prometheus-grafana                           ClusterIP  10.233.0.41   <none>       80/TCP               1s
	kube-prometheus                                   ClusterIP  10.233.1.41   <none>       9090/TCP             1s

	==> v1/Alertmanager
	NAME             AGE
	kube-prometheus  1s

	==> v1beta1/ClusterRole
	psp-kube-prometheus-alertmanager         1s
	kube-prometheus-exporter-kube-state      1s
	psp-kube-prometheus-exporter-kube-state  1s
	psp-kube-prometheus-exporter-node        1s
	psp-kube-prometheus-grafana              1s
	kube-prometheus                          1s
	psp-kube-prometheus                      1s

	==> v1beta1/ClusterRoleBinding
	NAME                                     AGE
	psp-kube-prometheus-alertmanager         1s
	kube-prometheus-exporter-kube-state      1s
	psp-kube-prometheus-exporter-kube-state  1s
	psp-kube-prometheus-exporter-node        1s
	psp-kube-prometheus-grafana              1s
	kube-prometheus                          1s
	psp-kube-prometheus                      1s

	==> v1beta1/Role
	NAME                                 AGE
	kube-prometheus-exporter-kube-state  1s

	==> v1beta1/Deployment
	NAME                                 DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
	kube-prometheus-exporter-kube-state  1        1        1           0          1s
	kube-prometheus-grafana              1        1        1           0          1s

	==> v1beta1/PodSecurityPolicy
	NAME                                 DATA   CAPS  SELINUX   RUNASUSER  FSGROUP    SUPGROUP   READONLYROOTFS  VOLUMES
	kube-prometheus-alertmanager         false  []    RunAsAny  RunAsAny   MustRunAs  MustRunAs  false           [configMap emptyDir projected secret downwardAPI persistentVolumeClaim]
	kube-prometheus-exporter-kube-state  false  []    RunAsAny  RunAsAny   MustRunAs  MustRunAs  false           [configMap emptyDir projected secret downwardAPI persistentVolumeClaim]
	kube-prometheus-exporter-node        false  []    RunAsAny  RunAsAny   MustRunAs  MustRunAs  false           [configMap emptyDir projected secret downwardAPI persistentVolumeClaim hostPath]
	kube-prometheus-grafana              false  []    RunAsAny  RunAsAny   MustRunAs  MustRunAs  false           [configMap emptyDir projected secret downwardAPI persistentVolumeClaim hostPath]
	kube-prometheus                      false  []    RunAsAny  RunAsAny   MustRunAs  MustRunAs  false           [configMap emptyDir projected secret downwardAPI persistentVolumeClaim]

	==> v1/ServiceAccount
	NAME                                 SECRETS  AGE
	kube-prometheus-exporter-kube-state  1        1s
	kube-prometheus-exporter-node        1        1s
	kube-prometheus-grafana              1        1s
	kube-prometheus                      1        1s

	==> v1beta1/DaemonSet
	NAME                           DESIRED  CURRENT  READY  UP-TO-DATE  AVAILABLE  NODE SELECTOR  AGE
	kube-prometheus-exporter-node  1        1        0      1           0          <none>         1s

	==> v1/Prometheus
	NAME             AGE
	kube-prometheus  1s

	==> v1/Pod(related)
	NAME                                                  READY  STATUS             RESTARTS  AGE
	kube-prometheus-exporter-node-jcjpr                   0/1    ContainerCreating  0         1s
	kube-prometheus-exporter-kube-state-6bcffdd865-gdzzr  0/2    ContainerCreating  0         1s
	kube-prometheus-grafana-7bcb88ff5f-zxhmz              0/2    ContainerCreating  0         1s


	NOTES:
	DEPRECATION NOTICE:

	- alertmanager.ingress.fqdn is not used anymore, use alertmanager.ingress.hosts []
	- prometheus.ingress.fqdn is not used anymore, use prometheus.ingress.hosts []
	- grafana.ingress.fqdn is not used anymore, use prometheus.grafana.hosts []

  
  
  
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
   
   