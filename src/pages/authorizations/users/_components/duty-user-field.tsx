import { dutyUserListApiArgusDutiesUsers } from "@/services/argus/duty"
import { ProFormSelect } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"

export default function DutyUserField() {
  const { data } = useQuery({
    queryKey: ["duty-user-options"],
    queryFn: () => dutyUserListApiArgusDutiesUsers(),
    select: (res) => res.data?.items ?? [],
  })

  return (
    <ProFormSelect
      label="排班用户"
      name="duty_user_id"
      placeholder=""
      options={data?.map((item) => ({ value: item.id, label: item.username }))}
    />
  )
}
