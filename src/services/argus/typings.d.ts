declare namespace ARGUS {
  type EventReq = true

  type EventResp = {
    code?: number
    msg?: string
  }

  type MatchingTag = {
    key: string
    matching: boolean
    values: string[]
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
    assins: NotifyLink[]
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
}
