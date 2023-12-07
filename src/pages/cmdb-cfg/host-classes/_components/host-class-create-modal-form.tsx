import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryJumpserverAdminUsers } from "@/lib/hooks/data"
import { hosttypeCreateApiCmdbHostclasses } from "@/services/cmdb/hostclasses"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function HostClassCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const adminUsersQuery = useQueryJumpserverAdminUsers()

  const access = useAccess()
  return (
    <ModalForm<CMDB.HostClassesCreateReq>
      title="新建主机类别"
      name="host-class-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="primary"
          disabled={!access.hosttypeCreateApiCmdbHostclasses}
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
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await hosttypeCreateApiCmdbHostclasses(formData)
        message.success("新建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="类别名称"
        name="HostClasses"
        placeholder=""
        rules={[{ required: true, message: "请输入主机类型名称" }]}
      />
      <ProFormSelect
        label="特权用户"
        name="AdminUser"
        placeholder=""
        fieldProps={{
          loading: adminUsersQuery.isFetching,
        }}
        options={adminUsersQuery.data?.map((item) => ({
          value: item.Id,
          label: `${item.Id}${item.Name ? ` - (${item.Name})` : ""}`,
        }))}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
