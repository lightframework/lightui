import { toLocaleDateTimeString } from "@/lib/utils"
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons"
import { useAccess } from "@umijs/max"
import { Button, ConfigProvider, Tag, theme } from "antd"

export interface TacticItemProps {
  tactic: ARGUS.TacticInfo
  onEdit: (tactic: ARGUS.TacticInfo) => void
  onCopy: (tactic: ARGUS.TacticInfo) => void
  onDelete: (tactic: ARGUS.TacticInfo) => void
}

export default function TacticItem({
  tactic,
  onEdit,
  onCopy,
  onDelete,
}: TacticItemProps) {
  const access = useAccess()

  return (
    <div
      role="button"
      onClick={
        access.tacticUpdateApiArgusTacticsById
          ? () => onEdit(tactic)
          : undefined
      }
      className="group cursor-pointer rounded border border-solid border-[#d9d9d9] p-3 transition-colors hover:border-[#6980f0]"
    >
      <div className="flex h-[22px] items-center justify-between">
        <span className="text-sm">{tactic.name}</span>
        <ConfigProvider
          theme={{
            algorithm: [theme.defaultAlgorithm],
          }}
        >
          <Tag className="group-hover:hidden">分派顺序 {tactic.rank}</Tag>
        </ConfigProvider>
        <div className="hidden items-center gap-3 pr-3 group-hover:flex">
          <Button
            size="small"
            type="link"
            disabled={!access.TacticCreateApiArgusTactics}
            icon={<CopyOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              onCopy(tactic)
            }}
          />
          <Button
            size="small"
            type="link"
            danger
            disabled={!access.tacticDeleteApiArgusTacticsById}
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              onDelete(tactic)
            }}
          />
        </div>
      </div>
      <div className="mt-2">
        <span>上次修改：</span>
        <span>{toLocaleDateTimeString(tactic.created_at)}</span>
      </div>
    </div>
  )
}
