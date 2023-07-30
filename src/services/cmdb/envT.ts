// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询环境模板列表 GET /api/cmdb/envts/ */
export async function envTPageListApiCmdbEnvts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.envTPageListApiCmdbEnvtsParams,
  options?: { [key: string]: any },
) {
  return request<API.EnvTPageListResp>('/api/cmdb/envts/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加环境模板 POST /api/cmdb/envts/ */
export async function envTAddApiCmdbEnvts(body: API.EnvTAddReq, options?: { [key: string]: any }) {
  return request<API.EnvTAddResp>('/api/cmdb/envts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看环境模板信息 GET /api/cmdb/envts/${param0} */
export async function envTInfoApiCmdbEnvtsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.envTInfoApiCmdbEnvtsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.EnvTInfoResp>(`/api/cmdb/envts/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改环境模板信息 PUT /api/cmdb/envts/${param0} */
export async function envTEditApiCmdbEnvtsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.envTEditApiCmdbEnvtsByUidParams,
  body: API.EnvTEditReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.EnvTEditResp>(`/api/cmdb/envts/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除环境模板 DELETE /api/cmdb/envts/${param0} */
export async function envTDeleteApiCmdbEnvtsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.envTDeleteApiCmdbEnvtsByUidParams,
  body: API.EnvTDelReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.EnvTDelResp>(`/api/cmdb/envts/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询环境模板列表 GET /api/cmdb/envts/list */
export async function envTListApiCmdbEnvtsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.envTListApiCmdbEnvtsListParams,
  options?: { [key: string]: any },
) {
  return request<API.EnvTListResp>('/api/cmdb/envts/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 保存环境模板 POST /api/cmdb/envts/save */
export async function envTSaveApiCmdbEnvtsSave(
  body: API.EnvTSaveReq,
  options?: { [key: string]: any },
) {
  return request<API.EnvTSaveResp>('/api/cmdb/envts/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
