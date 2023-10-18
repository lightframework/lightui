import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { CityCreateApiCmdbCitys } from '@/services/cmdb/city';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button, message } from 'antd';

export default function CityCreateModalForm({
  countryUid,
  onFinish,
}: {
  countryUid: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalForm<CMDB.CityCreateReq>
      title="添加城市"
      name="city-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.CityCreateApiCmdbCitys}>
          <PlusOutlined />
          添加
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await CityCreateApiCmdbCitys(formData);
        message.success('添加成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText name="CountryUid" initialValue={countryUid} hidden />
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
        label="名称（中文）"
        name="CityNameCn"
        placeholder=""
        rules={[{ required: true, message: '请输入城市名称（中文）' }]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
