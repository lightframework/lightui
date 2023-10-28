import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { hostDeleteApiOpsHosts } from "@/services/ops/host"
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import useModal from "antd/es/modal/useModal"

export default function HostDeleteModalForm({
  hostUids,
  onFinish,
}: {
  hostUids: string[]
  onFinish?: VoidFunction
}) {
  const [modal, contextHolder] = useModal()
  const access = useAccess()

  const showDeleteConfirm = () =>
    modal.confirm({
      title: "确定立即删除主机吗？",
      icon: <ExclamationCircleOutlined />,
    })

  console.log(hostUids)

  return (
    <>
      {contextHolder}
      <ModalForm<OPS.HostDeleteReq>
        title="删除主机"
        width={MODAL_FORM_WIDTH}
        trigger={
          <Button
            type="primary"
            disabled={!access.hostDeleteApiOpsHosts || hostUids.length === 0}
            danger
          >
            <DeleteOutlined />
            删除主机
          </Button>
        }
        autoFocusFirstInput
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
        }}
        labelCol={{ span: 4 }}
        onFinish={async (formData) => {
          if (formData.preDeleteDay === 0) {
            const confirm = await showDeleteConfirm()
            if (!confirm) {
              return false
            }
          }

          await hostDeleteApiOpsHosts({
            ...formData,
            HostUids: hostUids,
          })
          message.success("删除成功")
          onFinish?.()
          return true
        }}
      >
        <ProFormText
          label="任务名称"
          name="topic"
          placeholder=""
          rules={[{ required: true, message: "请输入任务名称" }]}
        />
        <ProFormSelect
          label="预删除日期"
          name="preDeleteDay"
          placeholder=""
          initialValue={3}
          options={[
            {
              label: "立即删除",
              value: 0,
            },
            {
              label: "1天",
              value: 1,
            },
            {
              label: "2天",
              value: 2,
            },
            {
              label: "3天",
              value: 3,
            },
            {
              label: "4天",
              value: 4,
            },
            {
              label: "5天",
              value: 5,
            },
          ]}
        />
        <ProFormTextArea label="备注" name="remark" placeholder="" />
      </ModalForm>
    </>
  )
}
