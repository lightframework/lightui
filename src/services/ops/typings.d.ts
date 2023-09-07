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
    topic: string;
  };

  type HostCreateResp = {
    code?: number;
    msg?: string;
  };

  type Instance = {
    Cloud: string;
    CloudTags?: CloudTagOption[];
    Cpu: number;
    DataDisks: DataDisk[];
    ImageId: string;
    InstanceChargePrepaid: InstanceChargePrepaid;
    InstanceChargeType: string;
    InstanceType: string;
    InternetMaxBandwidthOut: number;
    Memory: number;
    Password: string;
    Region: string;
    SecurityGroupIds: string[];
    SystemDisk: SystemDisk;
    VirtualPrivateClouds: VirtualPrivateCloud[];
    Zone: string;
  };

  type InstanceChargePrepaid = {
    Period: number;
    RenewFlag: string;
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

  type SubDataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type SystemDisk = {
    DiskSize: number;
    DiskType: string;
  };

  type TaskBillInfo = {
    createBy: string;
    createdAt: string;
    hostName: string;
    id: number;
    inputParams: string;
    instanceId: string;
    message: string;
    requestId: string;
    resultResp: string;
    status: string;
    uid: string;
    updateBy: string;
    updatedAt: string;
    uuid: string;
  };

  type TaskInfo = {
    createBy: string;
    createdAt: string;
    id: number;
    message: string;
    remark?: string;
    status: string;
    taskName: string;
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

  type taskReadOneApiOpsByTasksidbillsParams = {
    id: string;
  };

  type TaskReadOneReq = true;

  type TaskReadOneResp = {
    code?: number;
    data?: { bills?: TaskBillInfo[]; task?: TaskInfo };
    msg?: string;
  };

  type VirtualPrivateCloud = {
    SubnetId: string;
    VpcId: string;
  };
}
