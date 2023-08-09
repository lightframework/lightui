import { regionDeleteApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { DeleteOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Typography, message } from 'antd';

export default function RegionDeleteModalForm({
  regionUid,
  region,
  regionName,
  onFinish,
}: {
  regionUid: string;
  region?: string;
  regionName?: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm
      title="删除区域"
      trigger={
        <Button type="text" shape="circle" danger icon={<DeleteOutlined />} />
      }
      width={500}
      onFinish={async () => {
        try {
          const res = await regionDeleteApiCmdbRegionsByUid({ uid: regionUid });
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
        您确定删除区域{' '}
        <span
          style={{ color: 'red', fontWeight: 700 }}
        >{`${regionName}（${region}）`}</span>{' '}
        ？
      </Typography.Paragraph>
    </ModalForm>
  );
}
