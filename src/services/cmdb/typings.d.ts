declare namespace API {
  type AppAddReq = {
    App?: string;
    AppName?: string;
    Description?: string;
    Version?: string;
  };

  type AppAddResp = {
    code?: string;
    message?: string;
  };

  type appDeleteApiCmdbAppsByUidParams = {
    uid: string;
  };

  type AppDelReq = true;

  type AppDelResp = {
    code?: string;
    message?: string;
  };

  type appEditApiCmdbAppsByUidParams = {
    uid: string;
  };

  type AppEditReq = {
    App?: string;
    AppName?: string;
    Description?: string;
    Version?: string;
  };

  type AppEditResp = {
    code?: string;
    message?: string;
  };

  type AppInfo = {
    App?: string;
    AppName?: string;
    Description?: string;
    Version?: string;
    uid: string;
  };

  type AppInfoReq = true;

  type AppInfoResp = {
    code?: string;
    data: AppInfo;
    message?: string;
  };

  type AppList = {
    list: AppInfo[];
    total: number;
  };

  type appListApiCmdbAppsListParams = {
    keywords?: string;
  };

  type AppListReq = {
    keywords?: string;
  };

  type AppListResp = {
    code?: string;
    data: AppList;
    message?: string;
  };

  type AppPageList = {
    list: AppInfo[];
    total: number;
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
    code?: string;
    data: AppPageList;
    message?: string;
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
    code?: string;
    message?: string;
  };

  type appTDeleteApiCmdbApptsByUidParams = {
    uid: string;
  };

  type AppTDelReq = true;

  type AppTDelResp = {
    code?: string;
    message?: string;
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
    code?: string;
    message?: string;
  };

  type AppTInfo = {
    AppT?: string;
    AppTName?: string;
    Description?: string;
    uid: string;
  };

  type AppTInfoReq = true;

  type AppTInfoResp = {
    code?: string;
    data: AppTInfo;
    message?: string;
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
    code?: string;
    data: AppTList;
    message?: string;
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
    code?: string;
    data: AppTPageList;
    message?: string;
  };

  type BaseApp = {
    App: string;
    AppName: string;
    Description?: string;
    Version: string;
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

  type BaseHostType = {
    Description?: string;
    HostType: string;
    NamingRule: string;
    RuleDefinition: string;
  };

  type BasePerson = {
    Description?: string;
    Email: string;
    Enabled: boolean;
    Mobile: string;
    Person: string;
    PersonName: string;
  };

  type BaseProject = {
    Description?: string;
    JoinDate: string;
    Project: string;
    ProjectName: string;
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
    code?: string;
    message?: string;
  };

  type cloudDeleteApiCmdbCloudsByUidParams = {
    uid: string;
  };

  type CloudDeleteReq = true;

  type CloudDeleteResp = {
    code?: string;
    message?: string;
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
    code?: string;
    list: CloudOption[];
    message?: string;
    total: number;
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
    code?: string;
    list: CloudInfo[];
    message?: string;
    total: number;
  };

  type cloudReadOneApiCmdbCloudsByUidParams = {
    uid: string;
  };

  type CloudReadOneReq = true;

  type CloudReadOneResp = {
    ApiDomain?: string;
    CloudKey?: string;
    CloudName?: string;
    Description?: string;
    SupportApi?: boolean;
    Uid?: string;
    Website?: string;
    code?: string;
    createAt?: string;
    createBy?: string;
    message?: string;
    updateAt?: string;
    updateBy?: string;
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
    code?: string;
    message?: string;
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
    code?: string;
    message?: string;
  };

  type envDeleteApiCmdbEnvsByUidParams = {
    uid: string;
  };

  type EnvDeleteReq = true;

  type EnvDeleteResp = {
    code?: string;
    message?: string;
  };

  type EnvInfo = {
    ApiDomainName?: string;
    Description?: string;
    DomainName?: string;
    EnvId?: string;
    EnvName?: string;
    Ops?: BasePerson[];
    Qa?: BasePerson[];
    Sale?: BasePerson[];
    SecretId?: string;
    SecretKey?: string;
    Support?: BasePerson[];
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
    code?: string;
    list: EnvOption[];
    message?: string;
    total: number;
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
    code?: string;
    list: EnvInfo[];
    message?: string;
    total: number;
  };

  type envReadOneApiCmdbEnvsByUidParams = {
    uid: string;
  };

  type EnvReadOneReq = true;

  type EnvReadOneResp = {
    Ops?: BasePerson[];
    Qa?: BasePerson[];
    Sale?: BasePerson[];
    Support?: BasePerson[];
    Uid?: string;
    code?: string;
    createAt?: string;
    createBy?: string;
    message?: string;
    updateAt?: string;
    updateBy?: string;
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
    code?: string;
    message?: string;
  };

  type envTDeleteApiCmdbEnvtsByUidParams = {
    uid: string;
  };

  type EnvTDelReq = true;

  type EnvTDelResp = {
    code?: string;
    message?: string;
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
    code?: string;
    message?: string;
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
    code?: string;
    data: EnvTInfo;
    message?: string;
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
    code?: string;
    data: EnvTList;
    message?: string;
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
    code?: string;
    data: EnvTPageList;
    message?: string;
  };

  type EnvTSaveReq = {
    AppTs: AppT[];
    DiskTs: DiskT[];
    EnvT: EnvT;
    HostTs: HostT[];
  };

  type EnvTSaveResp = {
    code?: string;
    message?: string;
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
    code?: string;
    message?: string;
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
    code?: string;
    message?: string;
  };

  type hostDeleteApiCmdbHostsByUidParams = {
    uid: string;
  };

  type HostDelReq = true;

  type HostDelResp = {
    code?: string;
    message?: string;
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
    code?: string;
    message?: string;
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
    Ops: BasePerson[];
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
    code?: string;
    data: HostInfo;
    message?: string;
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
    code?: string;
    data: HostList;
    message?: string;
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
    code?: string;
    data: HostPageList;
    message?: string;
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

  type HostTypeAddReq = {
    Description?: string;
    HostType?: string;
    NamingRule?: string;
    RuleDefinition?: string;
  };

  type HostTypeAddResp = {
    code?: string;
    message?: string;
  };

  type hostTypeDeleteApiCmdbHosttypesByUidParams = {
    uid: string;
  };

  type HostTypeDelReq = true;

  type HostTypeDelResp = {
    code?: string;
    message?: string;
  };

  type hostTypeEditApiCmdbHosttypesByUidParams = {
    uid: string;
  };

  type HostTypeEditReq = {
    Description?: string;
    HostType?: string;
    NamingRule?: string;
    RuleDefinition?: string;
  };

  type HostTypeEditResp = {
    code?: string;
    message?: string;
  };

  type HostTypeInfo = {
    Description?: string;
    HostType?: string;
    NamingRule?: string;
    RuleDefinition?: string;
    uid: string;
  };

  type hostTypeInfoApiCmdbHosttypesByUidParams = {
    uid: string;
  };

  type HostTypeInfoReq = true;

  type HostTypeInfoResp = {
    code?: string;
    data: HostTypeInfo;
    message?: string;
  };

  type HostTypeList = {
    list: HostTypeInfo[];
    total: number;
  };

  type hostTypeListApiCmdbHosttypesListParams = {
    keywords?: string;
  };

  type HostTypeListReq = {
    keywords?: string;
  };

  type HostTypeListResp = {
    code?: string;
    data: HostTypeList;
    message?: string;
  };

  type HostTypePageList = {
    list: HostTypeInfo[];
    total: number;
  };

  type hostTypePageListApiCmdbHosttypesParams = {
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
    code?: string;
    data: HostTypePageList;
    message?: string;
  };

  type PersonAddReq = {
    Description?: string;
    Email?: string;
    Enabled?: boolean;
    Mobile?: string;
    Person?: string;
    PersonName?: string;
    ProfessionIds?: string[];
  };

  type PersonAddResp = {
    code?: string;
    message?: string;
  };

  type personDeleteApiCmdbPersonsByUidParams = {
    uid: string;
  };

  type PersonDelReq = true;

  type PersonDelResp = {
    code?: string;
    message?: string;
  };

  type personEditApiCmdbPersonsByUidParams = {
    uid: string;
  };

  type PersonEditReq = {
    Description?: string;
    Email?: string;
    Enabled?: boolean;
    Mobile?: string;
    Person?: string;
    PersonName?: string;
    ProfessionIds?: string[];
    uid: string;
  };

  type PersonEditResp = {
    code?: string;
    message?: string;
  };

  type PersonInfo = {
    Description?: string;
    Email?: string;
    Enabled?: boolean;
    Mobile?: string;
    Person?: string;
    PersonName?: string;
    Professions?: Profession[];
    uid: string;
  };

  type personInfoApiCmdbPersonsByUidParams = {
    uid: string;
  };

  type PersonInfoReq = true;

  type PersonInfoResp = {
    code?: string;
    data: PersonInfo;
    message?: string;
  };

  type PersonList = {
    list: PersonInfo[];
    total: number;
  };

  type personListApiCmdbPersonsListParams = {
    keywords?: string;
  };

  type PersonListReq = {
    keywords?: string;
  };

  type PersonListResp = {
    code?: string;
    data: PersonList;
    message?: string;
  };

  type PersonPageList = {
    list: PersonInfo[];
    total: number;
  };

  type personPageListApiCmdbPersonsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type PersonPageListReq = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type PersonPageListResp = {
    code?: string;
    data: PersonPageList;
    message?: string;
  };

  type Profession = {
    professionName: string;
    uid: string;
  };

  type ProfessionAddReq = {
    Description?: string;
    Profession: string;
    ProfessionName: string;
  };

  type ProfessionAddResp = {
    code?: string;
    message?: string;
  };

  type professionDeleteApiCmdbProfessionsByUidParams = {
    uid: string;
  };

  type ProfessionDelReq = true;

  type ProfessionDelResp = {
    code?: string;
    message?: string;
  };

  type professionEditApiCmdbProfessionsByUidParams = {
    uid: string;
  };

  type ProfessionEditReq = {
    Description?: string;
    Profession?: string;
    ProfessionName?: string;
    uid?: string;
  };

  type ProfessionEditResp = {
    code?: string;
    message?: string;
  };

  type ProfessionInfo = {
    Description?: string;
    Profession: string;
    ProfessionName: string;
  };

  type professionInfoApiCmdbProfessionsByUidParams = {
    uid: string;
  };

  type ProfessionInfoReq = true;

  type ProfessionInfoResp = {
    code?: string;
    data: ProfessionInfo;
    message?: string;
  };

  type ProfessionList = {
    list: Profession[];
    total: number;
  };

  type professionListApiCmdbProfessionsListParams = {
    keywords?: string;
  };

  type ProfessionListReq = {
    keywords?: string;
  };

  type ProfessionListResp = {
    code?: string;
    data: ProfessionList;
    message?: string;
  };

  type ProfessionPageList = {
    list: ProfessionInfo[];
    total: number;
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
    code?: string;
    data: ProfessionPageList;
    message?: string;
  };

  type ProjectAddReq = {
    ClientIds?: string[];
    Description?: string;
    EnvUid?: string;
    JoinDate?: string;
    Project?: string;
    ProjectName?: string;
    SaleIds?: string[];
  };

  type ProjectAddResp = {
    code?: string;
    message?: string;
  };

  type projectDeleteApiCmdbProjectsByUidParams = {
    uid: string;
  };

  type ProjectDelReq = true;

  type ProjectDelResp = {
    code?: string;
    message?: string;
  };

  type projectEditApiCmdbProjectsByUidParams = {
    uid: string;
  };

  type ProjectEditReq = {
    ClientIds?: string[];
    Description?: string;
    EnvUid?: string;
    JoinDate?: string;
    Project?: string;
    ProjectName?: string;
    SaleIds?: string[];
    uid: string;
  };

  type ProjectEditResp = {
    code?: string;
    message?: string;
  };

  type ProjectInfo = {
    Client?: BasePerson[];
    Description?: string;
    JoinDate?: string;
    Project?: string;
    ProjectName?: string;
    Sale?: BasePerson[];
    uid: string;
  };

  type ProjectInfoReq = true;

  type ProjectInfoResp = {
    code?: string;
    data: ProjectInfo;
    message?: string;
  };

  type ProjectList = {
    list: ProjectInfo[];
    total: number;
  };

  type projectListApiCmdbProjectsListParams = {
    keywords?: string;
    EnvUid: string;
  };

  type ProjectListReq = {
    EnvUid: string;
    keywords?: string;
  };

  type ProjectListResp = {
    code?: string;
    data: ProjectList;
    message?: string;
  };

  type ProjectPageList = {
    list: ProjectInfo[];
    total: number;
  };

  type projectPageListApiCmdbProjectsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
    EnvUid: string;
  };

  type ProjectPageListReq = {
    EnvUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type ProjectPageListResp = {
    code?: string;
    data: ProjectPageList;
    message?: string;
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
    code?: string;
    message?: string;
  };

  type regionDeleteApiCmdbRegionsByUidParams = {
    uid: string;
  };

  type RegionDeleteReq = true;

  type RegionDeleteResp = {
    code?: string;
    message?: string;
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
    code?: string;
    list: RegionOption[];
    message?: string;
    total: number;
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
    code?: string;
    list: RegionInfo[];
    message?: string;
    total: number;
  };

  type regionReadOneApiCmdbRegionsByUidParams = {
    uid: string;
  };

  type RegionReadOneReq = true;

  type RegionReadOneResp = {
    Region?: string;
    RegionName?: string;
    RegionState?: string;
    Uid?: string;
    code?: string;
    createAt?: string;
    createBy?: string;
    message?: string;
    updateAt?: string;
    updateBy?: string;
  };

  type RegionSyncReq = {
    CloudUid: string;
  };

  type RegionSyncResp = {
    code?: string;
    message?: string;
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
    code?: string;
    message?: string;
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
    code?: string;
    message?: string;
  };

  type zoneDeleteApiCmdbZonesByUidParams = {
    uid: string;
  };

  type ZoneDeleteReq = true;

  type ZoneDeleteResp = {
    code?: string;
    message?: string;
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
    code?: string;
    list: ZoneOption[];
    message?: string;
    total: number;
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
    code?: string;
    list: ZoneInfo[];
    message?: string;
    total: number;
  };

  type zoneReadOneApiCmdbZonesByUidParams = {
    uid: string;
  };

  type ZoneReadOneReq = true;

  type ZoneReadOneResp = {
    Uid?: string;
    Zone?: string;
    ZoneName?: string;
    ZoneState?: string;
    code?: string;
    createAt?: string;
    createBy?: string;
    message?: string;
    updateAt?: string;
    updateBy?: string;
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
    code?: string;
    message?: string;
  };
}
