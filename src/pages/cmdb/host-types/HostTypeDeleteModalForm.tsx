import { hosttypeDeleteApiCmdbHosttypesByUid } from '@/services/cmdb/hosttype';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Typography, message } from 'antd';

export default function HostTypeDeleteModalForm({
  hostTypeUid,
  hostTypeName,
  onFinish,
}: {
  hostTypeUid: string;
  hostTypeName: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm
      title="删除主机类型"
      trigger={
        <Button type="link" danger>
          删除
        </Button>
      }
      width={500}
      onFinish={async () => {
        try {
          const res = await hosttypeDeleteApiCmdbHosttypesByUid({
            uid: hostTypeUid,
          });
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
        您确定删除主机类型{' '}
        <span style={{ color: 'red', fontWeight: 700 }}>{hostTypeName}</span>{' '}
        吗？
      </Typography.Paragraph>
    </ModalForm>
  );
}
