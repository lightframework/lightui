import Centered from "@/components/centered"
import { continentPlacementApiCmdbContinentsPlaces } from "@/services/cmdb/continent"
import { useQuery } from "@tanstack/react-query"
import { useAccess, useSearchParams } from "@umijs/max"
import { Result, Spin } from "antd"
import CityTable from "./_components/city-table"
import ContinentTreeList from "./_components/continent-tree-list"

function Cities() {
  const access = useAccess()
  const [searchParams] = useSearchParams()
  const countryUid = searchParams.get("countryUid") ?? undefined
  const continentUid = searchParams.get("continentUid") ?? undefined

  const {
    data: continentPlacement,
    status: continentPlacementFetchStatus,
    refetch,
  } = useQuery({
    queryKey: ["continent-placement"],
    queryFn: () =>
      continentPlacementApiCmdbContinentsPlaces({}).then(
        (res) => res.data?.Tree ?? [],
      ),
  })

  if (continentPlacementFetchStatus === "pending") {
    return (
      <Centered>
        <Spin />
      </Centered>
    )
  }

  if (continentPlacementFetchStatus === "error") {
    return <Result status="500" title="抱歉，请求地区资源失败" />
  }

  return (
    <div className="flex h-full w-full gap-x-3">
      <ContinentTreeList continents={continentPlacement} refetch={refetch} />

      {continentPlacement.length === 0 ? (
        <Result title="暂无任何地区信息" />
      ) : (
        <div className="h-full w-full overflow-x-auto">
          {access.cityPageListApiCmdbCitys ? (
            <CityTable countryUid={countryUid} continentUid={continentUid} />
          ) : (
            <Result
              status="403"
              title="403"
              subTitle="抱歉，你无权访问城市数据"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default function AuthCities() {
  const access = useAccess()

  if (!access.cityPageListApiCmdbCitys) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问城市数据" />
    )
  }

  return <Cities />
}
