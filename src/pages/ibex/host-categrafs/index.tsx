import { useState } from "react"
import HostCategrafTable from "./_components/host-categraf-table"
import HostTable from "./_components/host-table"

export default function HostCategrafs() {
  const [selectedHost, setSelectedHost] = useState<CMDB.HostInfo | undefined>()

  return (
    <div className="flex gap-3">
      <HostTable selectedHost={selectedHost} onHostSelect={setSelectedHost} />
      {selectedHost && <HostCategrafTable selectedHost={selectedHost} />}
    </div>
  )
}
