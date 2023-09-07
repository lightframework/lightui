// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建主机 POST /api/ops/hosts */
export async function hostCreateApiOpsHosts(
  body: API.HostCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.HostCreateResp>('/api/ops/hosts', {
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
  body: API.HostDeleteReq,
  options?: { [key: string]: any },
) {
  return request<API.HostDeleteResp>('/api/ops/hosts', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
