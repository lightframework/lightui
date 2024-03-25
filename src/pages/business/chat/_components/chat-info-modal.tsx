import { ProDescriptions } from "@ant-design/pro-components"
import { Button, Modal, Tag } from "antd"

export default function ChatInfoModal({
  open,
  onCancel,
  chat,
}: {
  open: boolean
  onCancel: VoidFunction
  chat?: CHAT.ChatsInfo
}) {
  return (
    <Modal
      title="Chat 详情"
      open={open}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>返回</Button>}
      width="40%"
    >
      <div className="max-h-[70dvh] overflow-y-auto">
        {chat && (
          <ProDescriptions title={chat.title} column={1}>
            <ProDescriptions.Item label="主要内容">
              <ul style={{ paddingLeft: 16 }}>
                {chat.contents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="关键词">
              {chat.keywords.map((item) => (
                <Tag key={item} color="purple">
                  {item}
                </Tag>
              ))}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="常见提问">
              <ul style={{ paddingLeft: 16 }}>
                {chat.problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="回答">
              {chat.answer}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="链接">
              <ul style={{ paddingLeft: 16 }}>
                {chat.linkNames?.map((item, index) => (
                  <li key={item}>
                    <a
                      href={chat.links?.at(index)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="负责人">
              {chat.persons.map((item) => (
                <span key={item} style={{ marginRight: 16 }}>
                  {item}
                </span>
              ))}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="标签">
              {chat.tag.map((item) => (
                <Tag key={item} color="blue">
                  {item}
                </Tag>
              ))}
            </ProDescriptions.Item>
          </ProDescriptions>
        )}
      </div>
    </Modal>
  )
}
