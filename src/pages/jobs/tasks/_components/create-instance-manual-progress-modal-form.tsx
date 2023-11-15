import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { phaseRunApiOpsByPhasesid } from "@/services/ops/task"
import { ModalForm, ProFormText } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import { memo } from "react"

const CreateInstanceManualProgressModalForm = memo(
  function CreateInstanceManualProgressModalForm({
    title,
    phaseId,
    onFinish,
  }: {
    title: string
    phaseId: number
    onFinish?: VoidFunction
  }) {
    const access = useAccess()
    return (
      <ModalForm<OPS.HostInfo>
        title={title}
        name="phase-run"
        width={MODAL_FORM_WIDTH}
        trigger={
          <Button type="primary" disabled={!access.phaseRunApiOpsByPhasesid}>
            手动执行
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
          await phaseRunApiOpsByPhasesid(
            { id: String(phaseId) },
            { HostInfo: formData },
          )
          message.success("执行成功")
          onFinish?.()
          return true
        }}
      >
        <ProFormText label="实例ID" name="InstanceId" placeholder="" />
      </ModalForm>
    )
  },
)

export default CreateInstanceManualProgressModalForm
