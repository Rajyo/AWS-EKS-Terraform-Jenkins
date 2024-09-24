
# Ingress-Nginx
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace
kubectl port-forward -n ingress-nginx service/nginx-ingress-ingress-nginx-controller 8000:80 &


# Remove none tag images from docker
docker rmi $(docker images | grep none | tr -s ' ' | cut -d ' ' -f 3)


# ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
kubectl port-forward -n argocd service/argocd-server 7000:443 &
kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo

apiVersion: v1
data:
  resource.customizations: |
    networking.k8s.io/Ingress:
      health.lua: |
        hs = {}
        hs.status = "Healthy"
        return hs
 
kind: ConfigMap
metadata:
  name: argocd-cm


# Ingress-Traefik
helm repo add traefik https://traefik.github.io/charts
helm repo update
helm install traefik traefik/traefik --namespace ingress-traefik --create-namespace
