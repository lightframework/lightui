import { atomWithReset } from "jotai/utils"

interface ShiftTableAction {
  type?: "create" | "update"
  shift?: SYS.Shift
}

export const shiftTableActionAtom = atomWithReset<ShiftTableAction>({})
