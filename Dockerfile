FROM tiangolo/uwsgi-nginx-flask:python3.6

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apt-get update -y\
  && apt-get install unixodbc unixodbc-dev vim -y\
  && pip install -r requirements.txt

COPY fw_api /app/fw_api
COPY alembic /app/alembic
COPY alembic.ini /app/alembic.ini
COPY databases.conf /app/databases.conf
COPY seed_db.py /app/seed_db.py
COPY fleet_watch_app.py /app/fleet_watch_app.py

COPY startup.sh /usr/bin/startup.sh
RUN chmod +x /usr/bin/startup.sh
ENTRYPOINT ["startup.sh"]
EXPOSE 5000

CMD ["python3", "fleet_watch_app.py"]