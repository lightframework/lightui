import { EditOutlined } from "@ant-design/icons"
import { Button, Form, Input, Popover } from "antd"
import FormItem from "antd/es/form/FormItem"
import React, { ReactNode, useState } from "react"

export interface EditableProps<T> {
  value?: T
  children?: React.ReactNode
  control?: ReactNode
  disabled?: boolean
  onFinish?: (value: T) => Promise<void>
}

export default function Editable<T>({
  value,
  children,
  control,
  disabled,
  onFinish,
}: EditableProps<T>) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex w-full items-center gap-1">
      <div className="line-clamp-1">{children}</div>
      {!disabled && (
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={["click"]}
          content={
            <Form<{ value: T }>
              initialValues={{ value }}
              onFinish={({ value }) => {
                onFinish?.(value)
                setOpen(false)
              }}
              className="flex items-center gap-1"
            >
              <FormItem noStyle name="value">
                {control ?? <Input />}
              </FormItem>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form>
          }
          destroyTooltipOnHide
        >
          <Button type="link" size="small" icon={<EditOutlined />} />
        </Popover>
      )}
    </div>
  )
}
