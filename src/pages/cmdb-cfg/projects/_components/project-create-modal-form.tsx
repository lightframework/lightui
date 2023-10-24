import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { usePersonOptions } from '@/lib/hooks';
import { personOptionsApiCmdbPersonsOptions } from '@/services/cmdb/person';
import { ProjectCreateApiCmdbProjects } from '@/services/cmdb/project';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { useAccess } from '@umijs/max';
import { Button, message } from 'antd';

export default function ProjectCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  const salePersons = usePersonOptions('销售');

  const { data } = useQuery({
    queryKey: ['person-options'],
    queryFn: () =>
      personOptionsApiCmdbPersonsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  });

  const clientPersons = data ?? [];

  return (
    <ModalForm<CMDB.ProjectCreateReq>
      title="新建项目"
      name="project-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.ProjectCreateApiCmdbProjects}>
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await ProjectCreateApiCmdbProjects(formData);
        message.success('新建成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText label="CusID" name="CusId" placeholder="" />
      <ProFormText
        label="项目ID"
        name="Project"
        placeholder=""
        rules={[{ required: true, message: '请输入项目ID' }]}
      />
      <ProFormText
        label="项目名称"
        name="ProjectName"
        placeholder=""
        rules={[{ required: true, message: '请输入项目名称' }]}
      />
      <ProFormSelect
        label="客户"
        name="ClientIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={clientPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormSelect
        label="销售"
        name="SaleIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={salePersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
    </ModalForm>
  );
}
