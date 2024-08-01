import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryEnvOptions, useQueryUserOptions } from "@/lib/hooks/data"
import { envReadOneApiCmdbEnvsByUid } from "@/services/cmdb/env"
import {
  cronatbCreateApiDepCrontabs,
  crontabDutyApiDepCrontabsDuty,
} from "@/services/dep/crontab"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormDateTimeRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useAccess, useModel } from "@umijs/max"
import { Button, message, Tooltip } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import dayjs, { Dayjs } from "dayjs"
import { useEffect, useState } from "react"
import OnlineDeployConfirmModal from "../../deploy/_components/online-deploy-confirm-modal"
import { transformCrontabLevel } from "../_helper"

function OperatorsField() {
  const form = useFormInstance()
  const userOptions = useQueryUserOptions()

  const startTime: Dayjs | undefined = useWatch("timeRange")?.at(0)

  const { data: initialOperators } = useQuery({
    queryKey: ["crontab-duty", startTime],
    queryFn: () =>
      startTime
        ? crontabDutyApiDepCrontabsDuty({
            date: startTime.format("YYYY-MM-DD"),
          }).then((res) => res.data?.users ?? [])
        : [],
  })

  useEffect(() => {
    if (initialOperators) {
      form.setFieldValue(
        "operatorIds",
        initialOperators.map((i) => i.id),
      )
      form.setFields([
        {
          name: "operatorIds",
          value: initialOperators.map((i) => i.id),
          errors: undefined,
        },
      ])
    }
  }, [initialOperators])

  return (
    <ProFormSelect
      label="操作人"
      mode="multiple"
      placeholder=""
      name="operatorIds"
      showSearch
      rules={[{ required: true, message: "请选择操作人" }]}
      options={userOptions.data?.map((u) => ({
        value: u.id,
        label: `${u.nickname} @ ${u.username}`,
      }))}
    />
  )
}

export default function CrontabCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  const [showOnlineDeployConfirmModal, setShowOnlineDeployConfirmModal] =
    useState(false)
  const [formData, setFormData] = useState<DEP.CrontabCreateReq | undefined>(
    undefined,
  )
  const [env, setEnv] = useState<CMDB.EnvInfo | undefined>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      setEnv(undefined)
      setFormData(undefined)
    }
  }, [open])

  const envOptions = useQueryEnvOptions()
  const userOptions = useQueryUserOptions()

  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        disabled={!access.cronatbCreateApiDepCrontabs}
      >
        <PlusOutlined />
        新建
      </Button>
      <ModalForm<
        DEP.CrontabCreateReq & {
          timeRange: [string, string]
        }
      >
        title="新建任务"
        name="crontab-create"
        open={open}
        width={MODAL_FORM_WIDTH}
        autoFocusFirstInput
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
          onCancel: () => setOpen(false),
        }}
        labelCol={{ span: 4 }}
        onFinish={async (formData) => {
          const envUid = envOptions.data!.find(
            (item) => item.EnvId === formData.envId,
          )!.Uid
          const env = (await envReadOneApiCmdbEnvsByUid({ uid: envUid })).data
          setEnv(env as any)
          setFormData({
            ...formData,
            startTime: formData.timeRange[0],
            endTime: formData.timeRange[1],
          })
          setShowOnlineDeployConfirmModal(true)
          return false
        }}
        initialValues={{
          applicant: [currentUser?.nickname],
          timeRange: [dayjs(), undefined],
          level: 1,
        }}
      >
        <ProFormSelect
          label="申请人"
          mode="multiple"
          placeholder=""
          name="applicant"
          showSearch
          rules={[{ required: true, message: "请选择申请人" }]}
          options={userOptions.data?.map((u) => ({
            value: u.nickname,
            label: `${u.nickname} @ ${u.username}`,
          }))}
        />
        <ProFormSelect
          label="环境"
          name="envId"
          rules={[{ required: true, message: "请选择环境" }]}
          placeholder=""
          options={envOptions.data?.map((env) => ({
            value: env.EnvId,
            label: env.EnvName,
          }))}
          showSearch
        />
        <ProFormText
          label="版本"
          name="version"
          rules={[{ required: true, message: "请输入版本" }]}
          placeholder=""
        />
        <ProFormRadio.Group
          label="升级级别"
          name="level"
          rules={[{ required: true, message: "请选择升级级别" }]}
          options={[1, 2, 3, 4].map((level) => {
            const info = transformCrontabLevel(level)
            return {
              value: level,
              label: (
                <Tooltip title={info.tooltip}>
                  <span>{info.label}</span>
                </Tooltip>
              ),
            }
          })}
        />
        <ProFormDateTimeRangePicker
          label="开始/结束"
          name="timeRange"
          placeholder=""
          fieldProps={{ minDate: dayjs() }}
          rules={[
            { required: true, message: "请选择开始/结束时间" },
            {
              validator: (_, value) => {
                if (Array.isArray(value) && !!value[0] && !!value[1]) {
                  return Promise.resolve()
                } else {
                  return Promise.reject("请选择开始/结束时间")
                }
              },
            },
          ]}
        />
        <OperatorsField />
      </ModalForm>
      <OnlineDeployConfirmModal
        title="确定要创建定时任务吗？"
        open={showOnlineDeployConfirmModal}
        onCancel={() => setShowOnlineDeployConfirmModal(false)}
        env={env}
        onFinish={async () => {
          await cronatbCreateApiDepCrontabs(formData!)
          message.success("创建任务成功")
          setOpen(false)
          onFinish?.()
        }}
      />
    </>
  )
}
