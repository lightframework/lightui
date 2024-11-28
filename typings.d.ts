import "@umijs/max/typings"
// global.d.ts
declare global {
  interface Window {
    DTFrameLogin: (
      frameParams: IDTLoginFrameParams,
      loginParams: IDTLoginLoginParams,
      successCbk: (result: IDTLoginSuccess) => void,
      errorCbk?: (errorMsg: string) => void,
    ) => void
  }

  interface IDTLoginFrameParams {
    id: string
    width?: number
    height?: number
  }

  interface IDTLoginLoginParams {
    redirect_uri: string
    response_type: string
    client_id: string
    scope: string
    prompt: string
    state?: string
    org_type?: string
    corpId?: string
    exclusiveLogin?: string
    exclusiveCorpId?: string
  }

  interface IDTLoginSuccess {
    redirectUrl: string
    authCode: string
    state?: string
  }
}

export {}
