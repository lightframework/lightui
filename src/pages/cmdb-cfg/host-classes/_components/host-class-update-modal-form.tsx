import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryJumpserverAdminUsers } from "@/lib/hooks/data"
import { hosttypeUpdateApiCmdbHostclassesByUid } from "@/services/cmdb/hostclasses"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function HostClassUpdateModalForm({
  open,
  onCancel,
  hostClass,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  hostClass?: CMDB.HostClassesInfo
  onFinish?: VoidFunction
}) {
  const adminUsersQuery = useQueryJumpserverAdminUsers()

  return (
    <ModalForm<CMDB.HostClassesUpdateReq>
      title="更新主机类别"
      name="host-class-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={hostClass}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!hostClass) return false
        await hosttypeUpdateApiCmdbHostclassesByUid(
          { uid: hostClass.Uid },
          formData,
        )
        message.success("更新成功")
        onCancel()
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
