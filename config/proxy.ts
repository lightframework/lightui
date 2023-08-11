import { defineConfig } from '@umijs/max';

type Proxy = ReturnType<typeof defineConfig>['proxy'];

const proxy: Proxy = {
  // '/api': {
  //   target: 'http://lightops-dev:9080',
  //   changeOrigin: true,
  //   pathRewrite: { '': '' },
  // },
  '/api/sys': {
    target: 'http://152.136.132.20:31001',
    changeOrigin: true,
    pathRewrite: { '': '' },
  },
  '/api/cmdb': {
    target: 'http://152.136.132.20:32001',
    changeOrigin: true,
    pathRewrite: { '': '' },
  },
};

export default proxy;
