import SyntaxHighlighter from "@/components/syntax-highlighter"
import { Descriptions, Flex, Tag } from "antd"

export interface TplDetailsProps {
  tpl: IBEX.TaskTplInfo
}

export default function TplDetails({ tpl }: TplDetailsProps) {
  return (
    <Descriptions
      column={2}
      items={[
        {
          label: "标题",
          key: "title",
          children: tpl.title,
          span: 2,
        },
        {
          label: "标签",
          key: "tags",
          children: (
            <Flex
              gap={4}
              style={{
                flexWrap: "wrap",
              }}
            >
              {tpl.tags?.map((item) => (
                <Tag key={item} color="blue">
                  {item}
                </Tag>
              ))}
            </Flex>
          ),
          span: 2,
        },
        {
          label: "执行账号",
          key: "account",
          children: tpl.account,
        },
        {
          label: "并发度",
          key: "batch",
          children: tpl.batch,
        },
        { label: "容忍度", key: "tolerance", children: tpl.tolerance },
        {
          label: "单机超时时间",
          key: "timeout",
          children: `${tpl.timeout} ms`,
          span: 2,
        },
        {
          label: "机器列表",
          key: "hosts",
          children: tpl.hosts.join(", "),
          span: 2,
        },
        {
          label: "暂停点",
          key: "pause",
          children: tpl.pause,
          span: 2,
        },
        {
          label: "脚本",
          key: "script",
          children: (
            <SyntaxHighlighter
              language="bash"
              customStyle={{
                maxHeight: "40dvh",
              }}
              wrapLongLines
              allowCopy
            >
              {tpl.script}
            </SyntaxHighlighter>
          ),
          span: 2,
        },
        {
          label: "参数",
          key: "args",
          children: tpl.args,
          span: 2,
        },
      ]}
    />
  )
}
