import { defineConfig } from "@umijs/max"

type Routes = ReturnType<typeof defineConfig>["routes"]

const routes: Routes = [
  {
    path: "/auth/login",
    name: "登录 - LightOPS",
    layout: false,
    component: "auth/login",
  },
  {
    path: "/",
    name: "首页",
    component: "index",
  },
  {
    path: "/cmdb",
    name: "资源管理",
    icon: "CloudOutlined",
    routes: [
      {
        path: "hosts",
        name: "主机管理",
        component: "cmdb/hosts",
        access: "canMenuCmdbHosts",
      },
    ],
  },
  {
    path: "/jobs",
    name: "作业管理",
    icon: "SnippetsOutlined",
    routes: [
      {
        path: "create-hosts",
        name: "资源开通",
        component: "jobs/create-hosts",
        access: "canMenuJobsCreateHosts",
      },
      {
        path: "destroy-hosts",
        name: "资源回收",
        component: "jobs/destroy-hosts",
        access: "canMenuJobDestroyHosts",
      },
      {
        path: "tasks",
        name: "任务管理",
        component: "jobs/tasks",
        access: "canMenuJobsTasks",
      },
    ],
  },
  {
    path: "/business",
    name: "业务管理",
    icon: "LaptopOutlined",
    routes: [
      {
        name: "IP集",
        path: "ipset",
        routes: [
          {
            path: "ipset",
            name: "IP集管理",
            component: "business/ipset",
            access: "canMenuBusinessIpset",
          },
          {
            path: "templates",
            name: "模板管理",
            component: "business/ipset-templates",
            access: "canMenuBusinessIpsetTemplates",
          },
          {
            path: "push-records",
            name: "推送管理",
            component: "business/ipset-push-records",
            access: "canMenuBusinessIpsetPushRecords",
          },
        ],
      },
      {
        name: "域名集",
        path: "domainset",
        routes: [
          {
            path: "domainset",
            name: "域名集管理",
            component: "business/domainset",
            access: "canMenuBusinessDomainset",
          },
          {
            path: "push-records",
            name: "推送管理",
            component: "business/domainset-push-records",
            access: "canMenuBusinessDomainsetPushRecords",
          },
        ],
      },
      {
        name: "证书",
        path: "certs",
        routes: [
          {
            path: "certs",
            name: "证书管理",
            component: "business/certs",
            access: "canMenuBusinessCerts",
          },
          {
            path: "cert-issuance-records",
            name: "证书下发记录",
            component: "business/cert-issuance-records",
            access: "canMenuBusinessCertIssuanceRecords",
          },
        ],
      },
      // {
      //   name: "Chat",
      //   path: "chat",
      //   component: "business/chat",
      //   access: "canMenuBusinessChat",
      // },
    ],
  },
  {
    path: "/argus",
    name: "告警管理",
    icon: "NotificationOutlined",
    routes: [
      {
        path: "tactics",
        name: "分派策略",
        component: "argus/tactics",
        access: "canMenuArgusTactics",
      },
    ],
  },
  {
    path: "/cmdb-cfg",
    name: "资源配置",
    icon: "AppstoreOutlined",
    routes: [
      {
        path: "clouds",
        name: "云商管理",
        access: "canMenuCmdbCfgClouds",
        hideChildrenInMenu: true,
        routes: [
          {
            path: "",
            component: "cmdb-cfg/clouds",
          },
          {
            path: ":cloudUid/regions",
            component: "cmdb-cfg/clouds/$cloudUid/regions",
            routes: [
              {
                path: ":regionUid",
                routes: [
                  { path: "", redirect: "instances" },
                  {
                    path: "instances",
                    name: "实例 - 云商管理",
                    component:
                      "cmdb-cfg/clouds/$cloudUid/regions/$regionUid/instances",
                    access: "canMenuCmdbCfgCloudInstances",
                  },
                  {
                    path: "zones",
                    name: "可用区 - 云商管理",
                    component:
                      "cmdb-cfg/clouds/$cloudUid/regions/$regionUid/zones",
                    access: "canMenuCmdbCfgZones",
                  },
                  {
                    path: "vpcs",
                    name: "VPC - 云商管理",
                    component:
                      "cmdb-cfg/clouds/$cloudUid/regions/$regionUid/vpcs",
                    access: "canMenuCmdbCfgVpcs",
                  },
                  {
                    path: "security-groups",
                    name: "安全组 - 云商管理",
                    component:
                      "cmdb-cfg/clouds/$cloudUid/regions/$regionUid/security-groups",
                    access: "canMenuCmdbCfgSecurityGroups",
                  },
                  {
                    path: "images",
                    name: "镜像 - 云商管理",
                    component:
                      "cmdb-cfg/clouds/$cloudUid/regions/$regionUid/images",
                    access: "canMenuCmdbCfgImages",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "cities",
        name: "城市管理",
        component: "cmdb-cfg/cities",
        access: "canMenuCmdbCfgCities",
      },
      {
        path: "host-classes",
        name: "主机类别",
        component: "cmdb-cfg/host-classes",
        access: "canMenuCmdbCfgHostClasses",
      },
      {
        path: "host-types",
        name: "主机类型",
        component: "cmdb-cfg/host-types",
        access: "canMenuCmdbCfgHostTypes",
      },
      {
        path: "professions",
        name: "人员管理",
        component: "cmdb-cfg/professions",
        access: "canMenuCmdbCfgPersons",
        hideChildrenInMenu: true,
        routes: [
          {
            name: "人员管理",
            path: ":professionUid",
            component: "cmdb-cfg/professions/$professionUid",
          },
        ],
      },
      {
        path: "envs",
        name: "环境管理",
        component: "cmdb-cfg/envs",
        access: "canMenuCmdbCfgEnvs",
      },
      {
        path: "projects",
        name: "项目管理",
        component: "cmdb-cfg/projects",
        access: "canMenuCmdbCfgProjects",
      },
      {
        path: "apps",
        name: "应用管理",
        component: "cmdb-cfg/apps",
        access: "canMenuCmdbCfgApps",
      },
      {
        path: "instances",
        name: "实例管理",
        component: "cmdb-cfg/instances",
        access: "canMenuCmdbCfgInstances",
      },
    ],
  },
  {
    path: "/authorizations",
    name: "权限管理",
    icon: "SettingOutlined",
    routes: [
      {
        path: "users",
        name: "用户管理",
        component: "authorizations/users",
        access: "canMenuAuthUsers",
      },
      {
        path: "roles",
        name: "角色管理",
        component: "authorizations/roles",
        access: "canMenuAuthRoles",
        hideChildrenInMenu: true,
        routes: [
          {
            path: ":roleId",
            routes: [
              { path: "", redirect: "members" },
              {
                path: "members",
                name: "角色成员 - 角色管理",
                component: "authorizations/roles/$roleId/members",
                access: "canMenuAuthRoleMembers",
              },
              {
                path: "auth",
                name: "角色权限 - 角色管理",
                component: "authorizations/roles/$roleId/auth",
                access: "canMenuAuthRoleAuth",
              },
            ],
          },
        ],
      },
    ],
  },
  { path: "/*", component: "404" },
]

export default routes
