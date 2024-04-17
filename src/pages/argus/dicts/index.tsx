import { useAccess } from "@umijs/max"
import { Card, Result } from "antd"
import DictEntryTable from "./_components/dict-entry-table"
import DictTable from "./_components/dict-table"

export default function Page() {
  const access = useAccess()

  if (
    !access.dictionaryistApiArgusDicts ||
    !access.entryGetByIdApiArgusDictsByIdentries ||
    !access.entryGetByNameApiArgusDictsEntries
  ) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问字典数据" />
    )
  }

  return (
    <Card size="small" className="h-full" classNames={{ body: "flex gap-3" }}>
      <DictTable />
      <DictEntryTable />
    </Card>
  )
}
