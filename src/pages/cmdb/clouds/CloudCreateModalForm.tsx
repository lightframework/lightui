import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { cloudCreateApiCmdbClouds } from '@/services/cmdb/cloud';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function CloudCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  return (
    <ModalCreateForm<API.CloudCreateReq>
      title="创建云商"
      onFinish={onFinish}
      trigger={
        <Button
          type="primary"
          disabled={!(access as any).cloudCreateApiCmdbClouds}
        >
          新增
        </Button>
      }
      request={cloudCreateApiCmdbClouds}
      fields={[
        {
          fieldType: 'text',
          label: '云商Id',
          name: 'Cloud',
          required: true,
        },
        {
          fieldType: 'text',
          label: '云商名称',
          name: 'CloudName',
          required: true,
        },
        {
          fieldType: 'text',
          label: '资源组',
          name: 'ResourceGroup',
          required: true,
        },
        {
          fieldType: 'text',
          label: '账号',
          name: 'Account',
          required: true,
        },
        {
          fieldType: 'text',
          label: '官网链接',
          name: 'Website',
          rules: [
            {
              type: 'url',
              warningOnly: true,
            },
          ],
        },
        {
          fieldType: 'text',
          label: '云商API',
          name: 'ApiDomain',
          rules: [
            {
              type: 'url',
              warningOnly: true,
            },
          ],
        },
        {
          fieldType: 'radio',
          label: '支持API',
          name: 'SupportApi',
          initialValue: false,
          options: [
            {
              label: '支持',
              value: true,
            },
            {
              label: '不支持',
              value: false,
            },
          ],
        },
        {
          fieldType: 'text',
          label: 'SecretId',
          name: 'SecretId',
        },
        {
          fieldType: 'text',
          label: 'SecretKey',
          name: 'SecretKey',
        },
        {
          fieldType: 'textarea',
          label: '描述',
          name: 'Description',
        },
      ]}
    />
  );
}
