declare namespace API {
  type CurrentUserReq = true;

  type CurrentUserResp = {
    username: string;
    nickname: string;
    avatar: string;
    mobile: string;
    email: string;
    info: string;
  };

  type deleteUsingDELETEParams = {
    id: string;
  };

  type deleteUsingDELETEParams = {
    id: string;
  };

  type deleteUsingDELETEParams = {
    id: string;
  };

  type editParams = {
    id: string;
  };

  type editParams = {
    id: string;
  };

  type editParams = {
    id: string;
  };

  type infoParams = {
    id: string;
  };

  type infoParams = {
    id: string;
  };

  type infoParams = {
    id: string;
  };

  type listParams = {
    current?: any;
    pageSize?: any;
    query?: string;
  };

  type listParams = {
    current?: any;
    pageSize?: any;
    query?: string;
  };

  type listParams = {
    current?: any;
    pageSize?: any;
    query?: string;
  };

  type LoginReq = {
    username: string;
    password: string;
  };

  type LoginResp = {
    accessToken: string;
    accessExpire: number;
    refreshAfter: number;
  };

  type memAddParams = {
    id: string;
  };

  type memAddParams = {
    id: string;
  };

  type memDelParams = {
    id: string;
  };

  type memDelParams = {
    id: string;
  };

  type memListParams = {
    id: string;
    current?: any;
    pageSize?: any;
  };

  type memListParams = {
    id: string;
    current?: any;
    pageSize?: any;
  };

  type resetPassParams = {
    id: string;
  };

  type ResetPassReq = {
    id: number;
    password: string;
    confirm: string;
  };

  type ResultResp = {
    result: string;
  };

  type Role = {
    id: number;
    name: string;
    info?: string;
  };

  type RoleAddReq = {
    name: string;
    info?: string;
  };

  type RoleDelReq = {
    id: number;
  };

  type RoleEditReq = {
    id: number;
    name: string;
    info?: string;
  };

  type RoleInfo = {
    id: number;
    name: string;
  };

  type RoleInfoReq = {
    id: number;
  };

  type RoleListReq = {
    current?: number;
    pageSize?: number;
    query?: string;
  };

  type RoleListResp = {
    total: number;
    list: Role[];
  };

  type RoleMemAddReq = {
    id: number;
    userIds: number[];
  };

  type RoleMemDelReq = {
    id: number;
    userIds: number[];
  };

  type RoleMemListReq = {
    current?: number;
    pageSize?: number;
    id: number;
  };

  type Team = {
    id: number;
    name: string;
    info?: string;
  };

  type TeamAddReq = {
    name: string;
    info?: string;
  };

  type TeamDelReq = {
    id: number;
  };

  type TeamEditReq = {
    id: number;
    name: string;
    info?: string;
  };

  type TeamInfo = {
    id: number;
    name: string;
  };

  type TeamInfoReq = {
    id: number;
  };

  type TeamListReq = {
    current?: number;
    pageSize?: number;
    query?: string;
  };

  type TeamListResp = {
    total: number;
    list: Team[];
  };

  type TeamMemAddReq = {
    id: number;
    userIds: number[];
  };

  type TeamMemDelReq = {
    id: number;
    userIds: number[];
  };

  type TeamMemListReq = {
    current?: number;
    pageSize?: number;
    id: number;
  };

  type User = {
    id: number;
    username: string;
    nickname: string;
    mobile: string;
    email: string;
    avatar?: string;
    info?: string;
  };

  type UserAddReq = {
    username: string;
    nickname: string;
    mobile: string;
    email: string;
    password: string;
    confirm: string;
    avatar?: string;
    info?: string;
  };

  type UserDelReq = {
    id: number;
  };

  type UserEditReq = {
    id: number;
    nickname: string;
    mobile: string;
    email: string;
    avatar?: string;
    info?: string;
  };

  type UserInfo = {
    username: string;
    nickname: string;
    mobile: string;
    email: string;
    avatar: string;
    info: string;
    teams: TeamInfo[];
    roles: RoleInfo[];
  };

  type UserInfoReq = {
    id: number;
  };

  type UserListReq = {
    current?: number;
    pageSize?: number;
    query?: string;
  };

  type UserListResp = {
    total: number;
    list: UserInfo[];
  };
}
