declare namespace API {
  type AppOption = {
    AppName: string;
    Uid: string;
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

  type CloudOption = {
    Cloud: string;
    CloudName: string;
    SupportApi: boolean;
    Uid: string;
  };

  type CloudTagOption = {
    Key: string;
    Uid: string;
    Value: string;
  };

  type DataDisk = {
    DiskSize: string;
    DiskType: string;
  };

  type DataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type EmptyReq = true;

  type EnvOption = {
    EnvId: string;
    EnvName: string;
    Uid: string;
  };

  type HostTypeOption = {
    HostTypeName: string;
    RuleDefinition: string;
    Uid: string;
  };

  type ImageOption = {
    ImageId: string;
    ImageName: string;
    ImageState: string;
    Uid: string;
  };

  type InstanceChargePrepaid = {
    Period: number;
    RenewFlag: string;
  };

  type InstanceTask = {
    dryRun: boolean;
    remark?: string;
    taskName: string;
  };

  type InstanceTaskBill = {
    Cloud: CloudOption;
    CloudTags?: CloudTagOption[];
    DataDisks: DataDisk[];
    Description?: string;
    Env: EnvOption;
    HostType: HostTypeOption;
    Image: ImageOption;
    InstanceChargePrepaid: InstanceChargePrepaid;
    InstanceChargeType: string;
    InstanceCount: number;
    InstanceType: InstanceTypeQuotaItemOption;
    InternetMaxBandwidthOut: number;
    Ops?: PersonOption[];
    Password: string;
    Project: ProjectOption;
    Region: RegionOption;
    SecurityGroups: SecurityGroupOption[];
    Subnet: SubnetOption;
    SystemDisk: SystemDisk;
    Vpc: VpcOption;
    Zone: ZoneOption;
  };

  type InstanceTaskBillInfo = {
    createBy: string;
    createdAt: string;
    id: number;
    inputParams: InstanceTaskBill;
    resultResp: InstanceTaskBill;
    updateBy: string;
    updatedAt: string;
  };

  type InstanceTaskInfo = {
    createBy: string;
    createdAt: string;
    id: number;
    remark?: string;
    taskName: string;
    updateBy: string;
    updatedAt: string;
  };

  type InstanceTypeQuotaItemOption = {
    InstanceType: string;
    Status: string;
    TypeName: string;
    Uid: string;
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

  type PersonOption = {
    PersonId: string;
    PersonName: string;
    Uid: string;
  };

  type ProjectOption = {
    ProjectId: string;
    ProjectName: string;
    Uid: string;
  };

  type RegionOption = {
    Region: string;
    RegionName: string;
    RegionState: string;
    Uid: string;
  };

  type SecurityGroupOption = {
    SecurityGroupId: string;
    SecurityGroupName: string;
    Uid: string;
  };

  type SubDataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type SubnetOption = {
    SubnetId: string;
    SubnetName: string;
    Uid: string;
  };

  type SystemDisk = {
    DiskSize: string;
    DiskType: string;
  };

  type TaskCreateReq = {
    bills: InstanceTaskBill[];
    dryRun?: boolean;
    remark?: string;
    taskName?: string;
  };

  type TaskCreateResp = {
    code?: number;
    msg?: string;
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
    data?: { list?: InstanceTaskInfo[]; total?: number };
    msg?: string;
  };

  type taskReadOneApiOpsByTasksidbillsParams = {
    id: string;
  };

  type TaskReadOneReq = true;

  type TaskReadOneResp = {
    code?: number;
    data?: { bills?: InstanceTaskBillInfo[]; task?: InstanceTask };
    msg?: string;
  };

  type VpcOption = {
    Uid: string;
    VpcId: string;
    VpcName: string;
  };

  type ZoneOption = {
    Uid: string;
    Zone: string;
    ZoneName: string;
    ZoneState: string;
  };
}
