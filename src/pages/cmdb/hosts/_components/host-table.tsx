import CopyableText from "@/components/copyable-text"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import VerticalDataList from "@/components/vertical-data-list"
import {
  dictDisplay,
  dictGet,
  hostStateDict,
  instanceChargeTypeDict,
  instanceStateDict,
  renewFlagDict,
} from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_FULL_HEIGHT,
} from "@/constants/table"
import { usePersonOptions } from "@/lib/hooks"
import {
  useQueryAppOptions,
  useQueryCloudOptions,
  useQueryEnvOptions,
  useQueryProjectOptions,
} from "@/lib/hooks/data"
import useCityOptions from "@/lib/hooks/use-city-options"
import {
  tableCellDatetimePostProcess,
  toLocaleDateTimeString,
} from "@/lib/utils"
import { hostPageListApiCmdbHosts } from "@/services/cmdb/host"
import { FilterOutlined, SyncOutlined } from "@ant-design/icons"
import { ActionType, useDebounceValue } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { AutoComplete, Button, Cascader, Select, Tag, Tooltip } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import { useEffect, useRef, useState } from "react"
import ExportExcelButton from "./export-excel-button"
import HostEnvInfoModal from "./host-env-info-modal"
import HostInfoModal from "./host-info-modal"
import HostInstanceUpdateModalForm from "./host-instance-update-modal-form"
import HostProjectInfoModal from "./host-project-info-modal"
import "./host-table.less"
import HostUpdateModalForm from "./host-update-modal-form"
import IpsInput from "./ips-input"
import KeywordsInput, { KeywordsInputRef } from "./keywords-input"

function StateSelect({
  value: _value,
  onChange,
}: {
  value?: string
  onChange?: (value?: string) => void
}) {
  const [value, setValue] = useState<string | undefined>()
  const debouncedValue = useDebounceValue(value)

  useEffect(() => {
    onChange?.(value)
  }, [debouncedValue])

  useEffect(() => {
    if (!_value) {
      setValue(undefined)
    }
  }, [_value])

  return (
    <AutoComplete
      style={{
        width: 140,
      }}
      value={value}
      placeholder="状态（支持手动输入）"
      allowClear
      showSearch
      onChange={setValue}
      options={[
        {
          value: "RUNNING",
        },
        {
          value: "NOT_BOUND_INS",
          label: "未绑定实例",
        },
        {
          value: "UNKNOWN",
          label: "未知",
        },
        {
          value: "TO_BE_DESTROYED",
          label: "待销毁",
        },
        {
          value: "DESTROYED",
        },
        {
          value: "UP",
        },
      ]}
    />
  )
}

function CitySelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (cityUids?: string[]) => void
}) {
  const options = useCityOptions()

  return (
    <Cascader
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

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

function EnvSelect({
  value,
  onChange,
}: {
  value?: string
  onChange?: (envUid?: string) => void
}) {
  const options = useQueryEnvOptions()

  return (
    <Select
      value={value}
      options={options.data?.map((item) => ({
        label: item.EnvName,
        value: item.Uid,
      }))}
      filterOption={filterOption}
      placeholder="环境"
      style={{ width: 140 }}
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
  value?: string
  onChange?: (envUid?: string) => void
}) {
  const options = useQueryProjectOptions()

  return (
    <Select
      value={value}
      options={options.data?.map((item) => ({
        label: `${item.ProjectName}${item.Project ? ` - ${item.Project}` : ""}`,
        value: item.Uid,
      }))}
      placeholder="项目"
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
  value?: string
  onChange?: (cloudUid?: string) => void
}) {
  const options = useQueryCloudOptions()

  return (
    <Select
      value={value}
      options={options.data?.map((item) => ({
        label: item.CloudName,
        value: item.Uid,
      }))}
      placeholder="云商"
      style={{ width: 204 }}
      onChange={onChange}
      allowClear
      showSearch
      filterOption={filterOption}
    />
  )
}

function OpsSelect({
  value,
  onChange,
}: {
  value?: string
  onChange?: (opsUid?: string) => void
}) {
  const options = usePersonOptions("运维")

  return (
    <Select
      value={value}
      options={options.map((item) => ({
        label: item.PersonName,
        value: item.Uid,
      }))}
      placeholder="运维"
      style={{ width: 140 }}
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
  value?: string
  onChange?: (opsUid?: string) => void
}) {
  const options = usePersonOptions("技术支持")

  return (
    <Select
      value={value}
      options={options.map((item) => ({
        label: item.PersonName,
        value: item.Uid,
      }))}
      placeholder="技术支持"
      style={{ width: 140 }}
      onChange={onChange}
      allowClear
      showSearch
      filterOption={filterOption}
    />
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
      style={{ width: 484 }}
      onChange={onChange}
      allowClear
      showSearch
      filterOption={filterOption}
    />
  )
}

export default function HostTable({ path }: { path?: string }) {
  const access = useAccess()
  const tableRef = useRef<ActionType>()
  const inputRef = useRef<KeywordsInputRef>(null)
  const ipInputRef = useRef<KeywordsInputRef>(null)

  const [keywords, setKeywords] = useState<string | undefined>()
  const [ips, setIps] = useState<string | undefined>()
  const [cityUids, setCityUids] = useState<string[] | undefined>()
  const [envUid, setEnvUid] = useState<string | undefined>()
  const [projectUid, setProjectUid] = useState<string | undefined>()
  const [cloudUid, setCloudUid] = useState<string | undefined>()
  const [opsUid, setOpsUid] = useState<string | undefined>()
  const [supportUid, setSupportUid] = useState<string | undefined>()
  const [appUids, setAppUids] = useState<string[] | undefined>()

  const [showFilterOptions, setShowFilterOptions] = useState(false)

  const [selectedHostToView, setSelectedHostToView] = useState<
    CMDB.HostInfo | undefined
  >()
  const [selectedHostToUpdate, setSelectedHostToUpdate] = useState<
    CMDB.HostInfo | undefined
  >()
  const [selectedHostInstanceToUpdate, setSelectedHostInstanceToUpdate] =
    useState<CMDB.HostInfo | undefined>()
  const [selectedEnvToView, setSelectedEnvToView] = useState<
    CMDB.EnvOption | undefined
  >()
  const [selectedProjectToView, setSelectedProjectToView] = useState<
    CMDB.ProjectOption | undefined
  >()
  const [state, setState] = useState<string | undefined>()

  const columnsState: TableColumnsState = {
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    createAt: { show: false },
    Uid: { show: false },
    "Instance,InstanceName": { show: false },
    DataDiskSet: { show: false },
    "Instance,RestrictState": { show: false },
    "Instance,InstanceType": { show: false },
    "Env,EnvName": { show: false },
    "Instance,DefaultLoginUser": { show: false },
    "Instance,DefaultLoginPort": { show: false },
    "Instance,InstanceState": { show: false },
    "Instance,Image,ImageName": { show: false },
    "Instance,OsName": { show: false },
    SecurityGroupSet: { show: false },
    CloudTagOptionSet: { show: false },
    "Instance,InstanceDesc": { show: false },
    "Instance,CreatedTime": { show: false },
    "Instance,Description": { show: false },
    Description: { show: false },
  }

  const columns: TableColumns<CMDB.HostInfo> = [
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
          <a onClick={() => setSelectedHostToView(row)}>{row.HostName}</a>
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
      width: 180,
    },
    {
      title: "运维",
      dataIndex: "OpsSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.OpsSet}
          renderItem={(row) => row.PersonName}
        />
      ),
      width: 80,
    },
    {
      title: "技术支持",
      dataIndex: "SupportSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.SupportSet}
          renderItem={(row) => row.PersonName}
        />
      ),
      width: 80,
    },
    {
      title: "所属环境",
      dataIndex: ["Env", "EnvName"],
      width: 120,
      render: (_, row) => (
        <a onClick={() => setSelectedEnvToView(row.Env)}>{row?.Env?.EnvName}</a>
      ),
    },
    {
      title: "项目信息",
      dataIndex: "ProjectSet",
      width: 300,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.ProjectSet}
          renderItem={(project) => (
            <a onClick={() => setSelectedProjectToView(project)}>
              {project.ProjectName}
            </a>
          )}
        />
      ),
    },
    {
      title: "状态",
      dataIndex: "State",
      width: 120,
      render: (_, row) => (
        <div>
          <Tag
            color={dictGet(row.State, hostStateDict)?.bgColor}
            style={{
              color: "black",
              border: `1px solid ${
                dictGet(row.State, hostStateDict)?.borderColor ?? "black"
              }`,
            }}
          >
            {dictGet(row.State, hostStateDict)?.label ?? row.State}
          </Tag>

          {row.State === "TO_BE_DESTROYED" && (
            <div>回收时间：{toLocaleDateTimeString(row.removeAt)}</div>
          )}
        </div>
      ),
    },

    { title: "JumpPath", dataIndex: "JumpPath", width: 250, copyable: true },
    {
      title: "应用",
      dataIndex: "AppSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.AppSet?.filter((app) => app.App)}
          renderItem={(item) =>
            item.Version ? `${item.App}:${item.Version}` : item.App
          }
        />
      ),
      width: 140,
    },
    {
      title: "云商",
      key: "cloud",
      width: 180,
      render: (_, row) => (
        <div>
          <div>{row.Instance?.Zone.Region.Cloud.CloudName}</div>
          <div>{row.Instance?.Zone.Region.RegionName}</div>
          <div>{row.Instance?.Zone.ZoneName}</div>
        </div>
      ),
    },
    {
      title: "实例名称",
      dataIndex: ["Instance", "InstanceName"],
      width: 300,
      copyable: true,
    },
    {
      title: "实例ID",
      dataIndex: ["Instance", "InstanceId"],
      width: 150,
      copyable: true,
    },
    {
      title: "实例配置",
      key: "instance",
      width: 250,
      render: (_, row) => (
        <div>
          <div>
            <span>{row.Instance?.Cpu}核</span>
            {"-"}
            <span>{row.Instance?.Memory}GB</span>
          </div>
          <div>
            系统盘：
            {row.Instance?.SystemDisk}
          </div>
          <div className="flex items-start">
            网络：
            <VerticalDataList
              items={row.Instance?.SubnetWithVpcSet}
              renderItem={(item) => item.SubnetName}
            />
          </div>
        </div>
      ),
    },
    {
      title: "旧CMDB",
      dataIndex: "OldNameCMDB",
      width: 240,
    },
    {
      title: "JumpId",
      dataIndex: "JumpId",
      width: 250,
    },

    {
      title: "登录用户",
      dataIndex: "LoginUser",
      width: 100,
    },
    {
      title: "登录端口",
      dataIndex: "LoginPort",
      width: 80,
    },
    {
      title: "登录密码",
      width: 200,
    },
    {
      title: "数据盘",
      key: "DataDiskSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Instance?.DataDisks}
          renderItem={(item, index) => `${index + 1}：${item}`}
        />
      ),
      width: 200,
    },
    {
      title: "实例类型",
      dataIndex: ["Instance", "InstanceType"],
      width: 150,
    },
    {
      title: "实例状态",
      dataIndex: ["Instance", "InstanceState"],
      width: 120,
      render: (_, row) =>
        row.Instance?.InstanceState ? (
          <Tag
            color={
              dictGet(row.Instance?.InstanceState, instanceStateDict)?.bgColor
            }
            style={{
              color: "black",
              border: `1px solid ${
                dictGet(row.Instance?.InstanceState, instanceStateDict)
                  ?.borderColor ?? "black"
              }`,
            }}
          >
            {dictGet(row.Instance?.InstanceState, instanceStateDict)?.value ??
              row.Instance?.InstanceState}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "RestrictState",
      dataIndex: ["Instance", "RestrictState"],
      width: 120,
    },
    {
      title: "主机类型",
      dataIndex: ["HostType", "HostType"],
      width: 140,
    },

    {
      title: "计费模式",
      key: "instanceCharge",
      render: (_, row) => (
        <div>
          <div>
            {dictDisplay(
              row.Instance?.InstanceChargeType,
              instanceChargeTypeDict,
            )}
          </div>
          <div>{dictDisplay(row.Instance?.RenewFlag, renewFlagDict)}</div>
          <div>
            {row.Instance?.ExpiredTime &&
            row.Instance?.ExpiredTime !== "0001-01-01T00:00:00Z"
              ? `${toLocaleDateTimeString(row.Instance?.ExpiredTime)}到期`
              : "-"}
          </div>
        </div>
      ),
      width: 180,
    },

    {
      title: "镜像",
      dataIndex: ["Instance", "Image", "ImageName"],
      width: 200,
    },
    {
      title: "操作系统",
      dataIndex: ["Instance", "OsName"],
      width: 150,
    },
    {
      title: "默认用户",
      dataIndex: ["Instance", "DefaultLoginUser"],
      width: 120,
    },
    {
      title: "默认端口",
      dataIndex: ["Instance", "DefaultLoginPort"],
      width: 80,
    },
    {
      title: "安全组",
      key: "SecurityGroupSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Instance?.SecurityGroupSet}
          renderItem={(item) => item.SecurityGroupName}
        />
      ),
      width: 200,
    },
    {
      title: "云商标签",
      key: "CloudTagOptionSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Instance?.CloudTagOptionSet}
          renderItem={(item) => `${item.Key}:${item.Value}`}
        />
      ),
      width: 140,
    },
    {
      title: "实例创建时间",
      dataIndex: ["Instance", "CreatedTime"],
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) =>
        tableCellDatetimePostProcess(dom, row.Instance?.CreatedTime),
    },
    {
      title: "实例备注",
      dataIndex: ["Instance", "Description"],
      width: TABLE_CELL_DESC_WIDTH,
      ellipsis: true,
    },
    {
      title: "创建者",
      dataIndex: "createBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.createAt),
    },
    {
      title: "更新者",
      dataIndex: "updateBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updateAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.updateAt),
    },
    {
      title: "备注",
      dataIndex: "Description",
      width: TABLE_CELL_DESC_WIDTH,
      ellipsis: true,
    },

    {
      title: "操作",
      key: "options",
      width: 140,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "管理主机",
              onClick: () => setSelectedHostToUpdate(row),
              disabled: !access.hostUpdateApiCmdbHostsByUid,
            },
            {
              text: "配置实例",
              onClick: () => setSelectedHostInstanceToUpdate(row),
              disabled: !access.instancePatchApiCmdbInstancesByUid,
            },
          ]}
        />
      ),
    },
  ]

  const resetSearch = () => {
    inputRef.current?.clear()
    ipInputRef.current?.clear()

    setState(undefined)
    setCityUids(undefined)
    setEnvUid(undefined)
    setProjectUid(undefined)
    setCloudUid(undefined)
    setOpsUid(undefined)
    setSupportUid(undefined)
    setAppUids(undefined)
  }

  return (
    <>
      <Table
        name="env-host"
        className="env-host-table"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{
          keywords,
          Ips: ips,
          Path: path,
          EnvUid: envUid,
          CityUid: cityUids ? cityUids[2] : undefined,
          ProjectUid: projectUid,
          CloudUid: cloudUid,
          OpsUid: opsUid,
          SupportUid: supportUid,
          AppUids:
            appUids && appUids.length > 0 ? appUids.join(",") : undefined,
          State: state,
        }}
        search={false}
        request={hostPageListApiCmdbHosts}
        defaultColumnsState={columnsState}
        scroll={{
          y: showFilterOptions ? "calc(100vh - 256px)" : TABLE_FULL_HEIGHT,
        }}
        toolbar={{
          title: (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Tooltip title="刷新">
                  <Button
                    type="default"
                    icon={<SyncOutlined />}
                    onClick={() => tableRef.current?.reload(false)}
                  />
                </Tooltip>

                <KeywordsInput ref={inputRef} onPressEnter={setKeywords} />
                <IpsInput ref={ipInputRef} onPressEnter={setIps} />
                <StateSelect value={state} onChange={setState} />

                <EnvSelect value={envUid} onChange={setEnvUid} />

                <Tooltip title="显示筛选条件">
                  <Button
                    type={showFilterOptions ? "primary" : "dashed"}
                    icon={<FilterOutlined />}
                    onClick={() => setShowFilterOptions((show) => !show)}
                  />
                </Tooltip>
              </div>

              {showFilterOptions && (
                <>
                  <div className="flex items-center gap-2">
                    <ProjectSelect
                      value={projectUid}
                      onChange={setProjectUid}
                    />
                    <CitySelect value={cityUids} onChange={setCityUids} />
                    <CloudSelect value={cloudUid} onChange={setCloudUid} />
                  </div>

                  <div className="flex items-center gap-2">
                    <OpsSelect value={opsUid} onChange={setOpsUid} />
                    <SupportSelect
                      value={supportUid}
                      onChange={setSupportUid}
                    />
                    <AppSelect value={appUids} onChange={setAppUids} />

                    <Button danger onClick={resetSearch}>
                      重置
                    </Button>
                  </div>
                </>
              )}
            </div>
          ),
          actions: [
            <ExportExcelButton
              key="export"
              path={path}
              envUid={envUid}
              cityUid={cityUids ? cityUids[2] : undefined}
              projectUid={projectUid}
              cloudUid={cloudUid}
              opsUid={opsUid}
              supportUid={supportUid}
              appUids={appUids}
            />,
          ],
        }}
      />
      <HostInfoModal
        open={selectedHostToView !== undefined}
        onCancel={() => setSelectedHostToView(undefined)}
        host={selectedHostToView}
      />
      <HostUpdateModalForm
        open={selectedHostToUpdate !== undefined}
        onCancel={() => setSelectedHostToUpdate(undefined)}
        host={selectedHostToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
      <HostInstanceUpdateModalForm
        open={!!selectedHostInstanceToUpdate}
        onCancel={() => setSelectedHostInstanceToUpdate(undefined)}
        host={selectedHostInstanceToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
      <HostEnvInfoModal
        open={!!selectedEnvToView}
        onCancel={() => setSelectedEnvToView(undefined)}
        env={selectedEnvToView}
      />
      <HostProjectInfoModal
        open={!!selectedProjectToView}
        onCancel={() => setSelectedProjectToView(undefined)}
        project={selectedProjectToView}
      />
    </>
  )
}
