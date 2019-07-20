# Fleet Watch

Manage your boat fleet from anywhere you have internet connectivity.

### Quick Start w/Docker for Development

```bash
docker-compose up -d
docker exec -it fleet_watch_fleet_watch_app_1 bash
bash startup.sh
```

### Stop Running Containers

```bash
docker-compose down
```

### Install docker (ubuntu)

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker your-user
```

### Install docker-compose (ubuntu)

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
