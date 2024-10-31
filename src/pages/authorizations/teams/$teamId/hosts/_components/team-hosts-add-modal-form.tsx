import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryUserOptions } from "@/lib/hooks/data"
import { teamMemAddApiSysTeamsByIdusers } from "@/services/sys/team"
import { PlusOutlined } from "@ant-design/icons"
import { ModalForm, ProFormSelect } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function TeamHostAddModalForm({
  teamId,
  onFinish,
}: {
  teamId: number
  onFinish?: VoidFunction
}) {
  const access = useAccess()

  const { data: userOptions, isPending } = useQueryUserOptions()

  return (
    <ModalForm<SYS.TeamMemAddReq>
      title="添加团队成员"
      name="team-member-add"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="primary"
          disabled={!access.teamMemAddApiSysTeamsByIdusers}
        >
          <PlusOutlined />
          添加
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
        await teamMemAddApiSysTeamsByIdusers({ id: String(teamId) }, formData)
        message.success("添加成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormSelect
        label="用户"
        name="usernames"
        placeholder=""
        mode="multiple"
        showSearch
        fieldProps={{ loading: isPending }}
        options={userOptions?.map((user) => ({
          label: user.username,
          value: user.username,
        }))}
        rules={[
          {
            required: true,
            message: "请选择用户",
          },
        ]}
      />
    </ModalForm>
  )
}
