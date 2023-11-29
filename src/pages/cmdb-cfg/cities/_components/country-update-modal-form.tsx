import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { countryUpdateApiCmdbCountrysByUid } from "@/services/cmdb/country"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function CountryUpdateModalForm({
  open,
  onCancel,
  country,
  onFinish,
  continentUid,
}: {
  open: boolean
  onCancel: VoidFunction
  country?: CMDB.PlaceCountry
  onFinish?: VoidFunction
  continentUid: string
}) {
  return (
    <ModalForm<CMDB.CountryUpdateReq>
      title="更新地区"
      name="country-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={country}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!country) return false

        await countryUpdateApiCmdbCountrysByUid({ uid: country.Uid }, formData)
        message.success("更新成功")
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
