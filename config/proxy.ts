import { defineConfig } from '@umijs/max';

type Proxy = ReturnType<typeof defineConfig>['proxy'];

const proxy: Proxy = {
  '/api': {
    target: 'http://lightops-dev:9080',
    changeOrigin: true,
    pathRewrite: { '': '' },
  },
  // '/api/sys': {
  //   target: 'http://172.16.254.122:31001',
  //   changeOrigin: true,
  //   pathRewrite: { '': '' },
  // },
  // '/api/cmdb': {
  //   target: 'http://172.16.254.122:31201',
  //   changeOrigin: true,
  //   pathRewrite: { '': '' },
  // },
  // '/api/ops': {
  //   target: 'http://172.16.254.122:31301',
  //   changeOrigin: true,
  //   pathRewrite: { '': '' },
  // },
};

export default proxy;
