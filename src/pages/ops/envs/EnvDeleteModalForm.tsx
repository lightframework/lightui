import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { envDeleteApiCmdbEnvsByUid } from '@/services/cmdb/env';
import { DeleteOutlined } from '@ant-design/icons';
import { useAccess } from '@umijs/max';
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
  const access = useAccess();
  return (
    <ModalDeleteForm<API.envDeleteApiCmdbEnvsByUidParams>
      title="删除环境"
      trigger={
        <Button
          type="text"
          shape="circle"
          danger
          icon={<DeleteOutlined />}
          disabled={!(access as any).envDeleteApiCmdbEnvsByUid}
        />
      }
      onFinish={onFinish}
      params={{ uid: envUid }}
      request={envDeleteApiCmdbEnvsByUid}
      hint={`${envName}（${envId}）`}
    />
  );
}
