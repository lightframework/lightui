import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { usePersonOptions } from "@/lib/hooks"
import { envUpdateApiCmdbEnvsByUid } from "@/services/cmdb/env"
import {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function EnvUpdateModalForm({
  open,
  onCancel,
  env,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  env?: CMDB.EnvInfo
  onFinish?: VoidFunction
}) {
  const opsPersons = usePersonOptions("运维")
  const qaPersons = usePersonOptions("QA")
  const salePersons = usePersonOptions("销售")
  const supportPersons = usePersonOptions("技术支持")

  return (
    <ModalForm<CMDB.EnvUpdateReq>
      title="更新环境"
      name="env-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{
        ...env,
        OpsIds: env?.Ops?.map((person) => person.Uid),
        QaIds: env?.Qa?.map((person) => person.Uid),
        SaleIds: env?.Sale?.map((person) => person.Uid),
        SupportIds: env?.Support?.map((person) => person.Uid),
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 5 }}
      onFinish={async (formData) => {
        if (!env) return false
        await envUpdateApiCmdbEnvsByUid(
          { uid: env.Uid },
          {
            ...formData,
            IpsetVersionIds: formData.IpsetVersionIds?.map((item) =>
              Number(item),
            ),
          },
        )
        message.success("更新成功")
        onCancel()
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
      <ProFormSwitch
        label="是否灰度"
        name="IsGray"
        initialValue={false}
        rules={[{ required: true, message: "请选择是否灰度" }]}
      />
      <ProFormText
        label="官网链接"
        name="DomainName"
        placeholder=""
        rules={[
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
          {
            type: "url",
            warningOnly: true,
          },
        ]}
      />
      <ProFormSelect
        label="IP Set VersionIds"
        name="IpsetVersionIds"
        mode="tags"
        placeholder="为了和orch同步的临时性解决方案"
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
