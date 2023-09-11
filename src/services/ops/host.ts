// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建主机 POST /api/ops/hosts */
export async function hostCreateApiOpsHosts(
  body: OPS.HostCreateReq,
  options?: { [key: string]: any },
) {
  return request<OPS.HostCreateResp>('/api/ops/hosts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除主机 DELETE /api/ops/hosts */
export async function hostDeleteApiOpsHosts(
  body: OPS.HostDeleteReq,
  options?: { [key: string]: any },
) {
  return request<OPS.HostDeleteResp>('/api/ops/hosts', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
