import { incidentCommentApiArgusIncidentsByIdcomments } from "@/services/argus/incident"
import { CloseOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from "antd"
import { useForm } from "antd/es/form/Form"
import clsx from "clsx"

type FormValues = {
  content: string
}

export interface TopCommentProps {
  incidentId: number
  onFinish?: VoidFunction
  grayBg?: boolean
  onClose?: VoidFunction
  className?: string
  parentId?: number
}

export default function TopComment({
  incidentId,
  onFinish,
  grayBg,
  onClose,
  className,
  parentId,
}: TopCommentProps) {
  const [form] = useForm()

  return (
    <Form<FormValues>
      form={form}
      className={clsx("ml-3", className)}
      onFinish={async (values) => {
        await incidentCommentApiArgusIncidentsByIdcomments(
          { id: String(incidentId) },
          { content: values.content, parent_id: parentId ?? 0 },
        )
        form.resetFields()
        message.success("评论成功")
        onFinish?.()
      }}
    >
      <Form.Item<FormValues> name="content" noStyle>
        <Input.TextArea
          rows={4}
          placeholder="点击编辑内容"
          className={clsx(
            "outline-none focus:shadow-none focus:outline-none",
            grayBg &&
              "border-none bg-gray-100 hover:border-none hover:bg-gray-100 focus:border-none focus:bg-gray-100",
          )}
        />
      </Form.Item>
      <div className="mt-2 flex items-center justify-end gap-2">
        {onClose && (
          <Button
            icon={<CloseOutlined />}
            htmlType="button"
            type="text"
            onClick={onClose}
          />
        )}
        <Button htmlType="submit" type="primary">
          评论
        </Button>
      </div>
    </Form>
  )
}
