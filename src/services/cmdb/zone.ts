// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询可用区列表 GET /api/cmdb/zones/ */
export async function zonePageListApiCmdbZones(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.zonePageListApiCmdbZonesParams,
  options?: { [key: string]: any },
) {
  return request<API.ZonePageListResp>('/api/cmdb/zones/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加可用区 POST /api/cmdb/zones/ */
export async function ZoneCreateApiCmdbZones(
  body: API.ZoneCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.ZoneCreateResp>('/api/cmdb/zones/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看可用区信息 GET /api/cmdb/zones/${param0} */
export async function zoneReadOneApiCmdbZonesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.zoneReadOneApiCmdbZonesByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ZoneReadOneResp>(`/api/cmdb/zones/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改可用区信息 PUT /api/cmdb/zones/${param0} */
export async function zoneUpdateApiCmdbZonesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.zoneUpdateApiCmdbZonesByUidParams,
  body: API.ZoneUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ZoneUpdateResp>(`/api/cmdb/zones/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除可用区 DELETE /api/cmdb/zones/${param0} */
export async function zoneDeleteApiCmdbZonesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.zoneDeleteApiCmdbZonesByUidParams,
  body: API.ZoneDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ZoneDeleteResp>(`/api/cmdb/zones/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询可用区列表 GET /api/cmdb/zones/options */
export async function zoneOptionsApiCmdbZonesOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.zoneOptionsApiCmdbZonesOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.ZoneOptionsResp>('/api/cmdb/zones/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
