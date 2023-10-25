import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { hostDeleteApiOpsHosts } from "@/services/ops/host"
import { DeleteOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function HostDeleteModalForm({
  instanceIds,

  onFinish,
}: {
  instanceIds: string[]

  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<OPS.HostDeleteReq>
      title="删除主机"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="primary"
          disabled={!access.hostDeleteApiOpsHosts || instanceIds.length === 0}
          danger
        >
          <DeleteOutlined />
          删除主机
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await hostDeleteApiOpsHosts({ ...formData, instanceIds })
        message.success("删除成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="任务名称"
        name="topic"
        placeholder=""
        rules={[{ required: true, message: "请输入任务名称" }]}
      />
      <ProFormTextArea label="备注" name="remark" placeholder="" />
    </ModalForm>
  )
}
