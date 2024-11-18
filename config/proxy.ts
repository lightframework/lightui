import { defineConfig } from "@umijs/max"

type Proxy = ReturnType<typeof defineConfig>["proxy"]

const proxy: Proxy = {
  "/api/": {
    target: process.env.BACKEND ?? "http://lightops-stg.fastsdwan.com:8088",
    changeOrigin: true,
  },
}

export default proxy
