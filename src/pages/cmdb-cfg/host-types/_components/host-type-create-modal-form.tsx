import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { hosttypeCreateApiCmdbHosttypes } from "@/services/cmdb/hosttype"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function HostTypeCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<CMDB.HostTypeCreateReq>
      title="新建主机类型"
      name="host-type-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="primary"
          disabled={!access.hosttypeCreateApiCmdbHosttypes}
        >
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 5 }}
      onFinish={async (formData) => {
        await hosttypeCreateApiCmdbHosttypes(formData)
        message.success("新建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="类型名称"
        name="HostType"
        placeholder=""
        rules={[{ required: true, message: "请输入主机类型名称" }]}
      />
      <ProFormText
        label="命名规则"
        name="RuleDefinition"
        placeholder=""
        rules={[{ required: true, message: "请输入命名规则" }]}
      />
      <ProFormText
        label="VPC"
        name="VpcKeyword"
        placeholder="关键字，用于创建主机时检索VPC"
      />
      <ProFormText
        label="安全组"
        name="SecKeyword"
        placeholder="关键字，用于创建主机时检索安全组"
      />
      <ProFormText
        label="镜像"
        name="ImageKeyword"
        placeholder="关键字，用于创建主机时检索镜像"
      />
      <ProFormText label="默认管理员" name="AdminUser" placeholder="" />
      <ProFormDigit label="默认端口" name="DefaultLoginPort" placeholder="" />
      <ProFormText
        label="默认登录用户"
        name="DefaultLoginUser"
        placeholder=""
      />
      <ProFormText.Password
        label="默认登录密码"
        name="DefaultLoginPassword"
        placeholder=""
        rules={[
          {
            pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/,
            message: "不少于8个字符，至少包含数字、字母、特殊字符三种类型",
          },
        ]}
      />
      <ProFormDigit
        label="Ansible注册Id"
        name="AnsibleRegisterId"
        placeholder=""
      />
      <ProFormDigit
        label="Ansible注销Id"
        name="AnsibleDestroyId"
        placeholder=""
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
