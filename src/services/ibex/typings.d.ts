declare namespace IBEX {
  type CtfConf = {
    content: string
    ctf_type: string
  }

  type CtfConfInfo = {
    content: string
    created_at: string
    created_by: string
    ctf_type: string
    id: number
    state: string
    updated_at: string
    updated_by: string
  }

  type CtfTpl = {
    content: string
    ctf_type: string
    remark?: string
    tpl_name: string
  }

  type CtfTplCreateReq = {
    content?: string
    ctf_type?: string
    remark?: string
    tpl_name?: string
  }

  type CtfTplCreateResp = {
    code?: number
    msg?: string
  }

  type ctfTplDeleteApiIbexCtfsByIdParams = {
    id: string
  }

  type CtfTplDeleteReq = true

  type CtfTplDeleteResp = {
    code?: number
    msg?: string
  }

  type CtfTplInfo = {
    content: string
    created_at: string
    created_by: string
    ctf_type: string
    id: number
    remark?: string
    tpl_name: string
    updated_at: string
    updated_by: string
  }

  type ctfTplListApiIbexCtfsParams = {
    p: number
    limit: number
    ctf_type?: string
    query?: string
  }

  type CtfTplListReq = {
    ctf_type?: string
    limit: number
    p: number
    query?: string
  }

  type CtfTplListResp = {
    code?: number
    data?: { items?: CtfTplInfo[]; total?: number }
    msg?: string
  }

  type CtfTplOption = {
    ctf_type: string
    tpls: CtfTpl[]
  }

  type ctfTplOptionsApiIbexCtfsOptionsParams = {
    query?: string
  }

  type CtfTplOptionsReq = {
    query?: string
  }

  type CtfTplOptionsResp = {
    code?: number
    data?: { items?: CtfTplOption[] }
    msg?: string
  }

  type ctfTplUpdateApiIbexCtfsByIdParams = {
    id: string
  }

  type CtfTplUpdateReq = {
    content?: string
    ctf_type?: string
    remark?: string
    tpl_name?: string
  }

  type CtfTplUpdateResp = {
    code?: number
    msg?: string
  }

  type Host = {
    host: string
    id: number
    status: string
    stderr: string
    stdout: string
  }

  type hostCtfConfCreateApiIbexCtfsHostsByUidParams = {
    uid: string
  }

  type HostCtfConfCreateReq = {
    content: string
    ctf_type: string
  }

  type HostCtfConfCreateResp = {
    code?: number
    msg?: string
  }

  type hostCtfConfDeleteApiIbexCtfsHostsByConfsidParams = {
    id: string
  }

  type HostCtfConfDeleteReq = true

  type HostCtfConfDeleteResp = {
    code?: number
    msg?: string
  }

  type hostCtfConfListApiIbexCtfsHostsByUidconfsParams = {
    uid: string
  }

  type HostCtfConfListReq = true

  type HostCtfConfListResp = {
    code?: number
    data?: { items?: CtfConfInfo[] }
    msg?: string
  }

  type hostCtfConfUpdateApiIbexCtfsHostsByConfsidParams = {
    id: string
  }

  type HostCtfConfUpdateReq = {
    content: string
  }

  type HostCtfConfUpdateResp = {
    code?: number
    msg?: string
  }

  type hostCtfInitApiIbexCtfsHostsByUidinitParams = {
    uid: string
  }

  type HostCtfInitReq = {
    confs: CtfConf[]
  }

  type HostCtfInitResp = {
    code?: number
    msg?: string
  }

  type hostCtfStartApiIbexCtfsHostsByUidstartParams = {
    uid: string
  }

  type HostCtfStartReq = true

  type HostCtfStartResp = {
    code?: number
    msg?: string
  }

  type hostCtfStopApiIbexCtfsHostsByUidstopParams = {
    uid: string
  }

  type HostCtfStopReq = true

  type HostCtfStopResp = {
    code?: number
    msg?: string
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
    pause?: string
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
    pause?: string
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
