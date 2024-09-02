import CategrafLogTable from "./_components/categraf-log-table"
import HostList from "./_components/host-list"

export default function CategrafLogs() {
  return (
    <div className="flex h-full w-full gap-x-3">
      <HostList />

      <CategrafLogTable />
    </div>
  )
}
