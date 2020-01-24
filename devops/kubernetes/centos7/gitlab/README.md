#via kubernetes chart
https://docs.gitlab.com/ee/install/kubernetes/

# Gitlab

  mkdir $HOME/volume-gitlab/config
  mkdir $HOME/volume-gitlab/logs
  mkdir $HOME/volume-gitlab/data
  chmod 777 $HOME/volume-gitlab/config
  chmod 777 $HOME/volume-gitlab/logs
  chmod 777 $HOME/volume-gitlab/data
  
  ///////////////////////////////////////////////////////////
  docker -H 172.17.0.1:2375 run --detach \
    --hostname gitlab.bpwizard.com \
    --publish 8929:80 --publish 8930:443 --publish 8931:22 \
    --name gitlab \
    --restart always \
    --volume $HOME/gitlab/config:/etc/gitlab \
    --volume $HOME/gitlab/logs:/var/log/gitlab \
    --volume $HOME/gitlab/data:/var/opt/gitlab \
    gitlab/gitlab-ce:latest
  /////////////////////////////////////////////////////////////////
  
  kubectl create -f 0-gitlab-ns.yaml
  kubectl create -f 1-gitlab-volume.yaml
  kubectl create -f 2-gitlab-pvc.yaml
  kubectl create -f 3-gitlab.yaml