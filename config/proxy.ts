import { defineConfig } from "@umijs/max"

type Proxy = ReturnType<typeof defineConfig>["proxy"]

const proxy: Proxy = {
  "/api/": {
    target: "http://172.21.23.66:8088",
    changeOrigin: true,
  },
}

export default proxy
