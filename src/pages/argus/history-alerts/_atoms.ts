import { getCurrentUTCtimestamp } from "@/lib/utils"
import { atomWithReset, atomWithStorage } from "jotai/utils"

export const alertFilterAtom = atomWithReset<{
  stime: number
  etime: number
  severity?: number
  query?: string
}>({
  stime: getCurrentUTCtimestamp() - 6 * 60 * 60,
  etime: getCurrentUTCtimestamp(),
})

export const refetchIntervalAtom = atomWithStorage<number | false>(
  "history-alerts-refetch-interval",
  false,
)
