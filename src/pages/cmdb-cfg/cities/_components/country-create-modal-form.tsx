import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { CountryCreateApiCmdbCountrys } from "@/services/cmdb/country"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function CountryCreateModalForm({
  open,
  onCancel,
  continentUid,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  continentUid: string
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<CMDB.CountryCreateReq>
      title="添加国家（地区）"
      name="country-create"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await CountryCreateApiCmdbCountrys(formData)
        message.success("添加成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText name="ContinentUid" initialValue={continentUid} hidden />
      <ProFormText
        label="ID"
        name="CountryId"
        placeholder=""
        rules={[{ required: true, message: "请输入ID" }]}
      />
      <ProFormText
        label="名称"
        name="CountryNameCn"
        placeholder=""
        rules={[{ required: true, message: "请输入名称" }]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
