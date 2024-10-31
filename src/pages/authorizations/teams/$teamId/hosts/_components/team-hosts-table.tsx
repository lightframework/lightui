import CopyableText from "@/components/copyable-text"
import DebounceInput from "@/components/decounce-input"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { TABLE_CELL_UID_WIDTH } from "@/constants/table"
import { usePersonOptions } from "@/lib/hooks"
import {
  useQueryAppOptions,
  useQueryCloudOptions,
  useQueryEnvOptions,
  useQueryHostTypeOptions,
  useQueryProjectOptions,
} from "@/lib/hooks/data"
import useCityOptions from "@/lib/hooks/use-city-options"
import { getHostsByTeamApiCmdbHostsTeamable } from "@/services/cmdb/host"
import { FilterOutlined, SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess, useSearchParams } from "@umijs/max"
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Select,
  Space,
  Tooltip,
} from "antd"
import useModal from "antd/es/modal/useModal"
import Paragraph from "antd/es/typography/Paragraph"
import { Dayjs } from "dayjs"
import { useEffect, useMemo, useRef, useState } from "react"
import IpsInput from "../../../../../cmdb/hosts/_components/ips-input"

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

function StateSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (value?: string[]) => void
}) {
  return (
    <Select
      mode="tags"
      style={{
        width: 180,
      }}
      value={value}
      placeholder="状态（支持手动输入）"
      onChange={onChange}
      options={[
        {
          value: "RUNNING",
          label: "RUNNING",
        },
        {
          value: "NOT_BOUND_INS",
          label: "未绑定实例",
        },
        {
          value: "TO_BE_DESTROYED",
          label: "待销毁",
        },
        {
          value: "DESTROYED",
          label: "DESTROYED",
        },
        {
          value: "Up",
          label: "Up",
        },
      ]}
      allowClear
      showSearch
      filterOption={filterOption}
    />
  )
}

function CitySelect({
  value,
  onChange,
}: {
  value?: string[][]
  onChange?: (locationUids?: string[][]) => void
}) {
  const options = useCityOptions()

  return (
    <Cascader
      multiple
      value={value}
      options={options}
      showSearch={{
        filter: (inputValue, path) => {
          return path.some(
            (item) =>
              item.id.toLowerCase().includes(inputValue.toLowerCase()) ||
              item.label.toLowerCase().includes(inputValue.toLowerCase()),
          )
        },
      }}
      onChange={(value) => onChange?.(value as any)}
      style={{ width: 240 }}
      placeholder="城市"
    />
  )
}

function EnvSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (envUids?: string[]) => void
}) {
  const options = useQueryEnvOptions()

  return (
    <Select
      mode="multiple"
      value={value}
      options={options.data?.map((item) => ({
        label: item.EnvName,
        value: item.Uid,
      }))}
      filterOption={filterOption}
      placeholder="环境"
      style={{ width: 200 }}
      onChange={onChange}
      allowClear
      showSearch
    />
  )
}

function ProjectSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (projectUids?: string[]) => void
}) {
  const options = useQueryProjectOptions()

  return (
    <Select
      mode="multiple"
      value={value}
      options={options.data?.map((item) => ({
        label: `${item.ProjectName}${item.Project ? ` - ${item.Project}` : ""}`,
        value: item.Uid,
      }))}
      placeholder="项目"
      autoClearSearchValue={false}
      style={{ width: 380 }}
      onChange={onChange}
      allowClear
      showSearch
      filterOption={filterOption}
    />
  )
}

function CloudSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (cloudUids?: string[]) => void
}) {
  const options = useQueryCloudOptions()

  return (
    <Select
      mode="multiple"
      value={value}
      options={options.data?.map((item) => ({
        label: item.CloudName,
        value: item.Uid,
      }))}
      placeholder="云商"
      style={{ width: 200 }}
      onChange={onChange}
      allowClear
      showSearch
      filterOption={filterOption}
    />
  )
}

function HostTypeSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (hostTypeUids?: string[]) => void
}) {
  const options = useQueryHostTypeOptions()

  return (
    <Select
      mode="multiple"
      value={value}
      options={options.data?.map((item) => ({
        label: item.HostType,
        value: item.Uid,
      }))}
      placeholder="主机类型"
      style={{ width: 200 }}
      onChange={onChange}
      allowClear
      showSearch
      filterOption={filterOption}
    />
  )
}

function HostNameSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (opsUids?: string[]) => void
}) {
  return (
    <Select
      mode="tags"
      tokenSeparators={[",", " "]}
      placeholder="主机名(逗号、空白符分隔)"
      style={{ width: 300 }}
      value={value}
      allowClear
      onChange={onChange}
    />
  )
}

function OpsSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (opsUids?: string[]) => void
}) {
  const options = usePersonOptions("运维")

  return (
    <Select
      mode="multiple"
      value={value}
      options={options.map((item) => ({
        label: item.PersonName,
        value: item.Uid,
      }))}
      placeholder="运维"
      style={{ width: 200 }}
      onChange={onChange}
      allowClear
      showSearch
      filterOption={filterOption}
    />
  )
}

function SupportSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (opsUids?: string[]) => void
}) {
  const options = usePersonOptions("技术支持")

  return (
    <Select
      mode="multiple"
      value={value}
      options={options.map((item) => ({
        label: item.PersonName,
        value: item.Uid,
      }))}
      placeholder="技术支持"
      style={{ width: 180 }}
      onChange={onChange}
      allowClear
      showSearch
      filterOption={filterOption}
    />
  )
}

function ExpirationTimeSelect({
  duration,
  onDurationChange,
  date,
  onDateChange,
}: {
  duration?: number
  onDurationChange?: (duration?: number) => void
  date?: Dayjs
  onDateChange?: (date?: Dayjs) => void
}) {
  return (
    <Space.Compact>
      <Select
        placeholder="到期时间"
        value={duration}
        onChange={onDurationChange}
        allowClear
        style={{ width: 100 }}
        options={[
          {
            label: "自定义",
            value: 0,
          },
          {
            label: "1天内",
            value: 1,
          },
          {
            label: "3天内",
            value: 3,
          },
          {
            label: "5天内",
            value: 5,
          },
          {
            label: "10天内",
            value: 10,
          },
          {
            label: "30天内",
            value: 30,
          },
          {
            label: "90天内",
            value: 90,
          },
        ]}
      />
      {duration === 0 && (
        <DatePicker
          value={date}
          onChange={onDateChange}
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
        />
      )}
    </Space.Compact>
  )
}

function AppSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (appUids?: string[]) => void
}) {
  const options = useQueryAppOptions()

  return (
    <Select
      mode="multiple"
      value={value}
      options={options.data?.map((item) => ({
        label: `${item.App}:${item.Version}`,
        value: item.Uid,
      }))}
      placeholder="应用（多选）"
      style={{ width: 300 }}
      onChange={onChange}
      allowClear
      showSearch
      filterOption={filterOption}
    />
  )
}

// 根据传入的值，返回true或false，表示是否有对应的权限
// 采用Linux的文件权限风格，1表示可读，2表示可管理，4表示可执行，如果是3表示可读可管理，5表示可读可执行，6表示可管理可执行，7表示可读可管理可执行
function CheckMode({ Value, Mode }: { Value: number; Mode: number }) {
  return (Value & Mode) === Mode
}

export default function TeamHostsTable({ teamId }: { teamId: number }) {
  const access = useAccess()
  const [contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [searchParams] = useSearchParams()
  const initProjectUid = searchParams.get("initProjectUid")

  const [keywords, setKeywords] = useState<string | undefined>()
  const [ips, setIps] = useState<string[] | undefined>()
  const [locationUids, setLocationUids] = useState<string[][] | undefined>()
  const [envUids, setEnvUids] = useState<string[] | undefined>()
  const [hostTypeUids, setHostTypeUids] = useState<string[] | undefined>()
  const [projectUids, setProjectUids] = useState<string[] | undefined>(
    initProjectUid ? [initProjectUid] : undefined,
  )
  const [hostNames, setHostNames] = useState<string[] | undefined>()
  const [cloudUids, setCloudUids] = useState<string[] | undefined>()
  const [opsUids, setOpsUids] = useState<string[] | undefined>()
  const [supportUids, setSupportUids] = useState<string[] | undefined>()
  const [appUids, setAppUids] = useState<string[] | undefined>()

  const [showFilterOptions, setShowFilterOptions] = useState(false)

  const [duration, setDuration] = useState<number | undefined>()
  const [expirationDate, setExpirationDate] = useState<Dayjs | undefined>()
  const [expirationTime, setExpirationTime] = useState<number | undefined>()
  const [states, setStates] = useState<string[] | undefined>()

  // const { data: exportFields } = useQuery({
  //   queryFn: () => hostFieldsApiCmdbHostsFields(),
  //   select: (res) => res.data?.items ?? [],
  // })

  const columnsState: TableColumnsState = {
    id: { show: false },
  }
  const columns: TableColumns<CMDB.TeamHost> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
      copyable: true,
    },
    {
      title: "主机名",
      dataIndex: "HostName",
      copyable: true,
      width: 300,
      fixed: "left",
      render: (_, row) => (
        <Paragraph
          copyable={{ text: row.HostName }}
          style={{ marginBottom: 0 }}
        >
          <a
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {row.HostName}
          </a>
        </Paragraph>
      ),
    },
    {
      title: "IP地址",
      key: "addresses",
      render: (_, row) => {
        return (
          <div>
            <TableCellEllipsisList
              items={row.Instance?.PublicIpAddresses}
              renderItem={(ip) =>
                ip ? <CopyableText text={`${ip}（公）`} copyText={ip} /> : null
              }
              empty={null}
            />
            <TableCellEllipsisList
              items={row.Instance?.PrivateIpAddresses}
              renderItem={(ip) =>
                ip ? <CopyableText text={`${ip}（私）`} copyText={ip} /> : null
              }
              empty={null}
            />
          </div>
        )
      },
      width: 320,
    },
    {
      title: "所属环境",
      dataIndex: ["Env", "EnvName"],
      width: 120,
      render: (_, row) => <a>{row?.Env?.EnvName}</a>,
    },
    {
      title: "项目信息",
      dataIndex: "ProjectSet",
      width: 300,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.ProjectSet}
          renderItem={(project) => <a>{project.ProjectName}</a>}
        />
      ),
    },
    {
      title: "可读",
      dataIndex: "State",
      width: 120,
      render: (_, row) => (
        <Checkbox
          checked={CheckMode({ Value: row.Mode, Mode: 4 })}
          disabled={!access.roleAuthEditApiSysRolesByIdauth}
          onChange={(e) => {
            if (e.target.checked) {
              alert("取消")
            } else {
              alert("取消")
            }
          }}
        ></Checkbox>
      ),
    },
    {
      title: "可写",
      dataIndex: "State",
      width: 120,
      render: (_, row) => (
        <Checkbox
          checked={CheckMode({ Value: row.Mode, Mode: 2 })}
          disabled={!access.roleAuthEditApiSysRolesByIdauth}
          onChange={(e) => {
            if (e.target.checked) {
              alert("取消")
            } else {
              alert("取消")
            }
          }}
        ></Checkbox>
      ),
    },
    {
      title: "可执行",
      dataIndex: "State",
      width: 120,
      render: (_, row) => (
        <Checkbox
          checked={CheckMode({ Value: row.Mode, Mode: 1 })}
          disabled={!access.roleAuthEditApiSysRolesByIdauth}
          onChange={(e) => {
            if (e.target.checked) {
              alert("取消")
            } else {
              alert("取消")
            }
          }}
        ></Checkbox>
      ),
    },
  ]

  const resetSearch = () => {
    setKeywords("")
    setIps(undefined)
    setStates(undefined)
    setLocationUids(undefined)
    setEnvUids(undefined)
    setProjectUids(undefined)
    setCloudUids(undefined)
    setOpsUids(undefined)
    setSupportUids(undefined)
    setAppUids(undefined)
    setHostTypeUids(undefined)
    setHostNames(undefined)
    setDuration(undefined)
    setExpirationDate(undefined)
    setExpirationTime(undefined)
  }

  const [continentUids, countryUids, cityUids] = useMemo(() => {
    const continents: string[] = []
    const countries: string[] = []
    const cities: string[] = []

    locationUids?.forEach((location) => {
      switch (location.length) {
        case 1: {
          if (location[0]) continents.push(location[0])
          break
        }
        case 2: {
          if (location[1]) countries.push(location[1])
          break
        }
        case 3: {
          if (location[2]) cities.push(location[2])
          break
        }
      }
    })

    return [continents, countries, cities]
  }, [locationUids])

  useEffect(() => {
    if (duration) {
      setExpirationTime(getCurrentUTCtimestamp() + duration * 24 * 60 * 60)
    } else if (duration === 0 && expirationDate) {
      setExpirationTime(expirationDate.unix())
    } else if (duration === undefined && !expirationDate) {
      setExpirationTime(undefined)
    }
  }, [duration, expirationDate])

  return (
    <>
      {contextHolder}
      <Table
        name="team-host"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        // searchPlaceholder="请输入用户ID/名称查询"
        params={{
          TeamId: teamId,
          keywords,
          Ips: ips && ips.length > 0 ? ips.join(",") : undefined,
          // Path: path,
          EnvUids:
            envUids && envUids.length > 0 ? envUids.join(",") : undefined,
          ContinentUids:
            continentUids && continentUids.length > 0
              ? continentUids.join(",")
              : undefined,
          ExpirationTime: expirationTime,
          CountryUids:
            countryUids && countryUids.length > 0
              ? countryUids.join(",")
              : undefined,
          CityUids:
            cityUids && cityUids.length > 0 ? cityUids.join(",") : undefined,
          ProjectUids:
            projectUids && projectUids.length > 0
              ? projectUids.join(",")
              : undefined,

          CloudUids:
            cloudUids && cloudUids.length > 0 ? cloudUids.join(",") : undefined,
          OpsUids:
            opsUids && opsUids.length > 0 ? opsUids.join(",") : undefined,
          HostNames:
            hostNames && hostNames.length > 0 ? hostNames.join(",") : undefined,
          SupportUids:
            supportUids && supportUids.length > 0
              ? supportUids.join(",")
              : undefined,
          HostTypeUids:
            hostTypeUids && hostTypeUids.length > 0
              ? hostTypeUids.join(",")
              : undefined,
          AppUids:
            appUids && appUids.length > 0 ? appUids.join(",") : undefined,
          States: states && states.length > 0 ? states.join(",") : undefined,
        }}
        search={false}
        request={async (params) => {
          console.log("id:", params)
          const response = await getHostsByTeamApiCmdbHostsTeamable(params)
          return {
            ...response,
            data: {
              list: response.data?.list,
              total: response.data?.list?.length,
            },
          }
        }}
        defaultColumnsState={columnsState}
        toolbar={{
          title: (
            <div className="flex flex-wrap items-center gap-2">
              <Tooltip title="刷新">
                <Button
                  type="default"
                  icon={<SyncOutlined />}
                  onClick={() => tableRef.current?.reload(false)}
                />
              </Tooltip>
              <Tooltip title="显示筛选条件">
                <Button
                  type={showFilterOptions ? "primary" : "dashed"}
                  icon={<FilterOutlined />}
                  onClick={() => setShowFilterOptions((show) => !show)}
                />
              </Tooltip>

              <DebounceInput
                type="text"
                value={keywords}
                onChange={setKeywords}
                className="w-[240px]"
                placeholder="请输入主机名称/备注查询"
              />
              <HostNameSelect value={hostNames} onChange={setHostNames} />

              <IpsInput value={ips} onChange={setIps} />

              <EnvSelect value={envUids} onChange={setEnvUids} />

              {showFilterOptions && (
                <>
                  <ProjectSelect
                    value={projectUids}
                    onChange={setProjectUids}
                  />
                  <OpsSelect value={opsUids} onChange={setOpsUids} />
                  <SupportSelect
                    value={supportUids}
                    onChange={setSupportUids}
                  />
                  <StateSelect value={states} onChange={setStates} />
                  <CitySelect value={locationUids} onChange={setLocationUids} />
                  <CloudSelect value={cloudUids} onChange={setCloudUids} />
                  <HostTypeSelect
                    value={hostTypeUids}
                    onChange={setHostTypeUids}
                  />
                  <AppSelect value={appUids} onChange={setAppUids} />
                  <ExpirationTimeSelect
                    duration={duration}
                    onDurationChange={setDuration}
                    date={expirationDate}
                    onDateChange={setExpirationDate}
                  />
                  <Button danger onClick={resetSearch}>
                    重置
                  </Button>
                </>
              )}
            </div>
          ),
        }}
      />
    </>
  )
}
