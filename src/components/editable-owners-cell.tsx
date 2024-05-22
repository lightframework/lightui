import { useQueryUserOptions } from "@/lib/hooks/data"
import { defaultSelectFilter } from "@/lib/utils"
import { envOwnerApiCmdbEnvsOwners } from "@/services/cmdb/env"
import { EditOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Form, Popconfirm, Select, Typography } from "antd"
import { useId } from "react"

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
  const formId = useId()
  const access = useAccess()
  const { data, isFetching } = useQueryUserOptions()

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      envOwnerApiCmdbEnvsOwners({ uid: envUid, ...values }),
    onSuccess: onFinish,
  })

  return (
    <div className="flex items-center gap-1">
      <Typography.Paragraph ellipsis={{ tooltip: true }} className="!mb-0">
        {owners?.join(",")}
      </Typography.Paragraph>
      {access.envOwnerApiCmdbEnvsOwners && (
        <Popconfirm
          destroyTooltipOnHide
          okButtonProps={{ form: formId, htmlType: "submit" }}
          icon={null}
          title={
            <Form
              id={formId}
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
            </Form>
          }
        >
          <Button type="link" size="small" icon={<EditOutlined />} />
        </Popconfirm>
      )}
    </div>
  )
}
