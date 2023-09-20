import { defineConfig } from '@umijs/max';

type Proxy = ReturnType<typeof defineConfig>['proxy'];

const proxy: Proxy = {
  // '/api': {
  //   target: 'http://lightops-dev:9080',
  //   changeOrigin: true,
  //   pathRewrite: { '': '' },
  // },
  '/api/sys': {
    target: 'http://lightops-dev:1001',
    changeOrigin: true,
  },
  '/api/cmdb': {
    target: 'http://lightops-dev:1201',
    changeOrigin: true,
  },
  '/api/ops': {
    target: 'http://lightops-dev:1301',
    changeOrigin: true,
  },
  // '/api/sys': {
  //   target: 'http://172.21.23.140:31001',
  //   changeOrigin: true,
  //   pathRewrite: { '': '' },
  // },
  // '/api/cmdb': {
  //   target: 'http://172.21.23.140:31201',
  //   changeOrigin: true,
  //   pathRewrite: { '': '' },
  // },
  // '/api/ops': {
  //   target: 'http://172.21.23.140:31301',
  //   changeOrigin: true,
  //   pathRewrite: { '': '' },
  // },
};

export default proxy;
