import { instanceSyncApiCmdbInstancesSync } from '@/services/cmdb/instance';
import { regionReadOneApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { ModalForm } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from '@umijs/max';
import { Button, Typography, message } from 'antd';

export default function HostSyncModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const [searchParams] = useSearchParams();
  const regionUid = searchParams.get('regionUid');
  const zoneUid = searchParams.get('zoneUid');

  const { data: region } = useQuery({
    queryKey: ['region-options', regionUid],
    queryFn: () =>
      regionReadOneApiCmdbRegionsByUid({ uid: regionUid! }).then(
        (res) => res.data,
      ),
    enabled: !!regionUid,
  });

  return (
    <ModalForm
      title={'同步主机实例'}
      trigger={
        <Button type="primary" disabled={!region || !!zoneUid}>
          同步
        </Button>
      }
      width={500}
      onFinish={async () => {
        const res = await instanceSyncApiCmdbInstancesSync({});
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
        您确定同步区域
        <span style={{ color: 'red', fontWeight: 700 }}>
          {region?.RegionName}
        </span>{' '}
        ？
      </Typography.Paragraph>
    </ModalForm>
  );
}
