declare namespace ARGUS {
  type Alert = {
    first_trigger_time: number
    group_id: number
    group_name: string
    hash: string
    id: number
    incident_id: number
    last_trigger_time: number
    last_trigger_value: string
    rule_id: number
    rule_name: string
    rule_note: string
    severity: number
    source: string
    status: number
    target_ident: string
  }

  type AlertAggrView = {
    cate: number
    id?: number
    name: string
    rule: string
  }

  type AlertAggrViewCreateReq = {
    cate?: number
    id?: number
    name?: string
    rule?: string
  }

  type AlertAggrViewCreateResp = {
    code?: number
    msg?: string
  }

  type alertAggrViewDeleteApiArgusAlertAggrViewsByIdParams = {
    id: string
  }

  type AlertAggrViewDeleteReq = true

  type AlertAggrViewDeleteResp = {
    code?: number
    msg?: string
  }

  type AlertAggrViewItemsReq = true

  type AlertAggrViewItemsResp = {
    code?: number
    data?: { items?: AlertAggrView[] }
    msg?: string
  }

  type alertAggrViewUpdateApiArgusAlertAggrViewsByIdParams = {
    id: string
  }

  type AlertAggrViewUpdateReq = {
    cate?: number
    id?: number
    name?: string
    rule?: string
  }

  type AlertAggrViewUpdateResp = {
    code?: number
    msg?: string
  }

  type AlertCard = {
    alert_ids: number[]
    severity: number
    title: string
    total: number
  }

  type alertCardsApiArgusAlertsCardsParams = {
    stime?: number
    etime?: number
    severity?: number
    status?: number
    query?: string
    rule?: string
  }

  type AlertCardsReq = {
    etime?: number
    query?: string
    rule?: string
    severity?: number
    status?: number
    stime?: number
  }

  type AlertCardsResp = {
    code?: number
    data?: { items?: AlertCard[] }
    msg?: string
  }

  type alertPageListApiArgusAlertsParams = {
    p: number
    limit: number
    stime: number
    etime: number
    severity?: number
    status?: number
    query?: string
    ids?: string
  }

  type AlertPageListReq = {
    etime: number
    ids?: string
    limit: number
    p: number
    query?: string
    severity?: number
    status?: number
    stime: number
  }

  type AlertPageListResp = {
    code?: number
    data?: { items?: Alert[]; total?: number }
    msg?: string
  }

  type AlertReadOneReq = true

  type AlertReadOneResp = {
    code?: number
    data?: {
      events?: Event[]
      first_trigger_time?: number
      hash?: string
      id?: number
      last_sent_time?: number
      rule_id?: number
      rule_name?: string
      rule_note?: string
      severity?: number
      status?: number
    }
    msg?: string
  }

  type alertReadOneRespApiArgusAlertsByHashParams = {
    hash: string
  }

  type Comment = {
    author: string
    content: string
    id: number
    parent_id: number
    replies: Comment[]
    timestamp: number
  }

  type Dictionary = {
    id: number
    is_system: boolean
    name: string
    type: string
  }

  type DictionaryCreateReq = {
    is_system: boolean
    name: string
    type: string
  }

  type DictionaryCreateResp = {
    code?: number
    msg?: string
  }

  type dictionaryDeleteApiArgusDictsByIdParams = {
    id: string
  }

  type DictionaryDeleteReq = true

  type DictionaryDeleteResp = {
    code?: number
    msg?: string
  }

  type DictionaryEntriesResp = {
    code?: number
    data?: { items?: DictionaryEntry[] }
    msg?: string
  }

  type DictionaryEntry = {
    id: number
    key: string
    value: string
  }

  type DictionaryEntryCreateReq = {
    dictionary_id: number
    key: string
    value: string
  }

  type DictionaryEntryCreateResp = {
    code?: number
    msg?: string
  }

  type DictionaryEntryDeleteReq = true

  type DictionaryEntryDeleteResp = {
    code?: number
    msg?: string
  }

  type DictionaryListReq = true

  type DictionaryListResp = {
    code?: number
    data?: { items?: Dictionary[] }
    msg?: string
  }

  type entryDeleteApiArgusDictsByEntriesidParams = {
    id: string
  }

  type entryGetByIdApiArgusDictsByIdentriesParams = {
    id: string
  }

  type EntryGetByIdReq = true

  type entryGetByNameApiArgusDictsEntriesParams = {
    name: string
  }

  type EntryGetByNameReq = {
    name: string
  }

  type Event = {
    alert_id: string
    event_id: string
    id: number
    medata: string
    target_ident: string
    trigger_time: number
    trigger_value: string
  }

  type EventResp = {
    code?: number
    msg?: string
  }

  type hisAlertPageListApiArgusAlertsHisParams = {
    p: number
    limit: number
    stime: number
    etime: number
    severity?: number
    status?: number
    query?: string
  }

  type HisAlertPageListReq = {
    etime: number
    limit: number
    p: number
    query?: string
    severity?: number
    status?: number
    stime: number
  }

  type HisAlertPageListResp = {
    code?: number
    data?: { items?: Alert[]; total?: number }
    msg?: string
  }

  type Incident = {
    close_time: number
    description: string
    hash: string
    id: number
    last_time: number
    progress: string
    responders: Responder[]
    severity: number
    source: string
    start_time: number
    tactic: IncidentTactic
    title: string
    update_at: number
  }

  type incidentAlertsApiArgusIncidentsByIdalertsParams = {
    id: string
  }

  type IncidentAlertsReq = true

  type IncidentAlertsResp = {
    code?: number
    data?: { items?: Alert[]; total?: number }
    msg?: string
  }

  type IncidentClaimReq = {
    ids: number[]
  }

  type IncidentClaimResp = {
    code?: number
    msg?: string
  }

  type incidentCommentApiArgusIncidentsByIdcommentsParams = {
    id: string
  }

  type IncidentCommentReq = {
    content: string
    parent_id: number
  }

  type IncidentCommentResp = {
    code?: number
    msg?: string
  }

  type IncidentFlow = {
    comment: Comment[]
    description: string
    id: number
    notifications: Notification[]
    object: string
    operation: string
    operator: string
    timestamp: number
  }

  type incidentFlowsApiArgusIncidentsByIdflowsParams = {
    id: string
  }

  type IncidentFlowsReq = true

  type IncidentFlowsResp = {
    code?: number
    data?: { items?: IncidentFlow[]; total?: number }
    msg?: string
  }

  type incidentPageListApiArgusIncidentsParams = {
    p: number
    limit: number
    stime?: number
    etime?: number
    severity?: number
    progress?: string
    query?: string
    source?: string
  }

  type IncidentPageListReq = {
    etime?: number
    limit: number
    p: number
    progress?: string
    query?: string
    severity?: number
    source?: string
    stime?: number
  }

  type IncidentPageListResp = {
    code?: number
    data?: { items?: Incident[]; total?: number }
    msg?: string
  }

  type incidentReadOneApiArgusIncidentsByIdParams = {
    id: string
  }

  type IncidentReadOneReq = true

  type IncidentReadOneResp = {
    code?: number
    data?: { data?: Incident }
    msg?: string
  }

  type IncidentResignReq = {
    ids: number[]
    userid: number
    username: string
  }

  type IncidentResignResp = {
    code?: number
    msg?: string
  }

  type IncidentTactic = {
    enabled: boolean
    id: number
    name: string
  }

  type MatchingTag = {
    key: string
    match_mode: string
    values: string[]
  }

  type N9eEventReq = {
    cate: string
    cluster: string
    dashboard_url?: string
    datasource_id: number
    /**  连续告警的首次告警时间 */
    first_trigger_time?: number
    group_id: number
    group_name: string
    hash: string
    id: number
    /**  for notify.py */
    is_recovered?: boolean
    /**  for notify.py 上次计算的时间 */
    last_eval_time?: number
    /**  上次发送时间 */
    last_sent_time?: number
    /**  notify: current number */
    notify_cur_number?: number
    rule_id: number
    rule_name: string
    rule_note?: string
    runbook_url?: string
    /** 1,2,3:一级是最高级别的告警 */
    severity: number
    source?: string
    status?: number
    summary?: string
    /**  for internal usage */
    tags_map?: string[]
    target_ident: string
    trigger_time: number
    trigger_value: string
  }

  type Notification = {
    party: string
    result: string
    time: number
    times: number
    way: string
  }

  type NotifyLink = {
    critical_notifies: string[]
    info_notifies: string[]
    notify_frequency: number
    notify_max_times: number
    notify_mode: string
    notify_type: string
    party: string
    turn_after: number
    turn_state: string
    warning_notifies: string[]
  }

  type OrchEventReq = {
    event?: string
    eventTime?: string
    id: string
    instanceId?: string
    level?: string
    operator?: string
    sites?: OrchSite[]
    status?: string
    targetType?: string
    type?: string
  }

  type OrchSite = {
    id: string
    siteName: string
  }

  type PageParams = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
  }

  type Responder = {
    code?: number
    data?: {
      acknoledged_at?: number
      assigned_at?: number
      userid?: number
      username?: string
    }
    msg?: string
  }

  type Tactic = {
    aggr_fields?: string[]
    assigns: NotifyLink[]
    conditions?: any[]
    enabled?: boolean
    name: string
    rank?: number
  }

  type TacticCreateReq = {
    aggr_fields?: string[]
    assigns?: NotifyLink[]
    conditions?: any[]
    enabled?: boolean
    name?: string
    rank?: number
  }

  type TacticCreateResp = {
    code?: number
    msg?: string
  }

  type tacticDeleteApiArgusTacticsByIdParams = {
    id: string
  }

  type TacticDeleteReq = true

  type TacticDeleteResp = {
    code?: number
    msg?: string
  }

  type TacticInfo = {
    aggr_fields?: string[]
    assigns: NotifyLink[]
    conditions?: any[]
    create_by: string
    created_at: string
    enabled: boolean
    id: number
    name: string
    rank: number
    update_by: string
    updated_at: string
  }

  type TacticItemsReq = true

  type TacticItemsResp = {
    code?: number
    data?: { items?: TacticInfo[] }
    msg?: string
  }

  type tacticUpdateApiArgusTacticsByIdParams = {
    id: string
  }

  type TacticUpdateReq = {
    aggr_fields?: string[]
    assigns?: NotifyLink[]
    conditions?: any[]
    enabled?: boolean
    name?: string
    rank?: number
  }

  type TacticUpdateResp = {
    code?: number
    msg?: string
  }

  type TencentEventReq = {
    id: string
    instanceId: string
    level: string
    status: string
    targetType: string
    type: string
  }
}
