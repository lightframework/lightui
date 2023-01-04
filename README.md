### 一、项目简介

### 二、快速构建

### 三、部署

### 四、二次开发

#### swagger 生成

> 因为后端生成的 swagger 和前端的不太一致，所以需要手动调整 swagger 格式

1. 去掉："requestBody": {},
2. "$ref": "#/definitions/int" 替换成： "type": "integer"
3. 执行 yarn openapi
