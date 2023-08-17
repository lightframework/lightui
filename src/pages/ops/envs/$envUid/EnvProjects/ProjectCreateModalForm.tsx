import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { ProjectCreateApiCmdbProjects } from '@/services/cmdb/project';
import { BaseOptionType } from 'antd/es/select';

export default function ProjectCreateModalForm({
  envUid,
  salePersonOptions,
  supportPersonOptions,
  onFinish,
}: {
  envUid: string;
  salePersonOptions: BaseOptionType[];
  supportPersonOptions: BaseOptionType[];
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<API.ProjectCreateReq>
      title="创建项目"
      onFinish={onFinish}
      request={ProjectCreateApiCmdbProjects}
      fields={[
        {
          fieldType: 'text',
          name: 'CusId',
          label: 'CustomerID',
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
          name: 'ProjectId',
          label: '项目ID',
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
          options: salePersonOptions,
        },
        {
          fieldType: 'select',
          name: 'SupportIds',
          label: '技术支持',
          options: supportPersonOptions,
        },
      ]}
    />
  );
}
