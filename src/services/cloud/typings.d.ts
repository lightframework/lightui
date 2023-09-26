declare namespace CLOUD {
  type BaseInfo = {
    createdAt: string;
    id: number;
    updatedAt: string;
  };

  type BaseInfoResp = {
    code?: number;
    data?: { code?: number; msg?: string; success?: boolean };
    msg?: string;
  };

  type BaseListReq = {
    keywords?: string;
  };

  type BasePathIntId = true;

  type BasePathStrId = true;

  type BaseResp = {
    code?: number;
    data?: { code?: number; msg?: string; success?: boolean };
    msg?: string;
  };

  type DataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type EmptyReq = true;

  type OptUserInfo = {
    createBy: string;
    createdAt: string;
    id: number;
    updateBy: string;
    updatedAt: string;
  };

  type PageListResp = {
    code?: number;
    data?: { code?: number; msg?: string; success?: boolean; total?: number };
    msg?: string;
  };

  type PageParams = {
    current?: number;
    keywords?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type PathIdReq = true;

  type SubDataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };
}
