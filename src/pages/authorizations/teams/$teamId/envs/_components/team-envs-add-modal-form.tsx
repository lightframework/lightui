import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { PERM_EDIT } from "@/constants/vars"
import { useQueryEnvOptions } from "@/lib/hooks/data"
import { TeamPermAddApiSysTeamsByIdperms } from "@/services/sys/team"
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

  const { data: envOptions, isPending } = useQueryEnvOptions(0, PERM_EDIT, true)

  return (
    <ModalForm<SYS.TeamPermsAddReq>
      title="添加环境"
      name="team-envs-add"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="primary"
          disabled={!access.TeamPermAddApiSysTeamsByIdperms}
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
        console.log(formData)
        await TeamPermAddApiSysTeamsByIdperms(
          { id: String(teamId) },
          {
            resource: 1,
            uids: formData.uids,
          },
        )
        message.success("添加成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormSelect
        label="环境"
        name="uids"
        placeholder=""
        mode="multiple"
        showSearch
        fieldProps={{ loading: isPending }}
        options={envOptions?.map((env) => ({
          label: env.EnvName,
          value: env.Uid,
        }))}
        rules={[
          {
            required: true,
            message: "请选择环境",
          },
        ]}
      />
    </ModalForm>
  )
}
