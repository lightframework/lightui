import { useToken } from "@/lib/hooks/use-token"
import { EllipsisOutlined } from "@ant-design/icons"
import { ListProps, Popover } from "antd"
import clsx from "clsx"
import VerticalDataList from "./vertical-data-list"

export default function TableCellEllipsisList<T>({
  items,
  rowKey,
  renderItem,
  empty = "-",
  direction = "vertical",
  maxCount = 3,
}: {
  items: T[] | null | undefined
  rowKey?: ListProps<T>["rowKey"]
  renderItem: (item: T, index: number) => React.ReactNode
  empty?: React.ReactNode
  direction?: "horizontal" | "vertical"
  maxCount?: number
}) {
  const { token } = useToken()

  if (!items || items.length <= maxCount) {
    return direction === "vertical" ? (
      <VerticalDataList
        items={items}
        rowKey={rowKey}
        renderItem={renderItem}
        empty={empty}
      />
    ) : (
      <div className="flex items-center gap-x-1">
        {items?.map((item, index) => (
          <span key={index}>{renderItem(item, index)}</span>
        ))}
      </div>
    )
  }

  return (
    <Popover
      content={
        <VerticalDataList
          items={items.slice(maxCount)}
          rowKey={rowKey}
          renderItem={renderItem}
        />
      }
    >
      <div className={clsx("flex cursor-pointer items-center gap-x-2")}>
        {direction === "vertical" ? (
          <VerticalDataList
            items={items.slice(0, maxCount)}
            rowKey={rowKey}
            renderItem={renderItem}
          />
        ) : (
          <div className="flex items-center gap-1">
            {items.slice(0, maxCount).map((item, index) => (
              <span key={index}>{renderItem(item, index)}</span>
            ))}
          </div>
        )}

        <EllipsisOutlined style={{ color: token.colorLink }} />
      </div>
    </Popover>
  )
}
