
#! /usr/bin/env bash
# Let the DB start
sleep 10;
# Run migrations
alembic upgrade head
# python3 seed_db.py
python3 fleet_watch_app.py