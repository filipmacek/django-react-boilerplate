FROM ubuntu:latest

MAINTAINER Filip Macek

ENV PYTHONUNBUFFERED=1
ENV PROJECTDIR=/home/app
ENV BACKENDDIR=/home/app/backend

# Install basic apps
RUN apt-get update && apt-get install -y git emacs curl iputils-ping

# Install python/django dependencies
RUN apt-get install -y python3-dev python3-pip build-essential supervisor nginx libpq-dev uwsgi-plugin-python3 libcurl4-openssl-dev supervisor
RUN pip3 install -U pip setuptools
RUN pip3 install uwsgi

WORKDIR $BACKENDDIR
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy all files
COPY . .

# Serve it with nginx/uwsgi
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY config/backend_nginx.conf /etc/nginx/sites-available/default
COPY config/supervisord.conf /etc/supervisor/conf.d
# Printing logs onto stdout
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

COPY config/uwsgi.ini $PROJECTDIR
COPY config/uwsgi_params $PROJECTDIR

CMD ["supervisord","-n"]