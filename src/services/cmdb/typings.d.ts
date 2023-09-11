declare namespace API {
  type App = {
    App: string;
    AppType: string;
    Description?: string;
    Enabled: boolean;
    Version: string;
  };

  type AppCreateReq = {
    App?: string;
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
    App: string;
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
    App: string;
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
      App?: string;
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
    App?: string;
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
    Account?: string;
    ApiDomain?: string;
    Cloud: string;
    CloudName: string;
    Description?: string;
    ResourceGroup: string;
    SecretId?: string;
    SecretKey?: string;
    SupportApi?: boolean;
    Website?: string;
  };

  type CloudCreateReq = {
    Account?: string;
    ApiDomain?: string;
    Cloud?: string;
    CloudName?: string;
    Description?: string;
    ResourceGroup?: string;
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
    Account?: string;
    ApiDomain: string;
    Cloud: string;
    CloudName: string;
    Description: string;
    ResourceGroup: string;
    SecretId: string;
    SupportApi: boolean;
    Uid: string;
    Website: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type CloudOption = {
    Cloud: string;
    ResourceGroup: string;
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

  type cloudPlacementApiCmdbCloudsPlacesParams = {
    keywords?: string;
  };

  type CloudPlacementReq = {
    keywords?: string;
  };

  type CloudPlacementResp = {
    code?: number;
    data?: { Tree?: PlaceCloud[] };
    msg?: string;
  };

  type cloudReadOneApiCmdbCloudsByUidParams = {
    uid: string;
  };

  type CloudReadOneReq = true;

  type CloudReadOneResp = {
    code?: number;
    data?: {
      Account?: string;
      ApiDomain?: string;
      Cloud?: string;
      CloudName?: string;
      Description?: string;
      ResourceGroup?: string;
      SecretId?: string;
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

  type CloudSyncReq = {
    CloudUid: string;
    RegionUid?: string;
    target: number;
  };

  type CloudSyncResp = {
    code?: number;
    msg?: string;
  };

  type CloudTag = {
    Description?: string;
    Key: string;
    Value: string;
  };

  type CloudTagCreateReq = {
    Description?: string;
    Key?: string;
    Value?: string;
  };

  type CloudTagCreateResp = {
    code?: number;
    msg?: string;
  };

  type cloudTagDeleteApiCmdbCloudtagsByUidParams = {
    uid: string;
  };

  type CloudTagDeleteReq = true;

  type CloudTagDeleteResp = {
    code?: number;
    msg?: string;
  };

  type CloudTagInfo = {
    Description?: string;
    Key: string;
    Uid: string;
    Value: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type CloudTagOption = {
    Key: string;
    Uid: string;
    Value: string;
  };

  type cloudTagOptionsApiCmdbCloudtagsOptionsParams = {
    CloudUid: string;
    keywords?: string;
  };

  type CloudTagOptionsReq = {
    CloudUid: string;
    keywords?: string;
  };

  type CloudTagOptionsResp = {
    code?: number;
    data?: { list?: CloudTagOption[]; total?: number };
    msg?: string;
  };

  type cloudTagPageListApiCmdbCloudtagsParams = {
    CloudUid: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type CloudTagPageListReq = {
    CloudUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type CloudTagPageListResp = {
    code?: number;
    data?: { list?: CloudTagInfo[]; total?: number };
    msg?: string;
  };

  type cloudTagReadOneApiCmdbCloudtagsByUidParams = {
    uid: string;
  };

  type CloudTagReadOneReq = true;

  type CloudTagReadOneResp = {
    code?: number;
    data?: {
      Description?: string;
      Key?: string;
      Uid?: string;
      Value?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type cloudTagUpdateApiCmdbCloudtagsByUidParams = {
    uid: string;
  };

  type CloudTagUpdateReq = {
    Description?: string;
    Key?: string;
    Value?: string;
  };

  type CloudTagUpdateResp = {
    code?: number;
    msg?: string;
  };

  type cloudUpdateApiCmdbCloudsByUidParams = {
    uid: string;
  };

  type CloudUpdateReq = {
    Account?: string;
    ApiDomain?: string;
    Cloud?: string;
    CloudName?: string;
    Description?: string;
    ResourceGroup?: string;
    SecretId?: string;
    SecretKey?: string;
    SupportApi?: boolean;
    Website?: string;
  };

  type CloudUpdateResp = {
    code?: number;
    msg?: string;
  };

  type DataDisk = {
    DiskId: string;
    DiskSize: number;
    DiskType: string;
    Uid: string;
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
    CPUType: string;
    Cpu: number;
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
    CPUType?: string;
    Cpu?: number;
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
    SystemDisk?: Disk;
    ZoneUid?: string;
  };

  type HostEditResp = {
    code?: number;
    msg?: string;
  };

  type HostInfo = {
    AppSet: AppOption[];
    CreateAt: string;
    CreateBy: string;
    Description: string;
    Env: EnvOption;
    HostName: string;
    HostType: HostTypeOption;
    Instance: InstanceInfo;
    OpsSet: PersonOption[];
    Project: ProjectOption;
    State: string;
    TaskBillId: string;
    UpdateAt: string;
    UpdateBy: string;
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

  type hostPageListApiCmdbHostsParams = {
    EnvId: string;
    HostType?: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type HostPageListReq = {
    EnvId: string;
    HostType?: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type HostPageListResp = {
    code?: number;
    data?: { list?: HostInfo[]; total?: number };
    msg?: string;
  };

  type HostT = {
    Cpu: number;
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
    HostType: string;
    RuleDefinition: string;
  };

  type HostTypeCreateReq = {
    Description?: string;
    HostType?: string;
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
    HostType: string;
    RuleDefinition: string;
    Uid: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type HostTypeOption = {
    HostType: string;
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
      HostType?: string;
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
    HostType?: string;
    RuleDefinition?: string;
  };

  type HostTypeUpdateResp = {
    code?: number;
    msg?: string;
  };

  type Image = {
    Architecture?: string;
    CloudTagIds?: string[];
    Description?: string;
    ImageCreator?: string;
    ImageDescription?: string;
    ImageId: string;
    ImageName: string;
    ImageSize: number;
    ImageSource?: string;
    ImageState: string;
    ImageType: string;
    IsSupportCloudinit?: boolean;
    LicenseType?: string;
    OsName: string;
    Platfor?: string;
    RegionUid: string;
    SyncPercent?: number;
  };

  type ImageCreateReq = {
    Architecture?: string;
    CloudTagIds?: string[];
    Description?: string;
    ImageCreator?: string;
    ImageDescription?: string;
    ImageId?: string;
    ImageName?: string;
    ImageSize?: number;
    ImageSource?: string;
    ImageState?: string;
    ImageType?: string;
    IsSupportCloudinit?: boolean;
    LicenseType?: string;
    OsName?: string;
    Platfor?: string;
    RegionUid?: string;
    SyncPercent?: number;
  };

  type ImageCreateResp = {
    code?: number;
    msg?: string;
  };

  type imageDeleteApiCmdbImagesByUidParams = {
    uid: string;
  };

  type ImageDeleteReq = true;

  type ImageDeleteResp = {
    code?: number;
    msg?: string;
  };

  type ImageInfo = {
    Architecture?: string;
    Description?: string;
    ImageCreator?: string;
    ImageDescription?: string;
    ImageId: string;
    ImageName: string;
    ImageSize: number;
    ImageSource?: string;
    ImageState: string;
    ImageType: string;
    IsSupportCloudinit?: boolean;
    LicenseType?: string;
    OsName: string;
    Platfor?: string;
    SyncPercent?: number;
    Uid: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type ImageOption = {
    ImageId: string;
    ImageName: string;
    ImageState?: string;
    Uid: string;
  };

  type imageOptionsApiCmdbImagesOptionsParams = {
    RegionUid: string;
    keywords?: string;
  };

  type ImageOptionsReq = {
    RegionUid: string;
    keywords?: string;
  };

  type ImageOptionsResp = {
    code?: number;
    data?: { list?: ImageOption[]; total?: number };
    msg?: string;
  };

  type imagePageListApiCmdbImagesParams = {
    RegionUid: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type ImagePageListReq = {
    RegionUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type ImagePageListResp = {
    code?: number;
    data?: { list?: ImageInfo[]; total?: number };
    msg?: string;
  };

  type imageReadOneApiCmdbImagesByUidParams = {
    uid: string;
  };

  type ImageReadOneReq = true;

  type ImageReadOneResp = {
    code?: number;
    data?: {
      Architecture?: string;
      Description?: string;
      ImageCreator?: string;
      ImageDescription?: string;
      ImageId?: string;
      ImageName?: string;
      ImageSize?: number;
      ImageSource?: string;
      ImageState?: string;
      ImageType?: string;
      IsSupportCloudinit?: boolean;
      LicenseType?: string;
      OsName?: string;
      Platfor?: string;
      SyncPercent?: number;
      Uid?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type imageUpdateApiCmdbImagesByUidParams = {
    uid: string;
  };

  type ImageUpdateReq = {
    Architecture?: string;
    CloudTagIds?: string[];
    Description?: string;
    ImageCreator?: string;
    ImageDescription?: string;
    ImageId?: string;
    ImageName?: string;
    ImageSize?: number;
    ImageSource?: string;
    ImageState?: string;
    ImageType?: string;
    IsSupportCloudinit?: boolean;
    LicenseType?: string;
    OsName?: string;
    Platfor?: string;
    RegionUid?: string;
    SyncPercent?: number;
  };

  type ImageUpdateResp = {
    code?: number;
    msg?: string;
  };

  type Instance = {
    Cpu: number;
    CreatedTime: string;
    DefaultLoginPort: number;
    DefaultLoginUser: string;
    ExpiredTime: string;
    InstanceChargeType: string;
    InstanceId: string;
    InstanceName: string;
    InstanceState: string;
    InstanceType: string;
    Memory: number;
    OsName: string;
    Password: number;
    PrivateIpAddresses: string[];
    PublicIpAddresses: string[];
    RenewFlag: string;
    RestrictState: string;
    Uuid: string;
  };

  type InstanceCreateReq = {
    Cpu?: number;
    CreatedTime?: string;
    DefaultLoginPort?: number;
    DefaultLoginUser?: string;
    ExpiredTime?: string;
    InstanceChargeType?: string;
    InstanceId?: string;
    InstanceName?: string;
    InstanceState?: string;
    InstanceType?: string;
    Memory?: number;
    OsName?: string;
    Password?: number;
    PrivateIpAddresses?: string[];
    PublicIpAddresses?: string[];
    RenewFlag?: string;
    RestrictState?: string;
    Uuid?: string;
  };

  type InstanceCreateResp = {
    code?: number;
    msg?: string;
  };

  type instanceDeleteApiCmdbInstancesByUidParams = {
    uid: string;
  };

  type InstanceDeleteReq = true;

  type InstanceDeleteResp = {
    code?: number;
    msg?: string;
  };

  type InstanceInfo = {
    CloudTagOptionSet: CloudTagOption[];
    Cpu: number;
    CreatedTime: string;
    DataDiskSet: DataDisk[];
    DefaultLoginPort: number;
    DefaultLoginUser: string;
    Description: string;
    ExpiredTime: string;
    Image: ImageOption;
    InstanceChargeType: string;
    InstanceId: string;
    InstanceName: string;
    InstanceState: string;
    InstanceType: string;
    Memory: number;
    OsName: string;
    PrivateIpAddresses: string[];
    PublicIpAddresses: string[];
    RenewFlag: string;
    RestrictState: string;
    SecurityGroupSet: SecurityGroupOption[];
    SubnetWithVpcSet: SubnetWithVpc[];
    SystemDisk: SystemDisk;
    Uid: string;
    Uuid: string;
    Zone: ZoneOption;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type InstanceOption = {
    InstanceId: string;
    InstanceName: string;
    Uid: string;
  };

  type instanceOptionsApiCmdbInstancesOptionsParams = {
    keywords?: string;
  };

  type InstanceOptionsReq = {
    keywords?: string;
  };

  type InstanceOptionsResp = {
    code?: number;
    data?: { list?: InstanceOption[]; total?: number };
    msg?: string;
  };

  type instancePageListApiCmdbInstancesParams = {
    CloudUid?: string;
    RegionUid?: string;
    ZoneUid?: string;
    CloudTagUids?: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type InstancePageListReq = {
    CloudTagUids?: string[];
    CloudUid?: string;
    RegionUid?: string;
    ZoneUid?: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type InstancePageListResp = {
    code?: number;
    data?: { list?: InstanceInfo[]; total?: number };
    msg?: string;
  };

  type instanceReadOneApiCmdbInstancesByUidParams = {
    uid: string;
  };

  type InstanceReadOneReq = true;

  type InstanceReadOneResp = {
    code?: number;
    data?: {
      CloudTagOptionSet?: CloudTagOption[];
      Cpu?: number;
      CreatedTime?: string;
      DataDiskSet?: DataDisk[];
      DefaultLoginPort?: number;
      DefaultLoginUser?: string;
      Description?: string;
      ExpiredTime?: string;
      Image?: ImageOption;
      InstanceChargeType?: string;
      InstanceId?: string;
      InstanceName?: string;
      InstanceState?: string;
      InstanceType?: string;
      Memory?: number;
      OsName?: string;
      PrivateIpAddresses?: string[];
      PublicIpAddresses?: string[];
      RenewFlag?: string;
      RestrictState?: string;
      SecurityGroupSet?: SecurityGroupOption[];
      SubnetWithVpcSet?: SubnetWithVpc[];
      SystemDisk?: SystemDisk;
      Uid?: string;
      Uuid?: string;
      Zone?: ZoneOption;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type InstanceSyncReq = {
    RegionUid?: string;
  };

  type InstanceSyncResp = {
    code?: number;
    msg?: string;
  };

  type InstanceTypeQuotaItem = {
    Cpu: number;
    CpuType: string;
    Description?: string;
    Frequency?: string;
    InstanceBandwidth?: number;
    InstanceChargeType: string;
    InstanceFamily: string;
    InstancePps?: number;
    InstanceType: string;
    Memory: number;
    Remark?: string;
    Status: string;
    TypeName: string;
    Zone: string;
    ZoneUid: string;
  };

  type InstanceTypeQuotaItemCreateReq = {
    Cpu?: number;
    CpuType?: string;
    Description?: string;
    Frequency?: string;
    InstanceBandwidth?: number;
    InstanceChargeType?: string;
    InstanceFamily?: string;
    InstancePps?: number;
    InstanceType?: string;
    Memory?: number;
    Remark?: string;
    Status?: string;
    TypeName?: string;
    Zone?: string;
    ZoneUid?: string;
  };

  type InstanceTypeQuotaItemCreateResp = {
    code?: number;
    msg?: string;
  };

  type instanceTypeQuotaItemDeleteApiCmdbInstypesByUidParams = {
    uid: string;
  };

  type InstanceTypeQuotaItemDeleteReq = true;

  type InstanceTypeQuotaItemDeleteResp = {
    code?: number;
    msg?: string;
  };

  type InstanceTypeQuotaItemInfo = {
    Cpu: number;
    CpuType: string;
    Description?: string;
    Frequency?: string;
    InstanceBandwidth?: number;
    InstanceChargeType: string;
    InstanceFamily: string;
    InstancePps?: number;
    InstanceType: string;
    Memory: number;
    Remark?: string;
    Status: string;
    TypeName: string;
    Uid: string;
    Zone: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type InstanceTypeQuotaItemOption = {
    Cpu: number;
    InstanceType: string;
    Memory: number;
    Status: string;
    TypeName: string;
    Uid: string;
  };

  type instanceTypeQuotaItemOptionsApiCmdbInstypesOptionsParams = {
    ZoneUid: string;
    keywords?: string;
  };

  type InstanceTypeQuotaItemOptionsReq = {
    ZoneUid: string;
    keywords?: string;
  };

  type InstanceTypeQuotaItemOptionsResp = {
    code?: number;
    data?: { list?: InstanceTypeQuotaItemOption[]; total?: number };
    msg?: string;
  };

  type instanceTypeQuotaItemPageListApiCmdbInstypesParams = {
    ZoneUid: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type InstanceTypeQuotaItemPageListReq = {
    ZoneUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type InstanceTypeQuotaItemPageListResp = {
    code?: number;
    data?: { list?: InstanceTypeQuotaItemInfo[]; total?: number };
    msg?: string;
  };

  type instanceTypeQuotaItemReadOneApiCmdbInstypesByUidParams = {
    uid: string;
  };

  type InstanceTypeQuotaItemReadOneReq = true;

  type InstanceTypeQuotaItemReadOneResp = {
    code?: number;
    data?: {
      Cpu?: number;
      CpuType?: string;
      Description?: string;
      Frequency?: string;
      InstanceBandwidth?: number;
      InstanceChargeType?: string;
      InstanceFamily?: string;
      InstancePps?: number;
      InstanceType?: string;
      Memory?: number;
      Remark?: string;
      Status?: string;
      TypeName?: string;
      Uid?: string;
      Zone?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type instanceTypeQuotaItemUpdateApiCmdbInstypesByUidParams = {
    uid: string;
  };

  type InstanceTypeQuotaItemUpdateReq = {
    Cpu?: number;
    CpuType?: string;
    Description?: string;
    Frequency?: string;
    InstanceBandwidth?: number;
    InstanceChargeType?: string;
    InstanceFamily?: string;
    InstancePps?: number;
    InstanceType?: string;
    Memory?: number;
    Remark?: string;
    Status?: string;
    TypeName?: string;
    Zone?: string;
    ZoneUid?: string;
  };

  type InstanceTypeQuotaItemUpdateResp = {
    code?: number;
    msg?: string;
  };

  type instanceUpdateApiCmdbInstancesByUidParams = {
    uid: string;
  };

  type InstanceUpdateReq = {
    Cpu?: number;
    CreatedTime?: string;
    DefaultLoginPort?: number;
    DefaultLoginUser?: string;
    ExpiredTime?: string;
    InstanceChargeType?: string;
    InstanceId?: string;
    InstanceName?: string;
    InstanceState?: string;
    InstanceType?: string;
    Memory?: number;
    OsName?: string;
    Password?: number;
    PrivateIpAddresses?: string[];
    PublicIpAddresses?: string[];
    RenewFlag?: string;
    RestrictState?: string;
    Uuid?: string;
  };

  type InstanceUpdateResp = {
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
    Email?: string;
    Enabled: boolean;
    Mobile?: string;
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
    Email?: string;
    Enabled: boolean;
    Mobile?: string;
    PersonId: string;
    PersonName: string;
    Professions?: ProfessionOption[];
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
      Professions?: ProfessionOption[];
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

  type PlaceCloud = {
    Cloud: string;
    Count: number;
    RegionSet: PlaceRegion[];
    ResourceGroup: string;
    Uid: string;
  };

  type PlaceRegion = {
    Count: number;
    Region: string;
    RegionName: string;
    Uid: string;
    ZoneSet: PlaceZone[];
  };

  type PlaceZone = {
    Count: number;
    Uid: string;
    Zone: string;
    ZoneName: string;
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
    Project: string;
    ProjectName: string;
    ProjectState?: string;
  };

  type ProjectCreateReq = {
    CusId?: string;
    EnvUid?: string;
    Project?: string;
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
    Project: string;
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
    Project: string;
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
      Project?: string;
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
    Project?: string;
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
    Description?: string;
    Region: string;
    RegionName: string;
    RegionState?: string;
  };

  type RegionCreateReq = {
    CloudUid?: string;
    Description?: string;
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
    Description?: string;
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
      Description?: string;
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

  type regionUpdateApiCmdbRegionsByUidParams = {
    uid: string;
  };

  type RegionUpdateReq = {
    CloudUid?: string;
    Description?: string;
    Region?: string;
    RegionName?: string;
    RegionState?: string;
  };

  type RegionUpdateResp = {
    code?: number;
    msg?: string;
  };

  type SecurityGroup = {
    CloudTagIds?: string[];
    Description?: string;
    IsDefault: boolean;
    RegionUid: string;
    SecurityGroupDesc: string;
    SecurityGroupId: string;
    SecurityGroupName: string;
  };

  type SecurityGroupCreateReq = {
    CloudTagIds?: string[];
    Description?: string;
    IsDefault?: boolean;
    RegionUid?: string;
    SecurityGroupDesc?: string;
    SecurityGroupId?: string;
    SecurityGroupName?: string;
  };

  type SecurityGroupCreateResp = {
    code?: number;
    msg?: string;
  };

  type securitygroupDeleteApiCmdbSecuritygroupsByUidParams = {
    uid: string;
  };

  type SecurityGroupDeleteReq = true;

  type SecurityGroupDeleteResp = {
    code?: number;
    msg?: string;
  };

  type SecurityGroupInfo = {
    Description?: string;
    IsDefault: boolean;
    SecurityGroupDesc: string;
    SecurityGroupId: string;
    SecurityGroupName: string;
    Uid: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type SecurityGroupOption = {
    SecurityGroupId: string;
    SecurityGroupName: string;
    Uid: string;
  };

  type securitygroupOptionsApiCmdbSecuritygroupsOptionsParams = {
    RegionUid: string;
    keywords?: string;
  };

  type SecurityGroupOptionsReq = {
    RegionUid: string;
    keywords?: string;
  };

  type SecurityGroupOptionsResp = {
    code?: number;
    data?: { list?: SecurityGroupOption[]; total?: number };
    msg?: string;
  };

  type securitygroupPageListApiCmdbSecuritygroupsParams = {
    RegionUid: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type SecurityGroupPageListReq = {
    RegionUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type SecurityGroupPageListResp = {
    code?: number;
    data?: { list?: SecurityGroupInfo[]; total?: number };
    msg?: string;
  };

  type securitygroupReadOneApiCmdbSecuritygroupsByUidParams = {
    uid: string;
  };

  type SecurityGroupReadOneReq = true;

  type SecurityGroupReadOneResp = {
    code?: number;
    data?: {
      Description?: string;
      IsDefault?: boolean;
      SecurityGroupDesc?: string;
      SecurityGroupId?: string;
      SecurityGroupName?: string;
      Uid?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type securitygroupUpdateApiCmdbSecuritygroupsByUidParams = {
    uid: string;
  };

  type SecurityGroupUpdateReq = {
    CloudTagIds?: string[];
    Description?: string;
    IsDefault?: boolean;
    RegionUid?: string;
    SecurityGroupDesc?: string;
    SecurityGroupId?: string;
    SecurityGroupName?: string;
  };

  type SecurityGroupUpdateResp = {
    code?: number;
    msg?: string;
  };

  type Subnet = {
    AvailableIpAddressCount: number;
    CidrBlock: string;
    CloudTagIds?: string[];
    Description?: string;
    Ipv6CidrBlock: string;
    IsDefault: boolean;
    IsRemoteVpcSnat: boolean;
    RouteTableId: number;
    SubnetId: string;
    SubnetName: string;
    TotalIpAddressCount: number;
    VpcId: string;
    VpcUid: string;
    Zone: number;
    ZoneUid: string;
  };

  type SubnetCreateReq = {
    AvailableIpAddressCount?: number;
    CidrBlock?: string;
    CloudTagIds?: string[];
    Description?: string;
    Ipv6CidrBlock?: string;
    IsDefault?: boolean;
    IsRemoteVpcSnat?: boolean;
    RouteTableId?: number;
    SubnetId?: string;
    SubnetName?: string;
    TotalIpAddressCount?: number;
    VpcId?: string;
    VpcUid?: string;
    Zone?: number;
    ZoneUid?: string;
  };

  type SubnetCreateResp = {
    code?: number;
    msg?: string;
  };

  type subnetDeleteApiCmdbSubnetsByUidParams = {
    uid: string;
  };

  type SubnetDeleteReq = true;

  type SubnetDeleteResp = {
    code?: number;
    msg?: string;
  };

  type SubnetInfo = {
    AvailableIpAddressCount: number;
    CidrBlock: string;
    Description?: string;
    Ipv6CidrBlock: string;
    IsDefault: boolean;
    IsRemoteVpcSnat: boolean;
    RouteTableId: number;
    SubnetId: string;
    SubnetName: string;
    TotalIpAddressCount: number;
    Uid: string;
    VpcId: string;
    Zone: number;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type SubnetOption = {
    SubnetId: string;
    SubnetName: string;
    Uid: string;
  };

  type subnetOptionsApiCmdbSubnetsOptionsParams = {
    VpcUid: string;
    keywords?: string;
  };

  type SubnetOptionsReq = {
    VpcUid: string;
    keywords?: string;
  };

  type SubnetOptionsResp = {
    code?: number;
    data?: { list?: SubnetOption[]; total?: number };
    msg?: string;
  };

  type subnetPageListApiCmdbSubnetsParams = {
    VpcUid: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type SubnetPageListReq = {
    VpcUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type SubnetPageListResp = {
    code?: number;
    data?: { list?: SubnetInfo[]; total?: number };
    msg?: string;
  };

  type subnetReadOneApiCmdbSubnetsByUidParams = {
    uid: string;
  };

  type SubnetReadOneReq = true;

  type SubnetReadOneResp = {
    code?: number;
    data?: {
      AvailableIpAddressCount?: number;
      CidrBlock?: string;
      Description?: string;
      Ipv6CidrBlock?: string;
      IsDefault?: boolean;
      IsRemoteVpcSnat?: boolean;
      RouteTableId?: number;
      SubnetId?: string;
      SubnetName?: string;
      TotalIpAddressCount?: number;
      Uid?: string;
      VpcId?: string;
      Zone?: number;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type subnetUpdateApiCmdbSubnetsByUidParams = {
    uid: string;
  };

  type SubnetUpdateReq = {
    AvailableIpAddressCount?: number;
    CidrBlock?: string;
    CloudTagIds?: string[];
    Description?: string;
    Ipv6CidrBlock?: string;
    IsDefault?: boolean;
    IsRemoteVpcSnat?: boolean;
    RouteTableId?: number;
    SubnetId?: string;
    SubnetName?: string;
    TotalIpAddressCount?: number;
    VpcId?: string;
    VpcUid?: string;
    Zone?: number;
    ZoneUid?: string;
  };

  type SubnetUpdateResp = {
    code?: number;
    msg?: string;
  };

  type SubnetWithVpc = {
    SubnetId: string;
    SubnetName: string;
    Uid: string;
    Vpc: Vpc;
  };

  type SystemDisk = {
    DiskId: string;
    DiskSize: number;
    DiskType: string;
    Uid: string;
  };

  type Vpc = {
    CidrBlock: string;
    CloudTagIds?: string[];
    Description?: string;
    DnsServerSet: string[];
    IsDefault: boolean;
    RegionUid: string;
    VpcId: string;
    VpcName: string;
  };

  type VpcCreateReq = {
    CidrBlock?: string;
    CloudTagIds?: string[];
    Description?: string;
    DnsServerSet?: string[];
    IsDefault?: boolean;
    RegionUid?: string;
    VpcId?: string;
    VpcName?: string;
  };

  type VpcCreateResp = {
    code?: number;
    msg?: string;
  };

  type vpcDeleteApiCmdbVpcsByUidParams = {
    uid: string;
  };

  type VpcDeleteReq = true;

  type VpcDeleteResp = {
    code?: number;
    msg?: string;
  };

  type VpcInfo = {
    CidrBlock: string;
    Description?: string;
    DnsServerSet: string[];
    IsDefault: boolean;
    Uid: string;
    VpcId: string;
    VpcName: string;
    createAt: string;
    createBy: string;
    updateAt: string;
    updateBy: string;
  };

  type VpcOption = {
    IsDefault: boolean;
    Uid: string;
    VpcId: string;
    VpcName: string;
  };

  type vpcOptionsApiCmdbVpcsOptionsParams = {
    RegionUid: string;
    keywords?: string;
  };

  type VpcOptionsReq = {
    RegionUid: string;
    keywords?: string;
  };

  type VpcOptionsResp = {
    code?: number;
    data?: { list?: VpcOption[]; total?: number };
    msg?: string;
  };

  type vpcPageListApiCmdbVpcsParams = {
    RegionUid: string;
    current?: number;
    pageSize?: number;
    keywords?: string;
    orderBy?: string;
  };

  type VpcPageListReq = {
    RegionUid: string;
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type VpcPageListResp = {
    code?: number;
    data?: { list?: VpcInfo[]; total?: number };
    msg?: string;
  };

  type vpcReadOneApiCmdbVpcsByUidParams = {
    uid: string;
  };

  type VpcReadOneReq = true;

  type VpcReadOneResp = {
    code?: number;
    data?: {
      CidrBlock?: string;
      Description?: string;
      DnsServerSet?: string[];
      IsDefault?: boolean;
      Uid?: string;
      VpcId?: string;
      VpcName?: string;
      createAt?: string;
      createBy?: string;
      updateAt?: string;
      updateBy?: string;
    };
    msg?: string;
  };

  type vpcUpdateApiCmdbVpcsByUidParams = {
    uid: string;
  };

  type VpcUpdateReq = {
    CidrBlock?: string;
    CloudTagIds?: string[];
    Description?: string;
    DnsServerSet?: string[];
    IsDefault?: boolean;
    RegionUid?: string;
    VpcId?: string;
    VpcName?: string;
  };

  type VpcUpdateResp = {
    code?: number;
    msg?: string;
  };

  type Zone = {
    Description?: string;
    RegionUid: string;
    Zone: string;
    ZoneName: string;
    ZoneState?: string;
  };

  type ZoneCreateReq = {
    Description?: string;
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
    Description?: string;
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
      Description?: string;
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
    Description?: string;
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
