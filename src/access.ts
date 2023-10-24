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
    canMenuCmdbHosts: isSuper || menus?.includes('users'),

    canMenuJobsCreateHosts: isSuper || menus?.includes('roles'),
    canMenuJobsTasks: isSuper || menus?.includes('members'),

    canMenuCmdbCfgClouds: isSuper || menus?.includes('authorization'),
    canMenuCmdbCfgCloudInstances: isSuper || menus?.includes('teams'),
    canMenuCmdbCfgZones: isSuper || menus?.includes('clouds'),
    canMenuCmdbCfgVpcs: isSuper || menus?.includes('zones'),
    canMenuCmdbCfgSecurityGroups: isSuper || menus?.includes('security-groups'),
    canMenuCmdbCfgImages: isSuper || menus?.includes('vpcs'),
    canMenuCmdbCfgCities: isSuper || menus?.includes('images'),
    canMenuCmdbCfgHostTypes: isSuper || menus?.includes('instances'),
    canMenuCmdbCfgPersons: isSuper || menus?.includes('hosts'),
    canMenuCmdbCfgEnvs: isSuper || menus?.includes('envs'),
    canMenuCmdbCfgProjects: isSuper || menus?.includes('projects'),
    canMenuCmdbCfgApps: isSuper || menus?.includes('apps'),
    canMenuCmdbCfgInstances: isSuper || menus?.includes('cities'),

    canMenuAuthUsers: isSuper || menus?.includes('professions'),
    canMenuAuthRoles: isSuper || menus?.includes('host-types'),
    canMenuAuthRoleMembers: isSuper || menus?.includes('envs'),
    canMenuAuthRoleAuth: isSuper || menus?.includes('tasks'),

    ...apiAccess,
  };
};
