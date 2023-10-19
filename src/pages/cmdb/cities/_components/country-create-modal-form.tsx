import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { CountryCreateApiCmdbCountrys } from '@/services/cmdb/country';
import { PlusCircleOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button, Tooltip, message } from 'antd';

export default function CountryCreateModalForm({
  continentUid,
  onFinish,
}: {
  continentUid: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalForm<CMDB.CountryCreateReq>
      title="添加地区"
      name="country-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Tooltip title="添加地区">
          <Button
            type="text"
            shape="circle"
            size="small"
            disabled={!access.CountryCreateApiCmdbCountrys}
            icon={<PlusCircleOutlined />}
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
        await CountryCreateApiCmdbCountrys(formData);
        message.success('添加成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText name="ContinentUid" initialValue={continentUid} hidden />
      <ProFormText
        label="ID"
        name="CountryId"
        placeholder=""
        rules={[{ required: true, message: '请输入ID' }]}
      />
      <ProFormText
        label="名称"
        name="CountryNameCn"
        placeholder=""
        rules={[{ required: true, message: '请输入名称' }]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
