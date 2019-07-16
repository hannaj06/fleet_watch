FROM tiangolo/uwsgi-nginx-flask:python3.6

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

ENV LISTEN_PORT 5000

EXPOSE 5000