import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  zoneReadOneApiCmdbZonesByUid,
  zoneUpdateApiCmdbZonesByUid,
} from '@/services/cmdb/zone';
import { Button } from 'antd';
import { useCloud } from '../../contexts/cloud-context';

export default function ZoneUpdateModalForm({
  zoneUid,
  regionUid,
  onFinish,
}: {
  zoneUid: string;
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  const { cloud } = useCloud();

  return (
    <ModalUpdateForm<
      API.ZoneUpdateReq,
      API.zoneUpdateApiCmdbZonesByUidParams,
      API.zoneReadOneApiCmdbZonesByUidParams
    >
      title="编辑可用区"
      onFinish={onFinish}
      initialParams={{
        uid: zoneUid,
      }}
      trigger={
        <Button type="link" disabled>
          编辑
        </Button>
      }
      initialRequest={zoneReadOneApiCmdbZonesByUid}
      requestParams={{
        uid: zoneUid,
      }}
      request={zoneUpdateApiCmdbZonesByUid}
      fields={[
        {
          fieldType: 'text',
          name: 'RegionUid',
          hidden: true,
          initialValue: regionUid,
        },
        {
          fieldType: 'text',
          label: '可用区ID',
          name: 'Zone',
          required: true,
          hidden: cloud?.SupportApi,
        },
        {
          fieldType: 'text',
          label: '可用区名称',
          name: 'ZoneName',
          required: true,
          hidden: cloud?.SupportApi,
        },
        {
          fieldType: 'text',
          label: '可用区状态',
          name: 'ZoneState',
          hidden: cloud?.SupportApi,
        },
        {
          fieldType: 'textarea',
          label: '备注',
          name: 'Description',
        },
      ]}
    />
  );
}
