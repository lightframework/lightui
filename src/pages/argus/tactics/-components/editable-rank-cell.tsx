import { tacticUpdateRankApiArgusTacticsByIdrank } from "@/services/argus/tactic"
import { EditOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Form, InputNumber, Popconfirm } from "antd"
import { useId } from "react"

type FormValues = ARGUS.TacticUpdateRankReq
type FieldType = Partial<FormValues>

export interface EditableRankCellProps {
  id: ARGUS.TacticInfo["id"]
  rank: number
  onFinish?: VoidFunction
}

export default function EditableRankCell({
  id,
  rank,
  onFinish,
}: EditableRankCellProps) {
  const formId = useId()
  const access = useAccess()

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      tacticUpdateRankApiArgusTacticsByIdrank({ id: String(id) }, values),
    onSuccess: onFinish,
  })

  return (
    <div className="flex items-center gap-1">
      <span>{rank}</span>
      {access.tacticUpdateRankApiArgusTacticsByIdrank && (
        <Popconfirm
          destroyTooltipOnHide
          okButtonProps={{ form: formId, htmlType: "submit" }}
          icon={null}
          title={
            <Form
              id={formId}
              initialValues={{ rank } satisfies FieldType}
              onFinish={mutation.mutate}
            >
              <Form.Item<FieldType> name="rank" noStyle>
                <InputNumber />
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
