import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { useCloud } from '@/lib/hooks/data';
import useCityOptions from '@/lib/hooks/use-city-options';
import {
  regionReadOneApiCmdbRegionsByUid,
  regionUpdateApiCmdbRegionsByUid,
} from '@/services/cmdb/region';
import {
  ModalForm,
  ProFormCascader,
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

  const { data: cloud } = useCloud(cloudUid!);
  const options = useCityOptions();

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
          CloudUid: cloudUid,
          RegionState: region.RegionState === 'AVAILABLE',
          CityUid: data?.City?.Uid
            ? [
                data?.City?.Country.Continent.Uid,
                data?.City?.Country.Uid,
                data?.City?.Uid,
              ]
            : undefined,
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
        readonly={cloud?.SupportApi}
      />
      <ProFormText
        label="区域名称"
        name="RegionName"
        placeholder=""
        readonly={cloud?.SupportApi}
      />
      <ProFormSwitch
        label="可用状态"
        name="RegionState"
        transform={(value) => (value ? 'AVAILABLE' : 'UNAVAILABLE')}
        checkedChildren={cloud?.SupportApi ? '可用' : undefined}
        unCheckedChildren={cloud?.SupportApi ? '不可用' : undefined}
        readonly={cloud?.SupportApi}
      />
      <ProFormCascader
        name="CityUid"
        label="城市"
        fieldProps={{ options }}
        placeholder=""
        transform={(value) => (Array.isArray(value) ? value.at(2) : value)}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
