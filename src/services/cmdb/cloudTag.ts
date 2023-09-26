// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询云商标签列表 GET /api/cmdb/cloudtags/ */
export async function cloudTagPageListApiCmdbCloudtags(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudTagPageListApiCmdbCloudtagsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.CloudTagPageListResp>('/api/cmdb/cloudtags/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加云商标签 POST /api/cmdb/cloudtags/ */
export async function CloudTagCreateApiCmdbCloudtags(
  body: CMDB.CloudTagCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.CloudTagCreateResp>('/api/cmdb/cloudtags/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看云商标签信息 GET /api/cmdb/cloudtags/${param0} */
export async function cloudTagReadOneApiCmdbCloudtagsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudTagReadOneApiCmdbCloudtagsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.CloudTagReadOneResp>(`/api/cmdb/cloudtags/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改云商标签信息 PUT /api/cmdb/cloudtags/${param0} */
export async function cloudTagUpdateApiCmdbCloudtagsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudTagUpdateApiCmdbCloudtagsByUidParams,
  body: CMDB.CloudTagUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.CloudTagUpdateResp>(`/api/cmdb/cloudtags/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除云商标签 DELETE /api/cmdb/cloudtags/${param0} */
export async function cloudTagDeleteApiCmdbCloudtagsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudTagDeleteApiCmdbCloudtagsByUidParams,
  body: CMDB.CloudTagDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.CloudTagDeleteResp>(`/api/cmdb/cloudtags/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询云商标签列表 GET /api/cmdb/cloudtags/options */
export async function cloudTagOptionsApiCmdbCloudtagsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudTagOptionsApiCmdbCloudtagsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.CloudTagOptionsResp>('/api/cmdb/cloudtags/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
