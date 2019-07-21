FROM tiangolo/uwsgi-nginx-flask:python3.6

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apt-get update -y\
  && apt-get install unixodbc unixodbc-dev vim -y\
  && pip install -r requirements.txt

ENV LISTEN_PORT 5000
ENV FLASK_ENV=development
EXPOSE 5000

#COPY . /app