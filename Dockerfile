FROM nginx:alpine

RUN apk add --no-cache fail2ban iptables

COPY index.html dashboard.html add.html styles.css /usr/share/nginx/html/
COPY js /usr/share/nginx/html/js
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
COPY fail2ban/filter.d/http-flood.conf /etc/fail2ban/filter.d/http-flood.conf
COPY fail2ban/jail.d/frontend.conf /etc/fail2ban/jail.d/frontend.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
