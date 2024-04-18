import { atomWithReset, atomWithStorage } from "jotai/utils"

export const incidentFilterAtom = atomWithReset<{
  stime?: number
  etime?: number
  severity?: number
  progress?: string
  query?: string
  source?: string
  timeRangeHour?: number
}>({})

export const refetchIntervalAtom = atomWithStorage<number | false>(
  "incident-refetch-interval",
  false,
)
