### 一、项目简介

LightOPS 的前端项目，基于 umi4，antd5 构建。

### 二、快速构建

yarn build

### 三、部署

nginx 反向代理 server { listen 80; server_name localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    root /data/release/lightops/dist;
    index index.html index.htm;

    location / {
        if (-d $request_filename){
        rewrite ^/(.*)([^/])$ http://$host/$1$2/ permanent;
    }
        try_files $uri $uri/ /index.html;
    }
    location /api/v1/ {
        proxy_pass http://127.0.0.1:8877/api/v1/;
    }
    location /alertHook {
        proxy_pass http://127.0.0.1:8877/alertHook;
    }

error_page 500 502 503 504 /50x.html; location = /50x.html { root /usr/share/nginx/html; } }

### 四、二次开发

执行 yarn，安装所有依赖执行 yarn start:no-mock，拉起 node 调式服务

#### swagger 自动生成后端 api 的调用 sdk

yarn openapi
