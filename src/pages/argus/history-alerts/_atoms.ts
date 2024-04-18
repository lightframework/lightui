import { atomWithReset, atomWithStorage } from "jotai/utils"

export const alertFilterAtom = atomWithReset<{
  stime?: number
  etime?: number
  severity?: number
  query?: string
  timeRangeHour?: number
}>({
  timeRangeHour: 6,
})

export const refetchIntervalAtom = atomWithStorage<number | false>(
  "history-alerts-refetch-interval",
  false,
)
