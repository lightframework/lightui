import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryUserOptions } from "@/lib/hooks/data"
import { incidentResignApiArgusIncidentsResign } from "@/services/argus/incident"
import { ModalForm, ProFormSelect } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export interface IncidentRegionModalFormProps {
  ids: number[]
  onFinish?: VoidFunction
}

export default function IncidentRegionModalForm({
  ids,
  onFinish,
}: IncidentRegionModalFormProps) {
  const access = useAccess()
  const { data, isFetching } = useQueryUserOptions()

  return (
    <ModalForm<{ userid: number }>
      title="转交故障"
      name="resign-incident"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          disabled={
            ids.length === 0 || !access.incidentResignApiArgusIncidentsResign
          }
        >
          转交
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
        await incidentResignApiArgusIncidentsResign({
          userid: formData.userid,
          username: data!.find((user) => user.id === formData.userid)!.username,
          ids,
        })
        message.success("转交成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormSelect
        label="转交用户"
        name="userid"
        placeholder=""
        options={data?.map((user) => ({
          value: user.id,
          label: user.username,
        }))}
        showSearch
        fieldProps={{
          loading: isFetching,
        }}
        rules={[{ required: true, message: "请选择转交用户" }]}
      />
    </ModalForm>
  )
}
