build:
	docker-compose build

start:
	docker-compose up

run: start

stop:
	docker-compose down

migrate:
	docker exec fleet_watch_fleet_watch_backend_1 alembic upgrade head