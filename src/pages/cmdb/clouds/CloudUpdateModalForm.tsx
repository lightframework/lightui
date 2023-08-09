import {
  cloudReadOneApiCmdbCloudsByUid,
  cloudUpdateApiCmdbCloudsByUid,
} from '@/services/cmdb/cloud';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, message } from 'antd';

export default function CloudUpdateModalForm({
  cloudUid,
  onFinish,
}: {
  cloudUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<API.CloudCreateReq, API.cloudReadOneApiCmdbCloudsByUidParams>
      title="编辑云商"
      trigger={<Button type="link">编辑</Button>}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      params={{ uid: cloudUid }}
      request={async (params) => {
        const res = await cloudReadOneApiCmdbCloudsByUid(params);
        return res.data!;
      }}
      onFinish={async (data) => {
        try {
          const res = await cloudUpdateApiCmdbCloudsByUid(
            { uid: cloudUid },
            data,
          );
          if (res.msg === 'OK') {
            message.success('更新成功');
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
