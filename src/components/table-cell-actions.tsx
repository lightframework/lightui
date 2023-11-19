import { Button } from "antd"
import clsx from "clsx"

export default function TableCellActions({
  vertical,
  actions,
}: {
  vertical?: boolean
  actions: {
    text: string
    onClick?: React.MouseEventHandler<HTMLElement>
    danger?: boolean
    disabled?: boolean
  }[]
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
          onClick={action.onClick}
        >
          {action.text}
        </Button>
      ))}
    </div>
  )
}
