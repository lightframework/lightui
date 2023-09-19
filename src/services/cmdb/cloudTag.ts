// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询云商标签列表 GET /api/cmdb/cloudtags/ */
export async function cloudTagPageListApiCmdbCloudtags(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cloudTagPageListApiCmdbCloudtagsParams,
  options?: { [key: string]: any },
) {
  return request<API.CloudTagPageListResp>('/api/cmdb/cloudtags/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加云商标签 POST /api/cmdb/cloudtags/ */
export async function CloudTagCreateApiCmdbCloudtags(
  body: API.CloudTagCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.CloudTagCreateResp>('/api/cmdb/cloudtags/', {
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
  params: API.cloudTagReadOneApiCmdbCloudtagsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.CloudTagReadOneResp>(`/api/cmdb/cloudtags/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改云商标签信息 PUT /api/cmdb/cloudtags/${param0} */
export async function cloudTagUpdateApiCmdbCloudtagsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cloudTagUpdateApiCmdbCloudtagsByUidParams,
  body: API.CloudTagUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.CloudTagUpdateResp>(`/api/cmdb/cloudtags/${param0}`, {
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
  params: API.cloudTagDeleteApiCmdbCloudtagsByUidParams,
  body: API.CloudTagDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.CloudTagDeleteResp>(`/api/cmdb/cloudtags/${param0}`, {
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
  params: API.cloudTagOptionsApiCmdbCloudtagsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.CloudTagOptionsResp>('/api/cmdb/cloudtags/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
