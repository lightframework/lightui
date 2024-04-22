import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryUserOptions } from "@/lib/hooks/data"
import { envOwnerApiCmdbEnvsOwners } from "@/services/cmdb/env"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function OwnerModalForm({
  open,
  onCancel,
  env,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  env?: CMDB.EnvInfo
  onFinish?: VoidFunction
}) {
  const { data } = useQueryUserOptions()

  return (
    <ModalForm<CMDB.EnvOwnerReq>
      title="Owner更新"
      name="env-owner-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="vertical"
      open={open}
      initialValues={{
        uid: env?.Uid,
        Owners: env?.Owners,
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      onFinish={async (formData) => {
        if (!env) return false
        await envOwnerApiCmdbEnvsOwners(formData, formData)
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText name="uid" hidden />
      <ProFormSelect
        label="Owners"
        name="Owners"
        mode="multiple"
        options={data?.map((user) => ({
          label: user.username,
          value: user.username,
        }))}
        showSearch
        placeholder=""
      />
    </ModalForm>
  )
}
