FROM nginx:stable

RUN adduser --system --no-create-home --disabled-login --group nginxuser



COPY nginx.conf /etc/nginx/nginx.conf

COPY ./dist /usr/share/nginx/dist

# 更改配置文件目录和日志目录的权限
RUN chown -R nginxuser:nginxuser /etc/nginx /var/log/nginx /usr/share/nginx/dist /var/cache/nginx /var/run/


EXPOSE 80 8080

USER nginxuser

CMD ["nginx", "-g", "daemon off;"]