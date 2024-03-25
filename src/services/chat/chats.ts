// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询chats列表 GET /api/chat/chats/ */
export async function chatsPageListApiChatChats(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CHAT.chatsPageListApiChatChatsParams,
  options?: { [key: string]: any },
) {
  return request<CHAT.ChatsPageListResp>("/api/chat/chats/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加chats集合 POST /api/chat/chats/ */
export async function chatsCreateApiChatChats(
  body: CHAT.ChatsCreateReq,
  options?: { [key: string]: any },
) {
  return request<CHAT.ChatsCreateResp>("/api/chat/chats/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取单个chats详情 GET /api/chat/chats/${param0} */
export async function chatsReadOneApiChatChatsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CHAT.chatsReadOneApiChatChatsByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<CHAT.ChatsReadOneResp>(`/api/chat/chats/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 更新chats集合 PUT /api/chat/chats/${param0} */
export async function chatsUpdateApiChatChatsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CHAT.chatsUpdateApiChatChatsByIdParams,
  body: CHAT.ChatsUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<CHAT.ChatsUpdateResp>(`/api/chat/chats/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除chats集合 DELETE /api/chat/chats/${param0} */
export async function chatsDeleteApiChatChatsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CHAT.chatsDeleteApiChatChatsByIdParams,
  body: CHAT.ChatsDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<CHAT.ChatsDeleteResp>(`/api/chat/chats/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 导出chats POST /api/chat/chats/export */
export async function chatsExportApiChatChatsExport(
  body: CHAT.ChatsExportReq,
  options?: { [key: string]: any },
) {
  return request<CHAT.ChatsExportResp>("/api/chat/chats/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取全部tag GET /api/chat/chats/tag */
export async function chatsTagListApiChatChatsTag(options?: {
  [key: string]: any
}) {
  return request<CHAT.ChatsTagListResp>("/api/chat/chats/tag", {
    method: "GET",
    ...(options || {}),
  })
}
