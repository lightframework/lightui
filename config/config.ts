import { defineConfig } from '@umijs/max';
import { join } from 'path';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  mock: false,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'LightOPS',
  },
  npmClient: 'npm',
  outputPath: './docker/dist',
  routes,
  proxy,
  plugins: ['@umijs/max-plugin-openapi'],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, '../swagger/sys.json'),
      namespace: 'SYS',
      projectName: 'sys',
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, '../swagger/cmdb.json'),
      namespace: 'CMDB',
      projectName: 'cmdb',
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, '../swagger/ops.json'),
      namespace: 'OPS',
      projectName: 'ops',
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, '../swagger/cloud.json'),
      namespace: 'CLOUD',
      projectName: 'cloud',
    },
  ],
  tailwindcss: {},
});
