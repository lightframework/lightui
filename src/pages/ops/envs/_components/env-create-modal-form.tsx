import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { usePersonOptions } from "@/lib/hooks"
import { EnvCreateApiCmdbEnvs } from "@/services/cmdb/env"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function EnvCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  const opsPersons = usePersonOptions("运维")
  const qaPersons = usePersonOptions("QA")
  const salePersons = usePersonOptions("销售")
  const supportPersons = usePersonOptions("技术支持")

  return (
    <ModalForm<CMDB.EnvCreateReq>
      title="创建环境"
      name="env-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="link" disabled={!access.EnvCreateApiCmdbEnvs}>
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await EnvCreateApiCmdbEnvs(formData)
        message.success("创建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="环境ID"
        name="EnvId"
        placeholder=""
        rules={[{ required: true, message: "请输入环境ID" }]}
      />
      <ProFormText
        label="环境Key"
        name="EnvKey"
        placeholder=""
        rules={[{ required: true, message: "请输入环境Key" }]}
      />
      <ProFormText
        label="环境名称"
        name="EnvName"
        placeholder=""
        rules={[{ required: true, message: "请输入环境名称" }]}
      />
      <ProFormText
        label="官网链接"
        name="DomainName"
        placeholder=""
        rules={[
          { required: true, message: "请输入官网链接" },
          {
            type: "url",
            warningOnly: true,
          },
        ]}
      />
      <ProFormText
        label="API链接"
        name="ApiDomainName"
        placeholder=""
        rules={[
          { required: true, message: "请输入API链接" },
          {
            type: "url",
            warningOnly: true,
          },
        ]}
      />
      <ProFormText label="SecretId" name="SecretId" placeholder="" />
      <ProFormText label="SecretKey" name="SecretKey" placeholder="" />
      <ProFormSelect
        label="运维"
        name="OpsIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={opsPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormSelect
        label="QA"
        name="QaIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={qaPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormSelect
        label="销售"
        name="SaleIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={salePersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormSelect
        label="技术支持"
        name="SupportIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={supportPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
