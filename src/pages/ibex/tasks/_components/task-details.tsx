import { Descriptions } from "antd"

export interface TaskDetailsProps {
  task: NonNullable<IBEX.TaskReadOneResp["data"]>
}

export default function TaskDetails({ task }: TaskDetailsProps) {
  const { meta } = task

  return (
    <Descriptions
      column={2}
      items={[
        {
          label: "标题",
          key: "title",
          children: meta?.title,
          span: 2,
        },
        {
          label: "执行账号",
          key: "account",
          children: meta?.account,
        },
        {
          label: "并发度",
          key: "batch",
          children: meta?.batch,
        },
        { label: "容忍度", key: "tolerance", children: meta?.tolerance },
        {
          label: "单机超时时间",
          key: "timeout",
          children: `${meta?.timeout} ms`,
          span: 2,
        },
        {
          label: "暂停点",
          key: "pause",
          children: meta?.pause,
          span: 2,
        },
        {
          label: "参数",
          key: "args",
          children: meta?.args,
          span: 2,
        },
      ]}
    />
  )
}
