// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询chat列表 GET /api/ops/chats/ */
export async function chatPageListApiOpsChats(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.chatPageListApiOpsChatsParams,
  options?: { [key: string]: any },
) {
  return request<OPS.ChatPageListResp>("/api/ops/chats/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加chat集合 POST /api/ops/chats/ */
export async function chatCreateApiOpsChats(
  body: OPS.ChatCreateReq,
  options?: { [key: string]: any },
) {
  return request<OPS.ChatCreateResp>("/api/ops/chats/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取单个chat详情 GET /api/ops/chats/${param0} */
export async function chatReadOneApiOpsChatsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.chatReadOneApiOpsChatsByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.ChatReadOneResp>(`/api/ops/chats/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 更新chat集合 PUT /api/ops/chats/${param0} */
export async function chatUpdateApiOpsChatsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.chatUpdateApiOpsChatsByIdParams,
  body: OPS.ChatUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.ChatUpdateResp>(`/api/ops/chats/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除chat集合 DELETE /api/ops/chats/${param0} */
export async function chatDeleteApiOpsChatsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.chatDeleteApiOpsChatsByIdParams,
  body: OPS.ChatDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.ChatDeleteResp>(`/api/ops/chats/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 导出chat POST /api/ops/chats/export */
export async function chatExportApiOpsChatsExport(
  body: OPS.ChatExportReq,
  options?: { [key: string]: any },
) {
  return request<OPS.ChatExportResp>("/api/ops/chats/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取全部tag GET /api/ops/chats/tag */
export async function chatTagListApiOpsChatsTag(options?: {
  [key: string]: any
}) {
  return request<OPS.ChatTagListResp>("/api/ops/chats/tag", {
    method: "GET",
    ...(options || {}),
  })
}
