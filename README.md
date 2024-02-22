# Kubernetes Community São Paulo - 2024
## Simplificando o Monitoramento de aplicações NodeJS.

### Starting Kind Cluster
```bash
 kind create cluster -n kcdsp --config kind.yaml
````

### Install Grafana Tempo
````bash
kubectl apply -f tempo.yaml
````

### Build the NodeJS Voting App
````bash
docker build -t nodejs-voting-app:kcdsp nodejs-voting-app
````

### Build the NodeJS Voting App
- Replace the IMAGE
````bash
kubectl apply -f nodejs-voting-app/deployment.yaml
````

### Install CertManager
````bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.2/cert-manager.yaml
````

### Install the OpenTelemetry Operator
````bash
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
````

### Deploy the OpenTelemetry Collector
````bash
kubectl apply -f otel.yaml
````

### Forward a local port to your application
````bash
kubectl port-forward -n kcdsp svc/nodejs-voting-app-service 8080:80
````

### Forward a local port to your Grafana Instance
````bash
kubectl port-forward -n kcdsp svc/grafana 3000:3000
````

### Apply the auto-instrumentation manifest
````bash
kubectl apply -f instrumentation.yaml
````

### Set the required annotation into your NodeJS app.
````bash
kubectl patch deployment nodejs-voting-app  -n kcdsp -p '{"spec": {"template":{"metadata":{"annotations":{"instrumentation.opentelemetry.io/inject-nodejs":"true"}}}} }'
````

### Create some traffic to your app.
````bash
curl -X POST localhost:8080/vote -H "Content-Type: application/json" -d '{"candidate": "1"}'
````
