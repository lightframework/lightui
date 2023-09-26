import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { usePersonOptions } from '@/lib/hooks';
import { ProjectCreateApiCmdbProjects } from '@/services/cmdb/project';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button, message } from 'antd';

export default function ProjectCreateModalForm({
  envUid,
  onFinish,
}: {
  envUid: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  const salePersons = usePersonOptions('销售');
  const supportPersons = usePersonOptions('技术支持');

  return (
    <ModalForm<CMDB.ProjectCreateReq>
      title="创建项目"
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
        message.success('创建成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText name="EnvUid" initialValue={envUid} hidden />
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
      <ProFormText label="状态" name="ProjectState" placeholder="" />
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
      <ProFormSelect
        label="技术支持"
        name="SupportIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={supportPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
    </ModalForm>
  );
}
