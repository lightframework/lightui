import apisData from '@/constants/apis.json';
import { InitialData } from './app';

export default (initialState: InitialData) => {
  const { currentUser } = initialState;
  const menus = currentUser?.menuIds;
  const apis = currentUser?.apiIds;

  const isAdmin = currentUser?.username === 'lightops';

  const apiAccess: Record<string, boolean> = Object.values(apisData)
    .flat()
    .reduce((obj, item) => {
      (obj as any)[item.func] =
        isAdmin || apis?.includes(`${item.method}::${item.path}`);
      return obj;
    }, {});

  return {
    canMenuSysUsers: isAdmin || menus?.includes('users'),
    canMenuSysRoles: isAdmin || menus?.includes('roles'),
    canMenuSysRoleMembers: isAdmin || menus?.includes(':roleId/members'),
    canMenuSysRoleAuth: isAdmin || menus?.includes(':roleId/authorization'),
    canMenuSysTeams: isAdmin || menus?.includes('teams'),
    canMenuCmdbClouds: isAdmin || menus?.includes('clouds'),
    canMenuCmdbZones: isAdmin || menus?.includes(':regionUid/zones'),
    canMenuCmdbSecurityGroups:
      isAdmin || menus?.includes(':regionUid/security-groups'),
    canMenuCmdbVpcs: isAdmin || menus?.includes(':regionUid/vpcs'),
    canMenuCmdbImages: isAdmin || menus?.includes(':regionUid/images'),
    canMenuCmdbHosts: isAdmin || menus?.includes('hosts'),
    canMenuCmdbPersons: isAdmin || menus?.includes('persons'),
    canMenuCmdbHostTypes: isAdmin || menus?.includes('host-types'),
    canMenuOpsEnvs: isAdmin || menus?.includes('envs'),
    canMenuOpsEnvProjects: isAdmin || menus?.includes(':envUid/projects'),
    canMenuOpsEnvHosts: isAdmin || menus?.includes(':envUid/hosts'),
    canMenuOpsTasks: isAdmin || menus?.includes('tasks'),
    canMenuOpsApps: isAdmin || menus?.includes('apps'),
    ...apiAccess,
  };
};
