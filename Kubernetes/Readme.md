
# Ingress
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace


# Port Forwarding
kubectl port-forward -n ingress-nginx service/nginx-ingress-ingress-nginx-controller 8000:80 &

# Remove none tag images from docker
docker rmi $(docker images | grep none | tr -s ' ' | cut -d ' ' -f 3)