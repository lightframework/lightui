import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import { Button, Typography } from 'antd';

type RegionSyncReq = { regionUid: string };
type RegionSyncParams = { regionUid: string };

export default function RegionSyncModalForm({
  regionUid,
  regionName,
  cloudName,
  onFinish,
}: {
  regionUid: string;
  regionName?: string;
  cloudName?: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<RegionSyncReq, RegionSyncParams>
      title="可用区-同步"
      trigger={<Button type="primary">同步</Button>}
      onFinish={onFinish}
      requestParams={{ regionUid }}
      request={async () => {
        return {
          msg: '暂未实现',
          code: 5000,
        };
      }}
    >
      <Typography.Paragraph style={{ marginTop: 24 }}>
        同步 {cloudName}-{regionName} 下的所有可用区及机型信息？
      </Typography.Paragraph>
    </ModalUpdateForm>
  );
}
