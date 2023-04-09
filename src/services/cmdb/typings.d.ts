declare namespace API {
  type BaseInfo = {
    createdAt: string;
    id: number;
    updatedAt: string;
  };

  type BaseListResp = {
    code?: number;
    msg?: string;
    success?: boolean;
    total: number;
  };

  type BasePerson = {
    email: string;
    enabled?: boolean;
    intro?: string;
    mobile: string;
    name: string;
  };

  type BaseResp = {
    code: number;
    msg: string;
    success: boolean;
  };

  type Cloud = {
    info?: string;
    name: string;
    uid?: string;
  };

  type CloudAddReq = {
    info?: string;
    name?: string;
    uid?: string;
  };

  type CloudEditReq = {
    info?: string;
    name?: string;
    uid?: string;
  };

  type CloudInfoResp = {
    code?: number;
    data: Cloud;
    msg?: string;
    success?: boolean;
  };

  type CloudListResp = {
    // #/components/schemas/BaseResp
    BaseResp;
    data: Cloud;
    total?: number;
  };

  type DataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };

  type Element = {
    info?: string;
    name: string;
    uid?: string;
  };

  type ElementAddReq = {
    info?: string;
    name?: string;
    uid?: string;
  };

  type ElementEditReq = {
    info?: string;
    name?: string;
    uid?: string;
  };

  type ElementInfoResp = {
    code?: number;
    data: Element;
    msg?: string;
    success?: boolean;
  };

  type ElementListResp = {
    // #/components/schemas/BaseResp
    BaseResp;
    data: Element;
    total?: number;
  };

  type EmptyReq = true;

  type infoParams = {
    uid: string;
  };

  type infoParams = {
    uid: string;
  };

  type infoParams = {
    uid: string;
  };

  type infoParams = {
    uid: string;
  };

  type infoParams = {
    uid: string;
  };

  type listParams = {
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type listParams = {
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type listParams = {
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type listParams = {
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type listParams = {
    current?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
  };

  type OptUserInfo = {
    createBy: string;
    createdAt?: string;
    id?: number;
    updateBy: string;
    updatedAt?: string;
  };

  type PathIdReq = true;

  type PersonAddReq = {
    email?: string;
    enabled?: boolean;
    intro?: string;
    mobile?: string;
    name?: string;
    profession_ids?: string;
  };

  type PersonEditReq = {
    email?: string;
    enabled?: boolean;
    intro?: string;
    mobile?: string;
    name?: string;
    profession_ids?: string;
  };

  type PersonInfo = {
    email?: string;
    enabled?: boolean;
    intro?: string;
    mobile?: string;
    name?: string;
    professions?: Profession;
  };

  type PersonInfoResp = {
    code?: number;
    data: PersonInfo;
    msg?: string;
    success?: boolean;
  };

  type PersonListResp = {
    // #/components/schemas/BaseResp
    BaseResp;
    data: PersonInfo;
    total?: number;
  };

  type Profession = {
    info?: string;
    name: string;
    uid?: string;
  };

  type ProfessionAddReq = {
    info?: string;
    name?: string;
    uid?: string;
  };

  type ProfessionEditReq = {
    info?: string;
    name?: string;
    uid?: string;
  };

  type ProfessionInfoResp = {
    code?: number;
    data: Profession;
    msg?: string;
    success?: boolean;
  };

  type ProfessionListResp = {
    // #/components/schemas/BaseResp
    BaseResp;
    data: Profession;
    total?: number;
  };

  type Region = {
    info?: string;
    name: string;
    uid?: string;
  };

  type RegionAddReq = {
    info?: string;
    name?: string;
    uid?: string;
  };

  type RegionEditReq = {
    info?: string;
    name?: string;
    uid?: string;
  };

  type RegionInfoResp = {
    code?: number;
    data: Region;
    msg?: string;
    success?: boolean;
  };

  type RegionListResp = {
    // #/components/schemas/BaseResp
    BaseResp;
    data: Region;
    total?: number;
  };

  type SubDataListReq = {
    current?: number;
    keyword?: string;
    orderBy?: string;
    pageSize?: number;
  };
}
