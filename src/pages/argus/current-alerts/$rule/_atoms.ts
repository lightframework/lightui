import { atom } from "jotai"
import { atomWithReset, atomWithStorage } from "jotai/utils"

export const showGridAtom = atom(true)

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
  "current-alerts-refetch-interval",
  false,
)
