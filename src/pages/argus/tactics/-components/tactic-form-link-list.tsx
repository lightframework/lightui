import { ArrowDownOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form } from "antd"
import { Fragment } from "react/jsx-runtime"
import NotifyLinkField from "./notify-link-field"

export default function TacticFormLinkList() {
  return (
    <Form.List
      name="assigns"
      initialValue={[{}]}
      rules={[
        {
          validator: (_, value) => {
            if (!Array.isArray(value) || value.length === 0) {
              return Promise.reject("请添加环节")
            } else {
              return Promise.resolve()
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <div className="space-y-2">
          {fields.map(({ key, name }, index) => (
            <Fragment key={key}>
              <NotifyLinkField name={name} index={index} remove={remove} />
              {fields.length > 1 && index !== fields.length - 1 && (
                <div className="my-4 flex justify-center">
                  <ArrowDownOutlined
                    style={{
                      fontSize: 16,
                    }}
                  />
                </div>
              )}
            </Fragment>
          ))}
          <Button block onClick={() => add()}>
            <PlusOutlined /> 新增环节
          </Button>
          <Form.ErrorList className="text-red-500" errors={errors} />
        </div>
      )}
    </Form.List>
  )
}
