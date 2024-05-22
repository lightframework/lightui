import { envPiplineApiCmdbEnvsPiplines } from "@/services/cmdb/env"
import { EditOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Form, Input, Popconfirm } from "antd"
import { useId } from "react"

type FormValues = Omit<CMDB.EnvPiplineReq, "uid">
type FieldType = Partial<FormValues>

export interface EditablePipelineCellProps {
  envUid: CMDB.EnvInfo["Uid"]
  pipeline: CMDB.EnvInfo["Pipline"]
  onFinish?: VoidFunction
}

export default function EditablePipelineCell({
  envUid,
  pipeline,
  onFinish,
}: EditablePipelineCellProps) {
  const access = useAccess()
  const formId = useId()

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      envPiplineApiCmdbEnvsPiplines({ uid: envUid, ...values }),
    onSuccess: onFinish,
  })

  return (
    <div className="flex items-center gap-1">
      <span>{pipeline}</span>
      {access.envPiplineApiCmdbEnvsPiplines && (
        <Popconfirm
          destroyTooltipOnHide
          okButtonProps={{ form: formId, htmlType: "submit" }}
          icon={null}
          title={
            <Form
              id={formId}
              initialValues={{ Pipline: pipeline } satisfies FieldType}
              onFinish={mutation.mutate}
            >
              <Form.Item<FieldType> name="Pipline" noStyle>
                <Input style={{ width: 300 }} allowClear />
              </Form.Item>
            </Form>
          }
        >
          <Button type="link" size="small" icon={<EditOutlined />} />
        </Popconfirm>
      )}
    </div>
  )
}
