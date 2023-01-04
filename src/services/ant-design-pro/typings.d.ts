declare namespace sys {
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

  type postParams = {
    id: string;
  };

  type ResetPassReq = {
    id: number;
    password: string;
    confirm: string;
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
    confirm: string;
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
    query?: string;
  };

  type UserListResp = {
    users: User[];
  };
}
