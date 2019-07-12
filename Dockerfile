FROM tiangolo/uwsgi-nginx-flask:python3.6

COPY . /app

WORKDIR /app

ENV CRM_DB_CONN_STR=''
ENV TT_DB_CONN_STR=''

RUN pip install -r requirements.txt