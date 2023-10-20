import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { zoneUpdateApiCmdbZonesByUid } from '@/services/cmdb/zone';
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { message } from 'antd';

export default function ZoneUpdateModalForm({
  open,
  onCancel,
  zone,
  onFinish,
}: {
  open: boolean;
  onCancel: VoidFunction;
  zone?: CMDB.ZoneInfo;
  onFinish?: VoidFunction;
}) {
  const { regionUid } = useParams();

  return (
    <ModalForm<CMDB.ZoneUpdateReq>
      title="更新可用区"
      name="zone-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{ ...zone, ZoneState: zone?.ZoneState === 'AVAILABLE' }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!zone) return false;
        await zoneUpdateApiCmdbZonesByUid({ uid: zone.Uid }, formData);
        message.success('更新成功');
        onCancel();
        onFinish?.();
        return true;
      }}
    >
      <ProFormText name="RegionUid" initialValue={regionUid} hidden />
      <ProFormText
        label="ID"
        name="Zone"
        placeholder=""
        rules={[{ required: true, message: '请输入可用区ID' }]}
      />
      <ProFormText
        label="名称"
        name="ZoneName"
        placeholder=""
        rules={[{ required: true, message: '请输入可用区名称' }]}
      />
      <ProFormSwitch
        label="可用状态"
        name="ZoneState"
        transform={(value) => (value ? 'AVAILABLE' : 'UNAVAILABLE')}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
