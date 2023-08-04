import { professionDeleteApiCmdbProfessionsByUid } from '@/services/cmdb/profession';
import { DeleteOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Typography, message } from 'antd';

export default function ProfessionDeleteModalForm({
  professionUid,
  professionName,
  professionId,
  onFinish,
}: {
  professionUid: string;
  professionName?: string;
  professionId?: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm
      title="删除团队"
      trigger={
        <Button type="text" shape="circle" danger icon={<DeleteOutlined />} />
      }
      width={600}
      onFinish={async () => {
        try {
          const res = await professionDeleteApiCmdbProfessionsByUid({
            uid: professionUid,
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
        您确定删除{' '}
        <span
          style={{ color: 'red', fontWeight: 700 }}
        >{`${professionName}（${professionId}）`}</span>{' '}
        的信息吗？
      </Typography.Paragraph>
      <Typography.Paragraph style={{ color: 'red' }}>
        注：删除后XXXXX
      </Typography.Paragraph>
    </ModalForm>
  );
}
