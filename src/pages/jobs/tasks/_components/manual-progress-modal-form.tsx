import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { IPV4_REGEX } from "@/constants/regex"
import { phaseRunApiOpsByPhasesid } from "@/services/ops/task"
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import { memo } from "react"

const ManualProgressModalForm = memo(function ManualProgressModalForm({
  title,
  phaseId,
  onFinish,
}: {
  title: string
  phaseId: number
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<OPS.HostInfo>
      title={title}
      name="phase-run"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.phaseRunApiOpsByPhasesid}>
          手动执行
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
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
        rules={[
          { required: true, message: "请输入公网IP" },
          {
            validateTrigger: ["onBlur", "onChange"],
            validator: (_, value) => {
              if (Array.isArray(value)) {
                for (const ip of value) {
                  if (!IPV4_REGEX.test(ip)) {
                    return Promise.reject(`${ip}不是有效的IP地址`)
                  }
                }
              }
              return Promise.resolve()
            },
          },
        ]}
      />
      <ProFormSelect
        label="私网IP"
        name="PrivateIpAddresses"
        mode="tags"
        placeholder="回车键输入IP列表"
        rules={[
          {
            validateTrigger: ["onBlur", "onChange"],
            validator: (_, value) => {
              if (Array.isArray(value)) {
                for (const ip of value) {
                  if (!IPV4_REGEX.test(ip)) {
                    return Promise.reject(`${ip}不是有效的IP地址`)
                  }
                }
              }
              return Promise.resolve()
            },
          },
        ]}
      />
      <ProFormText
        label="登录用户"
        name="LoginUser"
        placeholder=""
        initialValue="root"
        rules={[{ required: true, message: "请输入公网IP" }]}
      />
      <ProFormDigit
        label="登录端口"
        name="LoginPort"
        placeholder=""
        initialValue={22}
        rules={[{ required: true, message: "请输入公网IP" }]}
      />
      <ProFormText.Password label="密码" name="Password" placeholder="" />
      <ProFormText label="uuid" name="Uuid" placeholder="" />
    </ModalForm>
  )
})

export default ManualProgressModalForm
