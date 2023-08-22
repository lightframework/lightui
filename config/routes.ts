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
        routes: [
          {
            path: ':roleId',
            redirect: 'members',
          },
          {
            path: ':roleId/members',
            name: '角色成员 - 角色管理',
            component: 'sys/roles/$roleId/RoleMembers',
            hideInMenu: true,
          },
          {
            path: ':roleId/authorization',
            name: '功能权限 - 角色管理',
            component: 'sys/roles/$roleId/RoleAuthorization',
            hideInMenu: true,
          },
        ],
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
        name: '主机列表 - 主机管理',
        component: 'cmdb/hosts',
        routes: [
          {
            path: '',
            component: 'cmdb/hosts/HostTable',
            hideInMenu: true,
          },
          {
            path: 'graph',
            name: '主机列表 - 主机管理',
            component: 'cmdb/hosts/HostGraph',
            hideInMenu: true,
          },
          {
            path: 'add',
            name: '添加主机 - 主机管理',
            component: 'cmdb/hosts/HostAdd',
            hideInMenu: true,
          },
        ],
      },
      {
        path: 'clouds',
        name: '云商管理',
        routes: [
          {
            path: '',
            component: 'cmdb/clouds',
          },
          { path: ':cloudUid', redirect: 'regions' },
          {
            path: ':cloudUid/regions',
            component: 'cmdb/clouds/$cloudUid',
            routes: [
              {
                path: ':regionUid',
                redirect: 'zones',
              },
              {
                path: ':regionUid/zones',
                name: '可用区 - 云商管理',
                component: 'cmdb/clouds/$cloudUid/$regionUid/Zones',
                hideInMenu: true,
              },
              {
                path: ':regionUid/vpcs',
                name: 'VPC - 云商管理',
                component: 'cmdb/clouds/$cloudUid/$regionUid/VPC',
                hideInMenu: true,
              },
              {
                path: ':regionUid/security-groups',
                name: '安全组 - 云商管理',
                component: 'cmdb/clouds/$cloudUid/$regionUid/SecurityGroup',
                hideInMenu: true,
              },
              {
                path: ':regionUid/images',
                name: '镜像 - 云商管理',
                component: 'cmdb/clouds/$cloudUid/$regionUid/Images',
                hideInMenu: true,
              },
            ],
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
        routes: [
          {
            path: ':envUid',
            redirect: 'summary',
          },
          {
            path: ':envUid/summary',
            name: '项目概览 - 环境管理',
            component: 'ops/envs/$envUid/EnvSummary',
            hideInMenu: true,
          },
          {
            path: ':envUid/hosts',
            name: '主机列表 - 环境管理',
            component: 'ops/envs/$envUid/EnvHosts',
            hideInMenu: true,
            routes: [
              { path: '', component: 'ops/envs/$envUid/EnvHosts/HostTable' },
              {
                path: 'graph',
                name: '主机列表 - 环境管理',
                component: 'ops/envs/$envUid/EnvHosts/HostGraph',
              },
              {
                path: 'add',
                name: '添加主机 - 环境管理',
                component: 'ops/envs/$envUid/EnvHosts/HostAdd',
              },
            ],
          },
          {
            path: ':envUid/projects',
            name: '项目列表 - 环境管理',
            component: 'ops/envs/$envUid/EnvProjects',
            hideInMenu: true,
          },
        ],
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
