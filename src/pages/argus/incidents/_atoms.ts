import { atomWithReset, atomWithStorage } from "jotai/utils"

export const incidentFilterAtom = atomWithReset<{
  stime?: number
  etime?: number
  severity?: number
  progress?: string
  query?: string
  source?: string
}>({})

export const refetchIntervalAtom = atomWithStorage<number | false>(
  "history-alerts-refetch-interval",
  false,
)
