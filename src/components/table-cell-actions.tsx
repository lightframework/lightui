import { Button } from "antd"
import clsx from "clsx"

export type TableCellAction = {
  text: string
  onClick?: React.MouseEventHandler<HTMLElement>
  danger?: boolean
  disabled?: boolean
}

export default function TableCellActions({
  vertical,
  actions,
}: {
  vertical?: boolean
  actions: TableCellAction[]
}) {
  return (
    <div className={clsx("flex gap-1", vertical && "flex-col")}>
      {actions.map((action) => (
        <Button
          key={action.text}
          type="link"
          size="small"
          disabled={action.disabled}
          danger={action.danger}
          onClick={(e) => {
            e.stopPropagation()
            action.onClick?.(e)
          }}
        >
          {action.text}
        </Button>
      ))}
    </div>
  )
}
