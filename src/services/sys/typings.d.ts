declare namespace SYS {
  type Api = {
    apiId: string
    summary: string
  }

  type ApiList = {
    list: Api[]
    total: number
  }

  type apiListApiSysApisParams = {
    keywords?: string
  }

  type ApiListReq = {
    keywords?: string
  }

  type ApiListResp = {
    code?: number
    data?: { data?: ApiList; resp?: BaseResp }
    msg?: string
  }

  type BaseInfo = {
    createdAt: string
    id: number
    updatedAt: string
  }

  type BaseInfoResp = {
    code?: number
    data?: { code?: number; msg?: string; success?: boolean }
    msg?: string
  }

  type BaseListReq = {
    keywords?: string
  }

  type BasePathIntId = true

  type BasePathStrId = true

  type BaseResp = {
    code?: number
    data?: { code?: number; msg?: string; success?: boolean }
    msg?: string
  }

  type ChangeStatusReq = {
    enabled: boolean
    id?: number
  }

  type ChangeStatusResp = {
    code?: number
    msg?: string
  }

  type DataListReq = {
    current?: number
    keyword?: string
    orderBy?: string
    pageSize?: number
  }

  type Empty = true

  type GenerateTokenResp = {
    code?: number
    data?: {
      accessExpire?: number
      accessToken?: string
      refreshAfter?: number
    }
    msg?: string
  }

  type Holiday = {
    date: string
    holiday: boolean
    name: string
    wage: number
  }

  type holidayDeleteApiSysDutiesByHolidaysdateParams = {
    date: string
  }

  type HolidayDeleteReq = true

  type HolidayDeleteResp = {
    code?: number
    msg?: string
  }

  type HolidayGenerateReq = {
    year: number
  }

  type HolidayGenerateResp = {
    code?: number
    msg?: string
  }

  type holidayReadListApiSysDutiesHolidaysParams = {
    sdate: string
    edate: string
  }

  type HolidayReadListReq = {
    edate: string
    sdate: string
  }

  type HolidayReadListResp = {
    code?: number
    data?: { items?: Holiday[] }
    msg?: string
  }

  type HolidayUpdateReq = {
    data: Holiday
  }

  type HolidayUpdateResp = {
    code?: number
    msg?: string
  }

  type LoginReq = {
    password: string
    username: string
  }

  type LoginResp = {
    code?: number
    data?: {
      accessExpire?: number
      accessToken?: string
      refreshAfter?: number
    }
    msg?: string
  }

  type OptUserInfo = {
    createBy: string
    createdAt: string
    id: number
    updateBy: string
    updatedAt: string
  }

  type PageListResp = {
    code?: number
    data?: { code?: number; msg?: string; success?: boolean; total?: number }
    msg?: string
  }

  type PageParams = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type PathIdReq = true

  type Permission = {
    key: string
    mode: number
  }

  type PublicKeyGetReq = true

  type PublicKeyGetResp = {
    code?: number
    data?: { public_key?: string }
    msg?: string
  }

  type ResetPassReq = {
    id?: number
    password: string
  }

  type ResetPassResp = {
    code?: number
    msg?: string
  }

  type Role = {
    info?: string
    name: string
  }

  type roleAuthEditApiSysRolesByIdauthParams = {
    id: string
  }

  type RoleAuthEditReq = {
    apiIds: string[]
    menuIds: string[]
  }

  type RoleAuthEditResp = {
    code?: number
    msg?: string
  }

  type roleAuthListApiSysRolesByIdauthParams = {
    id: string
  }

  type RoleAuthListReq = true

  type RoleAuthListResp = {
    code?: number
    data?: { apiIds?: string[]; menuIds?: string[] }
    msg?: string
  }

  type RoleCreateReq = {
    info?: string
    name?: string
  }

  type RoleCreateResp = {
    code?: number
    msg?: string
  }

  type roleDeleteApiSysRolesByIdParams = {
    id: string
  }

  type RoleDeleteReq = {
    id?: number
  }

  type RoleDeleteResp = {
    code?: number
    msg?: string
  }

  type RoleInfo = {
    createBy: string
    createdAt: string
    id: number
    info?: string
    name: string
    updateBy: string
    updatedAt: string
  }

  type roleMemAddApiSysRolesByIdusersParams = {
    id: string
  }

  type RoleMemAddReq = {
    usernames: string[]
  }

  type RoleMemAddResp = {
    code?: number
    msg?: string
  }

  type roleMemDelApiSysRolesByIdusersParams = {
    id: string
  }

  type RoleMemDelReq = {
    usernames: string[]
  }

  type RoleMemDelResp = {
    code?: number
    msg?: string
  }

  type roleMemListApiSysRolesByIdusersParams = {
    id: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type RoleMemListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type RoleMemListResp = {
    code?: number
    data?: { list?: UserInfo[]; total?: number }
    msg?: string
  }

  type RoleOption = {
    id: number
    name: string
  }

  type roleOptionsApiSysRolesOptionsParams = {
    keywords?: string
  }

  type RoleOptionsReq = {
    keywords?: string
  }

  type RoleOptionsResp = {
    code?: number
    data?: { list?: RoleOption[]; total?: number }
    msg?: string
  }

  type rolePageListApiSysRolesParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type RolePageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type RolePageListResp = {
    code?: number
    data?: { list?: RoleInfo[]; total?: number }
    msg?: string
  }

  type roleReadOneApiSysRolesByIdParams = {
    id: string
    id: number
  }

  type RoleReadOneReq = {
    id?: number
  }

  type RoleReadOneResp = {
    code?: number
    data?: {
      createBy?: string
      createdAt?: string
      id?: number
      info?: string
      name?: string
      updateBy?: string
      updatedAt?: string
    }
    msg?: string
  }

  type roleUpdateApiSysRolesByIdParams = {
    id: string
  }

  type RoleUpdateReq = {
    id?: number
    info?: string
    name?: string
  }

  type RoleUpdateResp = {
    code?: number
    msg?: string
  }

  type Schedule = {
    date: string
    users: string[]
  }

  type ScheduleManageReq = {
    items: Schedule[]
    shift_id: number
  }

  type ScheduleManageResp = {
    code?: number
    msg?: string
  }

  type scheduleReadListApiSysDutiesSchedulesParams = {
    shift_id: number
    sdate: string
    edate: string
  }

  type ScheduleReadListReq = {
    edate: string
    sdate: string
    shift_id: number
  }

  type ScheduleReadListResp = {
    code?: number
    data?: { items?: Schedule[] }
    msg?: string
  }

  type Shift = {
    admins: string[]
    id?: number
    is_paid_duty: boolean
    members: string[]
    name: string
  }

  type ShiftCreateReq = {
    data: Shift
  }

  type ShiftCreateResp = {
    code?: number
    msg?: string
  }

  type shiftDeleteApiSysDutiesByShiftsidParams = {
    id: string
  }

  type ShiftDeleteReq = true

  type ShiftDeleteResp = {
    code?: number
    msg?: string
  }

  type ShiftReadListReq = true

  type ShiftReadListResp = {
    code?: number
    data?: { items?: Shift[] }
    msg?: string
  }

  type ShiftUpdateReq = {
    data: Shift
  }

  type ShiftUpdateResp = {
    code?: number
    msg?: string
  }

  type SubDataListReq = {
    current?: number
    keyword?: string
    orderBy?: string
    pageSize?: number
  }

  type Team = {
    info?: string
    name: string
  }

  type TeamCreateReq = {
    info?: string
    name: string
  }

  type teamDeleteApiSysTeamsByIdParams = {
    id: string
  }

  type TeamDeleteReq = true

  type TeamInfo = {
    createBy: string
    createdAt: string
    id: number
    info?: string
    name: string
    updateBy: string
    updatedAt: string
  }

  type TeamIntro = {
    id: number
    info: string
    name: string
  }

  type teamListApiSysTeamsParams = {
    query?: string
    host_uid?: string
    env_uid?: string
  }

  type TeamListReq = {
    env_uid?: string
    host_uid?: string
    query?: string
  }

  type TeamListResp = {
    code?: number
    data?: { items?: TeamIntro[] }
    msg?: string
  }

  type teamMemAddApiSysTeamsByIdusersParams = {
    id: string
  }

  type TeamMemAddReq = {
    usernames: string[]
  }

  type teamMemDelApiSysTeamsByIdusersParams = {
    id: string
  }

  type TeamMemDelReq = {
    usernames: string[]
  }

  type teamMemListApiSysTeamsByIdusersParams = {
    id: string
  }

  type TeamMemListReq = true

  type TeamMemListResp = {
    code?: number
    data?: { items?: UserOption[] }
    msg?: string
  }

  type TeamPermAddApiSysTeamsByIdpermsParams = {
    id: string
  }

  type TeamPermsAddReq = {
    resource: number
    uids: string[]
  }

  type TeamPermsDelApiSysTeamsByIdpermsParams = {
    id: string
  }

  type TeamPermsDelReq = {
    resource: number
    uids: string[]
  }

  type TeamPermUpdateApiSysTeamsByIdpermsParams = {
    id: string
  }

  type TeamPermUpdateReq = {
    perm: number
    resource: number
    uid: string
    value: boolean
  }

  type teamUpdateApiSysTeamsByIdParams = {
    id: string
  }

  type TeamUpdateReq = {
    info?: string
    name: string
  }

  type User = {
    avatar?: string
    ding_token?: string
    email?: string
    info?: string
    mobile?: string
    nickname: string
    username: string
  }

  type userChangeStatusApiSysUsersByIdstatusParams = {
    id: string
  }

  type UserCreateReq = {
    avatar?: string
    ding_token?: string
    email?: string
    info?: string
    mobile?: string
    nickname?: string
    password: string
    roleIds?: number[]
    teamIds?: number[]
    username?: string
  }

  type UserCreateResp = {
    code?: number
    msg?: string
  }

  type UserCurrentInfoReq = true

  type UserCurrentInfoResp = {
    code?: number
    data?: {
      apiIds?: string[]
      avatar?: string
      ding_token?: string
      email?: string
      id?: number
      info?: string
      menuIds?: string[]
      mobile?: string
      nickname?: string
      roles?: string
      teams?: string
      username?: string
    }
    msg?: string
  }

  type userDeleteApiSysUsersByIdParams = {
    id: string
  }

  type UserDeleteReq = true

  type UserDeleteResp = {
    code?: number
    msg?: string
  }

  type UserInfo = {
    avatar?: string
    createBy: string
    createdAt: string
    ding_token?: string
    email?: string
    enabled: boolean
    id: number
    info?: string
    mobile?: string
    nickname: string
    roles: string
    teams: string
    updateBy: string
    updatedAt: string
    username: string
  }

  type UserLogoutReq = true

  type UserLogoutResp = {
    code?: number
    msg?: string
  }

  type UserOption = {
    ding_token?: string
    email?: string
    id: number
    mobile?: string
    nickname: string
    username: string
  }

  type userOptionsApiSysUsersOptionsParams = {
    keywords?: string
    ids?: string
  }

  type UserOptionsReq = {
    ids?: string
    keywords?: string
  }

  type UserOptionsResp = {
    code?: number
    data?: { list?: UserOption[]; total?: number }
    msg?: string
  }

  type userPageListApiSysUsersParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type UserPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type UserPageListResp = {
    code?: number
    data?: { list?: UserInfo[]; total?: number }
    msg?: string
  }

  type userReadOneApiSysUsersByIdParams = {
    id: string
  }

  type UserReadOneReq = true

  type UserReadOneResp = {
    code?: number
    data?: {
      avatar?: string
      createBy?: string
      createdAt?: string
      ding_token?: string
      email?: string
      enabled?: boolean
      id?: number
      info?: string
      mobile?: string
      nickname?: string
      roles?: string
      teams?: string
      updateBy?: string
      updatedAt?: string
      username?: string
    }
    msg?: string
  }

  type userResetPassApiSysUsersByIdpassParams = {
    id: string
  }

  type userUpdateApiSysUsersByIdParams = {
    id: string
  }

  type UserUpdateReq = {
    avatar?: string
    ding_token?: string
    email?: string
    info?: string
    mobile?: string
    nickname?: string
    roleIds?: number[]
    teamIds?: number[]
    username?: string
  }

  type UserUpdateResp = {
    code?: number
    msg?: string
  }

  type watchkeeperGetApiSysDutiesWatchkeeperParams = {
    shift_id?: number
    shift_name?: string
    date?: string
  }

  type WatchkeeperGetReq = {
    date?: string
    shift_id?: number
    shift_name?: string
  }

  type WatchkeeperGetResp = {
    code?: number
    data?: { users?: UserInfo[] }
    msg?: string
  }
}
