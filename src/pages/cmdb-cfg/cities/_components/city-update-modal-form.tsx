import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { cityUpdateApiCmdbCitysByUid } from '@/services/cmdb/city';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';

export default function CityUpdateModalForm({
  open,
  onCancel,
  city,
  onFinish,
}: {
  open: boolean;
  onCancel: VoidFunction;
  city?: CMDB.CityInfo;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<CMDB.CityUpdateReq>
      title="更新城市"
      name="city-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={city}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!city) return false;
        await cityUpdateApiCmdbCitysByUid({ uid: city.Uid }, formData);
        message.success('更新成功');
        onCancel();
        onFinish?.();
        return true;
      }}
    >
      <ProFormText name="CountryUid" initialValue={city?.Country.Uid} hidden />
      <ProFormText
        label="ID"
        name="CityId"
        placeholder=""
        rules={[
          { required: true, message: '请输入城市ID（无空白和特殊字符）' },
          {
            pattern: /^[a-zA-Z0-9]*$/,
            message: '城市ID不包含空白和特殊字符',
          },
        ]}
      />
      <ProFormText
        label="名称"
        name="CityName"
        placeholder=""
        rules={[{ required: true, message: '请输入城市名称' }]}
      />
      <ProFormText
        label="中文名称"
        name="CityNameCn"
        placeholder=""
        rules={[{ required: true, message: '请输入城市中文名称' }]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
