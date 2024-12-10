import { atomWithReset, atomWithStorage } from "jotai/utils"

export const refetchIntervalAtom = atomWithStorage<number | false>(
  "incident-details-refetch-interval",
  false,
)

export const incidentAlertFilterAtom = atomWithReset<{
  stime?: number
  etime?: number
  timeRangeHour?: number
}>({
  // timeRangeHour: 6,
})
