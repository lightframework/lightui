import { atomWithReset, atomWithStorage } from "jotai/utils"

export const categrafLogFilterAtom = atomWithReset<{
  stime?: number
  etime?: number
  severity?: number
  status?: string
  query?: string
  source?: string
  timeRangeHour?: number
  uids?: string
}>({ timeRangeHour: 6 })

export const refetchIntervalAtom = atomWithStorage<number | false>(
  "categraf-log-refetch-interval",
  false,
)
