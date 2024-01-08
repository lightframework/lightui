import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { ipsetCreateApiOpsIpsets } from "@/services/ops/ipset"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import useModal from "antd/es/modal/useModal"

export default function IpsetCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  const [modal, contextHolder] = useModal()

  return (
    <>
      {contextHolder}
      <ModalForm<OPS.IpsetCreateReq>
        title="新建ipset"
        name="ipset-create"
        width={MODAL_FORM_WIDTH}
        trigger={
          <Button type="primary" disabled={!access.ipsetCreateApiOpsIpsets}>
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
        labelCol={{ span: 3 }}
        onFinish={async (formData) => {
          const ok = await modal.confirm({
            title: formData.isArchive
              ? "确定要提交为新版本吗？"
              : "确定仅保存而不提交为新版本吗？",
          })

          if (!ok) return false

          await ipsetCreateApiOpsIpsets({
            ...formData,
            cidrs: (formData.cidrs as unknown as string)
              .split("\n")
              .map((i) => i.trim()),
          })
          message.success("新建成功")
          onFinish?.()
          return true
        }}
      >
        <ProFormText
          label="名称"
          name="name"
          placeholder=""
          rules={[{ required: true, message: "请输入ipset名称" }]}
        />
        <ProFormTextArea
          label="cidrs"
          name="cidrs"
          placeholder="支持三种格式：&#10;1.1.1.1&#10;1.1.1.0/24&#10;1.1.1.1-1.1.4.7"
          fieldProps={{
            autoSize: {
              minRows: 6,
              maxRows: 10,
            },
          }}
          rules={[{ required: true, message: "请输入cidrs" }]}
        />
        <ProFormSwitch
          label="存档"
          name="isArchive"
          tooltip="提交为新版本"
          initialValue={false}
        />
        <ProFormTextArea label="备注" name="description" placeholder="" />
      </ModalForm>
    </>
  )
}
