import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryHostClassesOptions } from "@/lib/hooks/data"
import { hosttypeUpdateApiCmdbHosttypesByUid } from "@/services/cmdb/hosttype"
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
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
  const hostClassesOptionsQuery = useQueryHostClassesOptions()

  return (
    <ModalForm<CMDB.HostTypeUpdateReq>
      title="更新主机类型"
      name="host-type-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{
        ...hostType,
        HostClassesUid: hostType?.HostClasses?.Uid,
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
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
      <ProFormSelect
        label="主机类别"
        name="HostClassesUid"
        fieldProps={{
          loading: hostClassesOptionsQuery.isFetching,
        }}
        placeholder=""
        options={hostClassesOptionsQuery.data?.map((item) => ({
          value: item.Uid,
          label: item.HostClasses,
        }))}
        rules={[
          {
            required: true,
            message: "请选择主机类别",
          },
        ]}
      />
      <ProFormText
        label="命名规则"
        name="RuleDefinition"
        placeholder=""
        rules={[{ required: true, message: "请输入命名规则" }]}
      />
      <ProFormText
        label="JumpPath"
        name="JumpPath"
        placeholder=""
        rules={[
          {
            pattern: /^\/[^]*[^/]$/,
            message: 'JumpPath以"/"开头，结尾不能为"/"',
          },
        ]}
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
      <ProFormText label="默认私钥" name="DefaultPrivateKey" placeholder="" />
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
      <ProFormSelect
        mode="tags"
        label="业务类型"
        placeholder=""
        name="Businesses"
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
