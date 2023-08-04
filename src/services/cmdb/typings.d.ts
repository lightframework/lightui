declare namespace API {
  type App = {
    AppName: string;
    AppType: string;
    Description?: string;
    Enabled: boolean;
    Version: string;
  };

  type AppCreateReq = {
    AppName?: string;
    AppType?: string;
    Description?: string;
    Enabled?: boolean;
    Version?: string;
  };

  type AppCreateResp = {
    code?: number;
    msg?: string;
  };

  type appDeleteApiCmdbAppsByUidParams = {
    uid: string;
  };

  type AppDeleteReq = true;

  type AppDeleteResp = {
    code?: number;
    msg?: string;
  };

  type AppInfo = {
    AppName: string;
    AppType: string;
    Description?: string;
    Enabled: boolean;
    Uid: string;
    Version: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type AppOption = {
    AppName: string;
    Uid: string;
    Version: string;
  };

  type appOptionsApiCmdbAppsOptionsParams = {
    keywords?: string;
  };

  type AppOptionsReq = {
    keywords?: string;
  };

  type AppOptionsResp = {
    code?: number;
    data?: { list?: AppOption[]; total?: number };
    msg?: string;
  };

  type appPageListApiCmdbAppsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type AppPageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type AppPageListResp = {
    code?: number;
    data?: { list?: AppInfo[]; total?: number };
    msg?: string;
  };

  type appReadOneApiCmdbAppsByUidParams = {
    uid: string;
  };

  type AppReadOneReq = true;

  type AppReadOneResp = {
    code?: number;
    data?: {
      AppName?: string;
      AppType?: string;
      Description?: string;
      Enabled?: boolean;
      Uid?: string;
      Version?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type AppT = {
    AppT: string;
    AppTName: string;
    Description: string;
    EnvT: string;
    HostTs: string[];
    Uid: string;
  };

  type AppTAddReq = {
    AppT?: string;
    AppTName?: string;
    Description?: string;
    EnvTUid: string;
  };

  type AppTAddResp = {
    code?: number;
    msg?: string;
  };

  type appTDeleteApiCmdbApptsByUidParams = {
    uid: string;
  };

  type AppTDelReq = true;

  type AppTDelResp = {
    code?: number;
    msg?: string;
  };

  type appTEditApiCmdbApptsByUidParams = {
    uid: string;
  };

  type AppTEditReq = {
    AppT?: string;
    AppTName?: string;
    Description?: string;
    EnvTUid?: string;
  };

  type AppTEditResp = {
    code?: number;
    msg?: string;
  };

  type AppTInfo = {
    AppT?: string;
    AppTName?: string;
    Description?: string;
    uid: string;
  };

  type AppTInfoReq = true;

  type AppTInfoResp = {
    code?: number;
    data?: { data?: AppTInfo };
    msg?: string;
  };

  type AppTList = {
    list: AppTInfo[];
    total: number;
  };

  type appTListApiCmdbApptsListParams = {
    keywords?: string;
    EnvTUid: string;
  };

  type AppTListReq = {
    EnvTUid: string;
    keywords?: string;
  };

  type AppTListResp = {
    code?: number;
    data?: { data?: AppTList };
    msg?: string;
  };

  type AppTPageList = {
    list: AppTInfo[];
    total: number;
  };

  type appTPageListApiCmdbApptsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
    EnvTUid: string;
  };

  type AppTPageListReq = {
    EnvTUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type AppTPageListResp = {
    code?: number;
    data?: { data?: AppTPageList };
    msg?: string;
  };

  type appUpdateApiCmdbAppsByUidParams = {
    uid: string;
  };

  type AppUpdateReq = {
    AppName?: string;
    AppType?: string;
    Description?: string;
    Enabled?: boolean;
    Version?: string;
  };

  type AppUpdateResp = {
    code?: number;
    msg?: string;
  };

  type BaseAppT = {
    AppT: string;
    AppTName: string;
    Description?: string;
  };

  type BaseEnvT = {
    Description?: string;
    EnvT: string;
    EnvTName: string;
  };

  type Cloud = {
    ApiDomain?: string;
    CloudKey: string;
    CloudName: string;
    Description?: string;
    SecretId?: string;
    SecretKey?: string;
    SupportApi?: boolean;
    Website?: string;
  };

  type CloudCreateReq = {
    ApiDomain?: string;
    CloudKey?: string;
    CloudName?: string;
    Description?: string;
    SecretId?: string;
    SecretKey?: string;
    SupportApi?: boolean;
    Website?: string;
  };

  type CloudCreateResp = {
    code?: number;
    msg?: string;
  };

  type cloudDeleteApiCmdbCloudsByUidParams = {
    uid: string;
  };

  type CloudDeleteReq = true;

  type CloudDeleteResp = {
    code?: number;
    msg?: string;
  };

  type CloudInfo = {
    ApiDomain: string;
    CloudKey: string;
    CloudName: string;
    Description: string;
    SupportApi: boolean;
    Uid: string;
    Website: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type CloudOption = {
    CloudKey: string;
    CloudName: string;
    SupportApi: boolean;
    Uid: string;
  };

  type cloudOptionsApiCmdbCloudsOptionsParams = {
    keywords?: string;
  };

  type CloudOptionsReq = {
    keywords?: string;
  };

  type CloudOptionsResp = {
    code?: number;
    data?: { list?: CloudOption[]; total?: number };
    msg?: string;
  };

  type cloudPageListApiCmdbCloudsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type CloudPageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type CloudPageListResp = {
    code?: number;
    data?: { list?: CloudInfo[]; total?: number };
    msg?: string;
  };

  type cloudReadOneApiCmdbCloudsByUidParams = {
    uid: string;
  };

  type CloudReadOneReq = true;

  type CloudReadOneResp = {
    code?: number;
    data?: {
      ApiDomain?: string;
      CloudKey?: string;
      CloudName?: string;
      Description?: string;
      SupportApi?: boolean;
      Uid?: string;
      Website?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type cloudUpdateApiCmdbCloudsByUidParams = {
    uid: string;
  };

  type CloudUpdateReq = {
    ApiDomain?: string;
    CloudKey?: string;
    CloudName?: string;
    Description?: string;
    SecretId?: string;
    SecretKey?: string;
    SupportApi?: boolean;
    Website?: string;
  };

  type CloudUpdateResp = {
    code?: number;
    msg?: string;
  };

  type Disk = {
    DiskId?: string;
    DiskSize: number;
    DiskType: string;
    uid?: string;
  };

  type DiskT = {
    DiskSize: number;
    DiskType: string;
    Uid: string;
  };

  type Env = {
    ApiDomainName: string;
    Description?: string;
    DomainName: string;
    EnvId: string;
    EnvName: string;
    SecretId?: string;
    SecretKey?: string;
  };

  type EnvCreateReq = {
    ApiDomainName?: string;
    Description?: string;
    DomainName?: string;
    EnvId?: string;
    EnvName?: string;
    OpsIds?: string[];
    QaIds?: string[];
    SaleIds?: string[];
    SecretId?: string;
    SecretKey?: string;
    SupportIds?: string[];
  };

  type EnvCreateResp = {
    code?: number;
    msg?: string;
  };

  type envDeleteApiCmdbEnvsByUidParams = {
    uid: string;
  };

  type EnvDeleteReq = true;

  type EnvDeleteResp = {
    code?: number;
    msg?: string;
  };

  type EnvInfo = {
    ApiDomainName?: string;
    Description?: string;
    DomainName?: string;
    EnvId?: string;
    EnvName?: string;
    Ops?: PersonOption[];
    Qa?: PersonOption[];
    Sale?: PersonOption[];
    SecretId?: string;
    SecretKey?: string;
    Support?: PersonOption[];
    Uid: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type EnvOption = {
    EnvId: string;
    EnvName: string;
    Uid: string;
  };

  type envOptionsApiCmdbEnvsOptionsParams = {
    keywords?: string;
  };

  type EnvOptionsReq = {
    keywords?: string;
  };

  type EnvOptionsResp = {
    code?: number;
    data?: { list?: EnvOption[]; total?: number };
    msg?: string;
  };

  type envPageListApiCmdbEnvsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type EnvPageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type EnvPageListResp = {
    code?: number;
    data?: { list?: EnvInfo[]; total?: number };
    msg?: string;
  };

  type envReadOneApiCmdbEnvsByUidParams = {
    uid: string;
  };

  type EnvReadOneReq = true;

  type EnvReadOneResp = {
    code?: number;
    data?: {
      Ops?: PersonOption[];
      Qa?: PersonOption[];
      Sale?: PersonOption[];
      Support?: PersonOption[];
      Uid?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type EnvT = {
    Description: string;
    EnvT: string;
    EnvTName: string;
    Uid: string;
  };

  type EnvTAddReq = {
    Description?: string;
    EnvT?: string;
    EnvTName?: string;
  };

  type EnvTAddResp = {
    code?: number;
    msg?: string;
  };

  type envTDeleteApiCmdbEnvtsByUidParams = {
    uid: string;
  };

  type EnvTDelReq = true;

  type EnvTDelResp = {
    code?: number;
    msg?: string;
  };

  type envTEditApiCmdbEnvtsByUidParams = {
    uid: string;
  };

  type EnvTEditReq = {
    Description?: string;
    EnvT?: string;
    EnvTName?: string;
  };

  type EnvTEditResp = {
    code?: number;
    msg?: string;
  };

  type EnvTInfo = {
    Description?: string;
    EnvT?: string;
    EnvTName?: string;
    Uid: string;
  };

  type envTInfoApiCmdbEnvtsByUidParams = {
    uid: string;
  };

  type EnvTInfoReq = true;

  type EnvTInfoResp = {
    code?: number;
    data?: { data?: EnvTInfo };
    msg?: string;
  };

  type EnvTList = {
    list: EnvTInfo[];
    total: number;
  };

  type envTListApiCmdbEnvtsListParams = {
    keywords?: string;
  };

  type EnvTListReq = {
    keywords?: string;
  };

  type EnvTListResp = {
    code?: number;
    data?: { data?: EnvTList };
    msg?: string;
  };

  type EnvTPageList = {
    list: EnvTInfo[];
    total: number;
  };

  type envTPageListApiCmdbEnvtsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type EnvTPageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type EnvTPageListResp = {
    code?: number;
    data?: { data?: EnvTPageList };
    msg?: string;
  };

  type EnvTSaveReq = {
    AppTs: AppT[];
    DiskTs: DiskT[];
    EnvT: EnvT;
    HostTs: HostT[];
  };

  type EnvTSaveResp = {
    code?: number;
    msg?: string;
  };

  type envUpdateApiCmdbEnvsByUidParams = {
    uid: string;
  };

  type EnvUpdateReq = {
    ApiDomainName?: string;
    Description?: string;
    DomainName?: string;
    EnvId?: string;
    EnvName?: string;
    OpsIds?: string[];
    QaIds?: string[];
    SaleIds?: string[];
    SecretId?: string;
    SecretKey?: string;
    SupportIds?: string[];
  };

  type EnvUpdateResp = {
    code?: number;
    msg?: string;
  };

  type Host = {
    HostName: string;
    uid: string;
  };

  type HostAddReq = {
    AppUids: string[];
    CPU: number;
    CPUType: string;
    DataDisks: Disk[];
    Description: string;
    EnvUid: string;
    ExpiredTime: string;
    HostType: string;
    InstanceChargeType: string;
    InstanceId: string;
    JumpId: string;
    Memory: number;
    OS: string;
    OpsUids: string[];
    PrivateIpAddresses: string[];
    PublicIpAddresses: string[];
    SSHPort: number;
    Status: string;
    SystemDisk: Disk;
    ZoneUid: string;
  };

  type HostAddResp = {
    code?: number;
    msg?: string;
  };

  type hostDeleteApiCmdbHostsByUidParams = {
    uid: string;
  };

  type HostDelReq = true;

  type HostDelResp = {
    code?: number;
    msg?: string;
  };

  type hostEditApiCmdbHostsByUidParams = {
    uid: string;
  };

  type HostEditReq = {
    AppUids?: string[];
    CPU?: number;
    CPUType?: string;
    DataDisks?: Disk[];
    Description?: string;
    EnvUid?: string;
    ExpiredTime?: string;
    HostType?: string;
    InstanceChargeType?: string;
    InstanceId?: string;
    JumpId?: string;
    Memory?: number;
    OS?: string;
    OpsUids?: string[];
    PrivateIpAddresses?: string[];
    PublicIpAddresses?: string[];
    SSHPort?: number;
    Status?: string;
    SystemDisk?: Disk;
    ZoneUid?: string;
  };

  type HostEditResp = {
    code?: number;
    msg?: string;
  };

  type HostInfo = {
    CPU: number;
    CPUType: string;
    DataDisks: Disk[];
    Description: string;
    EnvInfo: EnvInfo;
    ExpiredTime: string;
    HostName: string;
    HostType: string;
    InstanceChargeType: string;
    InstanceId: string;
    JumpId: string;
    Memory: number;
    OS: string;
    Ops: PersonOption[];
    PrivateIpAddresses: string[];
    PublicIpAddresses: string[];
    SSHPort: number;
    Status: string;
    SystemDisk: Disk;
    Zone: string;
  };

  type hostInfoApiCmdbHostsByUidParams = {
    uid: string;
  };

  type HostInfoReq = true;

  type HostInfoResp = {
    code?: number;
    data?: { data?: HostInfo };
    msg?: string;
  };

  type HostList = {
    list: Host[];
    total: number;
  };

  type hostListApiCmdbHostsListParams = {
    keywords?: string;
  };

  type HostListReq = {
    keywords?: string;
  };

  type HostListResp = {
    code?: number;
    data?: { data?: HostList };
    msg?: string;
  };

  type HostPageList = {
    list: HostInfo[];
    total: number;
  };

  type hostPageListApiCmdbHostsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type HostPageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type HostPageListResp = {
    code?: number;
    data?: { data?: HostPageList };
    msg?: string;
  };

  type HostT = {
    CPU: number;
    DataDisks: string[];
    Description: string;
    HostTName: string;
    HostType: string;
    Memory: number;
    SystemDisk: string;
    Uid: string;
  };

  type HostType = {
    Description?: string;
    HostTypeName: string;
    RuleDefinition: string;
  };

  type HostTypeCreateReq = {
    Description?: string;
    HostTypeName?: string;
    RuleDefinition?: string;
  };

  type HostTypeCreateResp = {
    code?: number;
    msg?: string;
  };

  type hosttypeDeleteApiCmdbHosttypesByUidParams = {
    uid: string;
  };

  type HostTypeDeleteReq = true;

  type HostTypeDeleteResp = {
    code?: number;
    msg?: string;
  };

  type HostTypeInfo = {
    Description?: string;
    HostTypeName: string;
    RuleDefinition: string;
    Uid: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type HostTypeOption = {
    HostTypeName: string;
    RuleDefinition: string;
    Uid: string;
  };

  type hosttypeOptionsApiCmdbHosttypesOptionsParams = {
    keywords?: string;
  };

  type HostTypeOptionsReq = {
    keywords?: string;
  };

  type HostTypeOptionsResp = {
    code?: number;
    data?: { list?: HostTypeOption[]; total?: number };
    msg?: string;
  };

  type hosttypePageListApiCmdbHosttypesParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type HostTypePageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type HostTypePageListResp = {
    code?: number;
    data?: { list?: HostTypeInfo[]; total?: number };
    msg?: string;
  };

  type hosttypeReadOneApiCmdbHosttypesByUidParams = {
    uid: string;
  };

  type HostTypeReadOneReq = true;

  type HostTypeReadOneResp = {
    code?: number;
    data?: {
      Description?: string;
      HostTypeName?: string;
      RuleDefinition?: string;
      Uid?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type hosttypeUpdateApiCmdbHosttypesByUidParams = {
    uid: string;
  };

  type HostTypeUpdateReq = {
    Description?: string;
    HostTypeName?: string;
    RuleDefinition?: string;
  };

  type HostTypeUpdateResp = {
    code?: number;
    msg?: string;
  };

  type PageParams = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type Person = {
    Description?: string;
    Email: string;
    Enabled: boolean;
    Mobile: string;
    PersonId: string;
    PersonName: string;
    ProfessionIds?: string[];
  };

  type PersonCreateReq = {
    Description?: string;
    Email?: string;
    Enabled?: boolean;
    Mobile?: string;
    PersonId?: string;
    PersonName?: string;
    ProfessionIds?: string[];
  };

  type PersonCreateResp = {
    code?: number;
    msg?: string;
  };

  type personDeleteApiCmdbPersonsByUidParams = {
    uid: string;
  };

  type PersonDeleteReq = true;

  type PersonDeleteResp = {
    code?: number;
    msg?: string;
  };

  type PersonInfo = {
    Description?: string;
    Email: string;
    Enabled: boolean;
    Mobile: string;
    PersonId: string;
    PersonName: string;
    ProfessionIds?: string[];
    Uid: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type PersonOption = {
    PersonId: string;
    PersonName: string;
    Uid: string;
  };

  type personOptionsApiCmdbPersonsOptionsParams = {
    keywords?: string;
  };

  type PersonOptionsReq = {
    keywords?: string;
  };

  type PersonOptionsResp = {
    code?: number;
    data?: { list?: PersonOption[]; total?: number };
    msg?: string;
  };

  type personPageListApiCmdbPersonsParams = {
    ProfessionUid?: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type PersonPageListReq = {
    ProfessionUid?: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type PersonPageListResp = {
    code?: number;
    data?: { list?: PersonInfo[]; total?: number };
    msg?: string;
  };

  type personReadOneApiCmdbPersonsByUidParams = {
    uid: string;
  };

  type PersonReadOneReq = true;

  type PersonReadOneResp = {
    code?: number;
    data?: {
      Description?: string;
      Email?: string;
      Enabled?: boolean;
      Mobile?: string;
      PersonId?: string;
      PersonName?: string;
      ProfessionIds?: string[];
      Uid?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type personUpdateApiCmdbPersonsByUidParams = {
    uid: string;
  };

  type PersonUpdateReq = {
    Description?: string;
    Email?: string;
    Enabled?: boolean;
    Mobile?: string;
    PersonId?: string;
    PersonName?: string;
    ProfessionIds?: string[];
  };

  type PersonUpdateResp = {
    code?: number;
    msg?: string;
  };

  type Profession = {
    Description?: string;
    ProfessionId: string;
    ProfessionName: string;
  };

  type ProfessionCreateReq = {
    Description?: string;
    ProfessionId?: string;
    ProfessionName?: string;
  };

  type ProfessionCreateResp = {
    code?: number;
    msg?: string;
  };

  type professionDeleteApiCmdbProfessionsByUidParams = {
    uid: string;
  };

  type ProfessionDeleteReq = true;

  type ProfessionDeleteResp = {
    code?: number;
    msg?: string;
  };

  type ProfessionInfo = {
    Description?: string;
    ProfessionId: string;
    ProfessionName: string;
    Uid: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type ProfessionOption = {
    ProfessionId: string;
    ProfessionName: string;
    Uid: string;
  };

  type professionOptionsApiCmdbProfessionsOptionsParams = {
    keywords?: string;
  };

  type ProfessionOptionsReq = {
    keywords?: string;
  };

  type ProfessionOptionsResp = {
    code?: number;
    data?: { list?: ProfessionOption[]; total?: number };
    msg?: string;
  };

  type professionPageListApiCmdbProfessionsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type ProfessionPageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type ProfessionPageListResp = {
    code?: number;
    data?: { list?: ProfessionInfo[]; total?: number };
    msg?: string;
  };

  type professionReadOneApiCmdbProfessionsByUidParams = {
    uid: string;
  };

  type ProfessionReadOneReq = true;

  type ProfessionReadOneResp = {
    code?: number;
    data?: {
      Description?: string;
      ProfessionId?: string;
      ProfessionName?: string;
      Uid?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type professionUpdateApiCmdbProfessionsByUidParams = {
    uid: string;
  };

  type ProfessionUpdateReq = {
    Description?: string;
    ProfessionId?: string;
    ProfessionName?: string;
  };

  type ProfessionUpdateResp = {
    code?: number;
    msg?: string;
  };

  type Project = {
    CusId?: string;
    EnvUid: string;
    ProjectId: string;
    ProjectName: string;
    ProjectState?: string;
  };

  type ProjectCreateReq = {
    CusId?: string;
    EnvUid?: string;
    ProjectId?: string;
    ProjectName?: string;
    ProjectState?: string;
    SaleIds?: string[];
    SupportIds?: string[];
  };

  type ProjectCreateResp = {
    code?: number;
    msg?: string;
  };

  type projectDeleteApiCmdbProjectsByUidParams = {
    uid: string;
  };

  type ProjectDeleteReq = true;

  type ProjectDeleteResp = {
    code?: number;
    msg?: string;
  };

  type ProjectInfo = {
    CusId?: string;
    ProjectId: string;
    ProjectName: string;
    ProjectState?: string;
    Sale?: PersonOption[];
    Support?: PersonOption[];
    Uid: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type ProjectOption = {
    ProjectId: string;
    ProjectName: string;
    Uid: string;
  };

  type projectOptionsApiCmdbProjectsOptionsParams = {
    EnvUid: string;
    keywords?: string;
  };

  type ProjectOptionsReq = {
    EnvUid: string;
    keywords?: string;
  };

  type ProjectOptionsResp = {
    code?: number;
    data?: { list?: ProjectOption[]; total?: number };
    msg?: string;
  };

  type projectPageListApiCmdbProjectsParams = {
    EnvUid: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type ProjectPageListReq = {
    EnvUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type ProjectPageListResp = {
    code?: number;
    data?: { list?: ProjectInfo[]; total?: number };
    msg?: string;
  };

  type projectReadOneApiCmdbProjectsByUidParams = {
    uid: string;
  };

  type ProjectReadOneReq = true;

  type ProjectReadOneResp = {
    code?: number;
    data?: {
      CusId?: string;
      ProjectId?: string;
      ProjectName?: string;
      ProjectState?: string;
      Sale?: PersonOption[];
      Support?: PersonOption[];
      Uid?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type projectUpdateApiCmdbProjectsByUidParams = {
    uid: string;
  };

  type ProjectUpdateReq = {
    CusId?: string;
    EnvUid?: string;
    ProjectId?: string;
    ProjectName?: string;
    ProjectState?: string;
    SaleIds?: string[];
    SupportIds?: string[];
  };

  type ProjectUpdateResp = {
    code?: number;
    msg?: string;
  };

  type Region = {
    CloudUid: string;
    Region: string;
    RegionName: string;
    RegionState?: string;
  };

  type RegionCreateReq = {
    CloudUid?: string;
    Region?: string;
    RegionName?: string;
    RegionState?: string;
  };

  type RegionCreateResp = {
    code?: number;
    msg?: string;
  };

  type regionDeleteApiCmdbRegionsByUidParams = {
    uid: string;
  };

  type RegionDeleteReq = true;

  type RegionDeleteResp = {
    code?: number;
    msg?: string;
  };

  type RegionInfo = {
    Region: string;
    RegionName: string;
    RegionState?: string;
    Uid: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type RegionOption = {
    Region: string;
    RegionName: string;
    RegionState?: string;
    Uid: string;
  };

  type regionOptionsApiCmdbRegionsOptionsParams = {
    CloudUid: string;
    keywords?: string;
  };

  type RegionOptionsReq = {
    CloudUid: string;
    keywords?: string;
  };

  type RegionOptionsResp = {
    code?: number;
    data?: { list?: RegionOption[]; total?: number };
    msg?: string;
  };

  type regionPageListApiCmdbRegionsParams = {
    CloudUid: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type RegionPageListReq = {
    CloudUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type RegionPageListResp = {
    code?: number;
    data?: { list?: RegionInfo[]; total?: number };
    msg?: string;
  };

  type regionReadOneApiCmdbRegionsByUidParams = {
    uid: string;
  };

  type RegionReadOneReq = true;

  type RegionReadOneResp = {
    code?: number;
    data?: {
      Region?: string;
      RegionName?: string;
      RegionState?: string;
      Uid?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type RegionSyncReq = {
    CloudUid: string;
  };

  type RegionSyncResp = {
    code?: number;
    msg?: string;
  };

  type regionUpdateApiCmdbRegionsByUidParams = {
    uid: string;
  };

  type RegionUpdateReq = {
    CloudUid?: string;
    Region?: string;
    RegionName?: string;
    RegionState?: string;
  };

  type RegionUpdateResp = {
    code?: number;
    msg?: string;
  };

  type Zone = {
    RegionUid: string;
    Zone: string;
    ZoneName: string;
    ZoneState?: string;
  };

  type ZoneCreateReq = {
    RegionUid?: string;
    Zone?: string;
    ZoneName?: string;
    ZoneState?: string;
  };

  type ZoneCreateResp = {
    code?: number;
    msg?: string;
  };

  type zoneDeleteApiCmdbZonesByUidParams = {
    uid: string;
  };

  type ZoneDeleteReq = true;

  type ZoneDeleteResp = {
    code?: number;
    msg?: string;
  };

  type ZoneInfo = {
    Uid: string;
    Zone: string;
    ZoneName: string;
    ZoneState?: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type ZoneOption = {
    Uid: string;
    Zone: string;
    ZoneName: string;
    ZoneState?: string;
  };

  type zoneOptionsApiCmdbZonesOptionsParams = {
    RegionUid: string;
    keywords?: string;
  };

  type ZoneOptionsReq = {
    RegionUid: string;
    keywords?: string;
  };

  type ZoneOptionsResp = {
    code?: number;
    data?: { list?: ZoneOption[]; total?: number };
    msg?: string;
  };

  type zonePageListApiCmdbZonesParams = {
    RegionUid: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type ZonePageListReq = {
    RegionUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type ZonePageListResp = {
    code?: number;
    data?: { list?: ZoneInfo[]; total?: number };
    msg?: string;
  };

  type zoneReadOneApiCmdbZonesByUidParams = {
    uid: string;
  };

  type ZoneReadOneReq = true;

  type ZoneReadOneResp = {
    code?: number;
    data?: {
      Uid?: string;
      Zone?: string;
      ZoneName?: string;
      ZoneState?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type zoneUpdateApiCmdbZonesByUidParams = {
    uid: string;
  };

  type ZoneUpdateReq = {
    RegionUid?: string;
    Zone?: string;
    ZoneName?: string;
    ZoneState?: string;
  };

  type ZoneUpdateResp = {
    code?: number;
    msg?: string;
  };
}
