import { RegionCreateApiCmdbRegions } from '@/services/cmdb/region';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function RegionCreateModalForm({
  cloudUid,
  onFinish,
}: {
  cloudUid: string;
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.RegionCreateReq['data']>();

  return (
    <ModalForm<API.RegionCreateReq['data']>
      title="添加区域"
      trigger={<Button type="link">添加区域</Button>}
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
          const res = await RegionCreateApiCmdbRegions({
            ...data,
            CloudUid: cloudUid,
          } as any);
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
        name="Region"
        label="区域ID"
        placeholder="请输入区域ID"
        rules={[
          {
            required: true,
            message: '请输入区域ID',
          },
        ]}
      />
      <ProFormText
        name="RegionName"
        label="区域名称"
        placeholder="请输入区域名称"
        rules={[
          {
            required: true,
            message: '请输入区域名称',
          },
        ]}
      />
      <ProFormRadio.Group
        name="RegionState"
        label="状态"
        initialValue="0"
        options={[
          {
            label: '可用',
            value: '1',
          },
          {
            label: '不可用',
            value: '0',
          },
        ]}
      />
    </ModalForm>
  );
}
