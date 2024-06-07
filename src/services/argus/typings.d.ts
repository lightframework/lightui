declare namespace ARGUS {
  type Alert = {
    events: Event[]
    first_trigger_time: number
    group_id: number
    group_name: string
    hash: string
    id: number
    incident_id: number
    last_trigger_time: number
    last_trigger_value: string
    recovered_time: number
    rule_id: number
    rule_name: string
    rule_note: string
    severity: number
    source: string
    status: string
    tags: string[]
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

  type Duty = {
    id: number
    name: string
  }

  type DutyListReq = true

  type DutyListResp = {
    code?: number
    data?: { items?: Duty[] }
    msg?: string
  }

  type DutyUser = {
    id: number
    username: string
  }

  type DutyUserListReq = true

  type DutyUserListResp = {
    code?: number
    data?: { items?: DutyUser[] }
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
    alert_hash: string
    id: number
    is_recovered: boolean
    operator: string
    request_id: number
    status: string
    trigger_time: number
    trigger_value: string
  }

  type EventReq = {
    DataSource?: string
    DataSourceType?: string
    EventType?: string
    body?: string
  }

  type EventRequest = {
    body: string
    data_source: string
    data_source_type: string
    event_type: string
    id: number
    timestamp: number
  }

  type eventRequestPageListApiArgusEventRequestsParams = {
    p: number
    limit: number
    stime: number
    etime: number
    query?: string
  }

  type EventRequestPageListReq = {
    etime: number
    limit: number
    p: number
    query?: string
    stime: number
  }

  type EventRequestPageListResp = {
    code?: number
    data?: { items?: EventRequest[]; total?: number }
    msg?: string
  }

  type eventRequestReadOneApiArgusEventByRequestsidParams = {
    id: string
  }

  type EventRequestReadOnetReq = true

  type EventRequestReadOnetResp = {
    code?: number
    data?: {
      body?: string
      data_source?: string
      data_source_type?: string
      event_type?: string
      id?: number
      timestamp?: number
    }
    msg?: string
  }

  type EventResp = {
    code?: number
    data?: { request_id?: number }
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
    actived: string
    closed_time: number
    created_time: number
    description: string
    hash: string
    id: number
    next_eval_time: number
    processor: string
    responders: Responder[]
    severity: number
    source: string
    status: string
    tactic: IncidentTactic
    tactic_link_index: number
    title: string
    updated_time: number
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

  type incidentDingClaimApiArgusIncidentsByIddingclaimParams = {
    id: string
  }

  type IncidentDingClaimReq = {
    userid: number
    username: string
  }

  type IncidentDingClaimResp = {
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

  type incidentListApiArgusIncidentsListParams = {
    stime: number
    etime: number
    severity?: number
    status?: string
    query?: string
    source?: string
    uids?: string
  }

  type IncidentListReq = {
    etime: number
    query?: string
    severity?: number
    source?: string
    status?: string
    stime: number
    uids?: string
  }

  type IncidentListResp = {
    code?: number
    data?: { items?: Incident[] }
    msg?: string
  }

  type incidentPageListApiArgusIncidentsParams = {
    p: number
    limit: number
    stime?: number
    etime?: number
    severity?: number
    status?: string
    query?: string
    source?: string
  }

  type IncidentPageListReq = {
    etime?: number
    limit: number
    p: number
    query?: string
    severity?: number
    source?: string
    status?: string
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
    mobile: string
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
    party: number
    turn_after: number
    turn_severities: number[]
    turn_state: string
    warning_notifies: string[]
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
    upgrade_threshold?: number
    upgrade_to?: number
  }

  type TacticCreateReq = {
    aggr_fields?: string[]
    assigns?: NotifyLink[]
    conditions?: any[]
    enabled?: boolean
    name?: string
    rank?: number
    upgrade_threshold?: number
    upgrade_to?: number
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
    upgrade_threshold?: number
    upgrade_to?: number
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

  type tacticUpdateRankApiArgusTacticsByIdrankParams = {
    id: string
  }

  type TacticUpdateRankReq = {
    rank: number
  }

  type TacticUpdateRankResp = {
    code?: number
    msg?: string
  }

  type TacticUpdateReq = {
    aggr_fields?: string[]
    assigns?: NotifyLink[]
    conditions?: any[]
    enabled?: boolean
    name?: string
    rank?: number
    upgrade_threshold?: number
    upgrade_to?: number
  }

  type TacticUpdateResp = {
    code?: number
    msg?: string
  }

  type tacticUpdateStatusApiArgusTacticsByIdstatusParams = {
    id: string
  }

  type TacticUpdateStatusReq = {
    enabled: boolean
  }

  type TacticUpdateStatusResp = {
    code?: number
    msg?: string
  }
}
