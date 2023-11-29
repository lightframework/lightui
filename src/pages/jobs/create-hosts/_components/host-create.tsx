import { Button, Result, message } from "antd"
import { useEffect, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import HostCreateDataTable from "./host-create-data-table"
import HostCreateForm, {
  HostCreateFormData,
  generateEmptyHostFormData,
} from "./host-create-form"
import { useHostCreateForm } from "./host-create-form-provider"
import HostCreateSubmitModalForm from "./host-create-submit-modal-form"

export default function HostCreate() {
  const { form } = useHostCreateForm()
  const [isEdit, setIsEdit] = useState(false)
  const [hosts, setHosts] = useState<HostCreateFormData[]>([])
  const [selectedHost, setSelectedHost] = useState<
    HostCreateFormData | undefined
  >(undefined)

  const onAdd = () => {
    if (isEdit) {
      message.error("请先完成主机配置")
    } else {
      const host = generateEmptyHostFormData()
      setHosts((hosts) => [...hosts, host])
      setSelectedHost(host)
      setIsEdit(true)
    }
  }

  const onSelect = (host: HostCreateFormData) => {
    if (isEdit) {
      message.error("请先完成主机配置")
    } else {
      console.log(host)
      setSelectedHost(host)
    }
  }

  const onCopy = async (host: HostCreateFormData) => {
    if (isEdit) {
      message.error("请先完成主机配置")
    } else {
      const newHost = { ...host, uuid: uuidV4() }
      setHosts((hosts) => [...hosts, newHost])
      setSelectedHost(newHost)
    }
  }

  const onRemove = (host: HostCreateFormData) => {
    const index = hosts.findIndex((item) => item.uuid === host.uuid)
    if (index !== -1) {
      if (host.uuid === selectedHost?.uuid) {
        if (hosts.length === 1) {
          setSelectedHost(undefined)
        } else {
          setSelectedHost(hosts[0])
        }
        setIsEdit(false)
      }
      setHosts((hosts) => [...hosts.slice(0, index), ...hosts.slice(index + 1)])
    }
  }

  const onSave = async () => {
    try {
      const values = await form.validateFields()
      const index = hosts.findIndex((host) => host.uuid === values.uuid)
      if (index !== -1) {
        setHosts((hosts) => [
          ...hosts.slice(0, index),
          values,
          ...hosts.slice(index + 1),
        ])
        setIsEdit(false)
        message.success("保存配置成功")
        console.log(values)
      }
    } catch (error) {
      message.error("请先完成主机配置")
    }
  }

  useEffect(() => {
    if (hosts.length === 0) {
      onAdd()
    }
  }, [])

  useEffect(() => {
    if (selectedHost) {
      form.setFieldsValue(selectedHost)
    }
  }, [selectedHost])

  return (
    <div className="flex h-full bg-white p-3">
      <div className="h-full w-5/12">
        <HostCreateDataTable
          hosts={hosts}
          selectedHost={selectedHost}
          onAdd={onAdd}
          onCopy={onCopy}
          onRemove={onRemove}
          onSelect={onSelect}
        />
      </div>
      <div className="relative h-full w-7/12 overflow-y-auto px-3">
        {selectedHost ? (
          <HostCreateForm onValuesChange={() => setIsEdit(true)} />
        ) : (
          <Result status="info" title="请先添加主机" />
        )}

        <div className="sticky bottom-3 flex justify-end">
          {isEdit ? (
            <Button key="save" type="primary" onClick={onSave}>
              保存
            </Button>
          ) : (
            <HostCreateSubmitModalForm
              key="submit"
              hosts={hosts}
              disabled={hosts.length === 0}
              onFinish={() => {
                setHosts([])
                setSelectedHost(undefined)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
