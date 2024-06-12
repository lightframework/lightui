import { envPiplineApiCmdbEnvsPiplines } from "@/services/cmdb/env"
import { EditOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Form, Input, Popover } from "antd"
import { useId, useState } from "react"

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
  const [open, setOpen] = useState(false)
  const formId = useId()

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      envPiplineApiCmdbEnvsPiplines({ uid: envUid, ...values }),
    onSuccess: () => {
      setOpen(false)
      onFinish?.()
    },
  })

  return (
    <div className="flex items-center gap-1">
      <span>{pipeline}</span>
      {access.envPiplineApiCmdbEnvsPiplines && (
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={["click"]}
          destroyTooltipOnHide
          content={
            <Form
              id={formId}
              initialValues={{ Pipline: pipeline } satisfies FieldType}
              onFinish={mutation.mutate}
            >
              <Form.Item<FieldType> name="Pipline" noStyle>
                <Input style={{ width: 300 }} allowClear />
              </Form.Item>
              <Button htmlType="submit" type="primary" className="ml-2">
                确定
              </Button>
            </Form>
          }
        >
          <Button type="link" size="small" icon={<EditOutlined />} />
        </Popover>
      )}
    </div>
  )
}
