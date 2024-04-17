import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { entryCreateApiArgusDictsEntries } from "@/services/argus/dict"
import { PlusOutlined } from "@ant-design/icons"
import { ModalForm, ProFormText } from "@ant-design/pro-components"
import { useAccess, useModel } from "@umijs/max"
import { Button, message } from "antd"
import { useAtomValue } from "jotai"
import { selectedDictAtom } from "../_atoms"

export default function EntryCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const selectedDict = useAtomValue(selectedDictAtom)
  const access = useAccess()
  const { initialState } = useModel("@@initialState")
  const isSuper = initialState?.currentUser?.username === "lightops"

  return (
    <ModalForm<ARGUS.DictionaryEntryCreateReq>
      title="新建字典项"
      name="dict-entry-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="primary"
          disabled={
            !access.entryCreateApiArgusDictsEntries ||
            (selectedDict?.is_system && !isSuper)
          }
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
        if (!selectedDict) {
          return
        }
        await entryCreateApiArgusDictsEntries({
          dictionary_id: selectedDict.id,
          key: formData.key,
          value: formData.value ?? formData.key,
        })
        message.success("新建成功")
        onFinish?.()
        return true
      }}
      initialValues={{
        is_system: false,
      }}
    >
      <ProFormText
        label="键"
        name="key"
        placeholder=""
        rules={[{ required: true, message: "请输入键" }]}
      />
      <ProFormText label="值" name="value" placeholder="" />
    </ModalForm>
  )
}
