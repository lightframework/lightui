// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询应用列表 GET /api/cmdb/hosttypes/ */
export async function hosttypePageListApiCmdbHosttypes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hosttypePageListApiCmdbHosttypesParams,
  options?: { [key: string]: any },
) {
  return request<API.HostTypePageListResp>('/api/cmdb/hosttypes/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加应用 POST /api/cmdb/hosttypes/ */
export async function hosttypeCreateApiCmdbHosttypes(
  body: API.HostTypeCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.HostTypeCreateResp>('/api/cmdb/hosttypes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看应用信息 GET /api/cmdb/hosttypes/${param0} */
export async function hosttypeReadOneApiCmdbHosttypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hosttypeReadOneApiCmdbHosttypesByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.HostTypeReadOneResp>(`/api/cmdb/hosttypes/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改应用信息 PUT /api/cmdb/hosttypes/${param0} */
export async function hosttypeUpdateApiCmdbHosttypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hosttypeUpdateApiCmdbHosttypesByUidParams,
  body: API.HostTypeUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.HostTypeUpdateResp>(`/api/cmdb/hosttypes/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除应用 DELETE /api/cmdb/hosttypes/${param0} */
export async function hosttypeDeleteApiCmdbHosttypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hosttypeDeleteApiCmdbHosttypesByUidParams,
  body: API.HostTypeDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.HostTypeDeleteResp>(`/api/cmdb/hosttypes/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询应用列表 GET /api/cmdb/hosttypes/options */
export async function hosttypeOptionsApiCmdbHosttypesOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hosttypeOptionsApiCmdbHosttypesOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.HostTypeOptionsResp>('/api/cmdb/hosttypes/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
