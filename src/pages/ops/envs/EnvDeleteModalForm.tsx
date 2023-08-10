import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { envDeleteApiCmdbEnvsByUid } from '@/services/cmdb/env';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function EnvDeleteModalForm({
  envUid,
  envId,
  envName,
  onFinish,
}: {
  envUid: string;
  envId?: string;
  envName?: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.envDeleteApiCmdbEnvsByUidParams>
      title="环境"
      trigger={
        <Button type="text" shape="circle" danger icon={<DeleteOutlined />} />
      }
      onFinish={onFinish}
      params={{ uid: envUid }}
      request={envDeleteApiCmdbEnvsByUid}
      hint={`${envName}（${envId}）`}
    />
  );
}
