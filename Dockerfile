FROM tiangolo/uwsgi-nginx-flask:python3.6

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

ENV LISTEN_PORT 5000

EXPOSE 5000

COPY . /app