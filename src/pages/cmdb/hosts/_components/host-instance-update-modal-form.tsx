import { instanceStateDict } from "@/constants/dict"
import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { IPV4_REGEX } from "@/constants/regex"
import { instancePatchApiCmdbInstancesByUid } from "@/services/cmdb/instance"
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { AutoComplete, message } from "antd"

export default function HostInstanceUpdateModalForm({
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
  return (
    <ModalForm<CMDB.InstancePatchReq>
      title="配置实例"
      name="host-instance-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={host?.Instance}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
        centered: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!host?.Instance) return false

        await instancePatchApiCmdbInstancesByUid(
          { uid: host.Instance.Uid },
          {
            ...formData,
            Cpu: Number(formData.Cpu),
            Memory: Number(formData.Memory),
          },
        )

        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="实例ID"
        name="InstanceId"
        rules={[
          {
            required: true,
            message: "请输入实例ID",
          },
        ]}
        placeholder=""
      />
      <ProFormText
        label="实例名称"
        name="InstanceName"
        rules={[
          {
            required: true,
            message: "请输入实例名称",
          },
        ]}
        placeholder=""
      />
      <ProForm.Item
        label="CPU"
        name="Cpu"
        rules={[
          {
            required: true,
            message: "请选择CPU核心数",
          },
          {
            pattern: /^[1-9]\d*$/,
            message: "请输入正整数",
          },
        ]}
      >
        <AutoComplete
          suffixIcon="核心"
          options={[
            {
              value: "1",
            },
            {
              value: "2",
            },
            {
              value: "4",
            },
            {
              value: "6",
            },
            {
              value: "8",
            },
            {
              value: "16",
            },
            {
              value: "24",
            },
            {
              value: "32",
            },
          ]}
        />
      </ProForm.Item>
      <ProForm.Item
        label="内存"
        name="Memory"
        rules={[
          {
            required: true,
            message: "请选择内存大小",
          },
          {
            pattern: /^[1-9]\d*$/,
            message: "请输入正整数",
          },
        ]}
      >
        <AutoComplete
          suffixIcon="GB"
          options={[
            {
              value: "1",
            },
            {
              value: "2",
            },
            {
              value: "4",
            },
            {
              value: "6",
            },
            {
              value: "8",
            },
            {
              value: "16",
            },
            {
              value: "24",
            },
            {
              value: "32",
            },
          ]}
        />
      </ProForm.Item>
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
      <ProFormSelect
        label="状态"
        name="InstanceState"
        placeholder=""
        options={Object.entries(instanceStateDict).map(([key, item]) => ({
          label: item.value,
          value: key,
        }))}
        rules={[
          {
            required: true,
            message: "请选择实例状态",
          },
        ]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
