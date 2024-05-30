import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { usePersonOptions } from "@/lib/hooks"
import { EnvCreateApiCmdbEnvs } from "@/services/cmdb/env"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
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
      title="新建环境"
      name="cloud-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.EnvCreateApiCmdbEnvs}>
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="vertical"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      onFinish={async (formData) => {
        await EnvCreateApiCmdbEnvs(formData)
        message.success("创建成功")
        onFinish?.()
        return true
      }}
      className="max-h-[calc(100dvh-300px)] overflow-y-auto px-1"
      initialValues={{
        State: "ONLINE",
        EnvLanguage: "cn",
      }}
    >
      <ProFormText
        label="环境ID"
        name="EnvId"
        placeholder=""
        rules={[{ required: true, message: "请输入环境ID" }]}
      />
      <ProFormText
        label="环境名称"
        name="EnvName"
        placeholder=""
        rules={[{ required: true, message: "请输入环境名称" }]}
      />
      <ProFormText
        label="环境Key"
        name="EnvKey"
        placeholder=""
        rules={[{ required: true, message: "请输入环境Key" }]}
      />
      <ProFormRadio.Group
        label="状态"
        name="State"
        options={[
          {
            label: "线上",
            value: "ONLINE",
          },
          {
            label: "测试",
            value: "TEST",
          },
          {
            label: "灰度",
            value: "GRAY",
          },
        ]}
        rules={[{ required: true, message: "请选择状态" }]}
      />
      <ProFormSwitch
        label="是否灰度"
        name="IsGray"
        initialValue={true}
        rules={[{ required: true, message: "请选择是否灰度" }]}
      />
      <ProFormText
        label="官网链接"
        name="DomainName"
        placeholder=""
        rules={[
          { required: true },
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
          { required: true },
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
      <ProFormSelect
        label="Orch处理器架构"
        name="OsType"
        options={["centos", "euler"]}
        placeholder=""
        rules={[{ required: true, message: "请选择Orch处理器架构" }]}
      />
      <ProFormSelect
        label="Orch部署架构"
        name="EnvType"
        options={["split", "all"]}
        placeholder=""
        rules={[{ required: true, message: "请选择Orch部署架构" }]}
      />
      <ProFormSelect
        label="Orch语言"
        name="EnvLanguage"
        options={[
          { value: "cn", label: "中文" },
          { value: "us", label: "英文" },
        ]}
        placeholder=""
        rules={[{ required: true, message: "请选择Orch语言" }]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
