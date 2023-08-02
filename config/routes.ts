import { defineConfig } from '@umijs/max';

type Routes = ReturnType<typeof defineConfig>['routes'];

const routes: Routes = [
  {
    path: '/auth',
    layout: false,
    routes: [
      {
        path: 'login',
        component: 'auth/login',
      },
    ],
  },
  {
    path: '/',
    name: '首页',
    component: 'index',
  },
  {
    path: '/sys',
    name: '系统管理',
    icon: 'SettingOutlined',
    routes: [
      {
        path: 'users',
        name: '用户管理',
        component: 'sys/users',
      },
      {
        path: 'teams',
        name: '团队管理',
        component: 'sys/teams',
      },
      {
        path: 'roles',
        name: '角色管理',
        component: 'sys/roles',
      },
    ],
  },
  {
    path: '/cmdb',
    name: '资源管理',
    icon: 'AppstoreOutlined',
    routes: [
      {
        path: 'hosts',
        name: '主机管理',
        component: 'cmdb/hosts',
      },
      {
        path: 'clouds',
        name: '云商管理',
        routes: [
          {
            path: '',
            component: 'cmdb/clouds',
          },
          {
            path: ':cloudUid',
            component: 'cmdb/clouds/$cloudUid',
          },
        ],
      },
      {
        path: 'host-types',
        name: '主机类型',
        component: 'cmdb/host-types',
      },
      {
        path: 'persons',
        name: '人员管理',
        component: 'cmdb/persons',
      },
    ],
  },
  {
    path: '/ops',
    name: '运维管理',
    icon: 'ToolOutlined',
    routes: [
      {
        path: 'envs',
        name: '环境管理',
        component: 'ops/envs',
      },
      {
        path: 'envts',
        name: '模板管理',
        component: 'ops/envts',
      },
      {
        path: 'projects',
        name: '项目管理',
        component: 'ops/projects',
      },
      {
        path: 'apps',
        name: '应用管理',
        component: 'ops/apps',
      },
      {
        path: 'scripts',
        name: '脚本管理',
        component: 'ops/scripts',
      },
    ],
  },
];

export default routes;
