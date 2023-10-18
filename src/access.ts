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

  const apiAccess: Record<ApiFuncName, boolean> = apisData.reduce(
    (obj, item) => {
      (obj as any)[item.func] = isSuper || apis?.includes(item.id);
      return obj;
    },
    {},
  ) as Record<ApiFuncName, boolean>;

  return {
    canMenuSysUsers: isSuper || menus?.includes('users'),
    canMenuSysRoles: isSuper || menus?.includes('roles'),
    canMenuSysRoleMembers: isSuper || menus?.includes('members'),
    canMenuSysRoleAuth: isSuper || menus?.includes('authorization'),
    canMenuSysTeams: isSuper || menus?.includes('teams'),
    canMenuCmdbClouds: isSuper || menus?.includes('clouds'),
    canMenuCmdbZones: isSuper || menus?.includes('zones'),
    canMenuCmdbSecurityGroups: isSuper || menus?.includes('security-groups'),
    canMenuCmdbVpcs: isSuper || menus?.includes('vpcs'),
    canMenuCmdbImages: isSuper || menus?.includes('images'),
    canMenuCmdbHosts: isSuper || menus?.includes('hosts'),
    canMenuCmdbProjects: isSuper || menus?.includes('projects'),
    canMenuCmdbPersons: isSuper || menus?.includes('professions'),
    canMenuOpsHostTypes: isSuper || menus?.includes('host-types'),
    canMenuOpsEnvs: isSuper || menus?.includes('envs'),
    canMenuOpsTasks: isSuper || menus?.includes('tasks'),
    canMenuOpsApps: isSuper || menus?.includes('apps'),
    ...apiAccess,
  };
};
