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

  type Cert = {
    certName: string
    description?: string
    domain: string
  }

  type CertAlarmReq = true

  type CertAlarmResp = {
    code?: number
    msg?: string
  }

  type CertCreateReq = {
    certName?: string
    description?: string
    domain?: string
  }

  type CertCreateResp = {
    code?: number
    msg?: string
  }

  type certDeleteApiOpsCertsByIdParams = {
    id: string
  }

  type CertDeleteReq = true

  type CertDeleteResp = {
    code?: number
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

  type CertHostInfo = {
    appName: string
    appUid: string
    name: string
    uid: string
  }

  type CertInfo = {
    CreatedAt: string
    CreatedBy: string
    UpdatedAt: string
    UpdatedBy: string
    certId: string
    certName: string
    certState: string
    cloud: string
    description: string
    domain: string
    hostList: CertHostInfo[]
    id: number
    isAuto: boolean
    notAfter: string
    notBefore: string
  }

  type CertListReq = true

  type CertListResp = {
    code?: number
    data?: { list?: CertInfo[]; total?: number }
    msg?: string
  }

  type certPageListApiOpsCertsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type CertPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type CertPageListResp = {
    code?: number
    data?: { list?: CertInfo[]; total?: number }
    msg?: string
  }

  type CertPushReq = {
    certIds: number[]
    description?: string
    orderTime: string
    title: string
  }

  type CertPushResp = {
    code?: number
    msg?: string
  }

  type certReadOneApiOpsCertsByIdParams = {
    id: string
  }

  type CertReadOneReq = true

  type CertReadOneResp = {
    code?: number
    data?: { data?: CertInfo }
    msg?: string
  }

  type CertRecordCert = {
    certId: number
    certName: string
    domain: string
    hostPushRecords: HostPushRecord[]
    reviewState: boolean
  }

  type CertRecordList = {
    CreatedAt: string
    CreatedBy: string
    UpdatedAt: string
    UpdatedBy: string
    description?: string
    id: number
    orderTime: string
    state: boolean
    title: string
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
    data?: { list?: CertRecordCert[]; total?: number }
    msg?: string
  }

  type CertRemoveReq = true

  type CertRemoveResp = {
    code?: number
    msg?: string
  }

  type CertSyncReq = true

  type CertSyncResp = {
    code?: number
    msg?: string
  }

  type certUpdateApiOpsCertsByIdParams = {
    id: string
  }

  type CertUpdateReq = {
    certName?: string
    certState?: string
    description?: string
    domain?: string
    hostUids?: string[]
  }

  type CertUpdateResp = {
    code?: number
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

  type EmptyReq = true

  type EnvPushInfo = {
    ipsetVersionIds: number[]
    uid: string
  }

  type EnvPushRecordInfo = {
    envName: string
    ipsetPushRecordVersions: IpsetPushRecordVersion[]
    isGray: boolean
    uid: string
  }

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
    errorInfo: string
    hostName: string
    hostUid: string
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
    description?: string
    isArchive: boolean
    name: string
    version?: string
  }

  type IpsetAllVersion = {
    Id: number
    name: string
    versionTotal: number
    versions: VersionInfo[]
  }

  type IpsetAllVersionsReq = true

  type IpsetAllVersionsResp = {
    code?: number
    data?: { list?: IpsetAllVersion[]; total?: number }
    msg?: string
  }

  type IpsetBackReq = {
    backRecordId: number
    description?: string
    envPushInfos: EnvPushInfo[]
    pushNow: boolean
    pushType: string
    title: string
  }

  type IpsetBackResp = {
    code?: number
    msg?: string
  }

  type IpsetCreateReq = {
    cidrs: string[]
    description?: string
    isArchive?: boolean
    name?: string
    version?: string
  }

  type IpsetCreateResp = {
    code?: number
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

  type IpsetList = {
    createBy: string
    createdAt: string
    description: string
    id: number
    isArchive: boolean
    name: string
    updateBy: string
    updatedAt: string
    version: string
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

  type ipsetPageListApiOpsIpsetsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type IpsetPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
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
      envInfos?: EnvPushRecordInfo[]
      id?: number
      pushNow?: boolean
      pushType?: string
      title?: string
    }
    msg?: string
  }

  type IpsetPushRecordVersion = {
    currentVersion: VersionInfo
    ipsetId: number
    name: string
    newVersion: VersionInfo
    oldVersion: VersionInfo
  }

  type IpsetPushReq = {
    description?: string
    envUids: string[]
    pushNow: boolean
    pushType: string
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

  type IpsetUpdateReq = {
    cidrs: string[]
    description?: string
    isArchive?: boolean
    name?: string
    version?: string
  }

  type IpsetUpdateResp = {
    code?: number
    msg?: string
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
    data?: { list?: VersionInfo[]; total?: number }
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
    DelayDays: number
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

  type VersionInfo = {
    ipsetVersionId: number
    ipsetVersionName: string
  }

  type VpcSubnetConf = true
}
