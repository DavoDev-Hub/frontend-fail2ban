#!/bin/sh
set -e

mkdir -p /var/log/nginx /var/run/fail2ban
touch /var/log/nginx/fail2ban.log

echo "[entrypoint] Iniciando Fail2Ban..."
fail2ban-client -x start
sleep 1
fail2ban-client status || true

echo "[entrypoint] Iniciando nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

trap 'echo "[entrypoint] Deteniendo..."; fail2ban-client stop; kill $NGINX_PID 2>/dev/null' TERM INT

wait $NGINX_PID
