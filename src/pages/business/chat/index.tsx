import { useAccess } from "@umijs/max"
import { Result } from "antd"
import ChatTable from "./_components/chat-table"

export default function Page() {
  const access = useAccess()

  if (!access.chatPageListApiOpsChats) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问 Chat 数据" />
    )
  }

  return <ChatTable />
}
