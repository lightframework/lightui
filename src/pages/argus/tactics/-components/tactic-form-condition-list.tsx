import { CloseOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form } from "antd"
import { Fragment } from "react/jsx-runtime"
import TacticFormConditionItemList from "./tactic-form-condition-item-list"

export default function TacticFormConditionList() {
  return (
    <Form.List
      name="conditions"
      initialValue={[[{}]]}
      rules={[
        {
          validator: (_, value) => {
            if (!Array.isArray(value) || value.length === 0) {
              return Promise.reject("请配置策略")
            } else {
              return Promise.resolve()
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => {
        return (
          <div className="ml-8">
            {fields.map(({ key, name }, index) => (
              <Fragment key={key}>
                <div className="group relative rounded border border-solid border-[#d9d9d9] p-3">
                  <TacticFormConditionItemList name={name} />
                  <div
                    role="button"
                    className="absolute right-0 top-0 hidden h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#3f56e2] text-white group-hover:flex"
                    onClick={() => remove(index)}
                  >
                    <CloseOutlined
                      style={{
                        width: 6,
                        height: 6,
                        color: "white",
                      }}
                    />
                  </div>
                </div>
                {fields.length > 1 && index !== fields.length - 1 && (
                  <div className="flex items-center px-4">
                    <div className="h-12 w-0 translate-x-3 border border-r-0 border-dashed border-[#d9d9d9]" />
                    <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded border border-dashed border-[#d9d9d9] bg-[#f3f4f6] text-[#3f56e2]">
                      或
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
            <div className="mt-2 flex justify-end">
              <Button onClick={() => add()} className="">
                <PlusOutlined />
                新的条件
              </Button>
            </div>
            <Form.ErrorList className="mt-2 text-red-500" errors={errors} />
          </div>
        )
      }}
    </Form.List>
  )
}
