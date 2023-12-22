// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 添加应用 POST /api/cmdb/noderules/ */
export async function nodeRuleCreateApiCmdbNoderules(
  body: CMDB.NodeRuleCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.NodeRuleCreateResp>("/api/cmdb/noderules/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改应用信息 PUT /api/cmdb/noderules/${param0} */
export async function nodeRuleUpdateApiCmdbNoderulesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.nodeRuleUpdateApiCmdbNoderulesByUidParams,
  body: CMDB.NodeRuleUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.NodeRuleUpdateResp>(`/api/cmdb/noderules/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除应用 DELETE /api/cmdb/noderules/${param0} */
export async function nodeRuleDeleteApiCmdbNoderulesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.nodeRuleDeleteApiCmdbNoderulesByUidParams,
  body: CMDB.NodeRuleDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.NodeRuleDeleteResp>(`/api/cmdb/noderules/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询应用列表 GET /api/cmdb/noderules/options */
export async function nodeRuleOptionsApiCmdbNoderulesOptions(options?: {
  [key: string]: any
}) {
  return request<CMDB.NodeRuleOptionsResp>("/api/cmdb/noderules/options", {
    method: "GET",
    ...(options || {}),
  })
}
