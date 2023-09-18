import apisData from '@/constants/apis.json';
import { InitialData } from './app';

export default (initialState: InitialData) => {
  const { currentUser } = initialState;
  const menus = currentUser?.menuIds;
  const apis = currentUser?.apiIds;

  const apiAccess: Record<string, boolean> = Object.values(apisData)
    .flat()
    .reduce((obj, item) => {
      (obj as any)[item.func] = apis?.includes(`${item.method}::${item.path}`);
      return obj;
    }, {});

  return {
    canMenuSysUsers: menus?.includes('users'),
    canMenuSysRoles: menus?.includes('roles'),
    canMenuSysRoleMembers: menus?.includes(':roleId/members'),
    canMenuSysRoleAuth: menus?.includes(':roleId/authorization'),
    canMenuSysTeams: menus?.includes('teams'),
    canMenuCmdbClouds: menus?.includes('clouds'),
    canMenuCmdbZones: menus?.includes(':regionUid/zones'),
    canMenuCmdbSecurityGroups: menus?.includes(':regionUid/security-groups'),
    canMenuCmdbVpcs: menus?.includes(':regionUid/vpcs'),
    canMenuCmdbImages: menus?.includes(':regionUid/images'),
    canMenuCmdbHosts: menus?.includes('hosts'),
    canMenuCmdbPersons: menus?.includes('persons'),
    canMenuCmdbHostTypes: menus?.includes('host-types'),
    canMenuOpsEnvs: menus?.includes('envs'),
    canMenuOpsEnvProjects: menus?.includes(':envUid/projects'),
    canMenuOpsEnvHosts: menus?.includes(':envUid/hosts'),
    canMenuOpsTasks: menus?.includes('tasks'),
    canMenuOpsApps: menus?.includes('apps'),
    ...apiAccess,
  };
};
