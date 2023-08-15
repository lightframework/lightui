import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import { Button, Typography } from 'antd';

type CloudSyncReq = { cloudUid: string };
type CloudSyncParams = { cloudUid: string };

export default function CloudSyncModalForm({
  cloudUid,
  cloudName,
  onFinish,
}: {
  cloudUid: string;
  cloudName: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<CloudSyncReq, CloudSyncParams>
      title="区域列表-同步"
      trigger={<Button type="link">同步</Button>}
      onFinish={onFinish}
      requestParams={{ cloudUid }}
      request={async () => {
        return {
          msg: '暂未实现',
          code: 5000,
        };
      }}
    >
      <Typography.Paragraph style={{ marginTop: 24 }}>
        同步 <span style={{ fontWeight: 700 }}>{cloudName}</span>{' '}
        下的所有区域信息？
      </Typography.Paragraph>
    </ModalUpdateForm>
  );
}
