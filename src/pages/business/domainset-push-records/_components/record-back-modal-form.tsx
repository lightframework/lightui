import {
  domainsetBackApiOpsDomainsetsBack,
  domainsetPushRecordsReadOneApiOpsDomainsetsByPushrecordsid,
} from "@/services/ops/domainset"
import {
  ModalForm,
  ProFormItem,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { message } from "antd"
import { useRef } from "react"
import EnvDomainsetBackGrid, {
  EnvDomainsetBackGridRef,
} from "./env-domainset-back-grid"

export default function RecordBackModalForm({
  open,
  onCancel,
  record,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  record?: OPS.DomainsetPushRecord
  onFinish?: VoidFunction
}) {
  const envDomainsetBackGridRef = useRef<EnvDomainsetBackGridRef>(null)

  const { data } = useQuery({
    queryKey: ["domainset-push-record", record?.id],
    queryFn: () =>
      domainsetPushRecordsReadOneApiOpsDomainsetsByPushrecordsid({
        id: String(record?.id),
      }).then((res) => res.data),
    enabled: !!record?.id,
  })

  if (!data) {
    return null
  }

  return (
    <ModalForm<OPS.DomainsetBackReq>
      title="回退DomainSet"
      name="domainset-push-back"
      width={900}
      autoFocusFirstInput
      open={open}
      initialValues={{
        backRecordId: record?.id,
        envPushInfos: data.envInfos?.map((item) => ({
          uid: item.uid,
          domainsetVersionIds: item.domainsetPushRecordVersions.map(
            (item) => item.domainsetId,
          ),
        })),
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!record) return false

        const envPushInfos =
          envDomainsetBackGridRef.current?.getEnvDomainsets() ?? []

        if (envPushInfos.length === 0) {
          message.error("请选择要回退DomainSet")
          return false
        }

        await domainsetBackApiOpsDomainsetsBack({ ...formData, envPushInfos })
        message.success("回退成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText name="backRecordId" hidden />
      <ProFormText
        label="标题"
        name="title"
        placeholder=""
        rules={[{ required: true, message: "请输入标题" }]}
      />
      <ProFormText
        label="pushType"
        name="pushType"
        initialValue="back"
        hidden
      />
      <ProFormItem label="环境 - DomainSet">
        <EnvDomainsetBackGrid
          ref={envDomainsetBackGridRef}
          data={data.envInfos}
        />
      </ProFormItem>
      <ProFormSwitch label="立即回退" name="pushNow" initialValue={false} />
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
