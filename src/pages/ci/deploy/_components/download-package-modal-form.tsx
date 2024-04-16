import { MODAL_FORM_WIDTH } from "@/constants/modal"
import {
  packagesAllRepoApiDepPackagesRepo,
  packagesDownloadApiDepPackagesDownload,
  packagesVersionApiDepPackagesByRepoversion,
} from "@/services/dep/packages"
import { DownloadOutlined } from "@ant-design/icons"
import { ModalForm, ProFormSelect } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Form, message } from "antd"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useEffect } from "react"

type FieldType = Partial<DEP.PackagesDownloadReq>

function RepoField() {
  const { data, isFetching } = useQuery({
    queryKey: ["repo-options"],
    queryFn: () =>
      packagesAllRepoApiDepPackagesRepo().then(
        (res) => res.data?.data?.flatMap((item) => item.repos) ?? [],
      ),
  })

  return (
    <ProFormSelect
      label="仓库"
      name="repo"
      rules={[{ required: true, message: "请选择仓库" }]}
      options={data?.map((repo) => ({ label: repo, value: repo }))}
      fieldProps={{ loading: isFetching }}
      placeholder=""
      showSearch
    />
  )
}

function VersionField({ repo }: { repo: string }) {
  const form = useFormInstance()

  const { data, isFetching } = useQuery({
    queryKey: ["repo-version-options", repo],
    queryFn: () =>
      packagesVersionApiDepPackagesByRepoversion({ repo }).then(
        (res) => res.data?.versions ?? [],
      ),
  })

  useEffect(() => {
    form.setFieldValue("version", data?.at(0))
  }, [data])

  return (
    <ProFormSelect
      label="版本"
      name="version"
      rules={[{ required: true, message: "请选择版本" }]}
      options={data?.map((version) => ({ label: version, value: version }))}
      fieldProps={{ loading: isFetching }}
      placeholder=""
      showSearch
    />
  )
}

export default function DownLoadPackageModalForm() {
  const access = useAccess()

  return (
    <ModalForm<DEP.PackagesDownloadReq>
      title="下载离线包"
      name="download-package"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="primary"
          disabled={!access.packagesDownloadApiDepPackagesDownload}
        >
          <DownloadOutlined />
          下载离线包
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 3 }}
      onFinish={async (formData) => {
        const res = await packagesDownloadApiDepPackagesDownload(formData)
        if (res.data?.url) {
          message.success(
            <a href={res.data.url} target="_blank" rel="noreferrer">
              {res.data.url}
            </a>,
          )
          return true
        }
      }}
    >
      <RepoField />
      <Form.Item<FieldType>
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.repo !== currentValues.repo
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const repo = getFieldValue("repo")
          return repo ? <VersionField repo={repo} /> : null
        }}
      </Form.Item>
    </ModalForm>
  )
}
