import { useToken } from "@/lib/hooks/use-token"
import { EllipsisOutlined } from "@ant-design/icons"
import { ListProps, Popover } from "antd"
import VerticalDataList from "./vertical-data-list"

export default function TableCellEllipsisList<T>({
  items,
  rowKey,
  renderItem,
  empty = "-",
}: {
  items: T[] | null | undefined
  rowKey?: ListProps<T>["rowKey"]
  renderItem: (item: T, index: number) => React.ReactNode
  empty?: React.ReactNode
}) {
  const { token } = useToken()

  if (!items || items.length <= 3) {
    return (
      <VerticalDataList
        items={items}
        rowKey={rowKey}
        renderItem={renderItem}
        empty={empty}
      />
    )
  }

  return (
    <Popover
      content={
        <VerticalDataList
          items={items}
          rowKey={rowKey}
          renderItem={renderItem}
        />
      }
    >
      <div className="flex cursor-pointer items-center gap-x-2">
        <VerticalDataList
          items={items.slice(0, 3)}
          rowKey={rowKey}
          renderItem={renderItem}
        />

        <EllipsisOutlined style={{ color: token.colorLink }} />
      </div>
    </Popover>
  )
}
