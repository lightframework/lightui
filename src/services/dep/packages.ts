// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 获取repo的所有version GET /api/dep/packages/${param0}/version */
export async function packagesVersionApiDepPackagesByRepoversion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.packagesVersionApiDepPackagesByRepoversionParams,
  options?: { [key: string]: any },
) {
  const { repo: param0, ...queryParams } = params
  return request<DEP.PackagesVersionResp>(
    `/api/dep/packages/${param0}/version`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 获取离线包下载地址 POST /api/dep/packages/download */
export async function packagesDownloadApiDepPackagesDownload(
  body: DEP.PackagesDownloadReq,
  options?: { [key: string]: any },
) {
  return request<DEP.PackagesDownloadResp>("/api/dep/packages/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取全部repo GET /api/dep/packages/repo */
export async function packagesAllRepoApiDepPackagesRepo(options?: {
  [key: string]: any
}) {
  return request<DEP.PackagesAllRepoResp>("/api/dep/packages/repo", {
    method: "GET",
    ...(options || {}),
  })
}

/** 获取已部署的repo GET /api/dep/packages/repo/deploy */
export async function packagesDeployRepoApiDepPackagesRepodeploy(options?: {
  [key: string]: any
}) {
  return request<DEP.PackagesDeployRepoResp>("/api/dep/packages/repo/deploy", {
    method: "GET",
    ...(options || {}),
  })
}

/** 获取允许上线的repo GET /api/dep/packages/repo/online */
export async function packagesOnlineRepoApiDepPackagesRepoonline(options?: {
  [key: string]: any
}) {
  return request<DEP.PackagesOnlineRepoResp>("/api/dep/packages/repo/online", {
    method: "GET",
    ...(options || {}),
  })
}

/** 同步所有信息 GET /api/dep/packages/sync */
export async function packagesSyncApiDepPackagesSync(options?: {
  [key: string]: any
}) {
  return request<DEP.PackagesSyncResp>("/api/dep/packages/sync", {
    method: "GET",
    ...(options || {}),
  })
}

/** 修改版本状态 POST /api/dep/packages/updatestate */
export async function packagesUpdateStateApiDepPackagesUpdatestate(
  body: DEP.PackagesUpdateStateReq,
  options?: { [key: string]: any },
) {
  return request<DEP.PackagesUpdateStateResp>("/api/dep/packages/updatestate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取已部署的Version GET /api/dep/packages/version/deploy */
export async function packagesDeployVersionApiDepPackagesVersiondeploy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.packagesDeployVersionApiDepPackagesVersiondeployParams,
  options?: { [key: string]: any },
) {
  return request<DEP.PackagesDeployVersionResp>(
    "/api/dep/packages/version/deploy",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    },
  )
}

/** 获取允许上线的Version GET /api/dep/packages/version/online */
export async function packagesOnlineVersionApiDepPackagesVersiononline(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.packagesOnlineVersionApiDepPackagesVersiononlineParams,
  options?: { [key: string]: any },
) {
  return request<DEP.PackagesOnlineVersionResp>(
    "/api/dep/packages/version/online",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    },
  )
}
