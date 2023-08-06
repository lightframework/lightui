# 使用Node.js作为基础镜像
FROM node:14-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目代码到工作目录
COPY . .

# 构建React应用
RUN npm run build

# 设置启动命令
CMD ["npm", "start"]
