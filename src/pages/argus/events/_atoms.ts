import { atomWithReset, atomWithStorage } from "jotai/utils"

export const eventFilterAtom = atomWithReset<{
  stime?: number
  etime?: number
  query?: string
  timeRangeHour?: number
}>({
  timeRangeHour: 6,
})

export const refetchIntervalAtom = atomWithStorage<number | false>(
  "events-refetch-interval",
  false,
)
