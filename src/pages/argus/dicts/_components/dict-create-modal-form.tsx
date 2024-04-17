import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { dictionaryCreateApiArgusDicts } from "@/services/argus/dict"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function DictCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<ARGUS.DictionaryCreateReq>
      title="新建字典"
      name="dict-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.dictionaryCreateApiArgusDicts}>
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
        await dictionaryCreateApiArgusDicts(formData)
        message.success("新建成功")
        onFinish?.()
        return true
      }}
      initialValues={{
        is_system: false,
      }}
    >
      <ProFormText
        label="字典名称"
        name="name"
        placeholder=""
        rules={[{ required: true, message: "请输入字典名称" }]}
      />
      <ProFormText
        label="字典类型"
        name="type"
        placeholder=""
        rules={[{ required: true, message: "请输入字典类型" }]}
      />

      <ProFormSwitch
        label="系统字典"
        name="is_system"
        rules={[{ required: true, message: "请选择是否系统字典" }]}
      />
    </ModalForm>
  )
}
