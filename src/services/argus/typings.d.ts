declare namespace ARGUS {
  type Alert = {
    first_trigger_time: number
    group_id: number
    group_name: string
    hash: string
    id: number
    last_sent_time: number
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

  type MatchingTag = {
    key: string
    matching: boolean
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

  type Tactic = {
    assigns: NotifyLink[]
    conditions?: any[]
    enabled?: boolean
    name: string
    rank?: number
  }

  type TacticCreateReq = {
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
    assigns: NotifyLink[]
    conditions?: any[]
    createAt: number
    createBy: number
    enabled: boolean
    id: number
    name: string
    rank: number
    updateAt: number
    updateBy: number
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
