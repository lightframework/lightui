import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { continentCreateApiCmdbContinents } from "@/services/cmdb/continent"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, Tooltip, message } from "antd"

export default function ContinentCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<CMDB.ContinentCreateReq>
      title="添加大洲"
      name="continent-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Tooltip title="添加大洲">
          <Button
            type="text"
            shape="circle"
            disabled={!access.continentCreateApiCmdbContinents}
            icon={<PlusOutlined />}
          />
        </Tooltip>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await continentCreateApiCmdbContinents(formData)
        message.success("添加成功")
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
