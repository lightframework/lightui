import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { phaseRunApiOpsByPhasesid } from "@/services/ops/task"
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import { memo, useMemo } from "react"

const ManualProgressModalForm = memo(function ManualProgressModalForm({
  title,
  phaseId,
  onFinish,
  phaseStdin,
  defaultPassword,
}: {
  title: string
  phaseId: number
  onFinish?: VoidFunction
  phaseStdin: string
  defaultPassword?: string
}) {
  const access = useAccess()

  const initialData = useMemo(
    () => ({
      LoginUser: "root",
      LoginPort: 22,
      ...JSON.parse(phaseStdin === "" ? "{}" : phaseStdin),
      Password: defaultPassword,
    }),
    [phaseStdin],
  )

  return (
    <ModalForm<OPS.HostInfo>
      title={title}
      name="phase-run"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.phaseRunApiOpsByPhasesid}>
          信息录入
        </Button>
      }
      initialValues={initialData}
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await phaseRunApiOpsByPhasesid(
          { id: String(phaseId) },
          { HostInfo: formData },
        )
        message.success("执行成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormSelect
        label="公网IP"
        name="PublicIpAddresses"
        mode="tags"
        placeholder="回车键输入IP列表"
      />
      <ProFormSelect
        label="私网IP"
        name="PrivateIpAddresses"
        mode="tags"
        placeholder="回车键输入IP列表"
        dependencies={["PublicIpAddresses"]}
        rules={[
          (form) => ({
            validator: (_, value) => {
              const publicIpAddresses = form.getFieldValue("PublicIpAddresses")

              if (
                (Array.isArray(value) && value.length > 0) ||
                (Array.isArray(publicIpAddresses) &&
                  publicIpAddresses.length > 0)
              ) {
                return Promise.resolve()
              } else {
                return Promise.reject("公网IP和内网IP必须填一个")
              }
            },
          }),
        ]}
      />
      <ProFormText
        label="登录用户"
        name="LoginUser"
        placeholder=""
        rules={[{ required: true, message: "请输入登录用户" }]}
      />
      <ProFormDigit
        label="登录端口"
        name="LoginPort"
        placeholder=""
        rules={[{ required: true, message: "请输入登录端口" }]}
      />
      <ProFormText.Password label="密码" name="Password" placeholder="" />
    </ModalForm>
  )
})

export default ManualProgressModalForm
