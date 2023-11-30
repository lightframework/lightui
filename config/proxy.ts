import { defineConfig } from "@umijs/max"

type Proxy = ReturnType<typeof defineConfig>["proxy"]

const proxy: Proxy = {
  "/api/cmdb": {
    target: "http://172.21.23.66:8088",
    changeOrigin: true,
  },
  "/api/ops": {
    target: "http://172.21.23.66:8088",
    changeOrigin: true,
  },
  "/api/": {
    target: "http://lightops-dev:9080",
    changeOrigin: true,
  },
}

export default proxy
