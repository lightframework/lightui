import { atom } from "jotai"

type SubnetCount = Record<string, number | null>

export const SubnetMaxCountAtom = atom<SubnetCount>({})
