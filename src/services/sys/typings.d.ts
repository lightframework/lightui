declare namespace API {
  type CurrentUserReq = true;

  type CurrentUserResp = {
    username: string;
    nickname: string;
    avatar: string;
    info: string;
  };

  type deleteUsingDELETEParams = {
    id: string;
  };

  type editParams = {
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

  type LoginReq = {
    username: string;
    password: string;
  };

  type LoginResp = {
    accessToken: string;
    accessExpire: number;
    refreshAfter: number;
  };

  type resetPassParams = {
    id: string;
  };

  type ResetPassReq = {
    id: number;
    password: string;
    repeatPassword: string;
  };

  type User = {
    id: number;
    username: string;
    nickname: string;
    mobile: string;
    avatar?: string;
    info?: string;
  };

  type UserAddReq = {
    username: string;
    nickname: string;
    mobile: string;
    password: string;
    repeatPassword: string;
    avatar?: string;
    info?: string;
  };

  type UserDelReq = {
    id: number;
  };

  type UserDelResp = {
    result: string;
  };

  type UserEditReq = {
    id: number;
    nickname: string;
    mobile: string;
    avatar?: string;
    info?: string;
  };

  type UserEditResp = {
    result: string;
  };

  type UserInfo = {
    username: string;
    nickname: string;
    mobile: string;
    avatar?: string;
    info?: string;
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
    list: User[];
  };
}
