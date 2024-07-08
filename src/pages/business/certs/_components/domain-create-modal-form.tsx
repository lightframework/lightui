import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryUserOptions } from "@/lib/hooks/data"
import {
  domainCreateApiOpsDomains,
  domainDueDaysApiOpsDomainsDuedays,
} from "@/services/ops/domain"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  useDebounceValue,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useEffect } from "react"

function DueDayInput() {
  const form = useFormInstance()
  const domainName: string | undefined = useWatch("domainName")
  const port: number | undefined = useWatch("port")

  const debouncedDomainName = useDebounceValue(domainName)

  const { data } = useQuery({
    queryKey: ["cert-dueday", { debouncedDomainName, port }],
    queryFn: () =>
      domainDueDaysApiOpsDomainsDuedays({
        domain: debouncedDomainName!,
        port: port!,
      }).then((res) => res.data?.dueDays),
    enabled: !!debouncedDomainName && !!port,
  })

  useEffect(() => {
    if (data) {
      form.setFieldValue("dueDays", data)
    }
  }, [])

  return (
    <ProFormDigit
      label="到期天数"
      name="dueDays"
      rules={[{ required: true }]}
      disabled={!!data}
      placeholder=""
    />
  )
}

export default function DomainCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  const { data: userOptions } = useQueryUserOptions()

  return (
    <ModalForm<OPS.DomainCreateReq>
      title="新建域名"
      name="domain-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.domainCreateApiOpsDomains}>
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
        await domainCreateApiOpsDomains(formData)
        message.success("新建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="域名"
        name="domainName"
        placeholder=""
        rules={[{ required: true, message: "请输入域名" }]}
      />
      <ProFormDigit
        label="端口"
        name="port"
        placeholder=""
        rules={[{ required: true, message: "请输入端口" }]}
      />
      <DueDayInput />
      <ProFormSelect
        label="负责人"
        name="userIds"
        options={userOptions?.map((user) => ({
          value: user.id,
          label: user.username,
        }))}
        placeholder=""
        rules={[{ required: true, message: "请选择负责人" }]}
      />
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
