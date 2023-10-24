import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { cloudCreateApiCmdbClouds } from '@/services/cmdb/cloud';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button, message } from 'antd';

export default function CloudCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  return (
    <ModalForm<CMDB.CloudCreateReq>
      title="新建云商"
      name="cloud-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.cloudCreateApiCmdbClouds}>
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await cloudCreateApiCmdbClouds(formData);
        message.success('创建成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText
        label="云商ID"
        name="Cloud"
        placeholder=""
        rules={[{ required: true, message: '请输入云商ID' }]}
      />
      <ProFormText
        label="云商名称"
        name="CloudName"
        placeholder=""
        rules={[{ required: true, message: '请输入云商名称' }]}
      />
      <ProFormText
        label="资源组"
        name="ResourceGroup"
        placeholder=""
        rules={[{ required: true, message: '请输入资源组' }]}
      />
      <ProFormText
        label="账号"
        name="Account"
        placeholder=""
        rules={[{ required: true, message: '请输入账号' }]}
      />
      <ProFormText
        label="官网链接"
        name="Website"
        placeholder=""
        rules={[
          {
            type: 'url',
            warningOnly: true,
          },
        ]}
      />
      <ProFormText
        label="API链接"
        name="ApiDomain"
        placeholder=""
        rules={[
          {
            type: 'url',
            warningOnly: true,
          },
        ]}
      />
      <ProFormText label="SecretId" name="SecretId" placeholder="" />
      <ProFormText label="SecretKey" name="SecretKey" placeholder="" />
      <ProFormSwitch
        label="支持API"
        name="SupportApi"
        placeholder=""
        initialValue={false}
      />
      <ProFormDigit
        label="权重"
        name="Weight"
        placeholder="快速开通机器时的参考权重"
        initialValue={0}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
