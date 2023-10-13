import apisData from '@/constants/apis.json';
import { InitialData } from './app';
import { ApiFuncName } from './constants/api-func-name';

export default (initialState: InitialData) => {
  const { currentUser } = initialState;
  const menus = currentUser?.menuIds;
  const apis = currentUser?.apiIds;

  const isSuper =
    currentUser?.username === 'lightops' ||
    currentUser?.roles?.includes('管理员');

  const apiAccess: Record<ApiFuncName, boolean> = Object.values(apisData)
    .flat()
    .reduce((obj, item) => {
      (obj as any)[item.func] =
        isSuper || apis?.includes(`${item.method}::${item.path}`);
      return obj;
    }, {}) as Record<ApiFuncName, boolean>;

  return {
    canMenuSysUsers: isSuper || menus?.includes('users'),
    canMenuSysRoles: isSuper || menus?.includes('roles'),
    canMenuSysRoleMembers: isSuper || menus?.includes(':roleId/members'),
    canMenuSysRoleAuth: isSuper || menus?.includes(':roleId/authorization'),
    canMenuSysTeams: isSuper || menus?.includes('teams'),
    canMenuCmdbClouds: isSuper || menus?.includes('clouds'),
    canMenuCmdbZones: isSuper || menus?.includes(':regionUid/zones'),
    canMenuCmdbSecurityGroups:
      isSuper || menus?.includes(':regionUid/security-groups'),
    canMenuCmdbVpcs: isSuper || menus?.includes(':regionUid/vpcs'),
    canMenuCmdbImages: isSuper || menus?.includes(':regionUid/images'),
    canMenuCmdbHosts: isSuper || menus?.includes('hosts'),
    canMenuCmdbPersons: isSuper || menus?.includes('persons'),
    canMenuCmdbHostTypes: isSuper || menus?.includes('host-types'),
    canMenuOpsEnvs: isSuper || menus?.includes('envs'),
    canMenuOpsEnvProjects: isSuper || menus?.includes(':envUid/projects'),
    canMenuOpsEnvHosts: isSuper || menus?.includes(':envUid/hosts'),
    canMenuOpsTasks: isSuper || menus?.includes('tasks'),
    canMenuOpsApps: isSuper || menus?.includes('apps'),
    ...apiAccess,
  };
};
