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
}: {
  title: string
  phaseId: number
  onFinish?: VoidFunction
  phaseStdin: string
}) {
  const access = useAccess()

  const initialData = useMemo(
    () => JSON.parse(phaseStdin === "" ? "{}" : phaseStdin),
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
      <ProFormText label="实例ID" name="InstanceId" placeholder="" />
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
      />
      <ProFormText
        label="登录用户"
        name="LoginUser"
        placeholder=""
        initialValue="root"
        rules={[{ required: true, message: "请输入登录用户" }]}
      />
      <ProFormDigit
        label="登录端口"
        name="LoginPort"
        placeholder=""
        initialValue={22}
        rules={[{ required: true, message: "请输入登录端口" }]}
      />
      <ProFormText.Password label="密码" name="Password" placeholder="" />
      <ProFormText label="uuid" name="Uuid" placeholder="" />
    </ModalForm>
  )
})

export default ManualProgressModalForm
