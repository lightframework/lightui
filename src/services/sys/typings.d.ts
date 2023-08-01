declare namespace API {
  type Api = {
    data?: { apiId?: string; summary?: string };
  };

  type ApiList = {
    data?: { list?: Api[]; total?: number };
  };

  type apiListApiSysApisParams = {
    keywords?: string;
  };

  type ApiListReq = {
    data?: { keywords?: string };
  };

  type ApiListResp = {
    code?: string;
    data?: { data?: ApiList; resp?: BaseResp };
    msg?: string;
  };

  type BaseInfo = {
    data?: { createdAt?: string; id?: number; updatedAt?: string };
  };

  type BaseInfoResp = {
    code?: string;
    data?: { code?: number; msg?: string; success?: boolean };
    msg?: string;
  };

  type BaseListReq = {
    data?: { keywords?: string };
  };

  type BasePathIntId = {
    data?: Record<string, any>;
  };

  type BasePathStrId = {
    data?: Record<string, any>;
  };

  type BaseResp = {
    code?: string;
    data?: { code?: number; msg?: string; success?: boolean };
    msg?: string;
  };

  type ChangeStatusReq = {
    data?: { enabled?: boolean; id?: number };
  };

  type ChangeStatusResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };

  type DataListReq = {
    data?: { current?: number; keyword?: string; orderBy?: string; pageSize?: number };
  };

  type EmptyReq = {
    data?: Record<string, any>;
  };

  type GenerateTokenResp = {
    code?: string;
    data?: { accessExpire?: number; accessToken?: string; refreshAfter?: number };
    msg?: string;
  };

  type LoginReq = {
    data?: { password?: string; username?: string };
  };

  type LoginResp = {
    code?: string;
    data?: { accessExpire?: number; accessToken?: string; refreshAfter?: number };
    msg?: string;
  };

  type MenuAddReq = {
    data?: {
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
  };

  type MenuAddResp = {
    code?: string;
    data?: { resp?: BaseResp };
    msg?: string;
  };

  type menuDeleteApiSysMenusByMenuIdParams = {
    menuId: string;
  };

  type MenuDelReq = {
    data?: Record<string, any>;
  };

  type MenuDelResp = {
    code?: string;
    data?: { resp?: BaseResp };
    msg?: string;
  };

  type menuEditApiSysMenusByMenuIdParams = {
    menuId: string;
  };

  type MenuEditReq = {
    data?: {
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
  };

  type MenuEditResp = {
    code?: string;
    data?: { resp?: BaseResp };
    msg?: string;
  };

  type MenuInfo = {
    data?: {
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
  };

  type menuInfoApiSysMenusByMenuIdParams = {
    menuId: string;
  };

  type MenuInfoReq = {
    data?: Record<string, any>;
  };

  type MenuInfoResp = {
    code?: string;
    data?: { data?: MenuInfo; resp?: BaseResp };
    msg?: string;
  };

  type MenuList = {
    data?: { list?: MenuInfo[]; total?: number };
  };

  type menuListApiSysMenusListParams = {
    keywords?: string;
  };

  type MenuListReq = {
    data?: { keywords?: string };
  };

  type MenuListResp = {
    code?: string;
    data?: { data?: MenuList; resp?: BaseResp };
    msg?: string;
  };

  type MenuPageList = {
    data?: { list?: MenuInfo[]; total?: number };
  };

  type menuPageListApiSysMenusParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type MenuPageListReq = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type MenuPageListResp = {
    code?: string;
    data?: { data?: MenuPageList; resp?: BaseResp };
    msg?: string;
  };

  type OptUserInfo = {
    data?: {
      createBy?: string;
      createdAt?: string;
      id?: number;
      updateBy?: string;
      updatedAt?: string;
    };
  };

  type PageListResp = {
    code?: string;
    data?: { code?: number; msg?: string; success?: boolean; total?: number };
    msg?: string;
  };

  type PageParams = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type PathIdReq = {
    data?: Record<string, any>;
  };

  type ResetPassReq = {
    data?: { confirm?: string; id?: number; password?: string };
  };

  type ResetPassResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };

  type Role = {
    data?: { info?: string; name?: string };
  };

  type roleAuthEditApiSysRolesByIdauthParams = {
    id: string;
  };

  type RoleAuthEditReq = {
    data?: { apiIds?: string[]; menuIds?: string[] };
  };

  type RoleAuthEditResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };

  type roleAuthListApiSysRolesByIdauthParams = {
    id: string;
  };

  type RoleAuthListReq = {
    data?: Record<string, any>;
  };

  type RoleAuthListResp = {
    code?: string;
    data?: { apiIds?: string[]; menuIds?: string[] };
    msg?: string;
  };

  type RoleCreateReq = {
    data?: { info?: string; name?: string };
  };

  type RoleCreateResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };

  type roleDeleteApiSysRolesByIdParams = {
    id: string;
  };

  type RoleDeleteReq = {
    data?: { id?: number };
  };

  type RoleDeleteResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };

  type RoleInfo = {
    data?: {
      createBy?: string;
      createdAt?: string;
      id?: number;
      info?: string;
      name?: string;
      updateBy?: string;
      updatedAt?: string;
    };
  };

  type roleMemAddApiSysRolesByIdusersParams = {
    id: string;
  };

  type RoleMemAddReq = {
    data?: { usernames?: string[] };
  };

  type RoleMemAddResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };

  type roleMemDelApiSysRolesByIdusersParams = {
    id: string;
  };

  type RoleMemDelReq = {
    data?: { usernames?: string[] };
  };

  type RoleMemDelResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };

  type roleMemListApiSysRolesByIdusersParams = {
    id: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type RoleMemListReq = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type RoleMemListResp = {
    code?: string;
    data?: { list?: UserInfo[]; total?: number };
    msg?: string;
  };

  type RoleOption = {
    data?: { id?: number; name?: string };
  };

  type roleOptionsApiSysRolesOptionsParams = {
    keywords?: string;
  };

  type RoleOptionsReq = {
    data?: { keywords?: string };
  };

  type RoleOptionsResp = {
    code?: string;
    data?: { list?: RoleOption[]; total?: number };
    msg?: string;
  };

  type rolePageListApiSysRolesParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type RolePageListReq = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type RolePageListResp = {
    code?: string;
    data?: { list?: RoleInfo[]; total?: number };
    msg?: string;
  };

  type roleReadOneApiSysRolesByIdParams = {
    id: string;
    id: number;
  };

  type RoleReadOneReq = {
    data?: { id?: number };
  };

  type RoleReadOneResp = {
    code?: string;
    data?: {
      createBy?: string;
      createdAt?: string;
      id?: number;
      info?: string;
      name?: string;
      updateBy?: string;
      updatedAt?: string;
    };
    msg?: string;
  };

  type roleUpdateApiSysRolesByIdParams = {
    id: string;
  };

  type RoleUpdateReq = {
    data?: { id?: number; info?: string; name?: string };
  };

  type RoleUpdateResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };

  type SubDataListReq = {
    data?: { current?: number; keyword?: string; orderBy?: string; pageSize?: number };
  };

  type User = {
    data?: {
      avatar?: string;
      email?: string;
      info?: string;
      mobile?: string;
      nickname?: string;
      username?: string;
    };
  };

  type userChangeStatusApiSysUsersByIdstatusParams = {
    id: string;
  };

  type UserCreateReq = {
    data?: {
      avatar?: string;
      confirm?: string;
      email?: string;
      info?: string;
      mobile?: string;
      nickname?: string;
      password?: string;
      roleIds?: number[];
      teamIds?: number[];
      username?: string;
    };
  };

  type UserCreateResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };

  type UserCurrentInfoReq = {
    data?: Record<string, any>;
  };

  type UserCurrentInfoResp = {
    code?: string;
    data?: {
      apiIds?: string[];
      avatar?: string;
      email?: string;
      info?: string;
      menuIds?: string[];
      mobile?: string;
      nickname?: string;
      roles?: string;
      teams?: string;
      username?: string;
    };
    msg?: string;
  };

  type userDeleteApiSysUsersByIdParams = {
    id: string;
  };

  type UserDeleteReq = {
    data?: Record<string, any>;
  };

  type UserDeleteResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };

  type UserInfo = {
    data?: {
      avatar?: string;
      createBy?: string;
      createdAt?: string;
      email?: string;
      enabled?: boolean;
      id?: number;
      info?: string;
      mobile?: string;
      nickname?: string;
      roles?: string;
      teams?: string;
      updateBy?: string;
      updatedAt?: string;
      username?: string;
    };
  };

  type UserOption = {
    data?: { id?: number; nickname?: string; username?: string };
  };

  type userOptionsApiSysUsersOptionsParams = {
    keywords?: string;
  };

  type UserOptionsReq = {
    data?: { keywords?: string };
  };

  type UserOptionsResp = {
    code?: string;
    data?: { list?: UserOption[]; total?: number };
    msg?: string;
  };

  type userPageListApiSysUsersParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type UserPageListReq = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type UserPageListResp = {
    code?: string;
    data?: { list?: UserInfo[]; total?: number };
    msg?: string;
  };

  type userReadOneApiSysUsersByIdParams = {
    id: string;
  };

  type UserReadOneReq = {
    data?: Record<string, any>;
  };

  type UserReadOneResp = {
    code?: string;
    data?: {
      avatar?: string;
      createBy?: string;
      createdAt?: string;
      email?: string;
      enabled?: boolean;
      id?: number;
      info?: string;
      mobile?: string;
      nickname?: string;
      roles?: string;
      teams?: string;
      updateBy?: string;
      updatedAt?: string;
      username?: string;
    };
    msg?: string;
  };

  type userResetPassApiSysUsersByIdpassParams = {
    id: string;
  };

  type userUpdateApiSysUsersByIdParams = {
    id: string;
  };

  type UserUpdateReq = {
    data?: {
      avatar?: string;
      email?: string;
      info?: string;
      mobile?: string;
      nickname?: string;
      roleIds?: number[];
      teamIds?: number[];
      username?: string;
    };
  };

  type UserUpdateResp = {
    code?: string;
    data?: Record<string, any>;
    msg?: string;
  };
}
