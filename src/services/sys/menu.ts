// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get menu list GET /sys/v1/menus/ */
export async function listSysMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listSysMenusParams,
  options?: { [key: string]: any },
) {
  return request<API.MenuListResp>('/sys/v1/menus/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add menu POST /sys/v1/menus/ */
export async function addSysMenus(body: API.Menu, options?: { [key: string]: any }) {
  return request<API.BaseResp>('/sys/v1/menus/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** update menu info PUT /sys/v1/menus/${param0} */
export async function editSysMenusByMenuId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editSysMenusByMenuIdParams,
  body: API.MenuEditReq,
  options?: { [key: string]: any },
) {
  const { menu_id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/menus/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update menu info DELETE /sys/v1/menus/${param0} */
export async function deleteSysMenusByMenuId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSysMenusByMenuIdParams,
  body: API.MenuDelReq,
  options?: { [key: string]: any },
) {
  const { menu_id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/menus/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** edit menu apis POST /sys/v1/menus/${param0}/apis */
export async function MenuApiEditSysMenusByMenuIdapis(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuApiEditSysMenusByMenuIdapisParams,
  body: API.MenuApiEditReq,
  options?: { [key: string]: any },
) {
  const { menu_id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/menus/${param0}/apis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
