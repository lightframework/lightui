import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryIpsetInfo } from "@/lib/hooks/data"
import { ipsetUpdateApiOpsIpsetsById } from "@/services/ops/ipset"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function IpsetUpdateModalForm({
  open,
  onCancel,
  ipset,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  ipset?: OPS.IpsetList
  onFinish?: VoidFunction
}) {
  const { data, refetch } = useQueryIpsetInfo(ipset?.id)

  if (!data) return null

  return (
    <ModalForm<OPS.IpsetUpdateReq>
      title="更新ipset"
      name="ipset-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{ ...ipset, cidrs: data.cidrs?.join("\n") }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 3 }}
      onFinish={async (formData) => {
        if (!ipset) return false
        await ipsetUpdateApiOpsIpsetsById(
          { id: String(ipset.id) },
          {
            ...formData,
            cidrs: (formData.cidrs as unknown as string)
              .split("\n")
              .map((i) => i.trim()),
          },
        )
        message.success("更新成功")
        onCancel()
        refetch()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="名称"
        name="name"
        placeholder=""
        rules={[{ required: true, message: "请输入ipset名称" }]}
      />
      <ProFormTextArea
        label="cidrs"
        name="cidrs"
        placeholder="如：&#10;8.141.176.0-8.141.176.255&#10;14.197.242.250&#10;17.94.3.248-17.94.3.255"
        fieldProps={{
          autoSize: {
            minRows: 6,
            maxRows: 10,
          },
        }}
        rules={[{ required: true, message: "请输入cidrs" }]}
      />
      <ProFormSwitch
        label="存档"
        name="isArchive"
        tooltip="提交为新版本"
        initialValue={false}
      />
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
