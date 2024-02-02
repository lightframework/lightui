import { certStateDict } from "@/constants/dict"
import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { hostOptionsApiCmdbHostsOptions } from "@/services/cmdb/host"
import { certUpdateApiOpsCertsById } from "@/services/ops/cert"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { message } from "antd"

export default function CertUpdateModalForm({
  open,
  onCancel,
  cert,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  cert?: OPS.CertInfo
  onFinish?: VoidFunction
}) {
  const isCustomerCert = !cert?.isAuto

  const hostOptionsQuery = useQuery({
    queryKey: ["host-options"],
    queryFn: () =>
      hostOptionsApiCmdbHostsOptions({}).then((res) => res.data?.list ?? []),
  })

  return (
    <ModalForm<OPS.CertUpdateReq>
      title="更新证书"
      name="cert-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{
        ...cert,
        hostUids: cert?.hostList?.map((host) => host.uid),
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!cert) return false
        await certUpdateApiOpsCertsById({ id: String(cert.id) }, formData)
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="证书名称"
        name="certName"
        placeholder=""
        readonly={!isCustomerCert}
        rules={
          isCustomerCert
            ? [
                {
                  required: true,
                  message: "请输入证书名称",
                },
              ]
            : undefined
        }
      />
      {!isCustomerCert && <ProFormText label="证书ID" name="certId" readonly />}
      <ProFormText
        label="域名"
        name="domain"
        placeholder=""
        readonly={!isCustomerCert}
        rules={
          isCustomerCert
            ? [
                {
                  required: true,
                  message: "请输入域名",
                },
              ]
            : undefined
        }
      />
      <ProFormSelect
        label="证书状态"
        name="certState"
        placeholder=""
        options={Object.entries(certStateDict).map(([key, value]) => ({
          label: value.value,
          value: key,
        }))}
        readonly={!isCustomerCert}
        rules={
          isCustomerCert
            ? [
                {
                  required: true,
                  message: "请选择证书状态",
                },
              ]
            : undefined
        }
      />
      {!isCustomerCert && <ProFormText label="云商" name="cloud" readonly />}
      <ProFormText label="签发时间" name="notBefore" readonly />
      <ProFormText label="过期时间" name="notAfter" readonly />
      {!isCustomerCert && (
        <ProFormSelect
          mode="multiple"
          label="主机"
          name="hostUids"
          options={hostOptionsQuery.data?.map((host) => ({
            value: host.Uid,
            label: host.HostName,
          }))}
          fieldProps={{
            loading: hostOptionsQuery.isFetching,
          }}
          placeholder=""
        />
      )}
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
