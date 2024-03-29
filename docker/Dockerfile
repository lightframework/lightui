# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:latest

# 将当前目录下的前端静态文件复制到 Nginx 的默认 HTML 根目录
COPY dist /usr/share/nginx/html

# 可选：如果需要暴露 Nginx 的80端口，可以使用 EXPOSE 命令
# EXPOSE 80

# 可选：如果有其他启动指令或额外配置，可以使用 CMD 命令
# CMD ["nginx", "-g", "daemon off;"]