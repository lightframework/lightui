import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { appCreateApiCmdbApps } from '@/services/cmdb/app';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function AppCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalCreateForm<API.AppCreateReq>
      title="创建应用"
      trigger={
        <Button type="primary" disabled={!(access as any).appCreateApiCmdbApps}>
          新增
        </Button>
      }
      onFinish={onFinish}
      request={appCreateApiCmdbApps}
      fields={[
        {
          fieldType: 'text',
          name: 'App',
          label: '应用名称',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'AppType',
          label: '应用类型',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'Version',
          label: '版本',
          required: true,
        },
        {
          fieldType: 'radio',
          name: 'Enabled',
          label: '状态',
          initialValue: false,
          options: [
            {
              label: '可用',
              value: true,
            },
            {
              label: '禁用',
              value: false,
            },
          ],
        },
        {
          fieldType: 'textarea',
          name: 'Description',
          label: '描述',
        },
      ]}
    />
  );
}
