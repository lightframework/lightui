import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryHostClassesOptions } from "@/lib/hooks/data"
import { hosttypeCreateApiCmdbHosttypes } from "@/services/cmdb/hosttype"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
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

  const hostClassesOptionsQuery = useQueryHostClassesOptions()

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
        maskClosable: false,
      }}
      initialValues={{
        Platform: "Linux",
      }}
      labelCol={{ span: 5 }}
      onFinish={async (formData) => {
        await hosttypeCreateApiCmdbHosttypes(formData)
        message.success("新建成功")
        onFinish?.()
        return true
      }}
    >
      <div className="max-h-[70dvh] overflow-auto px-1">
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
        <ProFormRadio.Group
          label="操作系统"
          name="Platform"
          placeholder=""
          options={["Linux", "Windows"]}
          rules={[{ required: true, message: "请选择系统" }]}
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
      </div>
    </ModalForm>
  )
}
