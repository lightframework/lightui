import { atomWithReset, atomWithStorage } from "jotai/utils"

export const incidentFilterAtom = atomWithReset<{
  stime?: number
  etime?: number
  severity?: number
  progress?: string
  query?: string
  source?: string
  timeRangeHour?: number
  uids?: string
}>({ timeRangeHour: 6 })

export const refetchIntervalAtom = atomWithStorage<number | false>(
  "incident-refetch-interval",
  false,
)

export const selectedUserIdsAtom = atomWithStorage<number[] | null>(
  "incident-filter-user-ids",
  null,
)
