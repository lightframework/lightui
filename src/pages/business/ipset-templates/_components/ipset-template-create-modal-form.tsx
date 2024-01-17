import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { ipsetTemplateCreateApiOpsIpsettemplates } from "@/services/ops/ipsettemplate"
import { PlusOutlined } from "@ant-design/icons"
import { ModalForm, ProFormText } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import ExcludeMultiSelect from "./exclude-multi-select"
import IspSearchSelect from "./isp-search-select"
import LimitMultiSelect from "./limit-multi-select"

export default function IpsetTemplateCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()

  return (
    <ModalForm<OPS.IpsetTemplateCreateReq>
      title="新建ipset模板"
      name="ipset-template-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="primary"
          disabled={!access.ipsetTemplateCreateApiOpsIpsettemplates}
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
        await ipsetTemplateCreateApiOpsIpsettemplates(formData)
        message.success("新建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="模板名称"
        name="name"
        placeholder=""
        rules={[{ required: true, message: "请输入模板名称" }]}
      />
      <LimitMultiSelect />
      <ExcludeMultiSelect />
      <IspSearchSelect />
    </ModalForm>
  )
}
