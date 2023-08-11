import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  regionReadOneApiCmdbRegionsByUid,
  regionUpdateApiCmdbRegionsByUid,
} from '@/services/cmdb/region';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function RegionUpdateModalForm({
  cloudUid,
  regionUid,
  onFinish,
}: {
  cloudUid: string;
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<
      API.RegionUpdateReq,
      API.regionUpdateApiCmdbRegionsByUidParams,
      API.regionReadOneApiCmdbRegionsByUidParams
    >
      title="编辑区域"
      trigger={<Button type="text" shape="circle" icon={<EditOutlined />} />}
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
          initialValue: cloudUid,
          hidden: true,
        },
        {
          fieldType: 'text',
          label: '区域ID',
          name: 'Region',
          required: true,
        },
        {
          fieldType: 'text',
          label: '区域名称',
          name: 'RegionName',
          required: true,
        },
        {
          fieldType: 'text',
          label: '区域状态',
          name: 'RegionState',
        },
      ]}
    />
  );
}
