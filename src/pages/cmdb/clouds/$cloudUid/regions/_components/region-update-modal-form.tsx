import { MODAL_FORM_WIDTH } from '@/constants/modal';
import {
  regionReadOneApiCmdbRegionsByUid,
  regionUpdateApiCmdbRegionsByUid,
} from '@/services/cmdb/region';
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { message } from 'antd';

export default function RegionUpdateModalForm({
  open,
  onCancel,
  region,
  onFinish,
}: {
  open: boolean;
  onCancel: VoidFunction;
  region?: CMDB.RegionOption;
  onFinish?: VoidFunction;
}) {
  const { cloudUid } = useParams();

  return (
    <ModalForm<CMDB.RegionUpdateReq>
      title="更新区域"
      name="region-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      request={async () => {
        if (!region) {
          return {};
        }

        const { data } = await regionReadOneApiCmdbRegionsByUid({
          uid: region.Uid,
        });

        return {
          ...region,
          Description: data?.Description,
          CityUid: data?.City?.Uid,
          CloudUid: cloudUid,
          RegionState: region.RegionState === 'AVAILABLE',
        };
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!region) return false;

        await regionUpdateApiCmdbRegionsByUid({ uid: region.Uid }, formData);
        message.success('更新成功');
        onCancel();
        onFinish?.();
        return true;
      }}
    >
      <ProFormText name="CloudUid" hidden />
      <ProFormText name="CityUid" hidden />
      <ProFormText
        label="区域ID"
        name="Region"
        placeholder=""
        rules={[{ required: true, message: '请输入区域ID' }]}
      />
      <ProFormText
        label="区域名称"
        name="RegionName"
        placeholder=""
        rules={[{ required: true, message: '请输入名称' }]}
      />
      <ProFormSwitch
        label="可用状态"
        name="RegionState"
        transform={(value) => (value ? 'AVAILABLE' : 'UNAVAILABLE')}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
