import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { EnvCreateApiCmdbEnvs } from '@/services/cmdb/env';
import { Button } from 'antd';

export default function EnvCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<API.EnvCreateReq>
      title="环境"
      onFinish={onFinish}
      trigger={<Button type="link">新增</Button>}
      request={EnvCreateApiCmdbEnvs}
      fields={[
        {
          fieldType: 'text',
          label: '环境ID',
          name: 'EnvId',
          required: true,
        },
        {
          fieldType: 'text',
          label: '环境名称',
          name: 'EnvName',
          required: true,
        },
        {
          fieldType: 'text',
          label: '域名',
          name: 'DomainName',
        },
        {
          fieldType: 'text',
          label: 'API域名',
          name: 'ApiDomainName',
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
      ]}
    />
  );
}
