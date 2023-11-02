import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { usePersonOptions } from "@/lib/hooks"
import { useQueryEnvOptions } from "@/lib/hooks/data"
import { hostUpdateApiCmdbHostsByUid } from "@/services/cmdb/host"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function HostUpdateModalForm({
  open,
  onCancel,
  host,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  host?: CMDB.HostInfo
  onFinish?: VoidFunction
}) {
  const envOptionsQuery = useQueryEnvOptions()
  const opsPersons = usePersonOptions("运维")
  const supportPersons = usePersonOptions("技术支持")

  return (
    <ModalForm<CMDB.HostUpdateReq>
      title="更新主机信息"
      name="host-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{
        EnvUid: host?.Env.Uid,
        LoginUser: host?.Instance.DefaultLoginUser,
        LoginPort: host?.Instance.DefaultLoginPort,
        Description: host?.Description,
        OpsUids: host?.OpsSet?.map((ops) => ops.Uid),
        SupportUids: host?.SupportSet?.map((support) => support.Uid),
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      labelCol={{ span: 5 }}
      onFinish={async (formData) => {
        if (!host) return false
        await hostUpdateApiCmdbHostsByUid({ uid: (host as any).Uid }, formData)
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormSelect
        label="所属环境"
        name="EnvUid"
        showSearch
        fieldProps={{
          loading: envOptionsQuery.isPending,
        }}
        options={envOptionsQuery.data?.map((env) => ({
          label: env.EnvName,
          value: env.Uid,
        }))}
        rules={[
          {
            required: true,
            message: "请选择所属环境",
          },
        ]}
        placeholder=""
      />
      <ProFormText label="登录用户" name="LoginUser" placeholder="" />
      <ProFormText
        label="登录端口"
        name="LoginPort"
        placeholder=""
        rules={[
          {
            pattern:
              /^(?:[1-9]\d{0,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: "请输入合法的端口号",
          },
        ]}
        transform={(value) => Number(value)}
      />
      <ProFormSelect
        label="运维"
        name="OpsUids"
        placeholder=""
        mode="multiple"
        showSearch
        options={opsPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormSelect
        label="技术支持"
        name="SupportUids"
        placeholder=""
        mode="multiple"
        showSearch
        options={supportPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
