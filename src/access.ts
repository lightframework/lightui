import { InitialData } from './app';

export default (initialState: InitialData) => {
  const { currentUser } = initialState;
  const menus = currentUser?.menuIds;
  const apis = currentUser?.apiIds;

  return {
    canMenuSysUsers: menus?.includes('/sys/users'),
    canMenuSysRoles: menus?.includes('/sys/roles'),
    canMenuSysTeams: menus?.includes('/sys/teams'),
    canMenuCmdbClouds: menus?.includes('/cmdb/clouds'),
    canMenuCmdbHosts: menus?.includes('/cmdb/hosts'),
    canMenuCmdbPersons: menus?.includes('/cmdb/persons'),
  };
};
