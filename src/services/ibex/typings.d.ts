declare namespace IBEX {
  type Host = {
    host: string
    id: number
    status: string
    stderr: string
    stdout: string
  }

  type taskListApiIbexTasksParams = {
    p: number
    limit: number
    days: number
    creator?: string
    query?: string
  }

  type TaskMeta = {
    account: string
    args: string
    batch: number
    created: string
    creator: string
    done: boolean
    id: number
    pause: string
    script: string
    stdin: string
    timeout: number
    title: string
    tolerance: number
  }

  type taskReadOneApiIbexByTasksidParams = {
    id: string
  }

  type TaskReadOneReq = true

  type TaskReadOneResp = {
    code?: number
    data?: { action?: string; hosts?: Host[]; meta?: TaskMeta }
    msg?: string
  }

  type TaskRecord = {
    account: string
    args?: string
    batch: number
    hosts: string[]
    pause: string
    script: string
    timeout: number
    title: string
    tolerance: number
  }

  type TaskRecordCreateReq = {
    account?: string
    args?: string
    batch?: number
    hosts?: string[]
    pause?: string
    script?: string
    timeout?: number
    title?: string
    tolerance?: number
  }

  type TaskRecordCreateResp = {
    code?: number
    msg?: string
  }

  type TaskRecordListReq = {
    creator?: string
    days: number
    limit: number
    p: number
    query?: string
  }

  type TaskRecordListResp = {
    code?: number
    data?: { items?: TaskMeta[]; total?: number }
    msg?: string
  }

  type TaskRecordUpdateReq = {
    account?: string
    args?: string
    batch?: number
    hosts?: string[]
    pause?: string
    script?: string
    timeout?: number
    title?: string
    tolerance?: number
  }

  type TaskRecordUpdateResp = {
    code?: number
    msg?: string
  }

  type TaskTpl = {
    account: string
    args?: string
    batch: number
    category: string
    hosts?: string[]
    pause: string
    script: string
    tags?: string[]
    timeout: number
    title: string
    tolerance: number
  }

  type TaskTplCreateReq = {
    account?: string
    args?: string
    batch?: number
    category?: string
    hosts?: string[]
    pause?: string
    script?: string
    tags?: string[]
    timeout?: number
    title?: string
    tolerance?: number
  }

  type TaskTplCreateResp = {
    code?: number
    msg?: string
  }

  type TaskTplDeleteReq = true

  type TaskTplDeleteResp = {
    code?: number
    msg?: string
  }

  type TaskTplInfo = {
    account: string
    args: string
    batch: number
    category: string
    create_at: number
    create_by: string
    hosts: string[]
    id: number
    pause: string
    script: string
    tags: string[]
    timeout: number
    title: string
    tolerance: number
    update_at: number
    update_by: string
  }

  type TaskTplListReq = {
    limit: number
    p: number
    query?: string
  }

  type TaskTplListResp = {
    code?: number
    data?: { items?: TaskTplInfo[]; total?: number }
    msg?: string
  }

  type TaskTplReadOneReq = true

  type TaskTplReadOneResp = {
    code?: number
    data?: { data?: TaskTplInfo }
    msg?: string
  }

  type TaskTplUpdateReq = {
    account?: string
    args?: string
    batch?: number
    category?: string
    hosts?: string[]
    pause?: string
    script?: string
    tags?: string[]
    timeout?: number
    title?: string
    tolerance?: number
  }

  type TaskTplUpdateResp = {
    code?: number
    msg?: string
  }

  type taskUpdateApiIbexByTasksidParams = {
    id: string
  }

  type tplDeleteApiIbexByTplsidParams = {
    id: string
  }

  type tplListApiIbexTplsParams = {
    p: number
    limit: number
    query?: string
  }

  type tplReadOneApiIbexByTplsidParams = {
    id: string
  }

  type tplUpdateApiIbexByTplsidParams = {
    id: string
  }
}
