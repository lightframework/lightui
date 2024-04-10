import { getCurrentUTCtimestamp } from "@/lib/utils"
import { atom } from "jotai"
import { atomWithReset, atomWithStorage } from "jotai/utils"

export const showGridAtom = atom(true)

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
  "current-alerts-refetch-interval",
  false,
)
