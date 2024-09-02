import { ActionType } from "@ant-design/pro-components"
import { Card, Result } from "antd"
import { useRef, useState } from "react"
import HostCategrafTable from "./_components/host-categraf-table"
import HostTable from "./_components/host-table"

export default function HostCategrafs() {
  const hostTableRef = useRef<ActionType>()
  const hostCtfTableRef = useRef<ActionType>()

  const [selectedHost, setSelectedHost] = useState<CMDB.HostInfo | undefined>()

  return (
    <div className="flex gap-3">
      <HostTable
        tableRef={hostTableRef}
        hostCtfTableRef={hostCtfTableRef}
        selectedHost={selectedHost}
        onHostSelect={setSelectedHost}
      />
      {selectedHost ? (
        <HostCategrafTable
          tableRef={hostCtfTableRef}
          hostTableRef={hostTableRef}
          selectedHost={selectedHost}
        />
      ) : (
        <Card className="w-[600px] max-w-[40dvw] shrink-0">
          <Result title="请选择主机" />
        </Card>
      )}
    </div>
  )
}
