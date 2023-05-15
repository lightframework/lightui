declare namespace API {
  type AuthResp = {
    apiIds: string[];
    menuIds: string[];
  };

  type BaseInfo = {
    createdAt: string;
    id: number;
    updatedAt: string;
  };

  type BaseInfoResp = {
    code: number;
    msg: string;
    success: boolean;
  };

  type BaseListReq = {
    keywords?: string;
  };

  type BasePathIntId = true;

  type BasePathStrId = true;

  type BaseResp = {
    code: number;
    msg: string;
    success: boolean;
  };

  type ChangeStatusReq = {
    enabled: boolean;
    id?: number;
  };

  type ChangeStatusResp = {
    resp: BaseResp;
  };

  type CurrentUserInfo = {
    apiIds: string[];
    avatar?: string;
    email?: string;
    info?: string;
    menuIds: string[];
    mobile?: string;
    nickname?: string;
    roles: string;
    teams: string;
    username?: string;
  };

  type DataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type deleteApiSysTeamsByIdParams = {
    id: string;
  };

  type editApiSysTeamsByIdParams = {
    id: string;
  };

  type EmptyReq = true;

  type GenerateTokenResp = {
    accessExpire: number;
    accessToken: string;
    refreshAfter: number;
  };

  type infoApiSysTeamsByIdParams = {
    id: string;
  };

  type listApiSysTeamsParams = {
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type LoginReq = {
    password: string;
    username: string;
  };

  type LoginResp = {
    data: GenerateTokenResp;
    resp: BaseResp;
  };

  type memAddApiSysTeamsByIdusersParams = {
    id: string;
  };

  type memDelApiSysTeamsByIdusersParams = {
    id: string;
  };

  type memListApiSysTeamsByIdusersParams = {
    id: string;
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type MenuAddReq = {
    apiIds?: string[];
    direct?: boolean;
    enabled?: boolean;
    icon?: string;
    menuId?: string;
    name?: string;
    partentId?: string;
    path?: string;
    sort?: number;
  };

  type MenuAddResp = {
    resp: BaseResp;
  };

  type menuDeleteApiSysMenusByMenuIdParams = {
    menuId: string;
  };

  type MenuDelReq = true;

  type MenuDelResp = {
    resp: BaseResp;
  };

  type menuEditApiSysMenusByMenuIdParams = {
    menuId: string;
  };

  type MenuEditReq = {
    apiIds?: string[];
    direct?: boolean;
    enabled?: boolean;
    icon?: string;
    menuId?: string;
    name?: string;
    partentId?: string;
    path?: string;
    sort?: number;
  };

  type MenuEditResp = {
    resp: BaseResp;
  };

  type MenuInfo = {
    apiIds?: string[];
    direct: boolean;
    enabled?: boolean;
    icon: string;
    menuId: string;
    name: string;
    partentId: string;
    path: string;
    sort: number;
  };

  type menuInfoApiSysMenusByMenuIdParams = {
    menuId: string;
  };

  type MenuInfoReq = true;

  type MenuInfoResp = {
    data: MenuInfo;
    resp: BaseResp;
  };

  type MenuList = {
    list: MenuInfo[];
    total: number;
  };

  type menuListApiSysMenusListParams = {
    keywords?: string;
  };

  type MenuListReq = {
    keywords?: string;
  };

  type MenuListResp = {
    data: MenuList;
    resp: BaseResp;
  };

  type MenuPageList = {
    list: MenuInfo[];
    total: number;
  };

  type menuPageListApiSysMenusParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type MenuPageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type MenuPageListResp = {
    data: MenuPageList;
    resp: BaseResp;
  };

  type OptUserInfo = {
    createBy: string;
    createdAt: string;
    id: number;
    updateBy: string;
    updatedAt: string;
  };

  type PageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type PageListResp = {
    code: number;
    msg: string;
    success: boolean;
    total: number;
  };

  type PathIdReq = true;

  type ResetPassReq = {
    confirm: string;
    id?: number;
    password: string;
  };

  type ResetPassResp = {
    resp: BaseResp;
  };

  type Role = {
    info?: string;
    name: string;
  };

  type RoleAddReq = {
    info?: string;
    name?: string;
  };

  type RoleAddResp = {
    resp: BaseResp;
  };

  type roleAuthEditApiSysRolesByIdauthParams = {
    id: string;
  };

  type RoleAuthEditReq = {
    apiIds: string[];
    menuIds: string[];
  };

  type RoleAuthEditResp = {
    resp: BaseResp;
  };

  type roleAuthListApiSysRolesByIdauthParams = {
    id: string;
  };

  type RoleAuthListReq = true;

  type RoleAuthListResp = {
    data: AuthResp;
    resp: BaseResp;
  };

  type roleDeleteApiSysRolesByIdParams = {
    id: string;
  };

  type RoleDelReq = {
    id?: number;
  };

  type RoleDelResp = {
    resp: BaseResp;
  };

  type roleEditApiSysRolesByIdParams = {
    id: string;
  };

  type RoleEditReq = {
    id?: number;
    info?: string;
    name?: string;
  };

  type RoleEditResp = {
    resp: BaseResp;
  };

  type RoleInfo = {
    createBy?: string;
    createdAt?: string;
    id?: number;
    info?: string;
    name?: string;
    updateBy?: string;
    updatedAt?: string;
  };

  type roleInfoApiSysRolesByIdParams = {
    id: string;
    id: number;
  };

  type RoleInfoReq = {
    id?: number;
  };

  type RoleInfoResp = {
    data: RoleInfo;
    resp: BaseResp;
  };

  type RoleList = {
    list: SimpleRole[];
    total: number;
  };

  type roleListApiSysRolesListParams = {
    keywords?: string;
  };

  type RoleListReq = {
    keywords?: string;
  };

  type RoleListResp = {
    data: RoleList;
    resp: BaseResp;
  };

  type roleMemAddApiSysRolesByIdusersParams = {
    id: string;
  };

  type RoleMemAddReq = {
    usernames: string[];
  };

  type RoleMemAddResp = {
    resp: BaseResp;
  };

  type roleMemDelApiSysRolesByIdusersParams = {
    id: string;
  };

  type RoleMemDelReq = {
    usernames: string[];
  };

  type RoleMemDelResp = {
    resp: BaseResp;
  };

  type roleMemListApiSysRolesByIdusersParams = {
    id: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type RoleMemListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type RoleMemListResp = {
    data: UserPageList;
    resp: BaseResp;
  };

  type RolePageList = {
    list: RoleInfo[];
    total: number;
  };

  type rolePageListApiSysRolesParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type RolePageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type RolePageListResp = {
    data: RolePageList;
    resp: BaseResp;
  };

  type SimpleRole = {
    id: number;
    name: string;
  };

  type SimpleUser = {
    id: number;
    nickname: string;
    username: string;
  };

  type SubDataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type Team = {
    info?: string;
    name: string;
  };

  type TeamEditReq = {
    info?: string;
    name?: string;
  };

  type TeamInfo = {
    createBy?: string;
    createdAt?: string;
    id?: number;
    info?: string;
    name?: string;
    updateBy?: string;
    updatedAt?: string;
  };

  type TeamInfoResp = {
    code?: number;
    data: TeamInfo;
    msg?: string;
    success?: boolean;
  };

  type TeamListResp = {
    code?: number;
    data: TeamInfo[];
    msg?: string;
    success?: boolean;
    total?: number;
  };

  type TeamMemAddReq = {
    userIds: number[];
  };

  type TeamMemDelReq = {
    userIds: number[];
  };

  type TeamMemListReq = {
    current?: number;
    pageSize?: number;
  };

  type User = {
    avatar?: string;
    email?: string;
    info?: string;
    mobile?: string;
    nickname: string;
    username: string;
  };

  type UserAddReq = {
    avatar?: string;
    confirm: string;
    email?: string;
    info?: string;
    mobile?: string;
    nickname?: string;
    password: string;
    roleIds?: number[];
    teamIds?: number[];
    username?: string;
  };

  type UserAddResp = {
    resp: BaseResp;
  };

  type userChangeStatusApiSysUsersByIdstatusParams = {
    id: string;
  };

  type UserCurrentInfoReq = true;

  type UserCurrentInfoResp = {
    data: CurrentUserInfo;
    resp: BaseResp;
  };

  type userDeleteApiSysUsersByIdParams = {
    id: string;
  };

  type UserDelReq = {
    id?: number;
  };

  type UserDelResp = {
    resp: BaseResp;
  };

  type userEditApiSysUsersByIdParams = {
    id: string;
  };

  type UserEditReq = {
    avatar?: string;
    email?: string;
    id?: number;
    info?: string;
    mobile?: string;
    nickname?: string;
    roleIds: number[];
    teamIds: number[];
    username?: string;
  };

  type UserEditResp = {
    resp: BaseResp;
  };

  type UserInfo = {
    avatar?: string;
    createBy?: string;
    createdAt?: string;
    email?: string;
    enabled: boolean;
    id?: number;
    info?: string;
    mobile?: string;
    nickname?: string;
    roleIds: number[];
    teamIds: number[];
    updateBy?: string;
    updatedAt?: string;
    username?: string;
  };

  type userInfoApiSysUsersByIdParams = {
    id: string;
    id: number;
  };

  type UserInfoReq = {
    id?: number;
  };

  type UserInfoResp = {
    data: UserInfo;
    resp: BaseResp;
  };

  type UserList = {
    list: SimpleUser[];
    total: number;
  };

  type userListApiSysUsersListParams = {
    keywords?: string;
  };

  type UserListInfo = {
    avatar?: string;
    createBy?: string;
    createdAt?: string;
    email?: string;
    enabled: boolean;
    id?: number;
    info?: string;
    mobile?: string;
    nickname?: string;
    roles: string;
    teams: string;
    updateBy?: string;
    updatedAt?: string;
    username?: string;
  };

  type UserListReq = {
    keywords?: string;
  };

  type UserListResp = {
    data: UserList;
    resp: BaseResp;
  };

  type UserPageList = {
    list: UserListInfo[];
    total: number;
  };

  type userPageListApiSysUsersParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type UserPageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type UserPageListResp = {
    data: UserPageList;
    resp: BaseResp;
  };

  type userResetPassApiSysUsersByIdpassParams = {
    id: string;
  };
}
