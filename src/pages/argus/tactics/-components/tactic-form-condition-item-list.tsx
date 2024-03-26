import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, Space } from "antd"
import { NamePath } from "antd/es/form/interface"

interface TacticFormConditionItemListProps {
  name: NamePath
}

export default function TacticFormConditionItemList({
  name: namePath,
}: TacticFormConditionItemListProps) {
  return (
    <Form.List
      name={namePath}
      initialValue={[{}]}
      rules={[
        {
          validator: (_, value) => {
            if (!Array.isArray(value) || value.length === 0) {
              return Promise.reject("请配置策略规则")
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
            <div key={key} className="flex items-center gap-2">
              {fields.length > 1 && index !== 0 && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#f3f4f6] text-[#3f56e2]">
                  且
                </div>
              )}
              <Space.Compact>
                <Form.Item
                  name={[name, "key"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "请输入 Key",
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入 Key"
                    style={{
                      width: fields.length > 1 && index !== 0 ? 142 : 174,
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name={[name, "matching"]}
                  noStyle
                  initialValue={true}
                >
                  <Select
                    options={[
                      { value: true, label: "匹配" },
                      {
                        value: false,
                        label: "不匹配",
                      },
                    ]}
                    style={{
                      width: 70,
                    }}
                    suffixIcon={null}
                  />
                </Form.Item>
                <Form.Item
                  name={[name, "values"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "请输入 Value",
                    },
                  ]}
                >
                  <Select
                    placeholder="请先输入 Key"
                    mode="tags"
                    style={{
                      width: 360,
                    }}
                  />
                </Form.Item>
              </Space.Compact>
              <MinusCircleOutlined
                className="cursor-pointer"
                onClick={() => remove(index)}
              />
            </div>
          ))}
          <Button onClick={() => add()} className="mt-2">
            <PlusOutlined />
            添加
          </Button>
          <Form.ErrorList className="text-red-500" errors={errors} />
        </div>
      )}
    </Form.List>
  )
}
