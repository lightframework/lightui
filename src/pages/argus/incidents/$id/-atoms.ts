import { atomWithStorage } from "jotai/utils"

export const refetchIntervalAtom = atomWithStorage<number | false>(
  "incident-details-refetch-interval",
  false,
)
