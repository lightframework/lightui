declare namespace OPS {
  type Au = {
    autoUpdate?: number
    description?: string
    domainsetIds?: number[]
    faultRecords?: string
    getWay?: string[]
    information?: string
    ipsetIds?: number[]
    issueRecords?: string
    name: string
    officialSupportApi?: number
    overWall?: number
    related: boolean
    relatedIds?: number[]
    resourceType?: string[]
  }

  type AuCreateReq = {
    autoUpdate?: number
    description?: string
    domainsetIds?: number[]
    faultRecords?: string
    getWay?: string[]
    information?: string
    ipsetIds?: number[]
    issueRecords?: string
    name?: string
    officialSupportApi?: number
    overWall?: number
    related?: boolean
    relatedIds?: number[]
    resourceType?: string[]
  }

  type AuCreateResp = {
    code?: number
    data?: { id?: number; name?: string }
    msg?: string
  }

  type auDeleteApiOpsAuByIdParams = {
    id: string
  }

  type AuDeleteReq = true

  type AuDeleteResp = {
    code?: number
    msg?: string
  }

  type AuInfo = {
    autoUpdate?: number
    createBy: string
    createdAt: string
    description?: string
    domainsetIds?: number[]
    faultRecords?: string
    getWay?: string[]
    id: number
    information?: string
    ipsetIds?: number[]
    issueRecords?: string
    name: string
    officialSupportApi?: number
    overWall?: number
    related: boolean
    relatedIds?: number[]
    resourceType?: string[]
    updateBy: string
    updatedAt: string
  }

  type AuList = {
    autoUpdate?: number
    createdAt: string
    createdBy: string
    domainsetIds?: number[]
    getWay?: string[]
    id: number
    ipsetIds?: number[]
    name: string
    officialSupportApi?: number
    overWall?: number
    primaryIds?: number[]
    related: boolean
    relatedIds?: number[]
    resourceType?: string[]
    updatedAt: string
    updatedBy: string
  }

  type AuOption = {
    domainsetIds?: number[]
    id: number
    ipsetIds?: number[]
    name: string
    related: boolean
    relatedIds?: number[]
  }

  type auOptionsApiOpsAuOptionsParams = {
    related: boolean
  }

  type AuOptionsReq = {
    related: boolean
  }

  type AuOptionsResp = {
    code?: number
    data?: { list?: AuOption[]; total?: number }
    msg?: string
  }

  type auPageListApiOpsAuParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
    related?: boolean
    auIds?: string
  }

  type AuPageListReq = {
    auIds?: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
    related?: boolean
  }

  type AuPageListResp = {
    code?: number
    data?: { list?: AuList[]; total?: number }
    msg?: string
  }

  type AuPushReq = {
    auIds: number[]
    description?: string
    envUids: string[]
    pushType: string
    related: boolean
    title: string
  }

  type AuPushResp = {
    code?: number
    msg?: string
  }

  type auReadOneApiOpsAuByIdParams = {
    id: string
  }

  type AuReadOneReq = true

  type AuReadOneResp = {
    code?: number
    data?: { data?: AuInfo }
    msg?: string
  }

  type AuRecordList = {
    auNames: string[]
    createBy: string
    createdAt: string
    description: string
    envNames: string[]
    id: number
    message: string
    pushType: string
    related: boolean
    title: string
    updateBy: string
    updatedAt: string
  }

  type auRecordPageListApiOpsAuRecordParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type AuRecordPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type AuRecordPageListResp = {
    code?: number
    data?: { list?: AuRecordList[]; total?: number }
    msg?: string
  }

  type auUpdateApiOpsAuByIdParams = {
    id: string
  }

  type AuUpdateReq = {
    autoUpdate?: number
    description?: string
    domainsetIds?: number[]
    faultRecords?: string
    getWay?: string[]
    information?: string
    ipsetIds?: number[]
    issueRecords?: string
    name?: string
    officialSupportApi?: number
    overWall?: number
    related?: boolean
    relatedIds?: number[]
    resourceType?: string[]
  }

  type AuUpdateResp = {
    code?: number
    msg?: string
  }

  type AwdbDownloadMd5Req = true

  type AwdbDownloadMd5Resp = {
    code?: number
    data?: { md5?: string }
    msg?: string
  }

  type AwdbDownloadReq = true

  type AwdbDownloadResp = {
    code?: number
    data?: { dataLink?: string; md5Link?: string }
    msg?: string
  }

  type AwdbGetPingIpReq = {
    location: string
  }

  type AwdbGetPingIpResp = {
    code?: number
    msg?: string
  }

  type AwdbUpdateReq = true

  type AwdbUpdateResp = {
    code?: number
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

  type certExportApiOpsCertsByExportidParams = {
    id: string
  }

  type CertExportReq = true

  type CertExportResp = {
    code?: number
    msg?: string
  }

  type CertInfo = {
    CreatedAt: string
    CreatedBy: string
    UpdatedAt: string
    UpdatedBy: string
    certId: string
    certName: string
    cloud: string
    dryPushState: string
    id: number
    notAfter: string
    notBefore: string
    useState: string
  }

  type CertRecordCert = {
    certId: number
    certName: string
    domain: string
    hostPushRecords: HostPushRecord[]
    message: string
    reviewState: boolean
  }

  type CertRecordList = {
    CreatedAt: string
    CreatedBy: string
    certId: number
    certName: string
    domain: string
    dueDays: number
    id: number
    message: string
    state: string
  }

  type certRecordPageListApiOpsCertsRecordsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type CertRecordPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type CertRecordPageListResp = {
    code?: number
    data?: { list?: CertRecordList[]; total?: number }
    msg?: string
  }

  type certRecordReadOneApiOpsCertsByRecordsidParams = {
    id: string
  }

  type CertRecordReadOneReq = true

  type CertRecordReadOneResp = {
    code?: number
    data?: { certRecord?: CertRecordList }
    msg?: string
  }

  type certUpdateUseStateApiOpsCertsByUsestateidParams = {
    id: string
  }

  type CertUpdateUseStateReq = {
    useState: string
  }

  type CertUpdateUseStateResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certId?: string
      certName?: string
      cloud?: string
      dryPushState?: string
      id?: number
      notAfter?: string
      notBefore?: string
      useState?: string
    }
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

  type CurrentEnvDomainset = {
    domainsetId: number
    domainsetName: string
    versionId: number
    versionName: string
  }

  type CurrentEnvIpset = {
    ipsetId: number
    ipsetName: string
    versionId: number
    versionName: string
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

  type Domain = {
    description?: string
    domainName: string
    dueDays: number
    port: number
    userIds: number[]
  }

  type DomainAlarmDueDaysReq = true

  type DomainAlarmDueDaysResp = {
    code?: number
    msg?: string
  }

  type DomainAlarmDutyPersonReq = true

  type DomainAlarmDutyPersonResp = {
    code?: number
    msg?: string
  }

  type DomainAlarmDutyReq = true

  type DomainAlarmDutyResp = {
    code?: number
    msg?: string
  }

  type DomainAlarmNoResponseReq = {
    code?: number
    msg?: string
  }

  type DomainAlarmNoResponseResp = {
    code?: number
    msg?: string
  }

  type DomainAlarmWaitingReq = true

  type DomainAlarmWaitingResp = {
    code?: number
    msg?: string
  }

  type DomainAutoDryPushReq = true

  type DomainAutoDryPushResp = {
    code?: number
    msg?: string
  }

  type DomainAutoPushReq = true

  type DomainAutoPushResp = {
    code?: number
    msg?: string
  }

  type domainCertsListApiOpsDomainsByIdcertsParams = {
    id: string
  }

  type DomainCertsListReq = true

  type DomainCertsListResp = {
    code?: number
    data?: { list?: CertInfo[]; total?: number }
    msg?: string
  }

  type DomainCreateReq = {
    description?: string
    domainName?: string
    dueDays?: number
    port?: number
    userIds?: number[]
  }

  type DomainCreateResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certs?: CertInfo[]
      description?: string
      domainName?: string
      dueDays?: number
      dueDaysPersons?: DomainPersonInfo[]
      dutyPersons?: DomainPersonInfo[]
      dutyShifts?: ShiftInfo[]
      hostList?: DomainHostInfo[]
      id?: number
      isAuto?: boolean
      isWaf?: boolean
      lifeCycle?: string[]
      port?: number
      pushPersons?: DomainPersonInfo[]
      renewState?: string
    }
    msg?: string
  }

  type domainDeleteApiOpsDomainsByIdParams = {
    id: string
  }

  type DomainDeleteReq = true

  type DomainDeleteResp = {
    code?: number
    msg?: string
  }

  type DomainDryPushReq = {
    certid: number
    id: number
  }

  type DomainDryPushResp = {
    code?: number
    data?: { dryPushState?: string; message?: string }
    msg?: string
  }

  type domainDueDaysApiOpsDomainsDuedaysParams = {
    domain: string
    port: number
  }

  type DomainDueDaysReq = {
    domain: string
    port: number
  }

  type DomainDueDaysResp = {
    code?: number
    data?: { dueDays?: number }
    msg?: string
  }

  type DomainDutyWebHookReq = {
    id: number
    mobile: string
    renew: boolean
  }

  type DomainDutyWebHookResp = {
    code?: number
    msg?: string
  }

  type DomainHandlePushReq = true

  type DomainHandlePushResp = {
    code?: number
    msg?: string
  }

  type DomainHostInfo = {
    appName: string
    appUid: string
    certPath: string
    name: string
    uid: string
  }

  type DomainInfo = {
    CreatedAt: string
    CreatedBy: string
    UpdatedAt: string
    UpdatedBy: string
    certs: CertInfo[]
    description: string
    domainName: string
    dueDays: number
    dueDaysPersons: DomainPersonInfo[]
    dutyPersons: DomainPersonInfo[]
    dutyShifts: ShiftInfo[]
    hostList: DomainHostInfo[]
    id: number
    isAuto: boolean
    isWaf: boolean
    lifeCycle: string[]
    port: number
    pushPersons: DomainPersonInfo[]
    renewState: string
  }

  type domainPageListApiOpsDomainsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type DomainPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type DomainPageListResp = {
    code?: number
    data?: { list?: DomainInfo[]; total?: number }
    msg?: string
  }

  type DomainPersonInfo = {
    email: string
    id: number
    mobile: string
    userName: string
  }

  type DomainPushReq = {
    certid: number
    id: number
  }

  type DomainPushResp = {
    code?: number
    data?: { PushState?: string; message?: string }
    msg?: string
  }

  type DomainPushWebHookReq = {
    certid: number
    mobile: string
  }

  type DomainPushWebHookResp = {
    code?: number
    msg?: string
  }

  type DomainRemoveReq = true

  type DomainRemoveResp = {
    code?: number
    msg?: string
  }

  type Domainset = {
    autoUpdate?: number
    description?: string
    getWay?: string[]
    isArchive: boolean
    name: string
    officialSupportApi?: number
    overWall?: number
    tags?: string[]
    updateCycle?: string
    version?: string
  }

  type DomainsetAllVersion = {
    Id: number
    name: string
    versionTotal: number
    versions: DomainsetVersionInfo[]
  }

  type domainsetAllVersionsApiOpsDomainsetsVersionsParams = {
    tags?: string
  }

  type DomainsetAllVersionsReq = {
    tags?: string
  }

  type DomainsetAllVersionsResp = {
    code?: number
    data?: { list?: DomainsetAllVersion[]; total?: number }
    msg?: string
  }

  type DomainsetBackReq = {
    backRecordId: number
    description?: string
    envPushInfos: DomainsetEnvPushInfo[]
    pushNow: boolean
    pushType: string
    title: string
  }

  type DomainsetBackResp = {
    code?: number
    msg?: string
  }

  type DomainsetCreateReq = {
    autoUpdate?: number
    description?: string
    domains: string[]
    getWay?: string[]
    isArchive?: boolean
    name?: string
    officialSupportApi?: number
    overWall?: number
    tags?: string[]
    updateCycle?: string
    version?: string
  }

  type DomainsetCreateResp = {
    code?: number
    data?: { id?: number; name?: string }
    msg?: string
  }

  type domainsetDeleteApiOpsDomainsetsByIdParams = {
    id: string
  }

  type DomainsetDeleteReq = true

  type DomainsetDeleteResp = {
    code?: number
    msg?: string
  }

  type DomainsetEnvPushInfo = {
    domainsetVersionIds: number[]
    uid: string
  }

  type DomainsetEnvPushRecordInfo = {
    domainsetPushRecordVersions: DomainsetPushRecordVersion[]
    envName: string
    state: string
    uid: string
  }

  type DomainsetList = {
    auIds: number[]
    autoUpdate: number
    createBy: string
    createdAt: string
    description: string
    getWay: string[]
    id: number
    isArchive: boolean
    name: string
    officialSupportApi: number
    overWall: number
    tags: string[]
    updateBy: string
    updateCycle: string
    updatedAt: string
    version: string
  }

  type DomainsetListTagReq = true

  type DomainsetListTagResp = {
    code?: number
    data?: { tags?: string[] }
    msg?: string
  }

  type DomainsetOnlineReq = {
    description?: string
    envUids: string[]
    grayEnvName: string
    grayEnvUid: string
    pushNow: boolean
    pushType: string
    title: string
    versionIds: number[]
  }

  type DomainsetOnlineResp = {
    code?: number
    msg?: string
  }

  type DomainsetOptions = {
    id: number
    name: string
  }

  type DomainsetOptionsReq = true

  type DomainsetOptionsResp = {
    code?: number
    data?: { list?: DomainsetOptions[]; total?: number }
    msg?: string
  }

  type domainsetPageListApiOpsDomainsetsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
    envUid?: string
    overWall?: number
    autoUpdate?: number
    updateCycle?: string
    getWay?: string
    officialSupportApi?: number
    tags?: string
    ids?: string
  }

  type DomainsetPageListReq = {
    autoUpdate?: number
    current?: number
    envUid?: string
    getWay?: string
    ids?: string
    keywords?: string
    officialSupportApi?: number
    orderBy?: string
    overWall?: number
    pageSize?: number
    tags?: string
    updateCycle?: string
  }

  type DomainsetPageListResp = {
    code?: number
    data?: { list?: DomainsetList[]; total?: number }
    msg?: string
  }

  type DomainsetPushRecord = {
    backRecordId: number
    createBy: string
    createdAt: string
    description: string
    id: number
    pushNow: boolean
    pushType: string
    related: boolean
    title: string
    updateBy: string
    updatedAt: string
  }

  type domainsetPushRecordsPageListApiOpsDomainsetsPushrecordsParams = {
    domainsetId?: number
    envUid?: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type DomainsetPushRecordsPageListReq = {
    current?: number
    domainsetId?: number
    envUid?: string
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type DomainsetPushRecordsPageListResp = {
    code?: number
    data?: { list?: DomainsetPushRecord[]; total?: number }
    msg?: string
  }

  type domainsetPushRecordsReadOneApiOpsDomainsetsByPushrecordsidParams = {
    id: string
  }

  type DomainsetPushRecordsReadOneReq = true

  type DomainsetPushRecordsReadOneResp = {
    code?: number
    data?: {
      description?: string
      envInfos?: DomainsetEnvPushRecordInfo[]
      id?: number
      pushNow?: boolean
      pushType?: string
      title?: string
    }
    msg?: string
  }

  type DomainsetPushRecordVersion = {
    currentVersion: DomainsetVersionInfo
    domainsetId: number
    name: string
    newVersion: DomainsetVersionInfo
    oldVersion: DomainsetVersionInfo
  }

  type DomainsetPushReq = {
    description?: string
    envUids: string[]
    pushNow: boolean
    pushType: string
    related?: boolean
    title: string
    versionIds: number[]
  }

  type DomainsetPushResp = {
    code?: number
    msg?: string
  }

  type domainsetReadOneApiOpsDomainsetsByIdParams = {
    id: string
    versionId?: number
  }

  type DomainsetReadOneReq = {
    versionId?: number
  }

  type DomainsetReadOneResp = {
    code?: number
    data?: {
      createBy?: string
      createdAt?: string
      description?: string
      domains?: string[]
      id?: number
      name?: string
      updateBy?: string
      updatedAt?: string
    }
    msg?: string
  }

  type domainsetUpdateApiOpsDomainsetsByIdParams = {
    id: string
  }

  type domainsetUpdateInfoApiOpsDomainsetsByInfoidParams = {
    id: string
  }

  type DomainsetUpdateInfoReq = {
    autoUpdate: number
    getWay: string[]
    officialSupportApi: number
    overWall: number
    tags: string[]
    updateCycle: string
  }

  type DomainsetUpdateInfoResp = {
    code?: number
    msg?: string
  }

  type DomainsetUpdateReq = {
    autoUpdate?: number
    description?: string
    domains: string[]
    getWay?: string[]
    isArchive?: boolean
    name?: string
    officialSupportApi?: number
    overWall?: number
    tags?: string[]
    updateCycle?: string
    version?: string
  }

  type DomainsetUpdateResp = {
    code?: number
    msg?: string
  }

  type DomainsetVersionInfo = {
    domainsetVersionId: number
    domainsetVersionName: string
  }

  type domainsetVersionsApiOpsDomainsetsByIdversionsParams = {
    id: string
  }

  type domainsetVersionsOfEnvApiOpsDomainsetsByEnvuidParams = {
    uid: string
  }

  type DomainsetVersionsOfEnvReq = true

  type DomainsetVersionsOfEnvResp = {
    code?: number
    data?: { list?: CurrentEnvDomainset[]; total?: number }
    msg?: string
  }

  type domainsetVersionsReq = true

  type domainsetVersionsResp = {
    code?: number
    data?: { list?: DomainsetVersionInfo[]; total?: number }
    msg?: string
  }

  type DomainSyncReq = true

  type DomainSyncResp = {
    code?: number
    msg?: string
  }

  type domainUpdateDescribeApiOpsDomainsByDescriptionidParams = {
    id: string
  }

  type DomainUpdateDescribeReq = {
    description: string
  }

  type DomainUpdateDescribeResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certs?: CertInfo[]
      description?: string
      domainName?: string
      dueDays?: number
      dueDaysPersons?: DomainPersonInfo[]
      dutyPersons?: DomainPersonInfo[]
      dutyShifts?: ShiftInfo[]
      hostList?: DomainHostInfo[]
      id?: number
      isAuto?: boolean
      isWaf?: boolean
      lifeCycle?: string[]
      port?: number
      pushPersons?: DomainPersonInfo[]
      renewState?: string
    }
    msg?: string
  }

  type domainUpdateDueDaysPersonApiOpsDomainsByPersonsduedaysidParams = {
    id: string
  }

  type DomainUpdateDueDaysPersonReq = {
    userIds?: number[]
  }

  type DomainUpdateDueDaysPersonResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certs?: CertInfo[]
      description?: string
      domainName?: string
      dueDays?: number
      dueDaysPersons?: DomainPersonInfo[]
      dutyPersons?: DomainPersonInfo[]
      dutyShifts?: ShiftInfo[]
      hostList?: DomainHostInfo[]
      id?: number
      isAuto?: boolean
      isWaf?: boolean
      lifeCycle?: string[]
      port?: number
      pushPersons?: DomainPersonInfo[]
      renewState?: string
    }
    msg?: string
  }

  type domainUpdateDutyPersonApiOpsDomainsByPersonsdutyidParams = {
    id: string
  }

  type DomainUpdateDutyPersonReq = {
    userIds?: number[]
  }

  type DomainUpdateDutyPersonResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certs?: CertInfo[]
      description?: string
      domainName?: string
      dueDays?: number
      dueDaysPersons?: DomainPersonInfo[]
      dutyPersons?: DomainPersonInfo[]
      dutyShifts?: ShiftInfo[]
      hostList?: DomainHostInfo[]
      id?: number
      isAuto?: boolean
      isWaf?: boolean
      lifeCycle?: string[]
      port?: number
      pushPersons?: DomainPersonInfo[]
      renewState?: string
    }
    msg?: string
  }

  type domainUpdateDutyShiftApiOpsDomainsByShiftsdutyidParams = {
    id: string
  }

  type DomainUpdateDutyShiftReq = {
    shiftIds?: number[]
  }

  type DomainUpdateDutyShiftResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certs?: CertInfo[]
      description?: string
      domainName?: string
      dueDays?: number
      dueDaysPersons?: DomainPersonInfo[]
      dutyPersons?: DomainPersonInfo[]
      dutyShifts?: ShiftInfo[]
      hostList?: DomainHostInfo[]
      id?: number
      isAuto?: boolean
      isWaf?: boolean
      lifeCycle?: string[]
      port?: number
      pushPersons?: DomainPersonInfo[]
      renewState?: string
    }
    msg?: string
  }

  type domainUpdateHostApiOpsDomainsByHostsidParams = {
    id: string
  }

  type DomainUpdateHostReq = {
    hostUids?: string[]
  }

  type DomainUpdateHostResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certs?: CertInfo[]
      description?: string
      domainName?: string
      dueDays?: number
      dueDaysPersons?: DomainPersonInfo[]
      dutyPersons?: DomainPersonInfo[]
      dutyShifts?: ShiftInfo[]
      hostList?: DomainHostInfo[]
      id?: number
      isAuto?: boolean
      isWaf?: boolean
      lifeCycle?: string[]
      port?: number
      pushPersons?: DomainPersonInfo[]
      renewState?: string
    }
    msg?: string
  }

  type domainUpdatePortApiOpsDomainsByPortidParams = {
    id: string
  }

  type DomainUpdatePortReq = {
    port: number
  }

  type DomainUpdatePortResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certs?: CertInfo[]
      description?: string
      domainName?: string
      dueDays?: number
      dueDaysPersons?: DomainPersonInfo[]
      dutyPersons?: DomainPersonInfo[]
      dutyShifts?: ShiftInfo[]
      hostList?: DomainHostInfo[]
      id?: number
      isAuto?: boolean
      isWaf?: boolean
      lifeCycle?: string[]
      port?: number
      pushPersons?: DomainPersonInfo[]
      renewState?: string
    }
    msg?: string
  }

  type domainUpdatePushPersonApiOpsDomainsByPersonspushidParams = {
    id: string
  }

  type DomainUpdatePushPersonReq = {
    userIds?: number[]
  }

  type DomainUpdatePushPersonResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certs?: CertInfo[]
      description?: string
      domainName?: string
      dueDays?: number
      dueDaysPersons?: DomainPersonInfo[]
      dutyPersons?: DomainPersonInfo[]
      dutyShifts?: ShiftInfo[]
      hostList?: DomainHostInfo[]
      id?: number
      isAuto?: boolean
      isWaf?: boolean
      lifeCycle?: string[]
      port?: number
      pushPersons?: DomainPersonInfo[]
      renewState?: string
    }
    msg?: string
  }

  type domainUpdateRenewStateApiOpsDomainsByRenewstateidParams = {
    id: string
  }

  type DomainUpdateRenewStateReq = {
    renewState: string
  }

  type DomainUpdateRenewStateResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certs?: CertInfo[]
      description?: string
      domainName?: string
      dueDays?: number
      dueDaysPersons?: DomainPersonInfo[]
      dutyPersons?: DomainPersonInfo[]
      dutyShifts?: ShiftInfo[]
      hostList?: DomainHostInfo[]
      id?: number
      isAuto?: boolean
      isWaf?: boolean
      lifeCycle?: string[]
      port?: number
      pushPersons?: DomainPersonInfo[]
      renewState?: string
    }
    msg?: string
  }

  type domainUpdateWafApiOpsDomainsByWafidParams = {
    id: string
  }

  type DomainUpdateWafReq = {
    isWaf: boolean
  }

  type DomainUpdateWafResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      certs?: CertInfo[]
      description?: string
      domainName?: string
      dueDays?: number
      dueDaysPersons?: DomainPersonInfo[]
      dutyPersons?: DomainPersonInfo[]
      dutyShifts?: ShiftInfo[]
      hostList?: DomainHostInfo[]
      id?: number
      isAuto?: boolean
      isWaf?: boolean
      lifeCycle?: string[]
      port?: number
      pushPersons?: DomainPersonInfo[]
      renewState?: string
    }
    msg?: string
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
    Business?: string
    CityUid: string
    Count: number
    Description?: string
    EnvUid: string
    ExpirationTime?: number
    HostTypeUid: string
    Instance: Instance
    NeedConfirm: boolean
    Number?: number
    OpsUids?: string[]
    ProjectUid?: string
    SupportUids?: string[]
    TagList: string[]
    TeamIds: number[]
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

  type HostInfo = {
    InstanceId?: string
    LoginPort?: number
    LoginUser?: string
    Password?: string
    PrivateIpAddresses?: string[]
    PublicIpAddresses?: string[]
    Uuid?: string
  }

  type HostPushRecord = {
    connectState: boolean
    hostName: string
    hostUid: string
    message: string
    pushState: boolean
    restartState: boolean
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

  type Ipset = {
    autoUpdate?: number
    description?: string
    getWay?: string[]
    isArchive: boolean
    name: string
    officialSupportApi?: number
    overWall?: number
    tags?: string[]
    updateCycle?: string
    version?: string
  }

  type IpsetAllVersion = {
    Id: number
    name: string
    versionTotal: number
    versions: IpsetVersionInfo[]
  }

  type ipsetAllVersionsApiOpsIpsetsVersionsParams = {
    tags?: string
  }

  type IpsetAllVersionsReq = {
    tags?: string
  }

  type IpsetAllVersionsResp = {
    code?: number
    data?: { list?: IpsetAllVersion[]; total?: number }
    msg?: string
  }

  type IpsetAutoGrayPushReq = true

  type IpsetAutoGrayPushResp = {
    code?: number
    msg?: string
  }

  type IpsetAutoOnlinePushReq = true

  type IpsetAutoOnlinePushResp = {
    code?: number
    msg?: string
  }

  type IpsetBackReq = {
    backRecordId: number
    description?: string
    envPushInfos: IpsetEnvPushInfo[]
    pushNow: boolean
    pushType: string
    title: string
  }

  type IpsetBackResp = {
    code?: number
    msg?: string
  }

  type IpsetCreateReq = {
    autoUpdate?: number
    cidrs: string[]
    description?: string
    getWay?: string[]
    isArchive?: boolean
    name?: string
    officialSupportApi?: number
    overWall?: number
    tags?: string[]
    updateCycle?: string
    version?: string
  }

  type IpsetCreateResp = {
    code?: number
    data?: { id?: number; name?: string }
    msg?: string
  }

  type ipsetDeleteApiOpsIpsetsByIdParams = {
    id: string
  }

  type IpsetDeleteReq = true

  type IpsetDeleteResp = {
    code?: number
    msg?: string
  }

  type IpsetEnvPushInfo = {
    ipsetVersionIds: number[]
    uid: string
  }

  type IpsetEnvPushRecordInfo = {
    envName: string
    ipsetPushRecordVersions: IpsetPushRecordVersion[]
    state: string
    uid: string
  }

  type IpsetList = {
    auIds: number[]
    autoUpdate: number
    createBy: string
    createdAt: string
    description: string
    getWay: string[]
    id: number
    isArchive: boolean
    name: string
    officialSupportApi: number
    overWall: number
    tags: string[]
    updateBy: string
    updateCycle: string
    updatedAt: string
    version: string
  }

  type IpsetListTagReq = true

  type IpsetListTagResp = {
    code?: number
    data?: { tags?: string[] }
    msg?: string
  }

  type IpsetOnlineReq = {
    description?: string
    envUids: string[]
    grayEnvName: string
    grayEnvUid: string
    pushNow: boolean
    pushType: string
    title: string
    versionIds: number[]
  }

  type IpsetOnlineResp = {
    code?: number
    msg?: string
  }

  type IpsetOptions = {
    id: number
    name: string
  }

  type IpsetOptionsReq = true

  type IpsetOptionsResp = {
    code?: number
    data?: { list?: IpsetOptions[]; total?: number }
    msg?: string
  }

  type ipsetPageListApiOpsIpsetsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
    envUid?: string
    overWall?: number
    autoUpdate?: number
    updateCycle?: string
    getWay?: string
    officialSupportApi?: number
    tags?: string
    ids?: string
  }

  type IpsetPageListReq = {
    autoUpdate?: number
    current?: number
    envUid?: string
    getWay?: string
    ids?: string
    keywords?: string
    officialSupportApi?: number
    orderBy?: string
    overWall?: number
    pageSize?: number
    tags?: string
    updateCycle?: string
  }

  type IpsetPageListResp = {
    code?: number
    data?: { list?: IpsetList[]; total?: number }
    msg?: string
  }

  type IpsetPushRecord = {
    backRecordId: number
    createBy: string
    createdAt: string
    description: string
    id: number
    pushNow: boolean
    pushType: string
    related: boolean
    title: string
    updateBy: string
    updatedAt: string
  }

  type ipsetPushRecordsPageListApiOpsIpsetsPushrecordsParams = {
    ipsetId?: number
    envUid?: string
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type IpsetPushRecordsPageListReq = {
    current?: number
    envUid?: string
    ipsetId?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type IpsetPushRecordsPageListResp = {
    code?: number
    data?: { list?: IpsetPushRecord[]; total?: number }
    msg?: string
  }

  type ipsetPushRecordsReadOneApiOpsIpsetsByPushrecordsidParams = {
    id: string
  }

  type IpsetPushRecordsReadOneReq = true

  type IpsetPushRecordsReadOneResp = {
    code?: number
    data?: {
      description?: string
      envInfos?: IpsetEnvPushRecordInfo[]
      id?: number
      pushNow?: boolean
      pushType?: string
      title?: string
    }
    msg?: string
  }

  type IpsetPushRecordVersion = {
    currentVersion: IpsetVersionInfo
    ipsetId: number
    name: string
    newVersion: IpsetVersionInfo
    oldVersion: IpsetVersionInfo
  }

  type IpsetPushReq = {
    description?: string
    envUids: string[]
    pushNow: boolean
    pushType: string
    related?: boolean
    title: string
    versionIds: number[]
  }

  type IpsetPushResp = {
    code?: number
    msg?: string
  }

  type ipsetReadOneApiOpsIpsetsByIdParams = {
    id: string
    versionId?: number
  }

  type IpsetReadOneReq = {
    versionId?: number
  }

  type IpsetReadOneResp = {
    code?: number
    data?: {
      cidrs?: string[]
      createBy?: string
      createdAt?: string
      description?: string
      id?: number
      name?: string
      updateBy?: string
      updatedAt?: string
    }
    msg?: string
  }

  type IpsetTemplate = {
    exclude?: string[]
    isp?: string
    limit: string[]
    name: string
  }

  type IpsetTemplateCreateReq = {
    exclude?: string[]
    isp?: string
    limit?: string[]
    name?: string
  }

  type IpsetTemplateCreateResp = {
    code?: number
    msg?: string
  }

  type ipsetTemplateDeleteApiOpsIpsetsTemplatesByIdParams = {
    id: string
  }

  type IpsetTemplateDeleteReq = true

  type IpsetTemplateDeleteResp = {
    code?: number
    msg?: string
  }

  type IpsetTemplateGenerateDataReq = {
    ipsetTemplateIdList?: number[]
  }

  type IpsetTemplateGenerateDataResp = {
    code?: number
    msg?: string
  }

  type IpsetTemplateInfo = {
    exclude?: string[]
    id: number
    isp?: string
    limit: string[]
    name: string
  }

  type ipsetTemplatePageListApiOpsIpsetsTemplatesParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type IpsetTemplatePageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type IpsetTemplatePageListResp = {
    code?: number
    data?: { list?: IpsetTemplateInfo[]; total?: number }
    msg?: string
  }

  type ipsetTemplateUpdateApiOpsIpsetsTemplatesByIdParams = {
    id: string
  }

  type IpsetTemplateUpdateReq = {
    exclude?: string[]
    isp?: string
    limit?: string[]
    name?: string
  }

  type IpsetTemplateUpdateResp = {
    code?: number
    msg?: string
  }

  type ipsetUpdateApiOpsIpsetsByIdParams = {
    id: string
  }

  type ipsetUpdateInfoApiOpsIpsetsByInfoidParams = {
    id: string
  }

  type IpsetUpdateInfoReq = {
    autoUpdate: number
    getWay: string[]
    officialSupportApi: number
    overWall: number
    tags: string[]
    updateCycle: string
  }

  type IpsetUpdateInfoResp = {
    code?: number
    msg?: string
  }

  type IpsetUpdateReq = {
    autoUpdate?: number
    cidrs: string[]
    description?: string
    getWay?: string[]
    isArchive?: boolean
    name?: string
    officialSupportApi?: number
    overWall?: number
    tags?: string[]
    updateCycle?: string
    version?: string
  }

  type IpsetUpdateResp = {
    code?: number
    msg?: string
  }

  type IpsetVersionInfo = {
    ipsetVersionId: number
    ipsetVersionName: string
  }

  type ipsetVersionsApiOpsIpsetsByIdversionsParams = {
    id: string
  }

  type ipsetVersionsOfEnvApiOpsIpsetsByEnvuidParams = {
    uid: string
  }

  type IpsetVersionsOfEnvReq = true

  type IpsetVersionsOfEnvResp = {
    code?: number
    data?: { list?: CurrentEnvIpset[]; total?: number }
    msg?: string
  }

  type ipsetVersionsReq = true

  type ipsetVersionsResp = {
    code?: number
    data?: { list?: IpsetVersionInfo[]; total?: number }
    msg?: string
  }

  type IspInfo = {
    id: number
    name: string
  }

  type ispListApiOpsIpsetsTemplatesIspParams = {
    keywords?: string
  }

  type IspListReq = {
    keywords?: string
  }

  type IspListResp = {
    code?: number
    data?: { list?: IspInfo[]; total?: number }
    msg?: string
  }

  type LocationInfo = {
    id: number
    name: string
  }

  type locationListApiOpsIpsetsTemplatesLocationParams = {
    keywords?: string
  }

  type LocationListReq = {
    keywords?: string
  }

  type LocationListResp = {
    code?: number
    data?: { list?: LocationInfo[]; total?: number }
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

  type Release = {
    Cloud: string
    Cpu: number
    CreatedAt: string
    CreatedBy: string
    Env: string
    HostName: string
    Id: number
    InstanceId: string
    Memory: number
    Ops: string[]
    PrivateIpAddresses: string[]
    Projects: string[]
    PublicIpAddresses: string[]
    Region: string
    ResourceInfo: string
    ResourceType: string
    Supports: string[]
    Zone: string
  }

  type ReleaseHostParams = {
    DestroyIns: boolean
    Uid: string
  }

  type ReleaseHostReq = {
    PlanTime: number
    hosts: ReleaseHostParams[]
    remark?: string
    topic: string
  }

  type ReleaseHostResp = {
    code?: number
    msg?: string
  }

  type ReleaseInstanceReq = {
    Uids: string[]
    remark?: string
    topic: string
  }

  type ReleaseInstanceResp = {
    code?: number
    msg?: string
  }

  type releasePageListApiOpsReleasesParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
    Ips?: string
  }

  type ReleasePageListReq = {
    Ips?: string
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type ReleasePageListResp = {
    code?: number
    data?: { list?: Release[]; total?: number }
    msg?: string
  }

  type ShiftInfo = {
    id: number
    name: string
  }

  type SubDataListReq = {
    current?: number
    keyword?: string
    orderBy?: string
    pageSize?: number
  }

  type subTaskCancelApiOpsBySubtasksidcancelParams = {
    id: string
  }

  type SubTaskCancelReq = true

  type SubTaskCancelResp = {
    code?: number
    msg?: string
  }

  type SubTaskInfo = {
    Ip: string
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
    createdAt: string
    createdBy: string
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
    updatedAt: string
    updatedBy: string
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
