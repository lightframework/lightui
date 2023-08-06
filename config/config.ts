import { defineConfig } from '@umijs/max';
import { join } from 'path';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  title: 'LightOPS',
  mock: false,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  proxy,
  outputPath: "./docker/dist",
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
  ],
  layout: {
    title: '@umijs/max',
  },
  npmClient: 'npm',
  esbuildMinifyIIFE: true,
  tailwindcss: {
  },
});
