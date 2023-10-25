import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { useQueryCloud } from '@/lib/hooks/data';
import useCityOptions from '@/lib/hooks/use-city-options';
import { RegionCreateApiCmdbRegions } from '@/services/cmdb/region';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormCascader,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useAccess, useParams } from '@umijs/max';
import { Button, Tooltip, message } from 'antd';

export default function RegionCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  const { cloudUid } = useParams();

  const { data: cloud } = useQueryCloud(cloudUid!);
  const options = useCityOptions();

  return (
    <ModalForm<CMDB.RegionCreateReq>
      title="添加区域"
      name="region-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Tooltip
          title={cloud?.SupportApi ? '该云商不支持手动添加区域' : '添加区域'}
        >
          <Button
            type="text"
            shape="circle"
            icon={<PlusOutlined />}
            disabled={!access.RegionCreateApiCmdbRegions || cloud?.SupportApi}
          />
        </Tooltip>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await RegionCreateApiCmdbRegions(formData);
        message.success('添加成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText name="CloudUid" initialValue={cloud?.Uid} hidden />
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
      <ProFormCascader
        name="CityUid"
        label="城市"
        fieldProps={{ options }}
        placeholder=""
        transform={(value) => (Array.isArray(value) ? value.at(2) : value)}
      />
      <ProFormSwitch
        label="可用状态"
        name="RegionState"
        initialValue={true}
        transform={(value) => (value ? 'AVAILABLE' : 'UNAVAILABLE')}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
