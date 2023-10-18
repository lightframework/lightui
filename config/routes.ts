import { defineConfig } from '@umijs/max';

type Routes = ReturnType<typeof defineConfig>['routes'];

const routes: Routes = [
  {
    path: '/auth/login',
    name: '登录 - LightOPS',
    layout: false,
    component: 'auth/login',
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
        access: 'canMenuSysUsers',
      },
      {
        path: 'teams',
        name: '团队管理',
        component: 'sys/teams',
        access: 'canMenuSysTeams',
      },
      {
        path: 'roles',
        name: '角色管理',
        component: 'sys/roles',
        access: 'canMenuSysRoles',
        hideChildrenInMenu: true,
        routes: [
          {
            path: ':roleId',
            routes: [
              { path: '', redirect: 'members' },
              {
                path: 'members',
                name: '角色成员 - 角色管理',
                component: 'sys/roles/$roleId/members',
                access: 'canMenuSysRoleMembers',
              },
              {
                path: 'authorizations',
                name: '角色权限 - 角色管理',
                component: 'sys/roles/$roleId/authorizations',
                access: 'canMenuSysRoleAuth',
              },
            ],
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
        path: 'clouds',
        name: '云商管理',
        access: 'canMenuCmdbClouds',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '',
            component: 'cmdb/clouds',
          },
          {
            path: ':cloudUid/regions',
            component: 'cmdb/clouds/$cloudUid/regions',
            routes: [
              {
                path: ':regionUid',
                routes: [
                  { path: '', redirect: 'zones' },
                  {
                    path: 'zones',
                    name: '可用区 - 云商管理',
                    component: 'cmdb/clouds/$cloudUid/regions/$regionUid/zones',
                    access: 'canMenuCmdbZones',
                  },
                  {
                    path: 'vpcs',
                    name: 'VPC - 云商管理',
                    component: 'cmdb/clouds/$cloudUid/regions/$regionUid/vpcs',
                    access: 'canMenuCmdbVpcs',
                  },
                  {
                    path: 'security-groups',
                    name: '安全组 - 云商管理',
                    component:
                      'cmdb/clouds/$cloudUid/regions/$regionUid/security-groups',
                    access: 'canMenuCmdbSecurityGroups',
                  },
                  {
                    path: 'images',
                    name: '镜像 - 云商管理',
                    component:
                      'cmdb/clouds/$cloudUid/regions/$regionUid/images',
                    access: 'canMenuCmdbImages',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'hosts',
        name: '主机管理',
        component: 'cmdb/hosts',
        access: 'canMenuCmdbHosts',
      },
      {
        path: 'projects',
        name: '项目管理',
        component: 'cmdb/projects',
        access: 'canMenuCmdbProjects',
      },
      {
        path: 'cities',
        name: '城市管理',
        component: 'cmdb/cities',
        access: 'canMenuCmdbCities',
      },
      {
        path: 'professions',
        name: '人员管理',
        component: 'cmdb/professions',
        access: 'canMenuCmdbPersons',
        hideChildrenInMenu: true,
        routes: [
          {
            name: '人员管理',
            path: ':professionUid',
            component: 'cmdb/professions/$professionUid',
          },
        ],
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
        access: 'canMenuOpsEnvs',
        hideChildrenInMenu: true,
        routes: [
          {
            name: '环境管理',
            path: ':envUid',
            component: 'ops/envs/$envUid',
          },
        ],
      },
      {
        path: 'host-types',
        name: '主机类型',
        component: 'ops/host-types',
        access: 'canMenuOpsHostTypes',
      },
      {
        path: 'tasks',
        name: '任务管理',
        component: 'ops/tasks',
        access: 'canMenuOpsTasks',
      },
      {
        path: 'apps',
        name: '应用管理',
        component: 'ops/apps',
        access: 'canMenuOpsApps',
      },
    ],
  },
  { path: '/*', component: '404' },
];

export default routes;
