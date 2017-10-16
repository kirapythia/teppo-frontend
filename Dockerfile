FROM nginx

COPY .docker/nginx.conf /etc/nginx/conf.d/
COPY build/ /usr/share/nginx/html/
COPY version.json /
