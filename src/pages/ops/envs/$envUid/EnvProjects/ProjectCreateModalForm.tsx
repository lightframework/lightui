import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { usePersonOptions } from '@/hooks/options';
import { ProjectCreateApiCmdbProjects } from '@/services/cmdb/project';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function ProjectCreateModalForm({
  envUid,

  onFinish,
}: {
  envUid: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  const salePersonOptions = usePersonOptions('销售');
  const supportPersonOptions = usePersonOptions('技术支持');

  return (
    <ModalCreateForm<API.ProjectCreateReq>
      title="创建项目"
      trigger={
        <Button
          type="primary"
          disabled={!(access as any).ProjectCreateApiCmdbProjects}
        >
          新增
        </Button>
      }
      onFinish={onFinish}
      request={ProjectCreateApiCmdbProjects}
      fields={[
        {
          fieldType: 'text',
          name: 'CusId',
          label: 'CusId',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'EnvUid',
          initialValue: envUid,
          hidden: true,
        },
        {
          fieldType: 'text',
          name: 'Project',
          label: '项目Id',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'ProjectName',
          label: '项目名称',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'ProjectState',
          label: '项目状态',
        },
        {
          fieldType: 'select',
          name: 'SaleIds',
          label: '销售',
          options: salePersonOptions.selectOptions,
        },
        {
          fieldType: 'select',
          name: 'SupportIds',
          label: '技术支持',
          options: supportPersonOptions.selectOptions,
        },
      ]}
    />
  );
}
