import { defineConfig } from '@umijs/max';
import { join } from 'path';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  esbuildMinifyIIFE: true,
  title: 'LightOPS',
  mock: false,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  proxy,
  outputPath: './docker/dist',
  routes,
  plugins: ['@umijs/max-plugin-openapi'],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, '../swagger/sys.json'),
      namespace: 'API',
      projectName: 'sys',
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, '../swagger/cmdb.json'),
      namespace: 'API',
      projectName: 'cmdb',
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, '../swagger/ops.json'),
      namespace: 'API',
      projectName: 'ops',
    },
  ],
  layout: {
    title: '@umijs/max',
  },
  npmClient: 'npm',
  tailwindcss: {},
});
