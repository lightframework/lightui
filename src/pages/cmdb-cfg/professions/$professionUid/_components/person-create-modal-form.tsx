import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { MOBILE_REGEX } from "@/constants/regex"
import { useQueryProfessionOptions } from "@/lib/hooks/data"
import { PersonCreateApiCmdbPersons } from "@/services/cmdb/person"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess, useParams } from "@umijs/max"
import { Button, message } from "antd"

export default function PersonCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  const { professionUid } = useParams()

  const { data: professionOptions } = useQueryProfessionOptions()

  return (
    <ModalForm<CMDB.PersonCreateReq>
      title="添加人员"
      name="person-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.PersonCreateApiCmdbPersons}>
          <PlusOutlined />
          添加
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await PersonCreateApiCmdbPersons(formData)
        message.success("添加成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="人员ID"
        name="PersonId"
        placeholder=""
        rules={[{ required: true, message: "请输入人员ID" }]}
      />
      <ProFormText
        label="人员名称"
        name="PersonName"
        placeholder=""
        rules={[{ required: true, message: "请输入人员名称" }]}
      />
      <ProFormText
        label="邮箱"
        name="Email"
        placeholder=""
        rules={[
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "邮箱格式不正确" },
        ]}
      />
      <ProFormText
        label="联系电话"
        name="Mobile"
        placeholder=""
        rules={[
          { required: true, message: "请输入联系电话" },
          { pattern: MOBILE_REGEX, message: "联系电话格式不正确" },
        ]}
      />
      <ProFormSwitch
        label="状态"
        name="Enabled"
        placeholder=""
        initialValue={false}
      />
      <ProFormSelect
        mode="multiple"
        showSearch
        label="部门"
        name="ProfessionIds"
        initialValue={professionUid ? [professionUid] : []}
        options={
          professionOptions?.map((profession) => ({
            label: profession.ProfessionName,
            value: profession.Uid,
          })) ?? []
        }
        rules={[
          {
            required: true,
            message: "请选择至少一个部门",
          },
        ]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
