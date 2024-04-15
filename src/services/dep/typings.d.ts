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

  type EmptyReq = true

  type OptUserInfo = {
    createBy: string
    createdAt: string
    id: number
    updateBy: string
    updatedAt: string
  }

  type PackageInfo = {
    repo: string
    version: string
  }

  type Packages = {
    repo: string
    version: string[]
  }

  type PackagesAllRepoReq = true

  type PackagesAllRepoResp = {
    code?: number
    data?: { repos?: string[] }
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
    data?: { repos?: string[] }
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
    data?: { list?: Packages[]; total?: number }
    msg?: string
  }

  type packagesVersionApiDepPackagesByRepoversionParams = {
    repo: string
  }

  type PackagesVersionReq = true

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

  type SubDataListReq = {
    current?: number
    keyword?: string
    orderBy?: string
    pageSize?: number
  }

  type Task = {
    envId: string
    job: string
    operator: string
    package: PackageInfo[]
    product: string
    taskType: string
    title: string
    type: string
  }

  type TaskCreateReq = {
    envId?: string
    job?: string
    operator?: string
    package?: PackageInfo[]
    product?: string
    taskType?: string
    title?: string
    type?: string
  }

  type TaskCreateResp = {
    code?: number
    data?: { id?: number }
    msg?: string
  }

  type TaskInfo = {
    CreatedAt: string
    CreatedBy: string
    UpdatedAt: string
    UpdatedBy: string
    buildId: string
    duration: number
    envId: string
    envName: string
    id: number
    job: string
    operator: string
    package: PackageInfo[]
    product: string
    state: string
    taskType: string
    timestamp: string
    title: string
    type: string
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

  type taskStateApiDepTasksByStateidParams = {
    id: string
  }

  type TaskStateReq = true

  type TaskStateResp = {
    code?: number
    data?: { state?: string }
    msg?: string
  }
}
