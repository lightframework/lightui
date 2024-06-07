import {
  packagesAllRepoApiDepPackagesRepo,
  packagesOnlineRepoApiDepPackagesRepoonline,
} from "@/services/dep/packages"
import { ProFormSelect } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"

export default function CmRepoSelect({ isOnline }: { isOnline?: boolean }) {
  const { data } = useQuery({
    queryKey: ["sm-repo-options", isOnline],
    queryFn: () =>
      isOnline
        ? packagesOnlineRepoApiDepPackagesRepoonline()
        : packagesAllRepoApiDepPackagesRepo(),
    select: (res) =>
      res.data?.data?.find((item) => item.name === "commcryp")?.repos,
  })

  return (
    <ProFormSelect
      label="仓库"
      name={["package", 0, "repo"]}
      required
      placeholder=""
      rules={[{ required: true, message: "请选择仓库" }]}
      options={data}
    />
  )
}
