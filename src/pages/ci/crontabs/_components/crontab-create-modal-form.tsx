import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryEnvOptions, useQueryUserOptions } from "@/lib/hooks/data"
import {
  cronatbCreateApiDepCrontabs,
  crontabDutyApiDepCrontabsDuty,
} from "@/services/dep/crontab"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useModel } from "@umijs/max"
import { Button, message } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import dayjs, { Dayjs } from "dayjs"
import { useEffect } from "react"
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
      rules={[{ required: true, message: "请选择操作人" }]}
      options={userOptions.data?.map((u) => ({
        value: u.id,
        label: (
          <div>
            {u.nickname}
            <span className="ml-1 text-gray-400">@{u.username}</span>
          </div>
        ),
      }))}
    />
  )
}

export default function CrontabCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const envOptions = useQueryEnvOptions()
  const userOptions = useQueryUserOptions()

  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser

  return (
    <ModalForm<DEP.CrontabCreateReq>
      title="新建任务"
      name="crontab-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await cronatbCreateApiDepCrontabs(formData)
        message.success("新建成功")
        onFinish?.()
        return true
      }}
      initialValues={{ applicant: [currentUser?.nickname], level: 1 }}
    >
      <ProFormSelect
        label="申请人"
        mode="multiple"
        placeholder=""
        name="applicant"
        rules={[{ required: true, message: "请选择申请人" }]}
        options={userOptions.data?.map((u) => ({
          value: u.nickname,
          label: (
            <div>
              {u.nickname}
              <span className="ml-1 text-gray-400">@{u.username}</span>
            </div>
          ),
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
            label: info.label,
          }
        })}
      />
      <ProFormDateRangePicker
        label="开始/结束"
        name="timeRange"
        placeholder=""
        fieldProps={{ minDate: dayjs() }}
        rules={[{ required: true, message: "请选择开始/结束时间" }]}
      />
      <OperatorsField />
    </ModalForm>
  )
}
