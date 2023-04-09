declare namespace API {
  type Api = {
    api_id: string;
    name: string;
  };

  type authEditSysRolesByIdauthParams = {
    id: string;
  };

  type BaseInfo = {
    createdAt: string;
    id: number;
    updatedAt: string;
  };

  type BaseListResp = {
    code: number;
    msg: string;
    success: boolean;
    total: number;
  };

  type BaseResp = {
    code: number;
    msg: string;
    success: boolean;
  };

  type ChangeStatusReq = {
    enable: boolean;
  };

  type changeStatusSysUsersByIdstatusParams = {
    id: string;
  };

  type CurrentUserResp = {
    code?: number;
    data: UserInfo;
    msg?: string;
    success?: boolean;
  };

  type DataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type deleteSysMenusByMenuIdParams = {
    menu_id: string;
  };

  type deleteSysRolesByIdParams = {
    id: string;
  };

  type deleteSysTeamsByIdParams = {
    id: string;
  };

  type deleteSysUsersByIdParams = {
    id: string;
  };

  type editSysMenusByMenuIdParams = {
    menu_id: string;
  };

  type editSysRolesByIdParams = {
    id: string;
  };

  type editSysTeamsByIdParams = {
    id: string;
  };

  type editSysUsersByIdParams = {
    id: string;
  };

  type EmptyReq = true;

  type infoSysRolesByIdParams = {
    id: string;
  };

  type infoSysTeamsByIdParams = {
    id: string;
  };

  type infoSysUsersByIdParams = {
    id: string;
  };

  type listSysMenusParams = {
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type listSysRolesParams = {
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type listSysTeamsParams = {
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type listSysUsersParams = {
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
    accessExpire: number;
    accessToken: string;
    code?: number;
    msg?: string;
    refreshAfter: number;
    success?: boolean;
  };

  type memAddSysRolesByIdusersParams = {
    id: string;
  };

  type memAddSysTeamsByIdusersParams = {
    id: string;
  };

  type memDelSysRolesByIdusersParams = {
    id: string;
  };

  type memDelSysTeamsByIdusersParams = {
    id: string;
  };

  type memListSysRolesByIdusersParams = {
    id: string;
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type memListSysTeamsByIdusersParams = {
    id: string;
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type Menu = {
    direct: boolean;
    enable: boolean;
    icon: string;
    menu_id: string;
    name: string;
    partent_id: string;
    path: string;
    sort: number;
  };

  type MenuApi = {
    apis: Api[];
    direct?: boolean;
    enable?: boolean;
    icon?: string;
    menu_id?: string;
    name?: string;
    partent_id?: string;
    path?: string;
    sort?: number;
  };

  type MenuApiEditReq = {
    api_ids: string[];
  };

  type MenuApiEditSysMenusByMenuIdapisParams = {
    menu_id: string;
  };

  type MenuDelReq = true;

  type MenuEditReq = {
    direct: boolean;
    enable: boolean;
    icon: string;
    name: string;
    partent_id: string;
    path: string;
    sort: number;
  };

  type MenuListResp = {
    code?: number;
    data: MenuApi[];
    msg?: string;
    success?: boolean;
    total?: number;
  };

  type OptUserInfo = {
    createBy: string;
    createdAt: string;
    id: number;
    updateBy: string;
    updatedAt: string;
  };

  type PathIdReq = true;

  type ResetPassReq = {
    confirm: string;
    password: string;
  };

  type resetPassSysUsersByIdpassParams = {
    id: string;
  };

  type Role = {
    info?: string;
    name: string;
  };

  type RoleAuthEditReq = {
    api_ids: string[];
    menu_ids: string[];
  };

  type RoleEditReq = {
    info?: string;
    name?: string;
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

  type RoleListResp = {
    code?: number;
    data: RoleInfo[];
    msg?: string;
    success?: boolean;
    total?: number;
  };

  type RoleMemAddReq = {
    usernames: string[];
  };

  type RoleMemDelReq = {
    usernames: string[];
  };

  type RoleMemListReq = {
    current?: number;
    pageSize?: number;
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
    email: string;
    enable?: boolean;
    info?: string;
    mobile: string;
    nickname: string;
    username: string;
  };

  type UserAddReq = {
    avatar?: string;
    confirm: string;
    email?: string;
    enable?: boolean;
    info?: string;
    mobile?: string;
    nickname?: string;
    password: string;
    username?: string;
  };

  type UserEditReq = {
    avatar?: string;
    email: string;
    enable?: boolean;
    info?: string;
    mobile: string;
    nickname: string;
  };

  type UserInfo = {
    avatar?: string;
    createBy?: string;
    createdAt?: string;
    email: string;
    enable?: boolean;
    id?: number;
    info?: string;
    mobile: string;
    nickname: string;
    roles: Team[];
    teams: Team[];
    updateBy?: string;
    updatedAt?: string;
    username: string;
  };

  type UserInfoResp = {
    code?: number;
    data: UserInfo;
    msg?: string;
    success?: boolean;
  };

  type UserListResp = {
    code?: number;
    data: UserInfo[];
    msg?: string;
    success?: boolean;
    total?: number;
  };
}
