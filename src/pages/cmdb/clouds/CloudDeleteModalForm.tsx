import { cloudDeleteApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Typography, message } from 'antd';

export default function CloudDeleteModalForm({
  uid,
  cloudKey,
  cloudName,
  onFinish,
}: {
  uid: string;
  cloudKey: string;
  cloudName: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm
      title="删除云商"
      trigger={
        <Button type="link" danger>
          删除
        </Button>
      }
      width={600}
      onFinish={async () => {
        try {
          const res = await cloudDeleteApiCmdbCloudsByUid({ uid });
          if (res.msg === 'OK') {
            message.success('删除成功');
            onFinish?.();
            return true;
          } else {
            message.error(res.msg);
          }
        } catch (e) {
          message.error('服务器异常，删除失败');
        }
      }}
    >
      <Typography.Paragraph style={{ marginTop: 36 }}>
        您确定删除{' '}
        <span
          style={{ color: 'red', fontWeight: 700 }}
        >{`${cloudName}（${cloudKey}）`}</span>{' '}
        的信息吗？
      </Typography.Paragraph>
      <Typography.Paragraph style={{ color: 'red' }}>
        注：删除后XXXXX
      </Typography.Paragraph>
    </ModalForm>
  );
}
