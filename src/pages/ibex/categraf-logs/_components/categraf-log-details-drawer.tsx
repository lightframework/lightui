import { toLocaleDateTimeString } from "@/lib/utils"
import { DiffEditor, Editor } from "@monaco-editor/react"
import { Descriptions, Drawer } from "antd"

export interface CategrafLogDetailsDrawerProps {
  open: boolean
  onClose: VoidFunction
  onFinish?: VoidFunction
  log?: IBEX.HostCtfLog
}

export default function CategrafLogDetailsDrawer({
  open,
  onClose,
  log,
}: CategrafLogDetailsDrawerProps) {
  return (
    <Drawer open={open} title="操作日志详情" onClose={onClose} width="80dvw">
      <Descriptions
        items={[
          {
            key: "env",
            label: "环境",
            children: log?.env_name,
          },
          {
            key: "host",
            label: "主机",
            children: log?.hostname,
            span: 2,
          },
          {
            key: "cfgType",
            label: "监控",
            children: log?.ctf_type,
          },
          {
            key: "option",
            label: "操作类型",
            children: log?.option,
          },
          { key: "status", label: "状态", children: log?.status },
          {
            key: "operateBy",
            label: "操作人",
            children: log?.operated_by,
          },
          {
            key: "operateAt",
            label: "操作时间",
            children: log?.operated_at
              ? toLocaleDateTimeString(
                  new Date(log.operated_at * 1000).toString(),
                )
              : "",
          },
        ]}
      />
      <div className="my-4 text-black/40">输出：</div>
      <Editor
        value={log?.output}
        options={{ readOnly: true }}
        height={100}
        language="shell"
        theme="vs-dark"
      />
      <div className="my-4 text-black/40">配置：</div>
      <DiffEditor
        original={log?.old_content}
        modified={log?.old_content}
        options={{ readOnly: true }}
        height={500}
        language="yaml"
        theme="vs-dark"
      />
    </Drawer>
  )
}
