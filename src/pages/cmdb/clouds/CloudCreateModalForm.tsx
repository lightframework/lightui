import { cloudCreateApiCmdbClouds } from '@/services/cmdb/cloud';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function CloudCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.CloudCreateReq>();

  return (
    <ModalForm<API.CloudCreateReq>
      title="添加云商"
      trigger={<Button type="primary">添加</Button>}
      form={form}
      width={600}
      labelCol={{ span: 4 }}
      modalProps={{
        destroyOnClose: true,
      }}
      layout="horizontal"
      autoFocusFirstInput
      onFinish={async (data) => {
        try {
          const res = await cloudCreateApiCmdbClouds(data);
          if (res.msg === 'OK') {
            message.success('添加成功');
            onFinish?.();
            return true;
          } else {
            message.error(res.msg);
          }
        } catch (e) {
          const data = (e as AxiosError).response?.data as any;
          const code = data.code;
          if (code === 5000) {
            message.error(data.msg);
          } else {
            message.error('服务器异常，添加失败');
          }
        }
      }}
    >
      <ProFormText
        name="CloudKey"
        label="云商ID"
        placeholder="请输入云商ID"
        rules={[
          {
            required: true,
            message: '请输入云商ID',
          },
        ]}
      />
      <ProFormText
        name="CloudName"
        label="云商名称"
        placeholder="请输入云商名称"
        rules={[
          {
            required: true,
            message: '请输入云商名称',
          },
        ]}
      />
      <ProFormText
        name="Website"
        label="官网链接"
        placeholder="请输入官网链接"
        rules={[{ type: 'url', warningOnly: true }]}
      />
      <ProFormText
        name="ApiDomain"
        label="云商API"
        placeholder="请输入云商API"
        rules={[{ type: 'url', warningOnly: true }]}
      />
      <ProFormRadio.Group
        name="SupportApi"
        label="支持API"
        initialValue={false}
        options={[
          {
            label: '是',
            value: true,
          },
          {
            label: '否',
            value: false,
          },
        ]}
      />
      <ProFormText
        name="SecretId"
        label="SecretId"
        placeholder="请输入SecretId"
      />
      <ProFormText
        name="SecretKey"
        label="SecretKey"
        placeholder="请输入SecretKey"
      />
      <ProFormTextArea
        name="Description"
        label="描述"
        placeholder="请输入描述"
        rules={[
          {
            max: 128,
          },
        ]}
      />
    </ModalForm>
  );
}
