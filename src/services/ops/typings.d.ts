declare namespace OPS {
  type AppOption = {
    App: string;
    Version: string;
  };

  type BaseInfo = {
    createdAt: string;
    id: number;
    updatedAt: string;
  };

  type BaseInfoResp = {
    code?: number;
    data?: { code?: number; msg?: string; success?: boolean };
    msg?: string;
  };

  type BaseListReq = {
    keywords?: string;
  };

  type BasePathIntId = true;

  type BasePathStrId = true;

  type BaseResp = {
    code?: number;
    data?: { code?: number; msg?: string; success?: boolean };
    msg?: string;
  };

  type CloudTagOption = {
    Key: string;
    Value: string;
  };

  type DataDisk = {
    DiskSize: number;
    DiskType: string;
  };

  type DataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type EmptyReq = true;

  type Host = {
    Apps?: AppOption[];
    Count: number;
    Description?: string;
    EnvId: string;
    HostType: string;
    Instance: Instance;
    OpsIds: string[];
    Project: string;
  };

  type HostCreateReq = {
    dryRun: boolean;
    hosts: Host[];
    remark?: string;
    topic: string;
  };

  type HostCreateResp = {
    code?: number;
    msg?: string;
  };

  type HostDeleteReq = {
    instanceIds: string[];
    topic: string;
  };

  type HostDeleteResp = {
    code?: number;
    msg?: string;
  };

  type Instance = {
    CloudTags?: CloudTagOption[];
    Cpu: number;
    DataDisks: DataDisk[];
    ImageId: string;
    InstanceChargePrepaid: InstanceChargePrepaid;
    InstanceChargeType: string;
    InstanceType: string;
    InternetAccessible: InternetAccessible;
    Memory: number;
    Password: string;
    Region: string;
    ResourceGroup: string;
    SecurityGroupIds: string[];
    SystemDisk: SystemDisk;
    VirtualPrivateClouds: VirtualPrivateCloud[];
    Zone: string;
  };

  type InstanceChargePrepaid = {
    Period: number;
    RenewFlag: string;
  };

  type InternetAccessible = {
    InternetChargeType?: string;
    InternetMaxBandwidthOut?: number;
    PublicIpAssigned: boolean;
  };

  type OptUserInfo = {
    createBy: string;
    createdAt: string;
    id: number;
    updateBy: string;
    updatedAt: string;
  };

  type PageListResp = {
    code?: number;
    data?: { code?: number; msg?: string; success?: boolean; total?: number };
    msg?: string;
  };

  type PageParams = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type PathIdReq = true;

  type PhaseInfo = {
    execAt: string;
    execBy: string;
    id: number;
    message: string;
    name: string;
    runTimes: number;
    status: string;
    stdin: string;
    stdout: string;
    step: number;
    type: string;
    uuid: string;
  };

  type phaseRunApiOpsByPhasesidParams = {
    id: string;
  };

  type PhaseRunReq = true;

  type PhaseRunResp = {
    code?: number;
    msg?: string;
  };

  type SubDataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type SubTaskInfo = {
    id: number;
    message: string;
    name: string;
    status: string;
    stdin: string;
    stdout: string;
    uuid: string;
  };

  type subTaskListApiOpsByTasksidsubtasksParams = {
    id: string;
  };

  type SubTaskListReq = true;

  type SubTaskListResp = {
    code?: number;
    data?: { list?: SubTaskInfo[] };
    msg?: string;
  };

  type subTaskPhaseListApiOpsBySubtasksidphasesParams = {
    id: string;
  };

  type SubTaskPhaseListReq = true;

  type SubTaskPhaseListResp = {
    code?: number;
    data?: { list?: PhaseInfo[]; total?: number };
    msg?: string;
  };

  type SystemDisk = {
    DiskSize: number;
    DiskType: string;
  };

  type TaskInfo = {
    createBy: string;
    createdAt: string;
    id: number;
    message: string;
    name: string;
    remark?: string;
    status: string;
    stdin: string;
    stdout: string;
    type: string;
    updateBy: string;
    updatedAt: string;
  };

  type taskPageListApiOpsTasksParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type TaskPageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type TaskPageListResp = {
    code?: number;
    data?: { list?: TaskInfo[]; total?: number };
    msg?: string;
  };

  type VirtualPrivateCloud = {
    SubnetId: string;
    VpcId: string;
  };
}
