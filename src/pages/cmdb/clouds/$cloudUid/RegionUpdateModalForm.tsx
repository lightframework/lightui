import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  regionReadOneApiCmdbRegionsByUid,
  regionUpdateApiCmdbRegionsByUid,
} from '@/services/cmdb/region';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useCloud } from './contexts/cloud-context';

export default function RegionUpdateModalForm({
  regionUid,
  onFinish,
}: {
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  const { cloud } = useCloud();

  return (
    <ModalUpdateForm<
      API.RegionUpdateReq,
      API.regionUpdateApiCmdbRegionsByUidParams,
      API.regionReadOneApiCmdbRegionsByUidParams
    >
      title="编辑区域"
      trigger={
        <Button
          type="text"
          shape="circle"
          icon={<EditOutlined className="text-green-400" />}
        />
      }
      onFinish={onFinish}
      initialParams={{
        uid: regionUid,
      }}
      initialRequest={regionReadOneApiCmdbRegionsByUid}
      requestParams={{
        uid: regionUid,
      }}
      request={regionUpdateApiCmdbRegionsByUid}
      fields={[
        {
          fieldType: 'text',
          name: 'CloudUid',
          initialValue: cloud?.Uid,
          hidden: true,
        },
        {
          fieldType: 'text',
          label: '区域ID',
          name: 'Region',
          required: true,
          hidden: cloud?.SupportApi,
        },
        {
          fieldType: 'text',
          label: '区域名称',
          name: 'RegionName',
          required: true,
          hidden: cloud?.SupportApi,
        },
        {
          fieldType: 'text',
          label: '区域状态',
          name: 'RegionState',
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
