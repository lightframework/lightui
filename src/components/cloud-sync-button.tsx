import {
  CloudSyncType,
  cloudSyncTargetMap,
  cloudSyncTitleMap,
} from '@/constants/cloud';
import {
  cloudReadOneApiCmdbCloudsByUid,
  cloudSyncApiCmdbCloudsSync,
} from '@/services/cmdb/cloud';
import { regionReadOneApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { red } from '@ant-design/colors';
import { useQuery } from '@tanstack/react-query';
import { useAccess, useParams } from '@umijs/max';
import { Button, ButtonProps, message } from 'antd';
import useModal from 'antd/es/modal/useModal';

export default function CloudSyncButton({
  cloudUid,
  regionUid,
  type,
  buttonProps,
  onFinish,
}: {
  cloudUid?: string;
  regionUid?: string;
  type: CloudSyncType;
  buttonProps: ButtonProps;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  const params = useParams();
  const [modal, contextHolder] = useModal();

  const CloudUid = cloudUid ?? params.cloudUid;
  if (!CloudUid) {
    throw new Error(
      '<CloudSyncButton> must be used with props or params `cloudUid`',
    );
  }

  const { data: cloud } = useQuery({
    queryKey: ['cloud', cloudUid],
    queryFn: async () =>
      cloudReadOneApiCmdbCloudsByUid({ uid: CloudUid }).then(
        (res) => res.data as CMDB.CloudInfo,
      ),
  });

  const { data: region } = useQuery({
    queryKey: ['region', regionUid],
    queryFn: async () =>
      regionReadOneApiCmdbRegionsByUid({ uid: regionUid! }).then(
        (res) => res.data as CMDB.RegionInfo,
      ),
    enabled: regionUid !== undefined,
  });

  return (
    <>
      {contextHolder}
      <Button
        {...buttonProps}
        disabled={!access.cloudSyncApiCmdbCloudsSync}
        onClick={() =>
          modal.confirm({
            title: `确定同步${cloudSyncTitleMap[type]}吗？`,
            content: (
              <div>
                同步{' '}
                <span style={{ color: red.primary }}>
                  {cloud?.CloudName}
                  {region?.RegionName ? ` - ${region.RegionName}` : ''}
                </span>{' '}
                的{cloudSyncTitleMap[type]}
              </div>
            ),
            onOk: async () => {
              await cloudSyncApiCmdbCloudsSync({
                CloudUid: CloudUid,
                RegionUid: regionUid,
                target: cloudSyncTargetMap[type],
              });
              message.success('同步成功');
              onFinish?.();
            },
          })
        }
      />
    </>
  );
}
