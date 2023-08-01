declare namespace API {
  type AppAddReq = {
    data?: { App?: string; AppName?: string; Description?: string; Version?: string };
  };

  type AppAddResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type appDeleteApiCmdbAppsByUidParams = {
    uid: string;
  };

  type AppDelReq = {
    data?: Record<string, any>;
  };

  type AppDelResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type appEditApiCmdbAppsByUidParams = {
    uid: string;
  };

  type AppEditReq = {
    data?: { App?: string; AppName?: string; Description?: string; Version?: string };
  };

  type AppEditResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type AppInfo = {
    data?: { App?: string; AppName?: string; Description?: string; Version?: string; uid?: string };
  };

  type AppInfoReq = {
    data?: Record<string, any>;
  };

  type AppInfoResp = {
    code?: number;
    data?: { data?: AppInfo };
    msg?: string;
  };

  type AppList = {
    data?: { list?: AppInfo[]; total?: number };
  };

  type appListApiCmdbAppsListParams = {
    keywords?: string;
  };

  type AppListReq = {
    data?: { keywords?: string };
  };

  type AppListResp = {
    code?: number;
    data?: { data?: AppList };
    msg?: string;
  };

  type AppPageList = {
    data?: { list?: AppInfo[]; total?: number };
  };

  type appPageListApiCmdbAppsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type AppPageListReq = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type AppPageListResp = {
    code?: number;
    data?: { data?: AppPageList };
    msg?: string;
  };

  type AppT = {
    data?: {
      AppT?: string;
      AppTName?: string;
      Description?: string;
      EnvT?: string;
      HostTs?: string[];
      Uid?: string;
    };
  };

  type AppTAddReq = {
    data?: { AppT?: string; AppTName?: string; Description?: string; EnvTUid?: string };
  };

  type AppTAddResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type appTDeleteApiCmdbApptsByUidParams = {
    uid: string;
  };

  type AppTDelReq = {
    data?: Record<string, any>;
  };

  type AppTDelResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type appTEditApiCmdbApptsByUidParams = {
    uid: string;
  };

  type AppTEditReq = {
    data?: { AppT?: string; AppTName?: string; Description?: string; EnvTUid?: string };
  };

  type AppTEditResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type AppTInfo = {
    data?: { AppT?: string; AppTName?: string; Description?: string; uid?: string };
  };

  type AppTInfoReq = {
    data?: Record<string, any>;
  };

  type AppTInfoResp = {
    code?: number;
    data?: { data?: AppTInfo };
    msg?: string;
  };

  type AppTList = {
    data?: { list?: AppTInfo[]; total?: number };
  };

  type appTListApiCmdbApptsListParams = {
    keywords?: string;
    EnvTUid: string;
  };

  type AppTListReq = {
    data?: { EnvTUid?: string; keywords?: string };
  };

  type AppTListResp = {
    code?: number;
    data?: { data?: AppTList };
    msg?: string;
  };

  type AppTPageList = {
    data?: { list?: AppTInfo[]; total?: number };
  };

  type appTPageListApiCmdbApptsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
    EnvTUid: string;
  };

  type AppTPageListReq = {
    data?: {
      EnvTUid?: string;
      current?: number;
      keywords?: string;
      orderBy?: string;
      pageSize?: number;
    };
  };

  type AppTPageListResp = {
    code?: number;
    data?: { data?: AppTPageList };
    msg?: string;
  };

  type BaseApp = {
    data?: { App?: string; AppName?: string; Description?: string; Version?: string };
  };

  type BaseAppT = {
    data?: { AppT?: string; AppTName?: string; Description?: string };
  };

  type BaseEnvT = {
    data?: { Description?: string; EnvT?: string; EnvTName?: string };
  };

  type BaseHostType = {
    data?: {
      Description?: string;
      HostType?: string;
      NamingRule?: string;
      RuleDefinition?: string;
    };
  };

  type BasePerson = {
    data?: {
      Description?: string;
      Email?: string;
      Enabled?: boolean;
      Mobile?: string;
      Person?: string;
      PersonName?: string;
    };
  };

  type BaseProject = {
    data?: { Description?: string; JoinDate?: string; Project?: string; ProjectName?: string };
  };

  type Cloud = {
    data?: {
      ApiDomain?: string;
      CloudKey?: string;
      CloudName?: string;
      Description?: string;
      SecretId?: string;
      SecretKey?: string;
      SupportApi?: boolean;
      Website?: string;
    };
  };

  type CloudCreateReq = {
    data?: {
      ApiDomain?: string;
      CloudKey?: string;
      CloudName?: string;
      Description?: string;
      SecretId?: string;
      SecretKey?: string;
      SupportApi?: boolean;
      Website?: string;
    };
  };

  type CloudCreateResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type cloudDeleteApiCmdbCloudsByUidParams = {
    uid: string;
  };

  type CloudDeleteReq = {
    data?: Record<string, any>;
  };

  type CloudDeleteResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type CloudInfo = {
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
  };

  type CloudOption = {
    data?: { CloudKey?: string; CloudName?: string; SupportApi?: boolean; Uid?: string };
  };

  type cloudOptionsApiCmdbCloudsOptionsParams = {
    keywords?: string;
  };

  type CloudOptionsReq = {
    data?: { keywords?: string };
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
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type CloudPageListResp = {
    code?: number;
    data?: { list?: CloudInfo[]; total?: number };
    msg?: string;
  };

  type cloudReadOneApiCmdbCloudsByUidParams = {
    uid: string;
  };

  type CloudReadOneReq = {
    data?: Record<string, any>;
  };

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
    data?: {
      ApiDomain?: string;
      CloudKey?: string;
      CloudName?: string;
      Description?: string;
      SecretId?: string;
      SecretKey?: string;
      SupportApi?: boolean;
      Website?: string;
    };
  };

  type CloudUpdateResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type Disk = {
    data?: { DiskId?: string; DiskSize?: number; DiskType?: string; uid?: string };
  };

  type DiskT = {
    data?: { DiskSize?: number; DiskType?: string; Uid?: string };
  };

  type Env = {
    data?: {
      ApiDomainName?: string;
      Description?: string;
      DomainName?: string;
      EnvId?: string;
      EnvName?: string;
      SecretId?: string;
      SecretKey?: string;
    };
  };

  type EnvCreateReq = {
    data?: {
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
  };

  type EnvCreateResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type envDeleteApiCmdbEnvsByUidParams = {
    uid: string;
  };

  type EnvDeleteReq = {
    data?: Record<string, any>;
  };

  type EnvDeleteResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type EnvInfo = {
    data?: {
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
      Uid?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
  };

  type EnvOption = {
    data?: { EnvId?: string; EnvName?: string; Uid?: string };
  };

  type envOptionsApiCmdbEnvsOptionsParams = {
    keywords?: string;
  };

  type EnvOptionsReq = {
    data?: { keywords?: string };
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
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type EnvPageListResp = {
    code?: number;
    data?: { list?: EnvInfo[]; total?: number };
    msg?: string;
  };

  type envReadOneApiCmdbEnvsByUidParams = {
    uid: string;
  };

  type EnvReadOneReq = {
    data?: Record<string, any>;
  };

  type EnvReadOneResp = {
    code?: number;
    data?: {
      Ops?: BasePerson[];
      Qa?: BasePerson[];
      Sale?: BasePerson[];
      Support?: BasePerson[];
      Uid?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type EnvT = {
    data?: { Description?: string; EnvT?: string; EnvTName?: string; Uid?: string };
  };

  type EnvTAddReq = {
    data?: { Description?: string; EnvT?: string; EnvTName?: string };
  };

  type EnvTAddResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type envTDeleteApiCmdbEnvtsByUidParams = {
    uid: string;
  };

  type EnvTDelReq = {
    data?: Record<string, any>;
  };

  type EnvTDelResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type envTEditApiCmdbEnvtsByUidParams = {
    uid: string;
  };

  type EnvTEditReq = {
    data?: { Description?: string; EnvT?: string; EnvTName?: string };
  };

  type EnvTEditResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type EnvTInfo = {
    data?: { Description?: string; EnvT?: string; EnvTName?: string; Uid?: string };
  };

  type envTInfoApiCmdbEnvtsByUidParams = {
    uid: string;
  };

  type EnvTInfoReq = {
    data?: Record<string, any>;
  };

  type EnvTInfoResp = {
    code?: number;
    data?: { data?: EnvTInfo };
    msg?: string;
  };

  type EnvTList = {
    data?: { list?: EnvTInfo[]; total?: number };
  };

  type envTListApiCmdbEnvtsListParams = {
    keywords?: string;
  };

  type EnvTListReq = {
    data?: { keywords?: string };
  };

  type EnvTListResp = {
    code?: number;
    data?: { data?: EnvTList };
    msg?: string;
  };

  type EnvTPageList = {
    data?: { list?: EnvTInfo[]; total?: number };
  };

  type envTPageListApiCmdbEnvtsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type EnvTPageListReq = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type EnvTPageListResp = {
    code?: number;
    data?: { data?: EnvTPageList };
    msg?: string;
  };

  type EnvTSaveReq = {
    data?: { AppTs?: AppT[]; DiskTs?: DiskT[]; EnvT?: EnvT; HostTs?: HostT[] };
  };

  type EnvTSaveResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type envUpdateApiCmdbEnvsByUidParams = {
    uid: string;
  };

  type EnvUpdateReq = {
    data?: {
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
  };

  type EnvUpdateResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type Host = {
    data?: { HostName?: string; uid?: string };
  };

  type HostAddReq = {
    data?: {
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
  };

  type HostAddResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type hostDeleteApiCmdbHostsByUidParams = {
    uid: string;
  };

  type HostDelReq = {
    data?: Record<string, any>;
  };

  type HostDelResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type hostEditApiCmdbHostsByUidParams = {
    uid: string;
  };

  type HostEditReq = {
    data?: {
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
  };

  type HostEditResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type HostInfo = {
    data?: {
      CPU?: number;
      CPUType?: string;
      DataDisks?: Disk[];
      Description?: string;
      EnvInfo?: EnvInfo;
      ExpiredTime?: string;
      HostName?: string;
      HostType?: string;
      InstanceChargeType?: string;
      InstanceId?: string;
      JumpId?: string;
      Memory?: number;
      OS?: string;
      Ops?: BasePerson[];
      PrivateIpAddresses?: string[];
      PublicIpAddresses?: string[];
      SSHPort?: number;
      Status?: string;
      SystemDisk?: Disk;
      Zone?: string;
    };
  };

  type hostInfoApiCmdbHostsByUidParams = {
    uid: string;
  };

  type HostInfoReq = {
    data?: Record<string, any>;
  };

  type HostInfoResp = {
    code?: number;
    data?: { data?: HostInfo };
    msg?: string;
  };

  type HostList = {
    data?: { list?: Host[]; total?: number };
  };

  type hostListApiCmdbHostsListParams = {
    keywords?: string;
  };

  type HostListReq = {
    data?: { keywords?: string };
  };

  type HostListResp = {
    code?: number;
    data?: { data?: HostList };
    msg?: string;
  };

  type HostPageList = {
    data?: { list?: HostInfo[]; total?: number };
  };

  type hostPageListApiCmdbHostsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type HostPageListReq = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type HostPageListResp = {
    code?: number;
    data?: { data?: HostPageList };
    msg?: string;
  };

  type HostT = {
    data?: {
      CPU?: number;
      DataDisks?: string[];
      Description?: string;
      HostTName?: string;
      HostType?: string;
      Memory?: number;
      SystemDisk?: string;
      Uid?: string;
    };
  };

  type HostTypeAddReq = {
    data?: {
      Description?: string;
      HostType?: string;
      NamingRule?: string;
      RuleDefinition?: string;
    };
  };

  type HostTypeAddResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type hostTypeDeleteApiCmdbHosttypesByUidParams = {
    uid: string;
  };

  type HostTypeDelReq = {
    data?: Record<string, any>;
  };

  type HostTypeDelResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type hostTypeEditApiCmdbHosttypesByUidParams = {
    uid: string;
  };

  type HostTypeEditReq = {
    data?: {
      Description?: string;
      HostType?: string;
      NamingRule?: string;
      RuleDefinition?: string;
    };
  };

  type HostTypeEditResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type HostTypeInfo = {
    data?: {
      Description?: string;
      HostType?: string;
      NamingRule?: string;
      RuleDefinition?: string;
      uid?: string;
    };
  };

  type hostTypeInfoApiCmdbHosttypesByUidParams = {
    uid: string;
  };

  type HostTypeInfoReq = {
    data?: Record<string, any>;
  };

  type HostTypeInfoResp = {
    code?: number;
    data?: { data?: HostTypeInfo };
    msg?: string;
  };

  type HostTypeList = {
    data?: { list?: HostTypeInfo[]; total?: number };
  };

  type hostTypeListApiCmdbHosttypesListParams = {
    keywords?: string;
  };

  type HostTypeListReq = {
    data?: { keywords?: string };
  };

  type HostTypeListResp = {
    code?: number;
    data?: { data?: HostTypeList };
    msg?: string;
  };

  type HostTypePageList = {
    data?: { list?: HostTypeInfo[]; total?: number };
  };

  type hostTypePageListApiCmdbHosttypesParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type HostTypePageListReq = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type HostTypePageListResp = {
    code?: number;
    data?: { data?: HostTypePageList };
    msg?: string;
  };

  type PageParams = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type PersonAddReq = {
    data?: {
      Description?: string;
      Email?: string;
      Enabled?: boolean;
      Mobile?: string;
      Person?: string;
      PersonName?: string;
      ProfessionIds?: string[];
    };
  };

  type PersonAddResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type personDeleteApiCmdbPersonsByUidParams = {
    uid: string;
  };

  type PersonDelReq = {
    data?: Record<string, any>;
  };

  type PersonDelResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type personEditApiCmdbPersonsByUidParams = {
    uid: string;
  };

  type PersonEditReq = {
    data?: {
      Description?: string;
      Email?: string;
      Enabled?: boolean;
      Mobile?: string;
      Person?: string;
      PersonName?: string;
      ProfessionIds?: string[];
      uid?: string;
    };
  };

  type PersonEditResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type PersonInfo = {
    data?: {
      Description?: string;
      Email?: string;
      Enabled?: boolean;
      Mobile?: string;
      Person?: string;
      PersonName?: string;
      Professions?: Profession[];
      uid?: string;
    };
  };

  type personInfoApiCmdbPersonsByUidParams = {
    uid: string;
  };

  type PersonInfoReq = {
    data?: Record<string, any>;
  };

  type PersonInfoResp = {
    code?: number;
    data?: { data?: PersonInfo };
    msg?: string;
  };

  type PersonList = {
    data?: { list?: PersonInfo[]; total?: number };
  };

  type personListApiCmdbPersonsListParams = {
    keywords?: string;
  };

  type PersonListReq = {
    data?: { keywords?: string };
  };

  type PersonListResp = {
    code?: number;
    data?: { data?: PersonList };
    msg?: string;
  };

  type PersonPageList = {
    data?: { list?: PersonInfo[]; total?: number };
  };

  type personPageListApiCmdbPersonsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type PersonPageListReq = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type PersonPageListResp = {
    code?: number;
    data?: { data?: PersonPageList };
    msg?: string;
  };

  type Profession = {
    data?: { professionName?: string; uid?: string };
  };

  type ProfessionAddReq = {
    data?: { Description?: string; Profession?: string; ProfessionName?: string };
  };

  type ProfessionAddResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type professionDeleteApiCmdbProfessionsByUidParams = {
    uid: string;
  };

  type ProfessionDelReq = {
    data?: Record<string, any>;
  };

  type ProfessionDelResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type professionEditApiCmdbProfessionsByUidParams = {
    uid: string;
  };

  type ProfessionEditReq = {
    data?: { Description?: string; Profession?: string; ProfessionName?: string; uid?: string };
  };

  type ProfessionEditResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type ProfessionInfo = {
    data?: { Description?: string; Profession?: string; ProfessionName?: string };
  };

  type professionInfoApiCmdbProfessionsByUidParams = {
    uid: string;
  };

  type ProfessionInfoReq = {
    data?: Record<string, any>;
  };

  type ProfessionInfoResp = {
    code?: number;
    data?: { data?: ProfessionInfo };
    msg?: string;
  };

  type ProfessionList = {
    data?: { list?: Profession[]; total?: number };
  };

  type professionListApiCmdbProfessionsListParams = {
    keywords?: string;
  };

  type ProfessionListReq = {
    data?: { keywords?: string };
  };

  type ProfessionListResp = {
    code?: number;
    data?: { data?: ProfessionList };
    msg?: string;
  };

  type ProfessionPageList = {
    data?: { list?: ProfessionInfo[]; total?: number };
  };

  type professionPageListApiCmdbProfessionsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type ProfessionPageListReq = {
    data?: { current?: number; keywords?: string; orderBy?: string; pageSize?: number };
  };

  type ProfessionPageListResp = {
    code?: number;
    data?: { data?: ProfessionPageList };
    msg?: string;
  };

  type ProjectAddReq = {
    data?: {
      ClientIds?: string[];
      Description?: string;
      EnvUid?: string;
      JoinDate?: string;
      Project?: string;
      ProjectName?: string;
      SaleIds?: string[];
    };
  };

  type ProjectAddResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type projectDeleteApiCmdbProjectsByUidParams = {
    uid: string;
  };

  type ProjectDelReq = {
    data?: Record<string, any>;
  };

  type ProjectDelResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type projectEditApiCmdbProjectsByUidParams = {
    uid: string;
  };

  type ProjectEditReq = {
    data?: {
      ClientIds?: string[];
      Description?: string;
      EnvUid?: string;
      JoinDate?: string;
      Project?: string;
      ProjectName?: string;
      SaleIds?: string[];
      uid?: string;
    };
  };

  type ProjectEditResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type ProjectInfo = {
    data?: {
      Client?: BasePerson[];
      Description?: string;
      JoinDate?: string;
      Project?: string;
      ProjectName?: string;
      Sale?: BasePerson[];
      uid?: string;
    };
  };

  type ProjectInfoReq = {
    data?: Record<string, any>;
  };

  type ProjectInfoResp = {
    code?: number;
    data?: { data?: ProjectInfo };
    msg?: string;
  };

  type ProjectList = {
    data?: { list?: ProjectInfo[]; total?: number };
  };

  type projectListApiCmdbProjectsListParams = {
    keywords?: string;
    EnvUid: string;
  };

  type ProjectListReq = {
    data?: { EnvUid?: string; keywords?: string };
  };

  type ProjectListResp = {
    code?: number;
    data?: { data?: ProjectList };
    msg?: string;
  };

  type ProjectPageList = {
    data?: { list?: ProjectInfo[]; total?: number };
  };

  type projectPageListApiCmdbProjectsParams = {
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
    EnvUid: string;
  };

  type ProjectPageListReq = {
    data?: {
      EnvUid?: string;
      current?: number;
      keywords?: string;
      orderBy?: string;
      pageSize?: number;
    };
  };

  type ProjectPageListResp = {
    code?: number;
    data?: { data?: ProjectPageList };
    msg?: string;
  };

  type Region = {
    data?: { CloudUid?: string; Region?: string; RegionName?: string; RegionState?: string };
  };

  type RegionCreateReq = {
    data?: { CloudUid?: string; Region?: string; RegionName?: string; RegionState?: string };
  };

  type RegionCreateResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type regionDeleteApiCmdbRegionsByUidParams = {
    uid: string;
  };

  type RegionDeleteReq = {
    data?: Record<string, any>;
  };

  type RegionDeleteResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type RegionInfo = {
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
  };

  type RegionOption = {
    data?: { Region?: string; RegionName?: string; RegionState?: string; Uid?: string };
  };

  type regionOptionsApiCmdbRegionsOptionsParams = {
    CloudUid: string;
    keywords?: string;
  };

  type RegionOptionsReq = {
    data?: { CloudUid?: string; keywords?: string };
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
    data?: {
      CloudUid?: string;
      current?: number;
      keywords?: string;
      orderBy?: string;
      pageSize?: number;
    };
  };

  type RegionPageListResp = {
    code?: number;
    data?: { list?: RegionInfo[]; total?: number };
    msg?: string;
  };

  type regionReadOneApiCmdbRegionsByUidParams = {
    uid: string;
  };

  type RegionReadOneReq = {
    data?: Record<string, any>;
  };

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
    data?: { CloudUid?: string };
  };

  type RegionSyncResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type regionUpdateApiCmdbRegionsByUidParams = {
    uid: string;
  };

  type RegionUpdateReq = {
    data?: { CloudUid?: string; Region?: string; RegionName?: string; RegionState?: string };
  };

  type RegionUpdateResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type Zone = {
    data?: { RegionUid?: string; Zone?: string; ZoneName?: string; ZoneState?: string };
  };

  type ZoneCreateReq = {
    data?: { RegionUid?: string; Zone?: string; ZoneName?: string; ZoneState?: string };
  };

  type ZoneCreateResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type zoneDeleteApiCmdbZonesByUidParams = {
    uid: string;
  };

  type ZoneDeleteReq = {
    data?: Record<string, any>;
  };

  type ZoneDeleteResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type ZoneInfo = {
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
  };

  type ZoneOption = {
    data?: { Uid?: string; Zone?: string; ZoneName?: string; ZoneState?: string };
  };

  type zoneOptionsApiCmdbZonesOptionsParams = {
    RegionUid: string;
    keywords?: string;
  };

  type ZoneOptionsReq = {
    data?: { RegionUid?: string; keywords?: string };
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
    data?: {
      RegionUid?: string;
      current?: number;
      keywords?: string;
      orderBy?: string;
      pageSize?: number;
    };
  };

  type ZonePageListResp = {
    code?: number;
    data?: { list?: ZoneInfo[]; total?: number };
    msg?: string;
  };

  type zoneReadOneApiCmdbZonesByUidParams = {
    uid: string;
  };

  type ZoneReadOneReq = {
    data?: Record<string, any>;
  };

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
    data?: { RegionUid?: string; Zone?: string; ZoneName?: string; ZoneState?: string };
  };

  type ZoneUpdateResp = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };
}
