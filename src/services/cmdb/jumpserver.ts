// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 查询特权用户列表 GET /api/cmdb/jumpserver/adminuser/options */
export async function jumpAdminUserOptionsApiCmdbJumpserverAdminuseroptions(options?: {
  [key: string]: any
}) {
  return request<CMDB.JumpAdminUserOptionsResp>(
    "/api/cmdb/jumpserver/adminuser/options",
    {
      method: "GET",
      ...(options || {}),
    },
  )
}
