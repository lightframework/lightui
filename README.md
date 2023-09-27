### 一、项目简介

LightOPS 的前端项目，基于 umi4，antd5 构建。

### 二、快速构建

npm run build

### 三、测试环境部署

```sh
make push
ssh 172.21.23.76 (kubectl12#$)
./upgrade-ui.sh
```

#### swagger 自动生成后端 api 的调用 sdk

npx max openapi
