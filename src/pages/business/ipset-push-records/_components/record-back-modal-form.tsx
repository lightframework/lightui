import {
  ipsetBackApiOpsIpsetsBack,
  ipsetPushRecordsReadOneApiOpsIpsetsByPushrecordsid,
} from "@/services/ops/ipset"
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
import EnvIpsetBackGrid, { EnvIpsetBackGridRef } from "./env-ipset-back-grid"

export default function RecordBackModalForm({
  open,
  onCancel,
  record,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  record?: OPS.IpsetPushRecord
  onFinish?: VoidFunction
}) {
  const envIpsetBackGridRef = useRef<EnvIpsetBackGridRef>(null)

  const { data } = useQuery({
    queryKey: ["ipset-push-record", record?.id],
    queryFn: () =>
      ipsetPushRecordsReadOneApiOpsIpsetsByPushrecordsid({
        id: String(record?.id),
      }).then((res) => res.data),
    enabled: !!record?.id,
  })

  if (!data) {
    return null
  }

  return (
    <ModalForm<OPS.IpsetBackReq>
      title="回退ipset"
      name="ipset-push-back"
      width={800}
      autoFocusFirstInput
      open={open}
      initialValues={{
        backRecordId: record?.id,
        envPushInfos: data.envInfos?.map((item) => ({
          uid: item.uid,
          ipsetVersionIds: item.ipsetPushRecordVersions.map(
            (item) => item.ipsetId,
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

        const envPushInfos = envIpsetBackGridRef.current?.getEnvIpsets() ?? []

        if (envPushInfos.length === 0) {
          message.error("请选择要回退ipset")
          return false
        }

        await ipsetBackApiOpsIpsetsBack({ ...formData, envPushInfos })
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
      <ProFormItem label="环境ipset">
        <EnvIpsetBackGrid ref={envIpsetBackGridRef} data={data.envInfos} />
      </ProFormItem>
      <ProFormSwitch label="立即回退" name="pushNow" initialValue={false} />
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
