FROM nginx

COPY build/ /usr/share/nginx/html/
COPY version.json /
