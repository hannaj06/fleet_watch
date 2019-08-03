#! /usr/bin/env bash
set -e
sleep 10
# Run migrations
alembic upgrade head
# python3 seed_db.py
exec "$@"