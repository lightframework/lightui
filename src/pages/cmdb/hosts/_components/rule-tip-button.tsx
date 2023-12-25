import {
  ExclamationCircleFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons"
import { Button } from "antd"
import useModal from "antd/es/modal/useModal"
import Markdown from "react-markdown"

const RuleMd =
  "### 规则示例：\r\n\r\n\
规则名称：主机类型维度\r\n\r\n\
根节点：主机类型维度\r\n\r\n\
规则定义：\
 /主机类型维度{{ .HostTypeJumpPath }}/{{ .EnvName }}/{{ .HostAppJumpPath }}{{ .HostJumpPath }}/{{ .HostUid }}\r\n\r\n\
> 注意：\r\n\
1. 规则定义的首个节点必须和根节点的取值相同\r\n\
2. 规则定义必须以{{ .HostUid }}结尾\r\n\
### 字段解析：\r\n\
根节点：/任意取值\r\n\r\n\
主机类别：{{ .HostClassesJumpPath }}\r\n\r\n\
主机类型：{{ .HostTypeJumpPath }}\r\n\r\n\
环境名称：/{{ .EnvName }}\r\n\r\n\
主机应用：{{ .HostAppJumpPath }}\r\n\r\n\
主机路径：{{ .HostJumpPath }}\r\n\r\n\
主机uid：{{ .HostUid }}\r\n"

export default function RuleTipButton() {
  const [modal, contextHolder] = useModal()

  return (
    <>
      {contextHolder}
      <Button
        type="text"
        className="text-[rgba(0,0,0,.45)]"
        onClick={() =>
          modal.info({
            width: 600,
            icon: <ExclamationCircleFilled style={{ color: "#faad14" }} />,
            title: "目录结构定义规则",
            content: (
              <div className="mt-2 [&_blockquote]:italic [&_h4]:font-semibold">
                <Markdown>{RuleMd}</Markdown>
              </div>
            ),
            okText: "确认",
          })
        }
      >
        <QuestionCircleOutlined />
        提示
      </Button>
    </>
  )
}
