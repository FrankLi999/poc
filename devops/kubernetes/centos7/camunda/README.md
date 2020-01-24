## try camunda tomcat docker image:
docker run -d --name camunda -p 18080:8080 \
           -e DB_DRIVER=com.mysql.jdbc.Driver \
           -e DB_URL=jdbc:mysql://camunda-mysql:3306/camundac \
           -e DB_USERNAME=root \
           -e DB_PASSWORD=Passw0rd \
           camunda/camunda-bpm-platform:latest

##  Spring boot embeded version

   [camunda-boot project](https://github.com/FrankLi999/bpm/tree/master/camunda-boot)
   
## Deployment   

    ### Set up mysql 
    TODO: create a mysql-prepare container to initialize mysql for Camunda
	instead of doing this manually
	
	
    > kubectl create -f mysql/1-volumn.yaml

    > helm install --name mysql /mysql --namespace mysql


    > Set up mysql for Camunda
   	   
	 kubectl exec -it shared-mysql-5cd587d54b-695tx -n shared-mysql  -- /bin/bash
     apt-get update
     apt-get install -y curl

create camunda and camundac databases
======================================

		select * from ACT_ID_GROUP;

		select * from ACT_ID_MEMBERSHIP;

		select * from ACT_ID_USER;

		kubectl exec -it shared-mysql-5cd587d54b-695tx -n shared-mysql -- mysql -P3306 -uroot -pPassw0rd

		> show databases;

		> create database camundac; -- for Camunda provided Camnunda docker image

		> create database camunda;  -- for my spring boot embeded Camnunda docker image

		> create database dotcms default character set = utf8 default collate = utf8_general_ci;

		> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'Passw0rd' WITH GRANT OPTION;

		> exit

Create camunda database tables
===============================
	
		# For tomcat-camunda
		
		kubectl exec -it shared-mysql-5cd587d54b-695tx -n shared-mysql -- /bin/bash -c "curl -s -L http://192.168.0.103:8000/mysql_engine_7.9.0.sql| mysql -P3306 -uroot -pPassw0rd --database camundac"
		
		kubectl exec -it shared-mysql-5cd587d54b-695tx  -n shared-mysql -- /bin/bash -c "curl -s -L http://192.168.0.103:8000/mysql_identity_7.9.0.sql| mysql -P3306 -uroot -pPassw0rd --database camundac"

		# For spring-boot embeded Camunda
		
		kubectl exec -it shared-mysql-5cd587d54b-695tx -n shared-mysql -- /bin/bash -c "curl -s -L http://192.168.0.103:8000/mysql_engine_7.9.0.sql| mysql -P3306 -uroot -pPassw0rd --database camunda"
		
		kubectl exec -it shared-mysql-5cd587d54b-695tx -n shared-mysql -- /bin/bash -c "curl -s -L http://192.168.0.103:8000/mysql_identity_7.9.0.sql| mysql -P3306 -uroot -pPassw0rd --database camunda"

Deploy Camunda
================
 
  kubectl create -f camunda/0-ns.yaml

  kubectl create -f camunda/1-servicename.yaml

  kubectl create -f camunda/2-deployment.yaml
  
# Reference apps

    https://blog.bernd-ruecker.com/use-camunda-without-touching-java-and-get-an-easy-to-use-rest-based-orchestration-and-workflow-7bdf25ac198e
    https://github.com/berndruecker/flowing-retail	
