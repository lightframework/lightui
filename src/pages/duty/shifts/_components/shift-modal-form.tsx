import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryUserOptions } from "@/lib/hooks/data"
import {
  shiftCreateApiSysDutiesShifts,
  shiftUpdateApiSysDutiesShifts,
} from "@/services/sys/duty"
import {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components"
import { message } from "antd"
import { useAtom } from "jotai"
import { RESET } from "jotai/utils"
import { shiftTableActionAtom } from "../_atoms"

export default function ShiftModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const [{ type, shift }, setAction] = useAtom(shiftTableActionAtom)

  const userQuery = useQueryUserOptions()
  const userOptions = userQuery.data?.map((item) => ({
    value: item.username,
    label: item.username,
  }))

  const open = type === "create" || type === "update"
  const title = type === "create" ? "添加班次" : "更新班次"
  const close = () => setAction(RESET)

  return (
    <ModalForm<SYS.ShiftCreateReq["data"]>
      title={title}
      name="shift-form"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={shift ?? { is_paid_duty: true }}
      modalProps={{
        destroyOnClose: true,
        onCancel: close,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (shift) {
          await shiftUpdateApiSysDutiesShifts({
            data: { ...formData, id: shift.id },
          })
          message.success("更新成功")
        } else {
          await shiftCreateApiSysDutiesShifts({ data: formData })
          message.success("添加成功")
        }

        close()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="班次名称"
        name="name"
        placeholder=""
        rules={[{ required: true, message: "请输入班次名称" }]}
      />
      <ProFormSelect
        mode="multiple"
        label="管理员"
        name="admins"
        options={userOptions}
        placeholder=""
        rules={[{ required: true, message: "请选择管理员" }]}
        showSearch
      />
      <ProFormSelect
        mode="multiple"
        label="成员"
        name="members"
        options={userOptions}
        placeholder=""
        rules={[{ required: true, message: "请选择成员" }]}
        showSearch
      />
      <ProFormSwitch
        label="值班费"
        name="is_paid_duty"
        placeholder=""
        rules={[{ required: true, message: "请选择是否支付值班费" }]}
      />
    </ModalForm>
  )
}
