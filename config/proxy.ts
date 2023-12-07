import { defineConfig } from "@umijs/max"

type Proxy = ReturnType<typeof defineConfig>["proxy"]

const proxy: Proxy = {
  "/api/": {
    target: "http://lightops-dev:9080",
    changeOrigin: true,
  },
}

export default proxy
