declare namespace CMDB {
  type App = {
    AnsibleId?: number
    App: string
    AppType: string
    Description?: string
    Enabled: boolean
    JumpPath?: string
    Version: string
  }

  type AppCreateReq = {
    AnsibleId?: number
    App?: string
    AppType?: string
    Description?: string
    Enabled?: boolean
    JumpPath?: string
    Version?: string
  }

  type AppCreateResp = {
    code?: number
    msg?: string
  }

  type appDeleteApiCmdbAppsByUidParams = {
    uid: string
  }

  type AppDeleteReq = true

  type AppDeleteResp = {
    code?: number
    msg?: string
  }

  type AppInfo = {
    AnsibleId?: number
    App: string
    AppType: string
    Description?: string
    Enabled: boolean
    JumpPath?: string
    Uid: string
    Version: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type AppOption = {
    App: string
    JumpPath: string
    Uid: string
    Version: string
  }

  type appOptionsApiCmdbAppsOptionsParams = {
    keywords?: string
  }

  type AppOptionsReq = {
    keywords?: string
  }

  type AppOptionsResp = {
    code?: number
    data?: { list?: AppOption[]; total?: number }
    msg?: string
  }

  type appPageListApiCmdbAppsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type AppPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type AppPageListResp = {
    code?: number
    data?: { list?: AppInfo[]; total?: number }
    msg?: string
  }

  type appReadOneApiCmdbAppsByUidParams = {
    uid: string
  }

  type AppReadOneReq = true

  type AppReadOneResp = {
    code?: number
    data?: {
      AnsibleId?: number
      App?: string
      AppType?: string
      Description?: string
      Enabled?: boolean
      JumpPath?: string
      Uid?: string
      Version?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type AppT = {
    AppT: string
    AppTName: string
    Description: string
    EnvT: string
    HostTs: string[]
    Uid: string
  }

  type AppTAddReq = {
    AppT?: string
    AppTName?: string
    Description?: string
    EnvTUid: string
  }

  type AppTAddResp = {
    code?: number
    msg?: string
  }

  type appTDeleteApiCmdbApptsByUidParams = {
    uid: string
  }

  type AppTDelReq = true

  type AppTDelResp = {
    code?: number
    msg?: string
  }

  type appTEditApiCmdbApptsByUidParams = {
    uid: string
  }

  type AppTEditReq = {
    AppT?: string
    AppTName?: string
    Description?: string
    EnvTUid?: string
  }

  type AppTEditResp = {
    code?: number
    msg?: string
  }

  type AppTInfo = {
    AppT?: string
    AppTName?: string
    Description?: string
    uid: string
  }

  type AppTInfoReq = true

  type AppTInfoResp = {
    code?: number
    data?: { data?: AppTInfo }
    msg?: string
  }

  type AppTList = {
    list: AppTInfo[]
    total: number
  }

  type appTListApiCmdbApptsListParams = {
    keywords?: string
    EnvTUid: string
  }

  type AppTListReq = {
    EnvTUid: string
    keywords?: string
  }

  type AppTListResp = {
    code?: number
    data?: { data?: AppTList }
    msg?: string
  }

  type AppTPageList = {
    list: AppTInfo[]
    total: number
  }

  type appTPageListApiCmdbApptsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
    EnvTUid: string
  }

  type AppTPageListReq = {
    EnvTUid: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type AppTPageListResp = {
    code?: number
    data?: { data?: AppTPageList }
    msg?: string
  }

  type appUpdateApiCmdbAppsByUidParams = {
    uid: string
  }

  type AppUpdateReq = {
    AnsibleId?: number
    App?: string
    AppType?: string
    Description?: string
    Enabled?: boolean
    JumpPath?: string
    Version?: string
  }

  type AppUpdateResp = {
    code?: number
    msg?: string
  }

  type BaseAppT = {
    AppT: string
    AppTName: string
    Description?: string
  }

  type BaseEnvT = {
    Description?: string
    EnvT: string
    EnvTName: string
  }

  type City = {
    CityId: string
    CityName: string
    CityNameCn: string
    CountryUid: string
    Description?: string
  }

  type CityCreateReq = {
    CityId?: string
    CityName?: string
    CityNameCn?: string
    CountryUid?: string
    Description?: string
  }

  type CityCreateResp = {
    code?: number
    msg?: string
  }

  type cityDeleteApiCmdbCitysByUidParams = {
    uid: string
  }

  type CityDeleteReq = true

  type CityDeleteResp = {
    code?: number
    msg?: string
  }

  type CityInfo = {
    CityId: string
    CityName: string
    CityNameCn: string
    Country: CountryInfo
    Description?: string
    Regions: RegionInfo[]
    Uid: string
    instanceNum: number
  }

  type CityOption = {
    CityId: string
    CityName: string
    CityNameCn: string
    Uid: string
  }

  type cityOptionsApiCmdbCitysOptionsParams = {
    CountryUid: string
    keywords?: string
  }

  type CityOptionsReq = {
    CountryUid: string
    keywords?: string
  }

  type CityOptionsResp = {
    code?: number
    data?: { list?: CityOption[]; total?: number }
    msg?: string
  }

  type cityPageListApiCmdbCitysParams = {
    CityUid?: string
    CountryUid?: string
    ContinentUid?: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type CityPageListReq = {
    CityUid?: string
    ContinentUid?: string
    CountryUid?: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type CityPageListResp = {
    code?: number
    data?: { list?: CityInfo[]; total?: number }
    msg?: string
  }

  type cityReadOneApiCmdbCitysByUidParams = {
    uid: string
  }

  type CityReadOneReq = true

  type CityReadOneResp = {
    code?: number
    data?: {
      CityId?: string
      CityName?: string
      CityNameCn?: string
      Country?: CountryInfo
      Description?: string
      Regions?: RegionInfo[]
      Uid?: string
      instanceNum?: number
    }
    msg?: string
  }

  type cityUpdateApiCmdbCitysByUidParams = {
    uid: string
  }

  type CityUpdateReq = {
    CityId?: string
    CityName?: string
    CityNameCn?: string
    CountryUid?: string
    Description?: string
  }

  type CityUpdateResp = {
    code?: number
    msg?: string
  }

  type CityUploadReq = true

  type CityUploadResp = {
    code?: number
    data?: { ok?: number }
    msg?: string
  }

  type Cloud = {
    Account?: string
    ApiDomain?: string
    Cloud: string
    CloudName: string
    Description?: string
    ResourceGroup: string
    SecretId?: string
    SecretKey?: string
    SupportApi?: boolean
    Website?: string
    Weight: number
  }

  type CloudCreateReq = {
    Account?: string
    ApiDomain?: string
    Cloud?: string
    CloudName?: string
    Description?: string
    ResourceGroup?: string
    SecretId?: string
    SecretKey?: string
    SupportApi?: boolean
    Website?: string
    Weight?: number
  }

  type CloudCreateResp = {
    code?: number
    msg?: string
  }

  type cloudDeleteApiCmdbCloudsByUidParams = {
    uid: string
  }

  type CloudDeleteReq = true

  type CloudDeleteResp = {
    code?: number
    msg?: string
  }

  type CloudInfo = {
    Account?: string
    ApiDomain: string
    Cloud: string
    CloudName: string
    Description: string
    ResourceGroup: string
    SecretId: string
    SecretKey: string
    SupportApi: boolean
    Uid: string
    Website: string
    Weight: number
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type CloudOption = {
    Cloud: string
    CloudName: string
    ResourceGroup: string
    SupportApi: boolean
    Uid: string
  }

  type cloudOptionsApiCmdbCloudsOptionsParams = {
    keywords?: string
  }

  type CloudOptionsReq = {
    keywords?: string
  }

  type CloudOptionsResp = {
    code?: number
    data?: { list?: CloudOption[]; total?: number }
    msg?: string
  }

  type cloudPageListApiCmdbCloudsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type CloudPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type CloudPageListResp = {
    code?: number
    data?: { list?: CloudInfo[]; total?: number }
    msg?: string
  }

  type cloudPlacementApiCmdbCloudsPlacesParams = {
    keywords?: string
  }

  type CloudPlacementReq = {
    keywords?: string
  }

  type CloudPlacementResp = {
    code?: number
    data?: { Tree?: PlaceCloud[] }
    msg?: string
  }

  type cloudReadOneApiCmdbCloudsByUidParams = {
    uid: string
  }

  type CloudReadOneReq = true

  type CloudReadOneResp = {
    code?: number
    data?: {
      Account?: string
      ApiDomain?: string
      Cloud?: string
      CloudName?: string
      Description?: string
      ResourceGroup?: string
      SecretId?: string
      SecretKey?: string
      SupportApi?: boolean
      Uid?: string
      Website?: string
      Weight?: number
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type CloudSyncAllReq = {
    CloudUids?: string[]
  }

  type CloudSyncAllResp = {
    code?: number
    msg?: string
  }

  type CloudSyncReq = {
    CloudUid: string
    RegionUid?: string
    target: number
  }

  type CloudSyncResp = {
    code?: number
    msg?: string
  }

  type CloudTag = {
    Description?: string
    Key: string
    Value: string
  }

  type CloudTagCreateReq = {
    Description?: string
    Key?: string
    Value?: string
  }

  type CloudTagCreateResp = {
    code?: number
    msg?: string
  }

  type cloudTagDeleteApiCmdbCloudtagsByUidParams = {
    uid: string
  }

  type CloudTagDeleteReq = true

  type CloudTagDeleteResp = {
    code?: number
    msg?: string
  }

  type CloudTagInfo = {
    Description?: string
    Key: string
    Uid: string
    Value: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type CloudTagOption = {
    Key: string
    Uid: string
    Value: string
  }

  type cloudTagOptionsApiCmdbCloudtagsOptionsParams = {
    CloudUid: string
    keywords?: string
  }

  type CloudTagOptionsReq = {
    CloudUid: string
    keywords?: string
  }

  type CloudTagOptionsResp = {
    code?: number
    data?: { list?: CloudTagOption[]; total?: number }
    msg?: string
  }

  type cloudTagPageListApiCmdbCloudtagsParams = {
    CloudUid: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type CloudTagPageListReq = {
    CloudUid: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type CloudTagPageListResp = {
    code?: number
    data?: { list?: CloudTagInfo[]; total?: number }
    msg?: string
  }

  type cloudTagReadOneApiCmdbCloudtagsByUidParams = {
    uid: string
  }

  type CloudTagReadOneReq = true

  type CloudTagReadOneResp = {
    code?: number
    data?: {
      Description?: string
      Key?: string
      Uid?: string
      Value?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type cloudTagUpdateApiCmdbCloudtagsByUidParams = {
    uid: string
  }

  type CloudTagUpdateReq = {
    Description?: string
    Key?: string
    Value?: string
  }

  type CloudTagUpdateResp = {
    code?: number
    msg?: string
  }

  type cloudUpdateApiCmdbCloudsByUidParams = {
    uid: string
  }

  type CloudUpdateReq = {
    Account?: string
    ApiDomain?: string
    Cloud?: string
    CloudName?: string
    Description?: string
    ResourceGroup?: string
    SecretId?: string
    SecretKey?: string
    SupportApi?: boolean
    Website?: string
    Weight?: number
  }

  type CloudUpdateResp = {
    code?: number
    msg?: string
  }

  type CloudUploadReq = true

  type CloudUploadResp = {
    code?: number
    data?: { ok?: number }
    msg?: string
  }

  type CloudUseableCloud = {
    Cloud: string
    CloudName: string
    RegionSet: CloudUseableRegion[]
    SupportApi: boolean
    Uid: string
  }

  type CloudUseableRegion = {
    Region: string
    RegionName: string
    Uid: string
    ZoneSet: CloudUseableZone[]
  }

  type cloudUseablesApiCmdbCloudsUsablesParams = {
    ResourceGroup?: string
    City?: string
  }

  type CloudUseablesReq = {
    City?: string
    ResourceGroup?: string
  }

  type CloudUseablesResp = {
    code?: number
    data?: { Tree?: CloudUseableCloud[] }
    msg?: string
  }

  type CloudUseableZone = {
    Uid: string
    Zone: string
    ZoneName: string
  }

  type Continent = {
    ContinentId: string
    ContinentNameCn?: string
    Description?: string
  }

  type ContinentCreateReq = {
    ContinentId?: string
    ContinentNameCn?: string
    Description?: string
  }

  type ContinentCreateResp = {
    code?: number
    msg?: string
  }

  type continentDeleteApiCmdbContinentsByUidParams = {
    uid: string
  }

  type ContinentDeleteReq = true

  type ContinentDeleteResp = {
    code?: number
    msg?: string
  }

  type ContinentInfo = {
    ContinentId: string
    ContinentNameCn: string
    Description?: string
    Uid: string
  }

  type ContinentOption = {
    ContinentId: string
    ContinentNameCn: string
    Uid: string
  }

  type continentOptionsApiCmdbContinentsOptionsParams = {
    keywords?: string
  }

  type ContinentOptionsReq = {
    keywords?: string
  }

  type ContinentOptionsResp = {
    code?: number
    data?: { list?: ContinentOption[]; total?: number }
    msg?: string
  }

  type continentPageListApiCmdbContinentsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type ContinentPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type ContinentPageListResp = {
    code?: number
    data?: { list?: ContinentInfo[]; total?: number }
    msg?: string
  }

  type continentPlacementApiCmdbContinentsPlacesParams = {
    keywords?: string
  }

  type ContinentPlacementReq = {
    keywords?: string
  }

  type ContinentPlacementResp = {
    code?: number
    data?: { Tree?: PlaceContinent[]; total?: number }
    msg?: string
  }

  type continentPlacementThreeApiCmdbContinentsPlacesthreeParams = {
    keywords?: string
  }

  type ContinentPlacementThreeReq = {
    keywords?: string
  }

  type ContinentPlacementThreeResp = {
    code?: number
    data?: { Tree?: PlaceContinentThree[]; total?: number }
    msg?: string
  }

  type continentReadOneApiCmdbContinentsByUidParams = {
    uid: string
  }

  type ContinentReadOneReq = true

  type ContinentReadOneResp = {
    code?: number
    data?: {
      ContinentId?: string
      ContinentNameCn?: string
      Description?: string
      Uid?: string
    }
    msg?: string
  }

  type continentUpdateApiCmdbContinentsByUidParams = {
    uid: string
  }

  type ContinentUpdateReq = {
    ContinentId?: string
    ContinentNameCn?: string
    Description?: string
  }

  type ContinentUpdateResp = {
    code?: number
    msg?: string
  }

  type ContinentUploadReq = true

  type ContinentUploadResp = {
    code?: number
    data?: { ok?: number }
    msg?: string
  }

  type Country = {
    ContinentUid: string
    CountryId: string
    CountryNameCn: string
    Description?: string
  }

  type CountryCreateReq = {
    ContinentUid?: string
    CountryId?: string
    CountryNameCn?: string
    Description?: string
  }

  type CountryCreateResp = {
    code?: number
    msg?: string
  }

  type countryDeleteApiCmdbCountrysByUidParams = {
    uid: string
  }

  type CountryDeleteReq = true

  type CountryDeleteResp = {
    code?: number
    msg?: string
  }

  type CountryInfo = {
    Continent: ContinentInfo
    CountryId: string
    CountryNameCn: string
    Description?: string
    Uid: string
  }

  type CountryOption = {
    CountryId: string
    CountryNameCn: string
    Uid: string
  }

  type countryOptionsApiCmdbCountrysOptionsParams = {
    ContinentUid: string
    keywords?: string
  }

  type CountryOptionsReq = {
    ContinentUid: string
    keywords?: string
  }

  type CountryOptionsResp = {
    code?: number
    data?: { list?: CountryOption[]; total?: number }
    msg?: string
  }

  type countryPageListApiCmdbCountrysParams = {
    ContinentUid: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type CountryPageListReq = {
    ContinentUid: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type CountryPageListResp = {
    code?: number
    data?: { list?: CountryInfo[]; total?: number }
    msg?: string
  }

  type countryReadOneApiCmdbCountrysByUidParams = {
    uid: string
  }

  type CountryReadOneReq = true

  type CountryReadOneResp = {
    code?: number
    data?: {
      Continent?: ContinentInfo
      CountryId?: string
      CountryNameCn?: string
      Description?: string
      Uid?: string
    }
    msg?: string
  }

  type countryUpdateApiCmdbCountrysByUidParams = {
    uid: string
  }

  type CountryUpdateReq = {
    ContinentUid?: string
    CountryId?: string
    CountryNameCn?: string
    Description?: string
  }

  type CountryUpdateResp = {
    code?: number
    msg?: string
  }

  type CountryUploadReq = true

  type CountryUploadResp = {
    code?: number
    data?: { ok?: number }
    msg?: string
  }

  type Disk = {
    DiskId?: string
    DiskSize: number
    DiskType: string
    uid?: string
  }

  type DiskT = {
    DiskSize: number
    DiskType: string
    Uid: string
  }

  type Env = {
    ApiDomainName?: string
    CmnDomainUrl?: string
    CmnVip?: string
    CsdpDomainUrl?: string
    CsdpVip?: string
    CustomerId?: string
    Description?: string
    DomainName?: string
    DomainsetVersionIds?: number[]
    EnvId: string
    EnvKey: string
    EnvLanguage?: string
    EnvName: string
    EnvType?: string
    IpsetVersionIds?: number[]
    JumpAddress?: string
    Locker?: string
    MonitorBasicAuthPass?: string
    MonitorBasicAuthUser?: string
    MonitorWriteUrl?: string
    NoticeGroups?: string[]
    OsType?: string
    OsmDomainUrl?: string
    OsmVip?: string
    Owners?: string[]
    Pipline?: string
    PiplineState?: string
    SecretId?: string
    SecretKey?: string
    State?: string
  }

  type EnvCreateReq = {
    ApiDomainName?: string
    CmnDomainUrl?: string
    CmnVip?: string
    CsdpDomainUrl?: string
    CsdpVip?: string
    CustomerId?: string
    Description?: string
    DomainName?: string
    DomainsetVersionIds?: number[]
    EnvId?: string
    EnvKey?: string
    EnvLanguage?: string
    EnvName?: string
    EnvType?: string
    IpsetVersionIds?: number[]
    JumpAddress?: string
    Locker?: string
    MonitorBasicAuthPass?: string
    MonitorBasicAuthUser?: string
    MonitorWriteUrl?: string
    NoticeGroups?: string[]
    OpsIds?: number[]
    OsType?: string
    OsmDomainUrl?: string
    OsmVip?: string
    Owners?: string[]
    Pipline?: string
    PiplineState?: string
    QaIds?: number[]
    SaleIds?: number[]
    SecretId?: string
    SecretKey?: string
    State?: string
    SupportIds?: number[]
  }

  type EnvCreateResp = {
    code?: number
    msg?: string
  }

  type envDeleteApiCmdbEnvsByUidParams = {
    uid: string
  }

  type EnvDeleteReq = true

  type EnvDeleteResp = {
    code?: number
    msg?: string
  }

  type EnvHostTypeReq = {
    keywords?: string
  }

  type EnvHostTypeResp = {
    code?: number
    data?: { Tree?: EnvHostTypeSet[]; total?: number }
    msg?: string
  }

  type EnvHostTypeSet = {
    Count: number
    EnvId: string
    EnvName: string
    HostTypeSet: HostTypeSet[]
    Uid: string
  }

  type envHostTypeTreeApiCmdbHostsEnvhosttypeParams = {
    keywords?: string
  }

  type EnvInfo = {
    ApiDomainName?: string
    CmnDomainUrl?: string
    CmnVip?: string
    CsdpDomainUrl?: string
    CsdpVip?: string
    CustomerId?: string
    Description?: string
    DomainName?: string
    DomainsetVersionIds?: number[]
    EnvId?: string
    EnvKey?: string
    EnvLanguage?: string
    EnvName?: string
    EnvType?: string
    IpsetVersionIds?: number[]
    JumpAddress?: string
    Locker?: string
    MonitorBasicAuthPass?: string
    MonitorBasicAuthUser?: string
    MonitorWriteUrl?: string
    NoticeGroups?: string[]
    Ops?: UserInfo[]
    OsType?: string
    OsmDomainUrl?: string
    OsmVip?: string
    Owners?: string[]
    Package?: PackageInfo[]
    Pipline?: string
    PiplineState?: string
    Qa?: UserInfo[]
    Sale?: UserInfo[]
    SecretId?: string
    SecretKey?: string
    State?: string
    Support?: UserInfo[]
    Uid: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type EnvListReq = true

  type EnvListResp = {
    code?: number
    data?: { list?: EnvInfo[]; total?: number }
    msg?: string
  }

  type EnvLockReq = {
    Lock: boolean
    Uname?: string
    uid: string
  }

  type EnvLockResp = {
    code?: number
    msg?: string
  }

  type EnvOption = {
    ApiDomainName: string
    DomainName: string
    EnvId: string
    EnvKey: string
    EnvName: string
    Owners: string[]
    Pipline: string
    PiplineState: string
    Uid: string
  }

  type envOptionsApiCmdbEnvsOptionsParams = {
    keywords?: string
  }

  type EnvOptionsReq = {
    keywords?: string
  }

  type EnvOptionsResp = {
    code?: number
    data?: { list?: EnvOption[]; total?: number }
    msg?: string
  }

  type EnvOwnerReq = {
    Owners: string[]
    uid: string
  }

  type EnvOwnerResp = {
    code?: number
    msg?: string
  }

  type envPageListApiCmdbEnvsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
    ByOwner?: boolean
  }

  type EnvPageListReq = {
    ByOwner?: boolean
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type EnvPageListResp = {
    code?: number
    data?: { list?: EnvInfo[]; total?: number }
    msg?: string
  }

  type EnvPiplineReq = {
    Pipline: string
    uid: string
  }

  type EnvPiplineResp = {
    code?: number
    msg?: string
  }

  type EnvPiplineStateReq = {
    PiplineState: string
    uid: string
  }

  type EnvPiplineStateResp = {
    code?: number
    msg?: string
  }

  type envReadOneApiCmdbEnvsByUidParams = {
    uid: string
  }

  type EnvReadOneReq = true

  type EnvReadOneResp = {
    code?: number
    data?: {
      Ops?: UserInfo[]
      Package?: PackageInfo[]
      Qa?: UserInfo[]
      Sale?: UserInfo[]
      Support?: UserInfo[]
      Uid?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type EnvSet = {
    Count: number
    EnvId: string
    EnvName: string
    Uid: string
  }

  type EnvT = {
    Description: string
    EnvT: string
    EnvTName: string
    Uid: string
  }

  type EnvTAddReq = {
    Description?: string
    EnvT?: string
    EnvTName?: string
  }

  type EnvTAddResp = {
    code?: number
    msg?: string
  }

  type envTDeleteApiCmdbEnvtsByUidParams = {
    uid: string
  }

  type EnvTDelReq = true

  type EnvTDelResp = {
    code?: number
    msg?: string
  }

  type envTEditApiCmdbEnvtsByUidParams = {
    uid: string
  }

  type EnvTEditReq = {
    Description?: string
    EnvT?: string
    EnvTName?: string
  }

  type EnvTEditResp = {
    code?: number
    msg?: string
  }

  type EnvTInfo = {
    Description?: string
    EnvT?: string
    EnvTName?: string
    Uid: string
  }

  type envTInfoApiCmdbEnvtsByUidParams = {
    uid: string
  }

  type EnvTInfoReq = true

  type EnvTInfoResp = {
    code?: number
    data?: { data?: EnvTInfo }
    msg?: string
  }

  type EnvTList = {
    list: EnvTInfo[]
    total: number
  }

  type envTListApiCmdbEnvtsListParams = {
    keywords?: string
  }

  type EnvTListReq = {
    keywords?: string
  }

  type EnvTListResp = {
    code?: number
    data?: { data?: EnvTList }
    msg?: string
  }

  type EnvTPageList = {
    list: EnvTInfo[]
    total: number
  }

  type envTPageListApiCmdbEnvtsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type EnvTPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type EnvTPageListResp = {
    code?: number
    data?: { data?: EnvTPageList }
    msg?: string
  }

  type EnvTSaveReq = {
    AppTs: AppT[]
    DiskTs: DiskT[]
    EnvT: EnvT
    HostTs: HostT[]
  }

  type EnvTSaveResp = {
    code?: number
    msg?: string
  }

  type envUpdateApiCmdbEnvsByUidParams = {
    uid: string
  }

  type EnvUpdateReq = {
    ApiDomainName?: string
    CmnDomainUrl?: string
    CmnVip?: string
    CsdpDomainUrl?: string
    CsdpVip?: string
    CustomerId?: string
    Description?: string
    DomainName?: string
    DomainsetVersionIds?: number[]
    EnvId?: string
    EnvKey?: string
    EnvLanguage?: string
    EnvName?: string
    EnvType?: string
    IpsetVersionIds?: number[]
    JumpAddress?: string
    Locker?: string
    MonitorBasicAuthPass?: string
    MonitorBasicAuthUser?: string
    MonitorWriteUrl?: string
    NoticeGroups?: string[]
    OpsIds?: number[]
    OsType?: string
    OsmDomainUrl?: string
    OsmVip?: string
    Owners?: string[]
    Package?: PackageInfo[]
    Pipline?: string
    PiplineState?: string
    QaIds?: number[]
    SaleIds?: number[]
    SecretId?: string
    SecretKey?: string
    State?: string
    SupportIds?: number[]
  }

  type EnvUpdateResp = {
    code?: number
    msg?: string
  }

  type FieldInfo = {
    key: string
    name: string
  }

  type Host = {
    AppUids?: string[]
    Business?: string
    CommonLoginKey?: string
    CommonLoginPassword?: string
    CommonLoginUser?: string
    Description?: string
    EnvUid: string
    ExpirationTime?: number
    HostName: string
    HostTypeUid?: string
    InstanceUid?: string
    JumpId?: string
    JumpPath?: string
    LoginKey?: string
    LoginPassword?: string
    LoginPort?: number
    LoginUser?: string
    Number: number
    OpsUids?: string[]
    ProjectUids?: string[]
    State?: string
    SupportUids?: string[]
  }

  type HostClasses = {
    AdminUser?: string
    AdminUserOpe?: string
    Description?: string
    HostClasses: string
    JumpId?: string
    JumpIdOpe?: string
    JumpPath?: string
  }

  type HostClassesCreateReq = {
    AdminUser?: string
    AdminUserOpe?: string
    Description?: string
    HostClasses?: string
    JumpId?: string
    JumpIdOpe?: string
    JumpPath?: string
  }

  type HostClassesCreateResp = {
    code?: number
    msg?: string
  }

  type HostClassesDeleteReq = true

  type HostClassesDeleteResp = {
    code?: number
    msg?: string
  }

  type HostClassesInfo = {
    AdminUser?: string
    AdminUserOpe?: string
    Description?: string
    HostClasses: string
    JumpId?: string
    JumpIdOpe?: string
    JumpPath?: string
    Uid: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type HostClassesOption = {
    AdminUser?: string
    AdminUserOpe?: string
    HostClasses: string
    JumpId?: string
    JumpIdOpe?: string
    JumpPath?: string
    Uid: string
  }

  type HostClassesOptionsReq = {
    keywords?: string
  }

  type HostClassesOptionsResp = {
    code?: number
    data?: { list?: HostClassesOption[]; total?: number }
    msg?: string
  }

  type HostClassesPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type HostClassesPageListResp = {
    code?: number
    data?: { list?: HostClassesInfo[]; total?: number }
    msg?: string
  }

  type HostClassesUpdateReq = {
    AdminUser?: string
    AdminUserOpe?: string
    Description?: string
    HostClasses?: string
    JumpId?: string
    JumpIdOpe?: string
    JumpPath?: string
  }

  type HostClassesUpdateResp = {
    code?: number
    msg?: string
  }

  type HostCreateReq = {
    Host: Host
  }

  type HostCreateResp = {
    code?: number
    msg?: string
  }

  type HostDelReq = {
    Uids: string[]
  }

  type HostDelResp = {
    code?: number
    msg?: string
  }

  type HostExportReq = {
    AppUids?: string
    Business?: string
    CityUids?: string
    CloudUids?: string
    ContinentUids?: string
    CountryUids?: string
    EnvUids?: string
    ExpirationTime?: number
    HostNames?: string
    HostTypeUids?: string
    Ips?: string
    OpsUids?: string
    Path?: string
    ProjectUids?: string
    States?: string
    SupportUids?: string
    items: string[]
  }

  type HostExportResp = {
    code?: number
    msg?: string
  }

  type HostFieldsReq = true

  type HostFieldsResp = {
    code?: number
    data?: { items?: FieldInfo[] }
    msg?: string
  }

  type HostFilterParams = {
    AppUids?: string
    Business?: string
    CityUids?: string
    CloudUids?: string
    ContinentUids?: string
    CountryUids?: string
    EnvUids?: string
    ExpirationTime?: number
    HostNames?: string
    HostTypeUids?: string
    Ips?: string
    OpsUids?: string
    Path?: string
    ProjectUids?: string
    States?: string
    SupportUids?: string
  }

  type HostInfo = {
    AppSet: AppOption[]
    Business?: string
    CommonLoginKey: string
    CommonLoginPassword: string
    CommonLoginUser: string
    Description: string
    Env: EnvOption
    ExpirationTime?: number
    HostName: string
    HostType: HostTypeOption
    Instance: InstanceInfo
    InstanceId: string
    JumpId: string
    JumpPath: string
    LoginKey: string
    LoginPassword: string
    LoginPort: number
    LoginUser: string
    Number: number
    OldNameCMDB: string
    OpsSet: PersonOption[]
    ProjectSet: ProjectOption[]
    State: string
    SupportSet: PersonOption[]
    Uid: string
    Uuid: string
    createAt: string
    createBy: string
    removeAt: string
    updateAt: string
    updateBy: string
  }

  type hostInfoApiCmdbHostsByUidParams = {
    uid: string
  }

  type HostInfoReq = true

  type HostInfoResp = {
    code?: number
    data?: { data?: HostInfo }
    msg?: string
  }

  type HostOption = {
    HostName: string
    Instance: InstanceOption
    State: string
    Uid: string
  }

  type hostOptionsApiCmdbHostsOptionsParams = {
    keywords?: string
  }

  type HostOptionsReq = {
    keywords?: string
  }

  type HostOptionsResp = {
    code?: number
    data?: { list?: HostOption[]; total?: number }
    msg?: string
  }

  type hostPageListApiCmdbHostsParams = {
    Path?: string
    ContinentUids?: string
    CountryUids?: string
    CityUids?: string
    CloudUids?: string
    EnvUids?: string
    ProjectUids?: string
    OpsUids?: string
    SupportUids?: string
    States?: string
    HostTypeUids?: string
    AppUids?: string
    Ips?: string
    Business?: string
    HostNames?: string
    ExpirationTime?: number
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type HostPageListReq = {
    AppUids?: string
    Business?: string
    CityUids?: string
    CloudUids?: string
    ContinentUids?: string
    CountryUids?: string
    EnvUids?: string
    ExpirationTime?: number
    HostNames?: string
    HostTypeUids?: string
    Ips?: string
    OpsUids?: string
    Path?: string
    ProjectUids?: string
    States?: string
    SupportUids?: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type HostPageListResp = {
    code?: number
    data?: { list?: HostInfo[]; total?: number }
    msg?: string
  }

  type HostSecretReq = true

  type HostSecretResp = {
    code?: number
    data?: { Items?: string[] }
    msg?: string
  }

  type HostSyncReq = {
    Uids: string[]
  }

  type HostSyncResp = {
    code?: number
    msg?: string
  }

  type HostT = {
    Cpu: number
    DataDisks: string[]
    Description: string
    HostTName: string
    HostType: string
    Memory: number
    SystemDisk: string
    Uid: string
  }

  type HostTreeReq = {
    NodeRoot: string
    RuleDefinition: string
  }

  type HostTreeResp = {
    code?: number
    data?: { TreeNode?: TreeNode }
    msg?: string
  }

  type HostType = {
    AdminUser?: string
    AnsibleDestroyId?: number
    AnsibleRegisterId?: number
    Businesses?: string[]
    DefaultLoginPassword?: string
    DefaultLoginPort?: number
    DefaultLoginUser?: string
    DefaultPrivateKey?: string
    Description?: string
    HostClassesUid: string
    HostType: string
    ImageKeyword?: string
    JumpPath?: string
    Platfrom?: string
    RuleDefinition: string
    SecKeyword?: string
    VpcKeyword?: string
  }

  type HostTypeCreateReq = {
    AdminUser?: string
    AnsibleDestroyId?: number
    AnsibleRegisterId?: number
    Businesses?: string[]
    DefaultLoginPassword?: string
    DefaultLoginPort?: number
    DefaultLoginUser?: string
    DefaultPrivateKey?: string
    Description?: string
    HostClassesUid?: string
    HostType?: string
    ImageKeyword?: string
    JumpPath?: string
    Platfrom?: string
    RuleDefinition?: string
    SecKeyword?: string
    VpcKeyword?: string
  }

  type HostTypeCreateResp = {
    code?: number
    msg?: string
  }

  type hosttypeDeleteApiCmdbHostclassesByUidParams = {
    uid: string
  }

  type hosttypeDeleteApiCmdbHosttypesByUidParams = {
    uid: string
  }

  type HostTypeDeleteReq = true

  type HostTypeDeleteResp = {
    code?: number
    msg?: string
  }

  type HostTypeEnvReq = {
    keywords?: string
  }

  type HostTypeEnvResp = {
    code?: number
    data?: { Tree?: HostTypeEnvSet[]; total?: number }
    msg?: string
  }

  type HostTypeEnvSet = {
    Count: number
    EnvSet: EnvSet[]
    HostType: string
    Uid: string
  }

  type hostTypeEnvTreeApiCmdbHostsHosttypeenvParams = {
    keywords?: string
  }

  type HostTypeInfo = {
    AdminUser?: string
    AnsibleDestroyId?: number
    AnsibleRegisterId?: number
    Businesses?: string[]
    DefaultLoginPassword?: string
    DefaultLoginPort?: number
    DefaultLoginUser?: string
    DefaultPrivateKey?: string
    Description?: string
    HostClasses: HostClassesOption
    HostType: string
    ImageKeyword?: string
    JumpPath?: string
    Platfrom: string
    RuleDefinition: string
    SecKeyword?: string
    Uid: string
    VpcKeyword?: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type HostTypeOption = {
    AdminUser?: string
    AnsibleDestroyId?: number
    AnsibleRegisterId?: number
    Businesses?: string[]
    DefaultLoginPassword?: string
    DefaultLoginPort?: number
    DefaultLoginUser?: string
    DefaultPrivateKey?: string
    HostType: string
    ImageKeyword?: string
    JumpPath?: string
    Platfrom: string
    RuleDefinition: string
    SecKeyword?: string
    Uid: string
    VpcKeyword?: string
  }

  type hosttypeOptionsApiCmdbHostclassesOptionsParams = {
    keywords?: string
  }

  type hosttypeOptionsApiCmdbHosttypesOptionsParams = {
    keywords?: string
  }

  type HostTypeOptionsReq = {
    keywords?: string
  }

  type HostTypeOptionsResp = {
    code?: number
    data?: { list?: HostTypeOption[]; total?: number }
    msg?: string
  }

  type hosttypePageListApiCmdbHostclassesParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type hosttypePageListApiCmdbHosttypesParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type HostTypePageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type HostTypePageListResp = {
    code?: number
    data?: { list?: HostTypeInfo[]; total?: number }
    msg?: string
  }

  type hosttypeReadOneApiCmdbHosttypesByUidParams = {
    uid: string
  }

  type HostTypeReadOneReq = true

  type HostTypeReadOneResp = {
    code?: number
    data?: {
      AdminUser?: string
      AnsibleDestroyId?: number
      AnsibleRegisterId?: number
      Businesses?: string[]
      DefaultLoginPassword?: string
      DefaultLoginPort?: number
      DefaultLoginUser?: string
      DefaultPrivateKey?: string
      Description?: string
      HostClasses?: HostClassesOption
      HostType?: string
      ImageKeyword?: string
      JumpPath?: string
      Platfrom?: string
      RuleDefinition?: string
      SecKeyword?: string
      Uid?: string
      VpcKeyword?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type HostTypeSet = {
    Count: number
    HostType: string
    Uid: string
  }

  type hosttypeUpdateApiCmdbHostclassesByUidParams = {
    uid: string
  }

  type hosttypeUpdateApiCmdbHosttypesByUidParams = {
    uid: string
  }

  type HostTypeUpdateReq = {
    AdminUser?: string
    AnsibleDestroyId?: number
    AnsibleRegisterId?: number
    Businesses?: string[]
    DefaultLoginPassword?: string
    DefaultLoginPort?: number
    DefaultLoginUser?: string
    DefaultPrivateKey?: string
    Description?: string
    HostClassesUid?: string
    HostType?: string
    ImageKeyword?: string
    JumpPath?: string
    Platfrom?: string
    RuleDefinition?: string
    SecKeyword?: string
    VpcKeyword?: string
  }

  type HostTypeUpdateResp = {
    code?: number
    msg?: string
  }

  type hostUpdateApiCmdbHostsByUidParams = {
    uid: string
  }

  type HostUpdateReq = {
    Host: Host
  }

  type HostUpdateResp = {
    code?: number
    msg?: string
  }

  type HostUploadReq = true

  type HostUploadResp = {
    code?: number
    msg?: string
  }

  type Image = {
    Architecture?: string
    CloudTagIds?: string[]
    Description?: string
    ImageCreator?: string
    ImageDescription?: string
    ImageId: string
    ImageName: string
    ImageSize: number
    ImageSource?: string
    ImageState: string
    ImageType: string
    IsSupportCloudinit?: boolean
    LicenseType?: string
    OsName: string
    Platfor?: string
    RegionUid: string
    SyncPercent?: number
  }

  type ImageCreateReq = {
    Architecture?: string
    CloudTagIds?: string[]
    Description?: string
    ImageCreator?: string
    ImageDescription?: string
    ImageId?: string
    ImageName?: string
    ImageSize?: number
    ImageSource?: string
    ImageState?: string
    ImageType?: string
    IsSupportCloudinit?: boolean
    LicenseType?: string
    OsName?: string
    Platfor?: string
    RegionUid?: string
    SyncPercent?: number
  }

  type ImageCreateResp = {
    code?: number
    msg?: string
  }

  type imageDeleteApiCmdbImagesByUidParams = {
    uid: string
  }

  type ImageDeleteReq = true

  type ImageDeleteResp = {
    code?: number
    msg?: string
  }

  type ImageInfo = {
    Architecture?: string
    Description?: string
    ImageCreator?: string
    ImageDescription?: string
    ImageId: string
    ImageName: string
    ImageSize: number
    ImageSource?: string
    ImageState: string
    ImageType: string
    IsSupportCloudinit?: boolean
    LicenseType?: string
    OsName: string
    Platfor?: string
    SyncPercent?: number
    Uid: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type ImageOption = {
    ImageId: string
    ImageName: string
    ImageState?: string
    Uid: string
  }

  type imageOptionsApiCmdbImagesOptionsParams = {
    RegionUid: string
    keywords?: string
  }

  type ImageOptionsReq = {
    RegionUid: string
    keywords?: string
  }

  type ImageOptionsResp = {
    code?: number
    data?: { list?: ImageOption[]; total?: number }
    msg?: string
  }

  type imagePageListApiCmdbImagesParams = {
    RegionUid: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type ImagePageListReq = {
    RegionUid: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type ImagePageListResp = {
    code?: number
    data?: { list?: ImageInfo[]; total?: number }
    msg?: string
  }

  type imageReadOneApiCmdbImagesByUidParams = {
    uid: string
  }

  type ImageReadOneReq = true

  type ImageReadOneResp = {
    code?: number
    data?: {
      Architecture?: string
      Description?: string
      ImageCreator?: string
      ImageDescription?: string
      ImageId?: string
      ImageName?: string
      ImageSize?: number
      ImageSource?: string
      ImageState?: string
      ImageType?: string
      IsSupportCloudinit?: boolean
      LicenseType?: string
      OsName?: string
      Platfor?: string
      SyncPercent?: number
      Uid?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type imageUpdateApiCmdbImagesByUidParams = {
    uid: string
  }

  type ImageUpdateReq = {
    Architecture?: string
    CloudTagIds?: string[]
    Description?: string
    ImageCreator?: string
    ImageDescription?: string
    ImageId?: string
    ImageName?: string
    ImageSize?: number
    ImageSource?: string
    ImageState?: string
    ImageType?: string
    IsSupportCloudinit?: boolean
    LicenseType?: string
    OsName?: string
    Platfor?: string
    RegionUid?: string
    SyncPercent?: number
  }

  type ImageUpdateResp = {
    code?: number
    msg?: string
  }

  type Instance = {
    CloudTagUids?: string[]
    Cpu: number
    CreatedTime?: string
    DataDisks?: string[]
    DefaultLoginPort?: number
    DefaultLoginUser?: string
    ExpiredTime?: string
    ImageUid?: string
    InstanceChargeType?: string
    InstanceId: string
    InstanceName: string
    InstanceState: string
    InstanceType?: string
    Memory: number
    OsName?: string
    Password?: string
    PrivateIpAddresses?: string[]
    PublicIpAddresses?: string[]
    RenewFlag?: string
    RestrictState?: string
    SecurityGroupUids?: string[]
    SubnetUids?: string[]
    SystemDisk: string
    Uuid?: string
    ZoneUid: string
  }

  type InstanceAllPublicIpReq = true

  type InstanceAllPublicIpResp = {
    code?: number
    data?: { list?: string[]; total?: number }
    msg?: string
  }

  type InstanceCreateReq = {
    CloudTagUids?: string[]
    Cpu?: number
    CreatedTime?: string
    DataDisks?: string[]
    DefaultLoginPort?: number
    DefaultLoginUser?: string
    ExpiredTime?: string
    ImageUid?: string
    InstanceChargeType?: string
    InstanceId?: string
    InstanceName?: string
    InstanceState?: string
    InstanceType?: string
    Memory?: number
    OsName?: string
    Password?: string
    PrivateIpAddresses?: string[]
    PublicIpAddresses?: string[]
    RenewFlag?: string
    RestrictState?: string
    SecurityGroupUids?: string[]
    SubnetUids?: string[]
    SystemDisk?: string
    Uuid?: string
    ZoneUid?: string
  }

  type InstanceCreateResp = {
    code?: number
    msg?: string
  }

  type instanceDeleteApiCmdbInstancesByUidParams = {
    uid: string
  }

  type InstanceDeleteReq = {
    Uids: string[]
  }

  type InstanceDeleteResp = {
    code?: number
    msg?: string
  }

  type InstanceInfo = {
    CloudTagOptionSet: CloudTagOption[]
    Cpu: number
    CreatedTime: string
    DataDisks: string[]
    DefaultLoginPort: number
    DefaultLoginUser: string
    Description: string
    ExpiredTime: string
    Image: ImageOption
    InstanceChargeType: string
    InstanceId: string
    InstanceName: string
    InstanceState: string
    InstanceType: string
    Memory: number
    OsName: string
    Password: string
    PrivateIpAddresses: string[]
    PublicIpAddresses: string[]
    RenewFlag: string
    RestrictState: string
    SecurityGroupSet: SecurityGroupOption[]
    SubnetWithVpcSet: SubnetWithVpc[]
    SystemDisk: string
    Uid: string
    Uuid: string
    Zone: RelZone
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type InstanceOption = {
    InstanceId: string
    InstanceName: string
    Uid: string
  }

  type instanceOptionsApiCmdbInstancesOptionsParams = {
    keywords?: string
  }

  type InstanceOptionsReq = {
    keywords?: string
  }

  type InstanceOptionsResp = {
    code?: number
    data?: { list?: InstanceOption[]; total?: number }
    msg?: string
  }

  type instancePageListApiCmdbInstancesParams = {
    CloudUid?: string
    RegionUid?: string
    ZoneUid?: string
    CloudTagUids?: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type InstancePageListReq = {
    CloudTagUids?: string[]
    CloudUid?: string
    RegionUid?: string
    ZoneUid?: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type InstancePageListResp = {
    code?: number
    data?: { list?: InstanceInfo[]; total?: number }
    msg?: string
  }

  type InstancePatch = {
    Cpu: number
    Description?: string
    InstanceId?: string
    InstanceName: string
    InstanceState: string
    Memory: number
    PrivateIpAddresses?: string[]
    PublicIpAddresses?: string[]
    ZoneUid: string
  }

  type instancePatchApiCmdbInstancesByUidParams = {
    uid: string
  }

  type InstancePatchReq = {
    Cpu?: number
    Description?: string
    InstanceId?: string
    InstanceName?: string
    InstanceState?: string
    Memory?: number
    PrivateIpAddresses?: string[]
    PublicIpAddresses?: string[]
    ZoneUid?: string
  }

  type InstancePatchResp = {
    code?: number
    msg?: string
  }

  type instancePatchStatusApiCmdbInstancesByUidstatusParams = {
    uid: string
  }

  type InstancePatchStatusReq = {
    InstanceState: string
  }

  type InstancePatchStatusResp = {
    code?: number
    msg?: string
  }

  type instanceReadOneApiCmdbInstancesByUidParams = {
    uid: string
  }

  type InstanceReadOneReq = true

  type InstanceReadOneResp = {
    code?: number
    data?: {
      CloudTagOptionSet?: CloudTagOption[]
      Cpu?: number
      CreatedTime?: string
      DataDisks?: string[]
      DefaultLoginPort?: number
      DefaultLoginUser?: string
      Description?: string
      ExpiredTime?: string
      Image?: ImageOption
      InstanceChargeType?: string
      InstanceId?: string
      InstanceName?: string
      InstanceState?: string
      InstanceType?: string
      Memory?: number
      OsName?: string
      Password?: string
      PrivateIpAddresses?: string[]
      PublicIpAddresses?: string[]
      RenewFlag?: string
      RestrictState?: string
      SecurityGroupSet?: SecurityGroupOption[]
      SubnetWithVpcSet?: SubnetWithVpc[]
      SystemDisk?: string
      Uid?: string
      Uuid?: string
      Zone?: RelZone
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type InstanceSyncReq = {
    RegionUid: string
  }

  type InstanceSyncResp = {
    code?: number
    msg?: string
  }

  type InstanceTypeQuotaItem = {
    Cpu: number
    CpuType: string
    Description?: string
    Frequency?: string
    InstanceBandwidth?: number
    InstanceChargeType: string
    InstanceFamily: string
    InstancePps?: number
    InstanceType: string
    Memory: number
    Remark?: string
    Status: string
    TypeName: string
    Zone: string
    ZoneUid: string
  }

  type InstanceTypeQuotaItemCreateReq = {
    Cpu?: number
    CpuType?: string
    Description?: string
    Frequency?: string
    InstanceBandwidth?: number
    InstanceChargeType?: string
    InstanceFamily?: string
    InstancePps?: number
    InstanceType?: string
    Memory?: number
    Remark?: string
    Status?: string
    TypeName?: string
    Zone?: string
    ZoneUid?: string
  }

  type InstanceTypeQuotaItemCreateResp = {
    code?: number
    msg?: string
  }

  type instanceTypeQuotaItemDeleteApiCmdbInstypesByUidParams = {
    uid: string
  }

  type InstanceTypeQuotaItemDeleteReq = true

  type InstanceTypeQuotaItemDeleteResp = {
    code?: number
    msg?: string
  }

  type InstanceTypeQuotaItemInfo = {
    Cpu: number
    CpuType: string
    Description?: string
    Frequency?: string
    InstanceBandwidth?: number
    InstanceChargeType: string
    InstanceFamily: string
    InstancePps?: number
    InstanceType: string
    Memory: number
    Remark?: string
    Status: string
    TypeName: string
    Uid: string
    Zone: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type InstanceTypeQuotaItemOption = {
    Cpu: number
    InstanceType: string
    Memory: number
    Status: string
    TypeName: string
    Uid: string
  }

  type instanceTypeQuotaItemOptionsApiCmdbInstypesOptionsParams = {
    ZoneUid: string
    keywords?: string
  }

  type InstanceTypeQuotaItemOptionsReq = {
    ZoneUid: string
    keywords?: string
  }

  type InstanceTypeQuotaItemOptionsResp = {
    code?: number
    data?: { list?: InstanceTypeQuotaItemOption[]; total?: number }
    msg?: string
  }

  type instanceTypeQuotaItemPageListApiCmdbInstypesParams = {
    ZoneUid: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type InstanceTypeQuotaItemPageListReq = {
    ZoneUid: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type InstanceTypeQuotaItemPageListResp = {
    code?: number
    data?: { list?: InstanceTypeQuotaItemInfo[]; total?: number }
    msg?: string
  }

  type instanceTypeQuotaItemReadOneApiCmdbInstypesByUidParams = {
    uid: string
  }

  type InstanceTypeQuotaItemReadOneReq = true

  type InstanceTypeQuotaItemReadOneResp = {
    code?: number
    data?: {
      Cpu?: number
      CpuType?: string
      Description?: string
      Frequency?: string
      InstanceBandwidth?: number
      InstanceChargeType?: string
      InstanceFamily?: string
      InstancePps?: number
      InstanceType?: string
      Memory?: number
      Remark?: string
      Status?: string
      TypeName?: string
      Uid?: string
      Zone?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type instanceTypeQuotaItemUpdateApiCmdbInstypesByUidParams = {
    uid: string
  }

  type InstanceTypeQuotaItemUpdateReq = {
    Cpu?: number
    CpuType?: string
    Description?: string
    Frequency?: string
    InstanceBandwidth?: number
    InstanceChargeType?: string
    InstanceFamily?: string
    InstancePps?: number
    InstanceType?: string
    Memory?: number
    Remark?: string
    Status?: string
    TypeName?: string
    Zone?: string
    ZoneUid?: string
  }

  type InstanceTypeQuotaItemUpdateResp = {
    code?: number
    msg?: string
  }

  type instanceUpdateApiCmdbInstancesByUidParams = {
    uid: string
  }

  type InstanceUpdateReq = {
    CloudTagUids?: string[]
    Cpu?: number
    CreatedTime?: string
    DataDisks?: string[]
    DefaultLoginPort?: number
    DefaultLoginUser?: string
    ExpiredTime?: string
    ImageUid?: string
    InstanceChargeType?: string
    InstanceId?: string
    InstanceName?: string
    InstanceState?: string
    InstanceType?: string
    Memory?: number
    OsName?: string
    Password?: string
    PrivateIpAddresses?: string[]
    PublicIpAddresses?: string[]
    RenewFlag?: string
    RestrictState?: string
    SecurityGroupUids?: string[]
    SubnetUids?: string[]
    SystemDisk?: string
    Uuid?: string
    ZoneUid?: string
  }

  type InstanceUpdateResp = {
    code?: number
    msg?: string
  }

  type JumpAdminUserOption = {
    Id: string
    Name: string
    Protocol: string
    Username: string
  }

  type JumpAdminUserOptionsReq = true

  type JumpAdminUserOptionsResp = {
    code?: number
    data?: { list?: JumpAdminUserOption[]; ope_list?: JumpAdminUserOption[] }
    msg?: string
  }

  type NodeRule = {
    IsSystemProvided: boolean
    NodeRoot: string
    RuleDefinition: string
    RuleName: string
  }

  type NodeRuleCreateReq = {
    IsSystemProvided?: boolean
    NodeRoot?: string
    RuleDefinition?: string
    RuleName?: string
  }

  type NodeRuleCreateResp = {
    code?: number
    msg?: string
  }

  type nodeRuleDeleteApiCmdbNoderulesByUidParams = {
    uid: string
  }

  type NodeRuleDeleteReq = true

  type NodeRuleDeleteResp = {
    code?: number
    msg?: string
  }

  type NodeRuleOption = {
    IsSystemProvided: boolean
    NodeRoot: string
    RuleDefinition: string
    RuleName: string
    Uid: string
  }

  type NodeRuleOptionsReq = true

  type NodeRuleOptionsResp = {
    code?: number
    data?: { list?: NodeRuleOption[]; total?: number }
    msg?: string
  }

  type nodeRuleUpdateApiCmdbNoderulesByUidParams = {
    uid: string
  }

  type NodeRuleUpdateReq = {
    IsSystemProvided?: boolean
    NodeRoot?: string
    RuleDefinition?: string
    RuleName?: string
  }

  type NodeRuleUpdateResp = {
    code?: number
    msg?: string
  }

  type PackageInfo = {
    ModuleName: string
    Version: string
  }

  type PageParams = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type Person = {
    Description?: string
    Email?: string
    Enabled: boolean
    Mobile?: string
    PersonId: string
    PersonName: string
    ProfessionIds?: string[]
  }

  type PersonCreateReq = {
    Description?: string
    Email?: string
    Enabled?: boolean
    Mobile?: string
    PersonId?: string
    PersonName?: string
    ProfessionIds?: string[]
  }

  type PersonCreateResp = {
    code?: number
    msg?: string
  }

  type personDeleteApiCmdbPersonsByUidParams = {
    uid: string
  }

  type PersonDeleteReq = true

  type PersonDeleteResp = {
    code?: number
    msg?: string
  }

  type PersonInfo = {
    Description?: string
    Email?: string
    Enabled: boolean
    Mobile?: string
    PersonId: string
    PersonName: string
    Professions?: ProfessionOption[]
    Uid: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type PersonOption = {
    PersonId: string
    PersonName: string
    Uid: string
  }

  type personOptionsApiCmdbPersonsOptionsParams = {
    keywords?: string
    ProfessionName?: string
  }

  type PersonOptionsReq = {
    ProfessionName?: string
    keywords?: string
  }

  type PersonOptionsResp = {
    code?: number
    data?: { list?: PersonOption[]; total?: number }
    msg?: string
  }

  type personPageListApiCmdbPersonsParams = {
    ProfessionUid?: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type PersonPageListReq = {
    ProfessionUid?: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type PersonPageListResp = {
    code?: number
    data?: { list?: PersonInfo[]; total?: number }
    msg?: string
  }

  type personReadOneApiCmdbPersonsByUidParams = {
    uid: string
  }

  type PersonReadOneReq = true

  type PersonReadOneResp = {
    code?: number
    data?: {
      Description?: string
      Email?: string
      Enabled?: boolean
      Mobile?: string
      PersonId?: string
      PersonName?: string
      Professions?: ProfessionOption[]
      Uid?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type personUpdateApiCmdbPersonsByUidParams = {
    uid: string
  }

  type PersonUpdateReq = {
    Description?: string
    Email?: string
    Enabled?: boolean
    Mobile?: string
    PersonId?: string
    PersonName?: string
    ProfessionIds?: string[]
  }

  type PersonUpdateResp = {
    code?: number
    msg?: string
  }

  type PlaceCityThree = {
    CityId: string
    CityName: string
    CityNameCn: string
    Uid: string
  }

  type PlaceCloud = {
    Cloud: string
    CloudName: string
    Count: number
    RegionSet: PlaceRegion[]
    ResourceGroup: string
    Uid: string
  }

  type PlaceContinent = {
    ContinentId: string
    ContinentNameCn: string
    Count: number
    CountrySet: PlaceCountry[]
    Uid: string
  }

  type PlaceContinentThree = {
    ContinentId: string
    ContinentNameCn: string
    Count: number
    CountrySet: PlaceCountryThree[]
    Uid: string
  }

  type PlaceCountry = {
    Count: number
    CountryId: string
    CountryNameCn: string
    Uid: string
  }

  type PlaceCountryThree = {
    CitySet: PlaceCityThree[]
    Count: number
    CountryId: string
    CountryNameCn: string
    Uid: string
  }

  type PlaceRegion = {
    Count: number
    Region: string
    RegionName: string
    Uid: string
    ZoneSet: PlaceZone[]
  }

  type PlaceZone = {
    Count: number
    Uid: string
    Zone: string
    ZoneName: string
  }

  type Profession = {
    Description?: string
    ProfessionId: string
    ProfessionName: string
  }

  type ProfessionCreateReq = {
    Description?: string
    ProfessionId?: string
    ProfessionName?: string
  }

  type ProfessionCreateResp = {
    code?: number
    msg?: string
  }

  type professionDeleteApiCmdbProfessionsByUidParams = {
    uid: string
  }

  type ProfessionDeleteReq = true

  type ProfessionDeleteResp = {
    code?: number
    msg?: string
  }

  type ProfessionInfo = {
    Description?: string
    ProfessionId: string
    ProfessionName: string
    Uid: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type ProfessionOption = {
    ProfessionId: string
    ProfessionName: string
    Uid: string
  }

  type professionOptionsApiCmdbProfessionsOptionsParams = {
    keywords?: string
  }

  type ProfessionOptionsReq = {
    keywords?: string
  }

  type ProfessionOptionsResp = {
    code?: number
    data?: { list?: ProfessionOption[]; total?: number }
    msg?: string
  }

  type professionPageListApiCmdbProfessionsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type ProfessionPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type ProfessionPageListResp = {
    code?: number
    data?: { list?: ProfessionInfo[]; total?: number }
    msg?: string
  }

  type professionReadOneApiCmdbProfessionsByUidParams = {
    uid: string
  }

  type ProfessionReadOneReq = true

  type ProfessionReadOneResp = {
    code?: number
    data?: {
      Description?: string
      ProfessionId?: string
      ProfessionName?: string
      Uid?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type professionUpdateApiCmdbProfessionsByUidParams = {
    uid: string
  }

  type ProfessionUpdateReq = {
    Description?: string
    ProfessionId?: string
    ProfessionName?: string
  }

  type ProfessionUpdateResp = {
    code?: number
    msg?: string
  }

  type Project = {
    CusId?: string
    Ident?: string
    Project: string
    ProjectName: string
  }

  type ProjectCreateReq = {
    Client?: string
    CusId?: string
    Ident?: string
    Project?: string
    ProjectName?: string
    Sale?: string
  }

  type ProjectCreateResp = {
    code?: number
    msg?: string
  }

  type projectDeleteApiCmdbProjectsByUidParams = {
    uid: string
  }

  type ProjectDeleteReq = true

  type ProjectDeleteResp = {
    code?: number
    msg?: string
  }

  type ProjectInfo = {
    Client?: string
    CusId?: string
    HostNum?: string
    Ident?: string
    Project: string
    ProjectName: string
    Sale?: string
    Uid: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type ProjectOption = {
    Ident: string
    Project: string
    ProjectName: string
    Uid: string
  }

  type projectOptionsApiCmdbProjectsOptionsParams = {
    keywords?: string
  }

  type ProjectOptionsReq = {
    keywords?: string
  }

  type ProjectOptionsResp = {
    code?: number
    data?: { list?: ProjectOption[]; total?: number }
    msg?: string
  }

  type projectPageListApiCmdbProjectsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type ProjectPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type ProjectPageListResp = {
    code?: number
    data?: { list?: ProjectInfo[]; total?: number }
    msg?: string
  }

  type projectReadOneApiCmdbProjectsByUidParams = {
    uid: string
  }

  type ProjectReadOneReq = true

  type ProjectReadOneResp = {
    code?: number
    data?: {
      Client?: string
      CusId?: string
      HostNum?: string
      Ident?: string
      Project?: string
      ProjectName?: string
      Sale?: string
      Uid?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type projectUpdateApiCmdbProjectsByUidParams = {
    uid: string
  }

  type ProjectUpdateReq = {
    Client?: string
    CusId?: string
    Ident?: string
    Project?: string
    ProjectName?: string
    Sale?: string
  }

  type ProjectUpdateResp = {
    code?: number
    msg?: string
  }

  type ProjectUploadReq = true

  type ProjectUploadResp = {
    code?: number
    data?: { ok?: number }
    msg?: string
  }

  type Region = {
    CityUid: string
    CloudUid: string
    Description?: string
    Region: string
    RegionName: string
    RegionState?: string
  }

  type RegionCreateReq = {
    CityUid?: string
    CloudUid?: string
    Description?: string
    Region?: string
    RegionName?: string
    RegionState?: string
  }

  type RegionCreateResp = {
    code?: number
    msg?: string
  }

  type regionDeleteApiCmdbRegionsByUidParams = {
    uid: string
  }

  type RegionDeleteReq = true

  type RegionDeleteResp = {
    code?: number
    msg?: string
  }

  type RegionInfo = {
    City?: CityInfo
    Cloud?: CloudInfo
    Description?: string
    Region: string
    RegionName: string
    RegionState?: string
    Uid: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type RegionOption = {
    City: CityOption
    Region: string
    RegionName: string
    RegionState?: string
    Uid: string
  }

  type regionOptionsApiCmdbRegionsOptionsParams = {
    CloudUid: string
    keywords?: string
  }

  type RegionOptionsReq = {
    CloudUid: string
    keywords?: string
  }

  type RegionOptionsResp = {
    code?: number
    data?: { list?: RegionOption[]; total?: number }
    msg?: string
  }

  type regionPageListApiCmdbRegionsParams = {
    CloudUid: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type RegionPageListReq = {
    CloudUid: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type RegionPageListResp = {
    code?: number
    data?: { list?: RegionInfo[]; total?: number }
    msg?: string
  }

  type regionReadOneApiCmdbRegionsByUidParams = {
    uid: string
  }

  type RegionReadOneReq = true

  type RegionReadOneResp = {
    code?: number
    data?: {
      City?: CityInfo
      Cloud?: CloudInfo
      Description?: string
      Region?: string
      RegionName?: string
      RegionState?: string
      Uid?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type regionUpdateApiCmdbRegionsByUidParams = {
    uid: string
  }

  type RegionUpdateReq = {
    CityUid?: string
    CloudUid?: string
    Description?: string
    Region?: string
    RegionName?: string
    RegionState?: string
  }

  type RegionUpdateResp = {
    code?: number
    msg?: string
  }

  type RegionUploadReq = true

  type RegionUploadResp = {
    code?: number
    data?: { ok?: number }
    msg?: string
  }

  type RelCity = {
    CityId: string
    CityName: string
    Uid: string
  }

  type RelCloud = {
    Cloud: string
    CloudName: string
    ResourceGroup: string
    SupportApi: boolean
    Uid: string
  }

  type RelRegion = {
    City: RelCity
    Cloud: RelCloud
    Region: string
    RegionName: string
    Uid: string
  }

  type RelZone = {
    Region: RelRegion
    Uid: string
    Zone: string
    ZoneName: string
  }

  type SecurityGroup = {
    CloudTagIds?: string[]
    Description?: string
    IsDefault: boolean
    RegionUid: string
    SecurityGroupDesc: string
    SecurityGroupId: string
    SecurityGroupName: string
  }

  type SecurityGroupCreateReq = {
    CloudTagIds?: string[]
    Description?: string
    IsDefault?: boolean
    RegionUid?: string
    SecurityGroupDesc?: string
    SecurityGroupId?: string
    SecurityGroupName?: string
  }

  type SecurityGroupCreateResp = {
    code?: number
    msg?: string
  }

  type securitygroupDeleteApiCmdbSecuritygroupsByUidParams = {
    uid: string
  }

  type SecurityGroupDeleteReq = true

  type SecurityGroupDeleteResp = {
    code?: number
    msg?: string
  }

  type SecurityGroupInfo = {
    Description?: string
    IsDefault: boolean
    SecurityGroupDesc: string
    SecurityGroupId: string
    SecurityGroupName: string
    Uid: string
    VpcId: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type SecurityGroupOption = {
    SecurityGroupId: string
    SecurityGroupName: string
    Uid: string
    VpcId: string
  }

  type securitygroupOptionsApiCmdbSecuritygroupsOptionsParams = {
    RegionUid: string
    keywords?: string
  }

  type SecurityGroupOptionsReq = {
    RegionUid: string
    keywords?: string
  }

  type SecurityGroupOptionsResp = {
    code?: number
    data?: { list?: SecurityGroupOption[]; total?: number }
    msg?: string
  }

  type securitygroupPageListApiCmdbSecuritygroupsParams = {
    RegionUid: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type SecurityGroupPageListReq = {
    RegionUid: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type SecurityGroupPageListResp = {
    code?: number
    data?: { list?: SecurityGroupInfo[]; total?: number }
    msg?: string
  }

  type securitygroupReadOneApiCmdbSecuritygroupsByUidParams = {
    uid: string
  }

  type SecurityGroupReadOneReq = true

  type SecurityGroupReadOneResp = {
    code?: number
    data?: {
      Description?: string
      IsDefault?: boolean
      SecurityGroupDesc?: string
      SecurityGroupId?: string
      SecurityGroupName?: string
      Uid?: string
      VpcId?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type securitygroupUpdateApiCmdbSecuritygroupsByUidParams = {
    uid: string
  }

  type SecurityGroupUpdateReq = {
    CloudTagIds?: string[]
    Description?: string
    IsDefault?: boolean
    RegionUid?: string
    SecurityGroupDesc?: string
    SecurityGroupId?: string
    SecurityGroupName?: string
  }

  type SecurityGroupUpdateResp = {
    code?: number
    msg?: string
  }

  type Subnet = {
    AvailableIpAddressCount: number
    CidrBlock: string
    CloudTagIds?: string[]
    Description?: string
    Ipv6CidrBlock: string
    IsDefault: boolean
    IsRemoteVpcSnat: boolean
    RouteTableId: number
    SubnetId: string
    SubnetName: string
    TotalIpAddressCount: number
    VpcId: string
    VpcUid: string
    Zone: number
    ZoneUid: string
  }

  type SubnetCreateReq = {
    AvailableIpAddressCount?: number
    CidrBlock?: string
    CloudTagIds?: string[]
    Description?: string
    Ipv6CidrBlock?: string
    IsDefault?: boolean
    IsRemoteVpcSnat?: boolean
    RouteTableId?: number
    SubnetId?: string
    SubnetName?: string
    TotalIpAddressCount?: number
    VpcId?: string
    VpcUid?: string
    Zone?: number
    ZoneUid?: string
  }

  type SubnetCreateResp = {
    code?: number
    msg?: string
  }

  type subnetDeleteApiCmdbSubnetsByUidParams = {
    uid: string
  }

  type SubnetDeleteReq = true

  type SubnetDeleteResp = {
    code?: number
    msg?: string
  }

  type SubnetInfo = {
    AvailableIpAddressCount: number
    CidrBlock: string
    Description?: string
    Ipv6CidrBlock: string
    IsDefault: boolean
    IsRemoteVpcSnat: boolean
    RouteTableId: number
    SubnetId: string
    SubnetName: string
    TotalIpAddressCount: number
    Uid: string
    VpcId: string
    Zone: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type SubnetOption = {
    AvailableIpAddressCount: number
    SubnetId: string
    SubnetName: string
    Uid: string
    Zone: string
  }

  type subnetOptionsApiCmdbSubnetsOptionsParams = {
    VpcUid: string
    keywords?: string
  }

  type SubnetOptionsReq = {
    VpcUid: string
    keywords?: string
  }

  type SubnetOptionsResp = {
    code?: number
    data?: { list?: SubnetOption[]; total?: number }
    msg?: string
  }

  type subnetPageListApiCmdbSubnetsParams = {
    VpcUid: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type SubnetPageListReq = {
    VpcUid: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type SubnetPageListResp = {
    code?: number
    data?: { list?: SubnetInfo[]; total?: number }
    msg?: string
  }

  type subnetReadOneApiCmdbSubnetsByUidParams = {
    uid: string
  }

  type SubnetReadOneReq = true

  type SubnetReadOneResp = {
    code?: number
    data?: {
      AvailableIpAddressCount?: number
      CidrBlock?: string
      Description?: string
      Ipv6CidrBlock?: string
      IsDefault?: boolean
      IsRemoteVpcSnat?: boolean
      RouteTableId?: number
      SubnetId?: string
      SubnetName?: string
      TotalIpAddressCount?: number
      Uid?: string
      VpcId?: string
      Zone?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type subnetUpdateApiCmdbSubnetsByUidParams = {
    uid: string
  }

  type SubnetUpdateReq = {
    AvailableIpAddressCount?: number
    CidrBlock?: string
    CloudTagIds?: string[]
    Description?: string
    Ipv6CidrBlock?: string
    IsDefault?: boolean
    IsRemoteVpcSnat?: boolean
    RouteTableId?: number
    SubnetId?: string
    SubnetName?: string
    TotalIpAddressCount?: number
    VpcId?: string
    VpcUid?: string
    Zone?: number
    ZoneUid?: string
  }

  type SubnetUpdateResp = {
    code?: number
    msg?: string
  }

  type SubnetWithVpc = {
    SubnetId: string
    SubnetName: string
    Uid: string
    Vpc: Vpc
  }

  type treeApiCmdbHostsTreeParams = {
    NodeRoot: string
    RuleDefinition: string
  }

  type TreeNode = {
    Children: TreeNode[]
    Count: number
    Name: string
    Path: string
  }

  type UserInfo = {
    Email: string
    Id: number
    Mobile: string
    NickName: string
    UserName: string
  }

  type Vpc = {
    CidrBlock: string
    CloudTagIds?: string[]
    Description?: string
    DnsServerSet: string[]
    IsDefault: boolean
    RegionUid: string
    VpcId: string
    VpcName: string
  }

  type VpcCreateReq = {
    CidrBlock?: string
    CloudTagIds?: string[]
    Description?: string
    DnsServerSet?: string[]
    IsDefault?: boolean
    RegionUid?: string
    VpcId?: string
    VpcName?: string
  }

  type VpcCreateResp = {
    code?: number
    msg?: string
  }

  type vpcDeleteApiCmdbVpcsByUidParams = {
    uid: string
  }

  type VpcDeleteReq = true

  type VpcDeleteResp = {
    code?: number
    msg?: string
  }

  type VpcInfo = {
    CidrBlock: string
    Description?: string
    DnsServerSet: string[]
    IsDefault: boolean
    Uid: string
    VpcId: string
    VpcName: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type VpcOption = {
    IsDefault: boolean
    Uid: string
    VpcId: string
    VpcName: string
  }

  type vpcOptionsApiCmdbVpcsOptionsParams = {
    RegionUid: string
    keywords?: string
  }

  type VpcOptionsReq = {
    RegionUid: string
    keywords?: string
  }

  type VpcOptionsResp = {
    code?: number
    data?: { list?: VpcOption[]; total?: number }
    msg?: string
  }

  type vpcPageListApiCmdbVpcsParams = {
    RegionUid: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type VpcPageListReq = {
    RegionUid: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type VpcPageListResp = {
    code?: number
    data?: { list?: VpcInfo[]; total?: number }
    msg?: string
  }

  type vpcReadOneApiCmdbVpcsByUidParams = {
    uid: string
  }

  type VpcReadOneReq = true

  type VpcReadOneResp = {
    code?: number
    data?: {
      CidrBlock?: string
      Description?: string
      DnsServerSet?: string[]
      IsDefault?: boolean
      Uid?: string
      VpcId?: string
      VpcName?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type vpcUpdateApiCmdbVpcsByUidParams = {
    uid: string
  }

  type VpcUpdateReq = {
    CidrBlock?: string
    CloudTagIds?: string[]
    Description?: string
    DnsServerSet?: string[]
    IsDefault?: boolean
    RegionUid?: string
    VpcId?: string
    VpcName?: string
  }

  type VpcUpdateResp = {
    code?: number
    msg?: string
  }

  type Zone = {
    Description?: string
    RegionUid: string
    Zone: string
    ZoneName: string
    ZoneState?: string
  }

  type ZoneCreateReq = {
    Description?: string
    RegionUid?: string
    Zone?: string
    ZoneName?: string
    ZoneState?: string
  }

  type ZoneCreateResp = {
    code?: number
    msg?: string
  }

  type zoneDeleteApiCmdbZonesByUidParams = {
    uid: string
  }

  type ZoneDeleteReq = true

  type ZoneDeleteResp = {
    code?: number
    msg?: string
  }

  type ZoneInfo = {
    Description?: string
    Uid: string
    Zone: string
    ZoneName: string
    ZoneState?: string
    createAt: string
    createBy: string
    updateAt: string
    updateBy: string
  }

  type ZoneOption = {
    Uid: string
    Zone: string
    ZoneName: string
    ZoneState?: string
  }

  type zoneOptionsApiCmdbZonesOptionsParams = {
    RegionUid: string
    keywords?: string
  }

  type ZoneOptionsReq = {
    RegionUid: string
    keywords?: string
  }

  type ZoneOptionsResp = {
    code?: number
    data?: { list?: ZoneOption[]; total?: number }
    msg?: string
  }

  type zonePageListApiCmdbZonesParams = {
    RegionUid: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type ZonePageListReq = {
    RegionUid: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type ZonePageListResp = {
    code?: number
    data?: { list?: ZoneInfo[]; total?: number }
    msg?: string
  }

  type zoneReadOneApiCmdbZonesByUidParams = {
    uid: string
  }

  type ZoneReadOneReq = true

  type ZoneReadOneResp = {
    code?: number
    data?: {
      Description?: string
      Uid?: string
      Zone?: string
      ZoneName?: string
      ZoneState?: string
      createAt?: string
      createBy?: string
      updateAt?: string
      updateBy?: string
    }
    msg?: string
  }

  type zoneUpdateApiCmdbZonesByUidParams = {
    uid: string
  }

  type ZoneUpdateReq = {
    Description?: string
    RegionUid?: string
    Zone?: string
    ZoneName?: string
    ZoneState?: string
  }

  type ZoneUpdateResp = {
    code?: number
    msg?: string
  }
}
