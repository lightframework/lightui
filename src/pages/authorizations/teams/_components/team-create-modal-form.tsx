import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { TeamCreateApiSysTeams } from "@/services/sys/team"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function TeamCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<SYS.TeamCreateReq>
      title="创建团队"
      name="team-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="link" disabled={!access.TeamCreateApiSysTeams}>
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await TeamCreateApiSysTeams(formData)
        message.success("创建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="团队名称"
        name="name"
        placeholder=""
        rules={[{ required: true, message: "请输入团队名称" }]}
      />
      <ProFormTextArea label="备注" name="info" placeholder="" />
    </ModalForm>
  )
}
