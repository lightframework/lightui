import { defineConfig } from "@umijs/max"

type Proxy = ReturnType<typeof defineConfig>["proxy"]

const proxy: Proxy = {
  "/api/": {
    target: "http://140.143.117.170:80",
    changeOrigin: true,
  },
}

export default proxy
