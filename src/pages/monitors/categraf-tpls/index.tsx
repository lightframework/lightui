import CategrafTplTable from "./_components/categraf-tpl-table"
import CtfTypeList from "./_components/ctf-type-list"

export default function Categraf() {
  return (
    <div className="flex h-full w-full gap-x-3">
      <CtfTypeList />
      <CategrafTplTable />
    </div>
  )
}
