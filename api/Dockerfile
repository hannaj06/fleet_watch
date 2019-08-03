FROM tiangolo/uwsgi-nginx-flask:python3.6

WORKDIR /app

COPY api/requirements.txt requirements.txt

RUN apt-get update -y\
  && apt-get install unixodbc unixodbc-dev vim -y\
  && pip install -r requirements.txt

COPY api/fw_api /app/fw_api
COPY api/alembic /app/alembic
COPY api/alembic.ini /app/alembic.ini
COPY api/databases.conf /app/databases.conf
COPY api/seed_db.py /app/seed_db.py
COPY api/fleet_watch_app.py /app/fleet_watch_app.py

COPY api/startup.sh /usr/bin/startup.sh
RUN chmod +x /usr/bin/startup.sh
ENTRYPOINT ["startup.sh"]
EXPOSE 5000

CMD ["python3", "fleet_watch_app.py"]