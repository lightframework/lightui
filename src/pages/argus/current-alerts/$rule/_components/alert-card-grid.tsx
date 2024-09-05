import { Empty, Spin, Tooltip } from "antd"
import clsx from "clsx"
import { useState } from "react"
import AlertTableDrawer from "./alert-table-drawer"

export interface AlertCardGridProp {
  cards?: ARGUS.AlertCard[]
}

export default function AlertCardGrid({ cards }: AlertCardGridProp) {
  const [selectedCardToView, setSelectedCardToView] = useState<
    ARGUS.AlertCard | undefined
  >()

  return (
    <>
      <div className="grid grid-cols-3 gap-3 xl:grid-cols-4 min-[1700px]:grid-cols-6">
        {cards ? (
          cards.length > 0 ? (
            cards.map((card) => (
              <div
                key={card.title}
                onClick={() => setSelectedCardToView(card)}
                className={clsx(
                  "cursor-pointer rounded-l border-0 border-l-[10px] border-solid p-3",
                  card.severity === 1 &&
                    "border-l-red-600 bg-red-100 text-red-600",
                  card.severity === 2 &&
                    "border-l-orange-500 bg-orange-50 text-orange-500",
                  card.severity === 3 &&
                    "border-l-yellow-400 bg-yellow-50 text-yellow-400",
                )}
              >
                <div className="my-3 line-clamp-5">
                  <Tooltip title={card.title}>{card.title}</Tooltip>
                </div>
                <div className="text-right text-4xl font-bold">
                  {card.total}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full mt-10 text-center">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )
        ) : (
          <div className="col-span-full mt-10 text-center">
            <Spin />
          </div>
        )}
      </div>
      <AlertTableDrawer
        open={!!selectedCardToView}
        onClose={() => setSelectedCardToView(undefined)}
        card={selectedCardToView}
      />
    </>
  )
}
