declare namespace CHAT {
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

  type Chats = {
    answer: string
    contents: string[]
    keywords: string[]
    linkNames?: string[]
    links?: string[]
    persons: string[]
    problems: string[]
    tag: string[]
    title: string
  }

  type ChatsCreateReq = {
    answer?: string
    contents?: string[]
    keywords?: string[]
    linkNames?: string[]
    links?: string[]
    persons?: string[]
    problems?: string[]
    tag?: string[]
    title?: string
  }

  type ChatsCreateResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      answer?: string
      contents?: string[]
      id?: number
      keywords?: string[]
      linkNames?: string[]
      links?: string[]
      persons?: string[]
      problems?: string[]
      tag?: string[]
      title?: string
    }
    msg?: string
  }

  type chatsDeleteApiChatChatsByIdParams = {
    id: string
  }

  type ChatsDeleteReq = true

  type ChatsDeleteResp = {
    code?: number
    msg?: string
  }

  type ChatsExportReq = true

  type ChatsExportResp = {
    code?: number
    msg?: string
  }

  type ChatsInfo = {
    CreatedAt: string
    CreatedBy: string
    UpdatedAt: string
    UpdatedBy: string
    answer: string
    contents: string[]
    id: number
    keywords: string[]
    linkNames?: string[]
    links?: string[]
    persons: string[]
    problems: string[]
    tag: string[]
    title: string
  }

  type chatsPageListApiChatChatsParams = {
    current?: number
    pageSize?: number
    keywords?: string
    orderBy?: string
    tag?: string
  }

  type ChatsPageListReq = {
    current?: number
    keywords?: string
    orderBy?: string
    pageSize?: number
    tag?: string
  }

  type ChatsPageListResp = {
    code?: number
    data?: { list?: ChatsInfo[]; total?: number }
    msg?: string
  }

  type chatsReadOneApiChatChatsByIdParams = {
    id: string
  }

  type ChatsReadOneReq = true

  type ChatsReadOneResp = {
    code?: number
    data?: { data?: ChatsInfo }
    msg?: string
  }

  type ChatsTagListReq = true

  type ChatsTagListResp = {
    code?: number
    data?: { tag?: string[] }
    msg?: string
  }

  type chatsUpdateApiChatChatsByIdParams = {
    id: string
  }

  type ChatsUpdateReq = {
    answer?: string
    contents?: string[]
    keywords?: string[]
    linkNames?: string[]
    links?: string[]
    persons?: string[]
    problems?: string[]
    tag?: string[]
    title?: string
  }

  type ChatsUpdateResp = {
    code?: number
    data?: {
      CreatedAt?: string
      CreatedBy?: string
      UpdatedAt?: string
      UpdatedBy?: string
      answer?: string
      contents?: string[]
      id?: number
      keywords?: string[]
      linkNames?: string[]
      links?: string[]
      persons?: string[]
      problems?: string[]
      tag?: string[]
      title?: string
    }
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

  type SubDataListReq = {
    current?: number
    keyword?: string
    orderBy?: string
    pageSize?: number
  }
}
