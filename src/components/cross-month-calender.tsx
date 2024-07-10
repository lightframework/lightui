import { DatePicker, Select } from "antd"
import clsx from "clsx"
import dayjs, { Dayjs } from "dayjs"
import React, { useEffect, useMemo, useState } from "react"

export interface CrossMonthCalenderProps {
  cellClassName?: (date: Dayjs, info: { today: Dayjs }) => string
  cellRender?: (date: Dayjs, info: { today: Dayjs }) => React.ReactNode
  extra?: React.ReactNode[]
  panelDate?: Dayjs
  onPanelChange?: (date: Dayjs) => void
  allowCustomDateRange?: boolean
  onDateRangeChange?: (dates: [Dayjs, Dayjs]) => void
}

const yearOptions = Array.from({ length: 20 }, (_, index) => {
  const year = dayjs().year() - 10 + index
  return { value: year, label: `${year}年` }
})

const monthOptions = Array.from({ length: 12 }, (_, index) => ({
  // dayjs 月份从0开始
  value: index,
  label: `${index + 1}月`,
}))

const weekTitles = ["一", "二", "三", "四", "五", "六", "日"]

export default function CrossMonthCalender({
  cellClassName,
  cellRender,
  extra,
  panelDate: controlledPanelDate,
  onPanelChange,
  allowCustomDateRange,
  onDateRangeChange,
}: CrossMonthCalenderProps) {
  const [showDateRangePicker, setShowDateRangePicker] = useState(false)
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null)

  const [innerPanelDate, setInnerPanelDate] = useState(
    controlledPanelDate ?? dayjs().date(4).startOf("date"),
  )

  const today = dayjs().startOf("date")

  const panelDate = controlledPanelDate ?? innerPanelDate

  const [start, end] = useMemo(() => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      return [dateRange[0], dateRange[1]]
    }

    return [panelDate.startOf("month"), panelDate.endOf("month")]
  }, [panelDate, dateRange])

  useEffect(() => {
    onDateRangeChange?.([start, end])
  }, [start, end])

  const dateList = useMemo(() => {
    const dates: Dayjs[] = []
    const [rangeStart, rangeEnd] = [start.startOf("week"), end.endOf("week")]

    for (
      let index = 0;
      rangeStart.add(index, "day").isBefore(rangeEnd.add(1, "day"), "day");
      index++
    ) {
      dates.push(rangeStart.add(index, "day"))
    }

    const result: Dayjs[][] = []
    for (let i = 0; i < dates.length; i += 7) {
      const daysOneWeek = dates.slice(i, i + 7)
      result.push(daysOneWeek)
    }
    return result
  }, [start, end])

  return (
    <div>
      <div className="flex gap-1">
        <Select
          value={panelDate.year()}
          options={yearOptions}
          defaultActiveFirstOption
          className="w-20"
          onChange={(year) => {
            const date = panelDate.year(year)
            setInnerPanelDate(date)
            onPanelChange?.(date)
          }}
        />
        <Select
          value={showDateRangePicker ? -1 : panelDate.month()}
          options={
            allowCustomDateRange
              ? [{ value: -1, label: "自定义" }].concat(monthOptions)
              : monthOptions
          }
          defaultActiveFirstOption
          className="w-20"
          onChange={(month) => {
            if (month === -1) {
              setShowDateRangePicker(true)
            } else {
              setShowDateRangePicker(false)
              setDateRange(null)
              const date = panelDate.month(month)
              setInnerPanelDate(date)
              onPanelChange?.(date)
            }
          }}
        />

        {showDateRangePicker && (
          <DatePicker.RangePicker
            value={dateRange}
            onChange={(range) => setDateRange(range)}
          />
        )}

        {extra && (
          <div className="ml-auto flex items-center gap-1">{extra}</div>
        )}
      </div>

      <table className="w-full border-separate">
        <thead>
          <tr className="flex w-full gap-1">
            {weekTitles.map((i) => (
              <th key={i} className="flex-1 p-1 text-left font-normal">
                {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="space-y-1">
          {dateList.map((week) => (
            <tr key={week[0].unix()} className="flex w-full gap-1">
              {week.map((date) => (
                <td
                  key={date.unix()}
                  className={clsx(
                    "flex-1 grow overflow-auto border-0 border-t-2 border-solid",
                    date.isSame(today, "day")
                      ? "border-blue-600"
                      : "border-gray-200",
                    cellClassName?.(date, { today }),
                  )}
                  title={date.format("YYYY-MM-DD")}
                >
                  <div className="flex h-[90px] flex-col px-1">
                    <div
                      className={clsx(
                        (date.isBefore(start, "day") ||
                          date.isAfter(end, "day")) &&
                          "text-gray-400",
                      )}
                    >
                      {dateRange && dateRange[0] && dateRange[1]
                        ? date.format("MM-DD")
                        : date.date()}
                    </div>
                    {cellRender?.(date, { today })}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
