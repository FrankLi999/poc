#. Elasticsearch
docker run -d -it --name es -p 9200: 9200 -p 9300: 9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.1.1

For production,  the vm.max_map_count Linux kernel setting needs to 
be set to at least 262144.

or Windows with Docker Toolbox, it must be set via docker-machine.  
docker-machine ssh
sudo sysctl - w vm.max_map_count = 262144

#. Kibana
docker run -d -it --name kibana --link es:elasticsearch -p 5601:5601 docker.elastic.co/kibana/kibana:6.1.1

# Logstash
Start Logstash with input and output declared

docker run -d -it --name logstash -p 5000:5000 logstash -e 
'input { tcp { port => 5000 codec => "json" } } output {
elasticsearch { hosts => ["192.168.99.100"] index => 
"micro-%{serviceName}"} }'