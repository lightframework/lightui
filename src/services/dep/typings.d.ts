declare namespace DEP {
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

  type Crontab = {
    applicant: string[]
    endTime: string
    envUid: string
    level: number
    operatorIds: number[]
    startTime: string
    version: string
  }

  type CrontabCreateReq = {
    applicant?: string[]
    endTime?: string
    envUid?: string
    level?: number
    operatorIds?: number[]
    startTime?: string
    version?: string
  }

  type CrontabCreateResp = {
    code?: number
    msg?: string
  }

  type CrontabCycleReq = true

  type CrontabCycleResp = {
    code?: number
    msg?: string
  }

  type CrontabDeleteReq = {
    id: number
    reason?: string
  }

  type CrontabDeleteResp = {
    code?: number
    msg?: string
  }

  type CrontabDutyReq = {
    date: string
  }

  type CrontabDutyResp = {
    code?: number
    data?: { total?: number; users?: User[] }
    msg?: string
  }

  type crontabFinishApiDepCrontabsByFinishidParams = {
    id: string
  }

  type CrontabFinishReq = true

  type CrontabFinishResp = {
    code?: number
    msg?: string
  }

  type CrontabInfo = {
    applicant: string[]
    createdAt: string
    createdBy: string
    endTime: string
    envId: string
    envName: string
    envUid: string
    id: number
    isEdit: boolean
    level: number
    mobileNoticeId: string
    noticeState: string
    operators: User[]
    startTime: string
    updatedAt: string
    updatedBy: string
    version: string
  }

  type CrontabNoticeReq = {
    id: number
    noticeType: string
  }

  type CrontabNoticeResp = {
    code?: number
    msg?: string
  }

  type crontabPageListApiDepCrontabsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
  }

  type CrontabPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type CrontabPageListResp = {
    code?: number
    data?: { list?: CrontabInfo[]; total?: number }
    msg?: string
  }

  type crontabStartApiDepCrontabsByStartidParams = {
    id: string
  }

  type crontabStartNoticeApiDepCrontabsByStartnoticeidParams = {
    id: string
  }

  type CrontabStartNoticeReq = true

  type CrontabStartNoticeResp = {
    code?: number
    msg?: string
  }

  type CrontabStartReq = true

  type CrontabStartResp = {
    code?: number
    msg?: string
  }

  type crontabUpdateEndTimeApiDepCrontabsByUpdateidendtimeParams = {
    id: string
  }

  type CrontabUpdateEndTimeReq = {
    endTime: string
  }

  type CrontabUpdateEndTimeResp = {
    code?: number
    msg?: string
  }

  type crontabUpdateOperatorApiDepCrontabsByUpdateidoperatorsParams = {
    id: string
  }

  type CrontabUpdateOperatorReq = {
    operatorIds: number[]
  }

  type CrontabUpdateOperatorResp = {
    code?: number
    msg?: string
  }

  type crontabUpdateStartTimeApiDepCrontabsByUpdateidstarttimeParams = {
    id: string
  }

  type CrontabUpdateStartTimeReq = {
    startTime: string
  }

  type CrontabUpdateStartTimeResp = {
    code?: number
    msg?: string
  }

  type DataListReq = {
    current?: number
    keyword?: string
    orderBy?: string
    pageSize?: number
  }

  type DeployEnv = {
    EnvName: string
    envId: string
    locker: string
    uid: string
  }

  type EmptyReq = true

  type getLatestCrontabApiDepCrontabsByIdenvIdParams = {
    envId: string
    state: string
  }

  type GetLatestCrontabReq = {
    state: string
  }

  type GetLatestCrontabResp = {
    code?: number
    data?: { id?: number }
    msg?: string
  }

  type ModuleInfo = {
    commitId: string
    moduleName: string
    version: string
  }

  type OptUserInfo = {
    createBy: string
    createdAt: string
    id: number
    updateBy: string
    updatedAt: string
  }

  type PackageCrypInfo = {
    module: string
    version: string
  }

  type PackageInfo = {
    module: ModuleInfo[]
    repo: string
  }

  type PackagesAllRepoReq = true

  type PackagesAllRepoResp = {
    code?: number
    data?: { data?: RepoInfo[] }
    msg?: string
  }

  type packagesCommitIdApiDepPackagesCommitidParams = {
    repo: string
    version: string
    module?: string
  }

  type PackagesCommitIdReq = {
    module?: string
    repo: string
    version: string
  }

  type PackagesCommitIdResp = {
    code?: number
    data?: { list?: string[] }
    msg?: string
  }

  type PackagesDeployRepoReq = true

  type PackagesDeployRepoResp = {
    code?: number
    data?: { repos?: string[] }
    msg?: string
  }

  type packagesDeployVersionApiDepPackagesVersiondeployParams = {
    repo?: string
  }

  type PackagesDeployVersionReq = {
    repo?: string
  }

  type PackagesDeployVersionResp = {
    code?: number
    data?: { versions?: string[] }
    msg?: string
  }

  type PackagesDownloadReq = {
    repo: string
    version: string
  }

  type PackagesDownloadResp = {
    code?: number
    data?: { url?: string }
    msg?: string
  }

  type PackagesOnlineRepoReq = true

  type PackagesOnlineRepoResp = {
    code?: number
    data?: { data?: RepoInfo[] }
    msg?: string
  }

  type packagesOnlineVersionApiDepPackagesVersiononlineParams = {
    repo: string
    module?: string
  }

  type PackagesOnlineVersionReq = {
    module?: string
    repo: string
  }

  type PackagesOnlineVersionResp = {
    code?: number
    data?: { versions?: string[] }
    msg?: string
  }

  type PackagesSyncReq = true

  type PackagesSyncResp = {
    code?: number
    data?: { list?: PackageInfo[]; total?: number }
    msg?: string
  }

  type PackagesUpdateStateReq = {
    repo: string
    state: string
    version: string
  }

  type PackagesUpdateStateResp = {
    code?: number
    data?: { id?: number; repo?: string; state?: string; version?: string }
    msg?: string
  }

  type packagesVersionApiDepPackagesByRepoversionParams = {
    repo: string
    module?: string
  }

  type PackagesVersionReq = {
    module?: string
  }

  type PackagesVersionResp = {
    code?: number
    data?: { versions?: string[] }
    msg?: string
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

  type RepoInfo = {
    name: string
    repos: string[]
  }

  type Stage = {
    buildId?: string
    durationInMillis: number
    id: number
    link?: string
    messaage?: string
    name: string
    oriStageId?: string
    result: string
    stageId: string
    startTime: string
    state: string
  }

  type StageSetReq = {
    buildId?: string
    id: number
    stageId: string
  }

  type StageSetResp = {
    code?: number
    msg?: string
  }

  type SubDataListReq = {
    current?: number
    keyword?: string
    orderBy?: string
    pageSize?: number
  }

  type Task = {
    caller?: string
    envUid: string
    job: string
    operator?: string
    package: PackageInfo[]
    product: string
    standardArchitecture: boolean
    taskType: string
    title?: string
    toolsType: string
    type: string
    updateMode?: string
  }

  type TaskAllEnvReq = true

  type TaskAllEnvResp = {
    code?: number
    data?: { data?: DeployEnv[]; title?: number }
    msg?: string
  }

  type TaskCreateBackReq = {
    caller?: string
    envUid: string
    job: string
    operator?: string
    package: PackageInfo[]
    product: string
    standardArchitecture: boolean
    taskBackId: number
    taskType: string
    title?: string
    toolsType: string
    type: string
  }

  type TaskCreateBackResp = {
    code?: number
    data?: { envUid?: string; id?: number }
    msg?: string
  }

  type TaskCreateCrypReq = {
    caller?: string
    cmnSetKeepalived?: boolean
    csdpSetKeepalived?: boolean
    envUid?: string
    installMonitor?: boolean
    job?: string
    oldModule?: ModuleInfo[]
    operator?: string
    osmSetKeepalived?: boolean
    package?: PackageInfo[]
    product?: string
    setDomain?: boolean
    taskType?: string
    title?: string
    toolsType?: string
    type?: string
  }

  type TaskCreateCrypResp = {
    code?: number
    data?: { envUid?: string; id?: number }
    msg?: string
  }

  type TaskCreateReq = {
    caller?: string
    envUid?: string
    job?: string
    operator?: string
    package?: PackageInfo[]
    product?: string
    standardArchitecture?: boolean
    taskType?: string
    title?: string
    toolsType?: string
    type?: string
    updateMode?: string
  }

  type TaskCreateResp = {
    code?: number
    data?: { envUid?: string; id?: number }
    msg?: string
  }

  type TaskCryp = {
    caller?: string
    cmnSetKeepalived: boolean
    csdpSetKeepalived: boolean
    envUid: string
    installMonitor: boolean
    job: string
    oldModule?: ModuleInfo[]
    operator?: string
    osmSetKeepalived: boolean
    package: PackageInfo[]
    product: string
    setDomain: boolean
    taskType: string
    title?: string
    toolsType: string
    type: string
  }

  type TaskInfo = {
    CreatedAt: string
    CreatedBy: string
    Locker?: string
    UpdatedAt: string
    UpdatedBy: string
    buildId: string
    duration: number
    envId: string
    envName: string
    envUid: string
    id: number
    job: string
    message: string
    operator?: string
    package: PackageInfo[]
    params?: string
    product: string
    state: string
    taskBackId?: number
    taskType: string
    timestamp: string
    title?: string
    toolsType: string
    type: string
    updateMode?: string
  }

  type taskLatestUpgradeApiDepTasksLatestParams = {
    envId: string
  }

  type TaskLatestUpgradeReq = {
    envId: string
  }

  type TaskLatestUpgradeResp = {
    code?: number
    data?: {
      package?: PackageInfo[]
      product?: string
      taskBackId?: number
      toolsType?: string
      type?: string
    }
    msg?: string
  }

  type TaskLimitReq = {
    uid: string
  }

  type TaskLimitResp = {
    code?: number
    data?: { flag?: boolean }
    msg?: string
  }

  type taskPageListApiDepTasksParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
    envUid?: string
    repo?: string
    version?: string
    state?: string
  }

  type TaskPageListReq = {
    current?: number
    envUid?: string
    keywords?: string
    orderBy?: string
    pageSize?: number
    repo?: string
    state?: string
    version?: string
  }

  type TaskPageListResp = {
    code?: number
    data?: { list?: TaskInfo[]; total?: number }
    msg?: string
  }

  type taskReadOneApiDepTasksByIdParams = {
    id: string
  }

  type TaskReadOneReq = true

  type TaskReadOneResp = {
    code?: number
    data?: { list?: Stage[]; total?: number }
    msg?: string
  }

  type taskRefreshApiDepTasksRefreshParams = {
    id?: number
  }

  type TaskRefreshReq = {
    id?: number
  }

  type TaskRefreshResp = {
    code?: number
    msg?: string
  }

  type taskRestartStageApiDepTasksByIdstageidParams = {
    id: string
    stageid: string
  }

  type TaskRestartStageReq = true

  type TaskRestartStageResp = {
    code?: number
    msg?: string
  }

  type TaskSetReq = {
    buildId: string
    id: number
  }

  type TaskSetResp = {
    code?: number
    msg?: string
  }

  type taskStateApiDepTasksByStateidParams = {
    id: string
  }

  type TaskStateReq = true

  type TaskStateResp = {
    code?: number
    data?: { stage?: string; state?: string; url?: string }
    msg?: string
  }

  type taskUpdateStageErrorApiDepTasksByUpdatetaskIderrstageIdParams = {
    taskId: string
    stageId: string
  }

  type TaskUpdateStageErrorReq = true

  type TaskUpdateStageErrorResp = {
    code?: number
    msg?: string
  }

  type UpgradeEventCrontabReq = {
    processCode: string
    processInstanceId: string
  }

  type UpgradeEventCrontabResp = {
    code?: number
    msg?: string
  }

  type User = {
    email: string
    id: number
    mobile: string
    nickname: string
    username: string
  }
}
