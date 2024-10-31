import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { teamUpdateApiSysTeamsById } from "@/services/sys/team"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function TeamUpdateModalForm({
  open,
  onCancel,
  team,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  team?: SYS.TeamOption
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<SYS.TeamUpdateReq>
      title="更新团队"
      name="team-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={team}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!team) return false

        await teamUpdateApiSysTeamsById({ id: String(team.id) }, formData)
        message.success("更新成功")
        onCancel()
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
