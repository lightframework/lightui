import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { continentUpdateApiCmdbContinentsByUid } from "@/services/cmdb/continent"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function ContinentUpdateModalForm({
  open,
  onCancel,
  continent,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  continent?: CMDB.PlaceContinent
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<CMDB.ContinentUpdateReq>
      title="更新大洲"
      name="continent-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={continent}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!continent) return false

        await continentUpdateApiCmdbContinentsByUid(
          { uid: continent.Uid },
          formData,
        )
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="ID"
        name="ContinentId"
        placeholder=""
        rules={[{ required: true, message: "请输入ID" }]}
      />
      <ProFormText
        label="名称"
        name="ContinentNameCn"
        placeholder=""
        rules={[{ required: true, message: "请输入名称" }]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
