// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询环境模板列表 GET /api/cmdb/hosttypes/ */
export async function hostTypePageListApiCmdbHosttypes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostTypePageListApiCmdbHosttypesParams,
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

/** 添加环境模板 POST /api/cmdb/hosttypes/ */
export async function hostTypeAddApiCmdbHosttypes(
  body: API.HostTypeAddReq,
  options?: { [key: string]: any },
) {
  return request<API.HostTypeAddResp>('/api/cmdb/hosttypes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看环境模板信息 GET /api/cmdb/hosttypes/${param0} */
export async function hostTypeInfoApiCmdbHosttypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostTypeInfoApiCmdbHosttypesByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.HostTypeInfoResp>(`/api/cmdb/hosttypes/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改环境模板信息 PUT /api/cmdb/hosttypes/${param0} */
export async function hostTypeEditApiCmdbHosttypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostTypeEditApiCmdbHosttypesByUidParams,
  body: API.HostTypeEditReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.HostTypeEditResp>(`/api/cmdb/hosttypes/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除环境模板 DELETE /api/cmdb/hosttypes/${param0} */
export async function hostTypeDeleteApiCmdbHosttypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostTypeDeleteApiCmdbHosttypesByUidParams,
  body: API.HostTypeDelReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.HostTypeDelResp>(`/api/cmdb/hosttypes/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询环境模板列表 GET /api/cmdb/hosttypes/list */
export async function hostTypeListApiCmdbHosttypesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostTypeListApiCmdbHosttypesListParams,
  options?: { [key: string]: any },
) {
  return request<API.HostTypeListResp>('/api/cmdb/hosttypes/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
