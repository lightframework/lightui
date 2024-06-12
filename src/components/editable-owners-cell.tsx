import { useQueryUserOptions } from "@/lib/hooks/data"
import { defaultSelectFilter } from "@/lib/utils"
import { envOwnerApiCmdbEnvsOwners } from "@/services/cmdb/env"
import { EditOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Form, Popover, Select, Typography } from "antd"
import { useState } from "react"

type FormValues = Omit<CMDB.EnvOwnerReq, "uid">
type FieldType = Partial<FormValues>

export interface EditableOwnersCellProps {
  envUid: CMDB.EnvInfo["Uid"]
  owners: CMDB.EnvInfo["Owners"]
  onFinish?: VoidFunction
}

export default function EditableOwnersCell({
  envUid,
  owners,
  onFinish,
}: EditableOwnersCellProps) {
  const access = useAccess()
  const [open, setOpen] = useState(false)
  const { data, isFetching } = useQueryUserOptions()

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      envOwnerApiCmdbEnvsOwners({ uid: envUid, ...values }),
    onSuccess: () => {
      setOpen(false)
      onFinish?.()
    },
  })

  return (
    <div className="flex items-center gap-1">
      <Typography.Paragraph ellipsis={{ tooltip: true }} className="!mb-0">
        {owners?.join(",")}
      </Typography.Paragraph>
      {access.envOwnerApiCmdbEnvsOwners && (
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={["click"]}
          destroyTooltipOnHide
          content={
            <Form
              initialValues={{ Owners: owners } satisfies FieldType}
              onFinish={mutation.mutate}
            >
              <Form.Item<FieldType> name="Owners" noStyle>
                <Select
                  mode="multiple"
                  options={data?.map((user) => ({
                    value: user.username,
                    label: user.username,
                  }))}
                  style={{ width: 300 }}
                  maxTagCount="responsive"
                  allowClear
                  showSearch
                  loading={isFetching}
                  filterOption={defaultSelectFilter}
                />
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
