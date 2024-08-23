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
      {
        name: "Chat",
        path: "chat",
        component: "business/chat",
        access: "canMenuBusinessChat",
      },
    ],
  },
  {
    path: "/argus",
    name: "告警管理",
    icon: "NotificationOutlined",
    routes: [
      {
        path: "dicts",
        name: "字典管理",
        component: "argus/dicts",
        access: "canMenuArgusDicts",
      },
      {
        path: "tactics",
        name: "分派策略",
        component: "argus/tactics",
        access: "canMenuArgusTactics",
      },
      {
        path: "current-alerts",
        name: "活跃告警",
        component: "argus/current-alerts",
        hideChildrenInMenu: true,
        routes: [
          {
            name: "活跃告警",
            path: ":rule",
            component: "argus/current-alerts/$rule",
            access: "canMenuArgusCurrentAlerts",
          },
        ],
      },
      {
        path: "history-alerts",
        name: "历史告警",
        component: "argus/history-alerts",
        access: "canMenuArgusHistoryAlerts",
      },
      {
        path: "incidents",
        name: "故障列表",
        hideChildrenInMenu: true,
        routes: [
          {
            path: "",
            component: "argus/incidents",
            access: "canMenuArgusIncidents",
          },
          {
            name: "故障详情",
            path: ":id",
            component: "argus/incidents/$id",
            access: "canMenuArgusIncidentDetails",
          },
        ],
      },
      {
        path: "events",
        name: "事件查询",
        component: "argus/events",
      },
    ],
  },
  {
    path: "/ibex",
    name: "ibex",
    icon: "FileTextOutlined",
    routes: [
      {
        path: "tpls",
        name: "脚本管理",
        hideChildrenInMenu: true,
        routes: [
          {
            path: "",
            name: "脚本管理",
            component: "ibex/tpls",
            access: "canMenuIbexTpl",
          },
          {
            path: "add",
            name: "添加脚本",
            component: "ibex/tpls/add",
          },
          {
            path: ":id/edit",
            name: "编辑脚本",
            component: "ibex/tpls/$id/edit",
          },
        ],
      },
      {
        path: "tasks",
        name: "任务管理",
        hideChildrenInMenu: true,
        routes: [
          {
            path: "",
            name: "任务管理",
            component: "ibex/tasks",
            access: "canMenuIbexTask",
          },
          {
            path: ":id",
            name: "任务详情",
            component: "ibex/tasks/$id",
          },
          {
            path: "add",
            name: "创建任务",
            component: "ibex/tasks/add",
          },
        ],
      },
      {
        path: "host-categrafs",
        name: "远程配置",
        component: "ibex/host-categrafs",
      },
      {
        path: "categraf-tpls",
        name: "监控项配置",
        component: "ibex/categraf-tpls",
      },
      {
        path: "categraf-logs",
        name: "操作日志",
        component: "ibex/categraf-logs",
      },
    ],
  },
  {
    path: "/ci",
    name: "CI/CD",
    icon: "CiOutlined",
    routes: [
      {
        path: "crontabs",
        name: "任务管理",
        component: "ci/crontabs",
        access: "canMenuCiCrontabs",
      },
      {
        path: "deploy",
        name: "部署管理",
        component: "ci/deploy",
        access: "canMenuCiDeploy",
      },
      {
        path: "task",
        name: "执行记录",
        component: "ci/task",
        access: "canMenuCiTask",
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
    path: "/duty",
    name: "排班管理",
    icon: "ScheduleOutlined",
    routes: [
      {
        path: "shifts",
        name: "班次管理",
        component: "duty/shifts",
        access: "canMenuDutyShifts",
      },
      {
        path: "schedules",
        name: "排班日历",
        component: "duty/schedules",
        access: "canMenuDutySchedules",
        hideChildrenInMenu: true,
        routes: [
          {
            name: "排班日历",
            path: ":shiftId",
            component: "duty/schedules/$shiftId",
          },
        ],
      },
      {
        path: "summary",
        name: "排班统计",
        component: "duty/summary",
        access: "canMenuDutySummary",
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
