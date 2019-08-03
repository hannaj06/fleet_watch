#! /usr/bin/env bash
set -e
# Run migrations
alembic upgrade head
# python3 seed_db.py
exec "$@"