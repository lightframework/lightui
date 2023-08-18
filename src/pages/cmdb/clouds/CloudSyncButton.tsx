import { cloudSyncApiCmdbCloudsSync } from '@/services/cmdb/cloud';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Typography, message } from 'antd';
import { ButtonType } from 'antd/es/button';
import { ReactNode } from 'react';

type CloudSyncType =
  | 'region'
  | 'zone'
  | 'vpc'
  | 'security-group'
  | 'image'
  | 'tag';

const targetMap: { [key in CloudSyncType]: number } = {
  region: 0,
  zone: 1,
  vpc: 2,
  'security-group': 3,
  image: 4,
  tag: 5,
};

export default function CloudSyncButton({
  type,
  title,
  hint,
  cloudUid,
  regionUid,
  buttonType = 'primary',
  onFinish,
}: {
  title: string;
  hint: ReactNode;
  type: CloudSyncType;
  cloudUid: string;
  regionUid?: string;
  buttonType?: ButtonType;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<API.CloudSyncReq>
      title={title}
      trigger={<Button type={buttonType}>同步</Button>}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async () => {
        const res = await cloudSyncApiCmdbCloudsSync({
          CloudUid: cloudUid,
          target: targetMap[type],
          RegionUid: regionUid,
        });
        if (res.msg === 'OK') {
          message.success('同步成功');
          onFinish?.();
          return true;
        } else {
          message.error(res.msg);
        }
      }}
    >
      <Typography.Paragraph style={{ marginTop: 24 }}>
        {hint}
      </Typography.Paragraph>
    </ModalForm>
  );
}
