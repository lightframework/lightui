declare namespace OPS {
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

  type CreateHostSubtaskConf = {
    AppUids?: string[]
    CityUid: string
    Count: number
    Description?: string
    EnvUid: string
    HostTypeUid: string
    Instance: InstanceConf
    Number?: number
    OpsUids?: string[]
    ProjectUid?: string
    SupportUids?: string[]
    TagList: string[]
  }

  type DataDisk = {
    DiskSize: number
    DiskType: string
  }

  type DataListReq = {
    current?: number
    keyword?: string
    orderBy?: string
    pageSize?: number
  }

  type EmptyReq = true

  type getCreateHostSubTaskConfApiOpsBySubtasksidconfcreatehostParams = {
    id: string
  }

  type GetCreateHostSubTaskConfReq = true

  type GetCreateHostSubTaskConfResp = {
    code?: number
    data?: { host?: CreateHostSubtaskConf }
    msg?: string
  }

  type Host = {
    AppUids?: string[]
    CityUid: string
    Count: number
    Description?: string
    EnvUid: string
    HostTypeUid: string
    Instance: Instance
    NeedConfirm: boolean
    Number?: number
    OpsUids?: string[]
    ProjectUid?: string
    SupportUids?: string[]
    TagList: string[]
  }

  type HostCreateReq = {
    hosts: Host[]
    remark?: string
    topic: string
  }

  type HostCreateResp = {
    code?: number
    msg?: string
  }

  type HostDeleteReq = {
    HostUids: string[]
    preDeleteDay?: number
    remark?: string
    topic: string
  }

  type HostDeleteResp = {
    code?: number
    msg?: string
  }

  type HostInfo = {
    InstanceId?: string
    LoginPort?: number
    LoginUser?: string
    Password?: string
    PrivateIpAddresses?: string[]
    PublicIpAddresses?: string[]
    Uuid?: string
  }

  type Instance = {
    CloudTagUids?: string[]
    CloudUid: string
    Cpu: number
    DataDisks?: DataDisk[]
    ImageUid?: string
    InstanceChargePrepaid?: InstanceChargePrepaid
    InstanceChargeType?: string
    InstanceTypeUid?: string
    InternetAccessible?: InternetAccessible
    Memory: number
    Password?: string
    RegionUid: string
    SecurityGroupUids?: string[]
    SubnetUids?: string[]
    SystemDisk?: SystemDisk
    ZoneUid: string
  }

  type InstanceChargePrepaid = {
    Period: number
    RenewFlag: string
  }

  type InstanceConf = {
    CloudTagUids?: string[]
    CloudUid: string
    Cpu: number
    DataDisks?: DataDisk[]
    ImageUid?: string
    InstanceChargePrepaid?: InstanceChargePrepaid
    InstanceChargeType?: string
    InstanceTypeUid?: string
    InternetAccessible?: InternetAccessible
    Memory: number
    Password?: string
    RegionUid: string
    SecurityGroupUids?: string[]
    SystemDisk?: SystemDisk
    VpcSubnets?: VpcSubnetConf[]
    ZoneUid: string
  }

  type InternetAccessible = {
    InternetChargeType?: string
    InternetMaxBandwidthOut?: number
    PublicIpAssigned: boolean
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

  type phaseConfirmApiOpsByPhasesidconfirmParams = {
    id: string
  }

  type PhaseConfirmReq = true

  type PhaseConfirmResp = {
    code?: number
    msg?: string
  }

  type PhaseInfo = {
    confirm: boolean
    finished: string
    id: number
    message: string
    name: string
    retry: boolean
    runTimes: number
    started: string
    status: string
    stdin: string
    stdout: string
    step: number
    type: string
    uuid: string
  }

  type phaseRunApiOpsByPhasesidParams = {
    id: string
  }

  type PhaseRunReq = {
    HostInfo?: HostInfo
  }

  type PhaseRunResp = {
    code?: number
    msg?: string
  }

  type SubDataListReq = {
    current?: number
    keyword?: string
    orderBy?: string
    pageSize?: number
  }

  type SubTaskInfo = {
    count: number
    finished: string
    id: number
    message: string
    name: string
    rate: number
    retry: boolean
    started: string
    status: string
    stdin: string
    stdout: string
    uuid: string
  }

  type subTaskListApiOpsByTasksidsubtasksParams = {
    id: string
  }

  type SubTaskListReq = true

  type SubTaskListResp = {
    code?: number
    data?: { list?: SubTaskInfo[] }
    msg?: string
  }

  type subTaskPhaseListApiOpsBySubtasksidphasesParams = {
    id: string
  }

  type SubTaskPhaseListReq = true

  type SubTaskPhaseListResp = {
    code?: number
    data?: { list?: PhaseInfo[]; total?: number }
    msg?: string
  }

  type SystemDisk = {
    DiskSize: number
    DiskType: string
  }

  type TaskInfo = {
    count: number
    createBy: string
    createdAt: string
    failed: number
    finished: string
    id: number
    message: string
    name: string
    remark?: string
    started: string
    status: string
    stdin: string
    stdout: string
    success: number
    type: string
    updateBy: string
    updatedAt: string
  }

  type taskPageListApiOpsTasksParams = {
    type?: string
    status?: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type TaskPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
    status?: string
    type?: string
  }

  type TaskPageListResp = {
    code?: number
    data?: { list?: TaskInfo[]; total?: number }
    msg?: string
  }

  type taskRunApiOpsByTasksidParams = {
    id: string
  }

  type TaskRunReq = true

  type TaskRunResp = {
    code?: number
    msg?: string
  }

  type updateCreateHostSubTaskApiOpsBySubtasksidcreatehostParams = {
    id: string
  }

  type UpdateCreateHostSubTaskReq = {
    host: Host
  }

  type UpdateCreateHostSubTaskResp = {
    code?: number
    msg?: string
  }

  type VpcSubnetConf = true
}
