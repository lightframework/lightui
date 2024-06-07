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

  type ModuleInfo = {
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
  }

  type PackagesOnlineVersionReq = {
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
    envId: string
    job: string
    operator?: string
    package: PackageInfo[]
    product: string
    taskType: string
    title?: string
    toolsType: string
    type: string
  }

  type TaskAllEnvReq = true

  type TaskAllEnvResp = {
    code?: number
    data?: { data?: DeployEnv[]; title?: number }
    msg?: string
  }

  type TaskCreateBackReq = {
    caller?: string
    envId: string
    job: string
    operator?: string
    package: PackageInfo[]
    product: string
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
    envId?: string
    installMonitor?: boolean
    job?: string
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
    envId?: string
    job?: string
    operator?: string
    package?: PackageInfo[]
    product?: string
    taskType?: string
    title?: string
    toolsType?: string
    type?: string
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
    envId: string
    installMonitor: boolean
    job: string
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
    id: number
    job: string
    message: string
    operator?: string
    package: PackageInfo[]
    product: string
    state: string
    taskBackId?: number
    taskType: string
    timestamp: string
    title?: string
    toolsType: string
    type: string
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

  type taskPageListApiDepTasksParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
    envId?: string
    repo?: string
    version?: string
    state?: string
  }

  type TaskPageListReq = {
    current?: number
    envId?: string
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
    data?: { state?: string; url?: string }
    msg?: string
  }
}
