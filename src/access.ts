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
    canMenuCmdbHosts: isSuper || menus?.includes("canMenuCmdbHosts"),

    canMenuJobsCreateHosts:
      isSuper || menus?.includes("canMenuJobsCreateHosts"),
    canMenuJobDestroyHosts:
      isSuper || menus?.includes("canMenuJobDestroyHosts"),
    canMenuJobsTasks: isSuper || menus?.includes("canMenuJobsTasks"),

    canMenuCmdbCfgClouds: isSuper || menus?.includes("canMenuCmdbCfgClouds"),
    canMenuCmdbCfgCloudInstances:
      isSuper || menus?.includes("canMenuCmdbCfgCloudInstances"),
    canMenuCmdbCfgZones: isSuper || menus?.includes("canMenuCmdbCfgZones"),
    canMenuCmdbCfgVpcs: isSuper || menus?.includes("canMenuCmdbCfgVpcs"),
    canMenuCmdbCfgSecurityGroups:
      isSuper || menus?.includes("canMenuCmdbCfgSecurityGroups"),
    canMenuCmdbCfgImages: isSuper || menus?.includes("canMenuCmdbCfgImages"),
    canMenuCmdbCfgCities: isSuper || menus?.includes("canMenuCmdbCfgCities"),
    canMenuCmdbCfgHostTypes:
      isSuper || menus?.includes("canMenuCmdbCfgHostTypes"),
    canMenuCmdbCfgPersons: isSuper || menus?.includes("canMenuCmdbCfgPersons"),
    canMenuCmdbCfgEnvs: isSuper || menus?.includes("canMenuCmdbCfgEnvs"),
    canMenuCmdbCfgProjects:
      isSuper || menus?.includes("canMenuCmdbCfgProjects"),
    canMenuCmdbCfgApps: isSuper || menus?.includes("canMenuCmdbCfgApps"),
    canMenuCmdbCfgInstances:
      isSuper || menus?.includes("canMenuCmdbCfgInstances"),

    canMenuAuthUsers: isSuper || menus?.includes("canMenuAuthUsers"),
    canMenuAuthRoles: isSuper || menus?.includes("canMenuAuthRoles"),
    canMenuAuthRoleMembers:
      isSuper || menus?.includes("canMenuAuthRoleMembers"),
    canMenuAuthRoleAuth: isSuper || menus?.includes("canMenuAuthRoleAuth"),

    ...apiAccess,
  }
}
