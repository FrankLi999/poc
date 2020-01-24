#Fluentd search string for my-spring app:
http://10.233.31.202:5601/app/kibana#/discover?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-120m,mode:quick,to:now))&_a=(columns:!(_source),filters:!((%27$state%27:(store:appState),meta:(alias:!n,disabled:!f,index:%27logstash-*%27,key:kubernetes.pod_name,negate:!f,value:my-spring-boot-deployment-64497d6f6b-8tlbb),query:(match:(kubernetes.pod_name:(query:my-spring-boot-deployment-64497d6f6b-8tlbb,type:phrase))))),index:%27logstash-*%27,interval:auto,query:(query_string:(analyze_wildcard:!t,query:%27*%27)),sort:!(%27@timestamp%27,desc))

{
  "query": {
    "match": {
      "kubernetes.pod_name": {
        "query": "my-spring-boot-deployment-64497d6f6b-8tlbb",
        "type": "phrase"
      }
    }
  }
}

kubernetes.pod_name: my-spring-boot-deployment-64497d6f6b-8tlbb
#Kubespray Fluentd Node config
===============================
https://github.com/kubernetes-incubator/kubespray/blob/master/roles/kubernetes-apps/efk/fluentd/templates/fluentd-config.yml.j2

	<source>
      @id fluentd-containers.log
      @type tail
      path /var/log/containers/*.log
      pos_file /var/log/es-containers.log.pos
      time_format %Y-%m-%dT%H:%M:%S.%NZ
      tag raw.kubernetes.*
      read_from_head true
      <parse>
        @type multi_format
        <pattern>
          format json
          time_key time
          time_format %Y-%m-%dT%H:%M:%S.%NZ
        </pattern>
        <pattern>
          format /^(?<time>.+) (?<stream>stdout|stderr) [^ ]* (?<log>.*)$/
          time_format %Y-%m-%dT%H:%M:%S.%N%:z
        </pattern>
      </parse>
    </source>
    ## Spring boot app log in json log:
	##{"log":"{\"@timestamp\":\"2018-09-01T22:59:17.424+00:00\",\"@version\":1,
	##\"message\":\"Something else is wrong here\",
	##\"logger_name\":\"com.example.logging.GreetingHandler\",
	##\"thread_name\":\"reactor-http-server-epoll-6\",
	##\"level\":\"ERROR\",\"level_value\":40000,\"dest\":\"journal\"}\n",
	##"stream":"stdout",
	##"time":"2018-09-01T22:59:17.425439229Z"}

	
    # Detect exceptions in the log output and forward them as one log entry.
    <match raw.kubernetes.**>
      @id raw.kubernetes
      @type detect_exceptions
      remove_tag_prefix raw
      message log
      stream stream
      multiline_flush_interval 5
      max_bytes 500000
      max_lines 1000
    </match>

  system.input.conf: |-
    # Example:
    # 2015-12-21 23:17:22,066 [salt.state       ][INFO    ] Completed state [net.ipv4.ip_forward] at time 23:17:22.066081
    <source>
      @id minion
      @type tail
      format /^(?<time>[^ ]* [^ ,]*)[^\[]*\[[^\]]*\]\[(?<severity>[^ \]]*) *\] (?<message>.*)$/
      time_format %Y-%m-%d %H:%M:%S
      path /var/log/salt/minion
      pos_file /var/log/salt.pos
      tag salt
    </source>

    # Example:
    # Dec 21 23:17:22 gke-foo-1-1-4b5cbd14-node-4eoj startupscript: Finished running startup script /var/run/google.startup.script
    <source>
      @id startupscript.log
      @type tail
      format syslog
      path /var/log/startupscript.log
      pos_file /var/log/es-startupscript.log.pos
      tag startupscript
    </source>

    # Examples:
    # time="2016-02-04T06:51:03.053580605Z" level=info msg="GET /containers/json"
    # time="2016-02-04T07:53:57.505612354Z" level=error msg="HTTP Error" err="No such image: -f" statusCode=404
    # TODO(random-liu): Remove this after cri container runtime rolls out.
    <source>
      @id docker.log
      @type tail
      format /^time="(?<time>[^)]*)" level=(?<severity>[^ ]*) msg="(?<message>[^"]*)"( err="(?<error>[^"]*)")?( statusCode=($<status_code>\d+))?/
      path /var/log/docker.log
      pos_file /var/log/es-docker.log.pos
      tag docker
    </source>

    # Example:
    # 2016/02/04 06:52:38 filePurge: successfully removed file /var/etcd/data/member/wal/00000000000006d0-00000000010a23d1.wal
    <source>
      @id etcd.log
      @type tail
      # Not parsing this, because it doesn't have anything particularly useful to
      # parse out of it (like severities).
      format none
      path /var/log/etcd.log
      pos_file /var/log/es-etcd.log.pos
      tag etcd
    </source>

    # Multi-line parsing is required for all the kube logs because very large log
    # statements, such as those that include entire object bodies, get split into
    # multiple lines by glog.

    # Example:
    # I0204 07:32:30.020537    3368 server.go:1048] POST /stats/container/: (13.972191ms) 200 [[Go-http-client/1.1] 10.244.1.3:40537]
    <source>
      @id kubelet.log
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/kubelet.log
      pos_file /var/log/es-kubelet.log.pos
      tag kubelet
    </source>

    # Example:
    # I1118 21:26:53.975789       6 proxier.go:1096] Port "nodePort for kube-system/default-http-backend:http" (:31429/tcp) was open before and is still needed
    <source>
      @id kube-proxy.log
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/kube-proxy.log
      pos_file /var/log/es-kube-proxy.log.pos
      tag kube-proxy
    </source>

    # Example:
    # I0204 07:00:19.604280       5 handlers.go:131] GET /api/v1/nodes: (1.624207ms) 200 [[kube-controller-manager/v1.1.3 (linux/amd64) kubernetes/6a81b50] 127.0.0.1:38266]
    <source>
      @id kube-apiserver.log
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/kube-apiserver.log
      pos_file /var/log/es-kube-apiserver.log.pos
      tag kube-apiserver
    </source>

    # Example:
    # I0204 06:55:31.872680       5 servicecontroller.go:277] LB already exists and doesn't need update for service kube-system/kube-ui
    <source>
      @id kube-controller-manager.log
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/kube-controller-manager.log
      pos_file /var/log/es-kube-controller-manager.log.pos
      tag kube-controller-manager
    </source>

    # Example:
    # W0204 06:49:18.239674       7 reflector.go:245] pkg/scheduler/factory/factory.go:193: watch of *api.Service ended with: 401: The event in requested index is outdated and cleared (the requested history has been cleared [2578313/2577886]) [2579312]
    <source>
      @id kube-scheduler.log
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/kube-scheduler.log
      pos_file /var/log/es-kube-scheduler.log.pos
      tag kube-scheduler
    </source>

    # Example:
    # I1104 10:36:20.242766       5 rescheduler.go:73] Running Rescheduler
    <source>
      @id rescheduler.log
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/rescheduler.log
      pos_file /var/log/es-rescheduler.log.pos
      tag rescheduler
    </source>

    # Example:
    # I0603 15:31:05.793605       6 cluster_manager.go:230] Reading config from path /etc/gce.conf
    <source>
      @id glbc.log
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/glbc.log
      pos_file /var/log/es-glbc.log.pos
      tag glbc
    </source>

    # Example:
    # I0603 15:31:05.793605       6 cluster_manager.go:230] Reading config from path /etc/gce.conf
    <source>
      @id cluster-autoscaler.log
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/cluster-autoscaler.log
      pos_file /var/log/es-cluster-autoscaler.log.pos
      tag cluster-autoscaler
    </source>

    # Logs from systemd-journal for interesting services.
    # TODO(random-liu): Remove this after cri container runtime rolls out.
    <source>
      @id journald-docker
      @type systemd
      filters [{ "_SYSTEMD_UNIT": "docker.service" }]
      <storage>
        @type local
        persistent true
      </storage>
      read_from_head true
      tag docker
    </source>

    # <source>
    #   @id journald-container-runtime
    #   @type systemd
    #   filters [{ "_SYSTEMD_UNIT": "{% raw %}{{ container_runtime }} {% endraw %}.service" }]
    #   <storage>
    #     @type local
    #     persistent true
    #   </storage>
    #   read_from_head true
    #   tag container-runtime
    # </source>

    <source>
      @id journald-kubelet
      @type systemd
      filters [{ "_SYSTEMD_UNIT": "kubelet.service" }]
      <storage>
        @type local
        persistent true
      </storage>
      read_from_head true
      tag kubelet
    </source>

    <source>
      @id journald-node-problem-detector
      @type systemd
      filters [{ "_SYSTEMD_UNIT": "node-problem-detector.service" }]
      <storage>
        @type local
        persistent true
      </storage>
      read_from_head true
      tag node-problem-detector
    </source>

  forward.input.conf: |-
    # Takes the messages sent over TCP
    <source>
      @type forward
    </source>

  monitoring.conf: |-
    # Prometheus Exporter Plugin
    # input plugin that exports metrics
    <source>
      @type prometheus
    </source>

    <source>
      @type monitor_agent
    </source>

    # input plugin that collects metrics from MonitorAgent
    <source>
      @type prometheus_monitor
      <labels>
        host ${hostname}
      </labels>
    </source>

    # input plugin that collects metrics for output plugin
    <source>
      @type prometheus_output_monitor
      <labels>
        host ${hostname}
      </labels>
    </source>

    # input plugin that collects metrics for in_tail plugin
    <source>
      @type prometheus_tail_monitor
      <labels>
        host ${hostname}
      </labels>
    </source>

  output.conf: |-
    # Enriches records with Kubernetes metadata
    <filter kubernetes.**>
      @type kubernetes_metadata
    </filter>

    <match **>
      @id elasticsearch
      @type elasticsearch
      @log_level info
      include_tag_key true
      host elasticsearch-logging
      port 9200
      logstash_format true
      <buffer>
        @type file
        path /var/log/fluentd-buffers/kubernetes.system.buffer
        flush_mode interval
        retry_type exponential_backoff
        flush_thread_count 2
        flush_interval 5s
        retry_forever
        retry_max_interval 30
        chunk_limit_size 2M
        queue_limit_length 8
        overflow_action block
      </buffer>
    </match>


#Logging
##Kuberntest logging

Every pod in a K8S cluster has its standard output and standard 
error captured and stored in the /var/log/containers/ node 
directory. In addition, a special type of pod called a DaemonSet 
enables the creation of pods that exist on each cluster node. A 
logging agent could therefore be described as a DaemonSet pod that 
captures the logs provided in each node’s /var/log/containers/ 
directory and processes them somehow.  

## ELK/JHipster Console

##EFK

To allow Kubernetes and Fluentd to work together, a fluentd configuration file maps how the 
input data will be found and processed and where it will be saved. An agent container in 
each running node is deployed for monitoring and storing logs provided by the cluster and 
the applications.  

a fluentd pods are deployed as DaemonSet to run on all nodes.

https://blog.ptrk.io/how-to-deploy-an-efk-stack-to-kubernetes/

chap 9
https://www.safaribooksonline.com/library/view/kubernetes-cookbook-2nd/9781788837606/4fc0f412-836c-4e2a-8038-94d1258f83a1.xhtml
https://www.elastic.co/guide/en/kibana/index.html


### Via minikube --> Update to the latest version of minikube

minikube stop
#need at least 5G memory
minikube start --vm-driver=hyperkit --memory 5120

#EFK relies on kube-addon-manager-minikube
kubectl get pods --all-namespaces

Use kubectl logs to watch a kibana that waits for the state to become green. 
This also takes an additional five minutes:

kubectl logs -f kibana-logging-dgql7  --namespace=kube-system

open kibana browser
minikube service kibana-logging --namespace=kube-system

### Via Kubespray
> Need python python-netaddr
  sudo pip install netaddr
> Open <kubespray dir>/inventory/mycluster/group_vars/k8s-cluster.yaml.
> Around line number 152 in the k8s-cluster.yml file, change the value of  efk_enabled to true:
  # Monitoring apps for k8s
  efk_enabled: true
> Run the following command to update the cluster
  ansible-playbook -b -i inventory/mycluster/hosts.ini cluster.yml
  
> kubectl get pods --all-namespaces

> Check the kibana log to see if the status has become green:
  $ kubectl logs -f kibana-logging-57d98b74f9-x8nz5 --namespace=kube-system

> Run kubectl cluster-info, confirm Kibana is running, and capture the URL of Kibana:

  kubectl cluster-info

> In order to access the Kibana WebUI from your machine remotely, it is easier 
  to use ssh port forwarding from your machine to the Kubernetes master:
  
   $ ssh -L 8080:127.0.0.1:8080 <Kubernetes master IP address>
> Access the Kibana WebUI from your machine using the following URL: 
  http://localhost:8080/api/v1/namespaces/kube-system/services/kibana-logging/proxy

$ minikube addons enable efk

## Spring microservices logging
## Kubernetes system logs such as master and node logs
There is an easy way to achieve Kubernetes system log management that integrates 
with the EFK stack; add a Kubernetes Event Exporter, which keeps monitoring a Kubernetes 
event. When the new event has occurred, send a log to Elasticsearch. So, you can monitor 
a Kubernetes event with Kibana as well.

https://www.safaribooksonline.com/library/view/kubernetes-cookbook-2nd/9781788837606/c234ee24-c1e0-4ad3-bc0c-edf20f4707c9.xhtml

We have prepared an Eventer (Event Exporter) add-on 
(https://raw.githubusercontent.com/kubernetes-cookbook/second-edition/master/chapter9/9-1/eventer.yml).
 It is Heapster (https://github.com/kubernetes/heapster), based and expected to run on top of EFK add-ons.
 
 
 kubectl get services -n kube-system
 http://10.233.52.105:5601/app/kibana
 
##Elasticsearch

	https://github.com/pires/kubernetes-elasticsearch-cluster
	https://blog.ptrk.io/how-to-deploy-an-efk-stack-to-kubernetes/

	Elasticsearch best-practices recommend to separate nodes in three roles:

		Master nodes - intended for clustering management only, no data, no HTTP API
		Data nodes - intended for client usage and data
		Ingest nodes - intended for document pre-processing during ingestion

#Tracing
	
##Zipkin
https://logz.io/blog/zipkin-elk/

While logs can tell us whether a specific request failed to 
execute or not and metrics can help us monitor how many times 
this request failed and how long the failed request took, traces 
help us debug the reason why the request failed, or took so long 
to execute by breaking up the execution flow and dissecting it 
into smaller events.


The Zipkin UI provides us with some basic options to analyze traced requests 
— we can use a dependency diagram to view the execution flow, we can filter 
or sort the traces collected by Zipkin per application, length of trace and 
timestamp.

Using ELK though, takes trace analysis up a notch. Elasticsearch can be used 
for long-term retention of the trace data and Kibana will allow you gain much 
deeper insight into the data. 

## Set up Zipkin

## Integrating with EFK/ELK