import ResizableFilterList, {
  FilterListItem,
} from "@/components/resizable-filter-list"
import { useModel } from "@umijs/max"

export default function ShiftList({ shifts }: { shifts: SYS.Shift[] }) {
  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser?.username

  const items: FilterListItem[] = shifts.map((shift) => ({
    label:
      shift.name +
      (currentUser && shift.admins.includes(currentUser) ? " (管)" : ""),
    key: shift.id!,
    to: `/duty/schedules/${shift.id}`,
  }))

  return (
    <ResizableFilterList
      name="shift"
      title="班次列表"
      items={items}
      searchPlaceHolder="请输入名称查询"
    />
  )
}
