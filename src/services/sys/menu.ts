// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get menu list GET /api/sys/menus/ */
export async function menuPageListApiSysMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuPageListApiSysMenusParams,
  options?: { [key: string]: any },
) {
  return request<API.MenuPageListResp>('/api/sys/menus/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add menu POST /api/sys/menus/ */
export async function menuAddApiSysMenus(body: API.MenuAddReq, options?: { [key: string]: any }) {
  return request<API.MenuAddResp>('/api/sys/menus/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get menu info GET /api/sys/menus/${param0} */
export async function menuInfoApiSysMenusByMenuId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuInfoApiSysMenusByMenuIdParams,
  options?: { [key: string]: any },
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.MenuInfoResp>(`/api/sys/menus/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update menu info PUT /api/sys/menus/${param0} */
export async function menuEditApiSysMenusByMenuId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuEditApiSysMenusByMenuIdParams,
  body: API.MenuEditReq,
  options?: { [key: string]: any },
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.MenuEditResp>(`/api/sys/menus/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update menu info DELETE /api/sys/menus/${param0} */
export async function menuDeleteApiSysMenusByMenuId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuDeleteApiSysMenusByMenuIdParams,
  body: API.MenuDelReq,
  options?: { [key: string]: any },
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.MenuDelResp>(`/api/sys/menus/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** get menu list GET /api/sys/menus/list */
export async function menuListApiSysMenusList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuListApiSysMenusListParams,
  options?: { [key: string]: any },
) {
  return request<API.MenuListResp>('/api/sys/menus/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
