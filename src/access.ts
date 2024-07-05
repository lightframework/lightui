import apisData from "@/constants/apis.json"
import { InitialData } from "./app"
import { ApiFuncName } from "./constants/api-func-name"

export default (initialState: InitialData) => {
  const { currentUser } = initialState
  const menus = currentUser?.menuIds
  const apis = currentUser?.apiIds

  const isSuper = currentUser?.username === "lightops"

  const apiAccess: Record<ApiFuncName, boolean> = apisData.reduce(
    (obj, item) => {
      ;(obj as any)[item.func] = isSuper || apis?.includes(item.id)
      return obj
    },
    {},
  ) as Record<ApiFuncName, boolean>

  return {
    // 资源管理
    canMenuCmdbHosts: isSuper || menus?.includes("canMenuCmdbHosts"),

    // 作业管理
    canMenuJobsCreateHosts:
      isSuper || menus?.includes("canMenuJobsCreateHosts"),
    canMenuJobDestroyHosts:
      isSuper || menus?.includes("canMenuJobDestroyHosts"),
    canMenuJobsTasks: isSuper || menus?.includes("canMenuJobsTasks"),

    // 业务管理
    canMenuBusinessIpsetTemplates:
      isSuper || menus?.includes("canMenuBusinessIpsetTemplates"),
    canMenuBusinessIpset: isSuper || menus?.includes("canMenuBusinessIpset"),
    canMenuBusinessIpsetPushRecords:
      isSuper || menus?.includes("canMenuBusinessIpsetPushRecords"),
    canMenuBusinessCerts: isSuper || menus?.includes("canMenuBusinessCerts"),
    canMenuBusinessCertIssuanceRecords:
      isSuper || menus?.includes("canMenuBusinessCertIssuanceRecords"),
    canMenuBusinessDomainset:
      isSuper || menus?.includes("canMenuBusinessDomainset"),
    canMenuBusinessDomainsetPushRecords:
      isSuper || menus?.includes("canMenuBusinessDomainsetPushRecords"),
    canMenuBusinessChat: isSuper || menus?.includes("canMenuBusinessChat"),

    // 告警管理
    canMenuArgusDicts: isSuper || menus?.includes("canMenuArgusDicts"),
    canMenuArgusTactics: isSuper || menus?.includes("canMenuArgusTactics"),
    canMenuArgusCurrentAlerts:
      isSuper || menus?.includes("canMenuArgusCurrentAlerts"),
    canMenuArgusHistoryAlerts:
      isSuper || menus?.includes("canMenuArgusHistoryAlerts"),
    canMenuArgusIncidents: isSuper || menus?.includes("canMenuArgusIncidents"),
    canMenuArgusIncidentDetails:
      isSuper || menus?.includes("canMenuArgusIncidentDetails"),

    // CI/CD
    canMenuCiDeploy: isSuper || menus?.includes("canMenuCiDeploy"),
    canMenuCiTask: isSuper || menus?.includes("canMenuCiTask"),

    // 资源配置
    canMenuCmdbCfgClouds: isSuper || menus?.includes("canMenuCmdbCfgClouds"),
    canMenuCmdbCfgCloudInstances:
      isSuper || menus?.includes("canMenuCmdbCfgCloudInstances"),
    canMenuCmdbCfgZones: isSuper || menus?.includes("canMenuCmdbCfgZones"),
    canMenuCmdbCfgVpcs: isSuper || menus?.includes("canMenuCmdbCfgVpcs"),
    canMenuCmdbCfgSecurityGroups:
      isSuper || menus?.includes("canMenuCmdbCfgSecurityGroups"),
    canMenuCmdbCfgImages: isSuper || menus?.includes("canMenuCmdbCfgImages"),
    canMenuCmdbCfgCities: isSuper || menus?.includes("canMenuCmdbCfgCities"),
    canMenuCmdbCfgHostClasses:
      isSuper || menus?.includes("canMenuCmdbCfgHostClasses"),
    canMenuCmdbCfgHostTypes:
      isSuper || menus?.includes("canMenuCmdbCfgHostTypes"),
    canMenuCmdbCfgPersons: isSuper || menus?.includes("canMenuCmdbCfgPersons"),
    canMenuCmdbCfgEnvs: isSuper || menus?.includes("canMenuCmdbCfgEnvs"),
    canMenuCmdbCfgProjects:
      isSuper || menus?.includes("canMenuCmdbCfgProjects"),
    canMenuCmdbCfgApps: isSuper || menus?.includes("canMenuCmdbCfgApps"),
    canMenuCmdbCfgInstances:
      isSuper || menus?.includes("canMenuCmdbCfgInstances"),

    // 排班管理
    canMenuDutyShifts: isSuper || menus?.includes("canMenuDutyShifts"),
    canMenuDutySchedules: isSuper || menus?.includes("canMenuDutySchedules"),

    // 权限管理
    canMenuAuthUsers: isSuper || menus?.includes("canMenuAuthUsers"),
    canMenuAuthRoles: isSuper || menus?.includes("canMenuAuthRoles"),
    canMenuAuthRoleMembers:
      isSuper || menus?.includes("canMenuAuthRoleMembers"),
    canMenuAuthRoleAuth: isSuper || menus?.includes("canMenuAuthRoleAuth"),

    ...apiAccess,
  }
}
