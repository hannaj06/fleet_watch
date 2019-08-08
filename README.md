# Fleet Watch

Manage your boat fleet from anywhere you have internet connectivity.

## Prerequisites

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/)
- That's it... no... really

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

## Quick Start w/Docker for Development

See Makefile for more details

### Build

```bash
make build
```

### Running

```bash
make start
```

```bash
make run
```

### Run Migrations

```bash
make migrate
```

### Stop Running Containers

```bash
make stop
```
