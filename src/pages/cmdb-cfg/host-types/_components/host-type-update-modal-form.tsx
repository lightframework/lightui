import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { hosttypeUpdateApiCmdbHosttypesByUid } from "@/services/cmdb/hosttype"
import {
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function HostTypeUpdateModalForm({
  open,
  onCancel,
  hostType,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  hostType?: CMDB.HostTypeInfo
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<CMDB.HostTypeUpdateReq>
      title="更新主机类型"
      name="host-type-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={hostType}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      labelCol={{ span: 5 }}
      onFinish={async (formData) => {
        if (!hostType) return false
        await hosttypeUpdateApiCmdbHosttypesByUid(
          { uid: hostType.Uid },
          formData,
        )
        message.success("更新成功")
        onCancel()
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
      <ProFormText
        label="Ansible注册Id"
        name="AnsibleRegisterId"
        placeholder=""
      />
      <ProFormText
        label="Ansible注销Id"
        name="AnsibleDestroyId"
        placeholder=""
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
