import { regionUpdateApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { EditOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function RegionUpdateModalForm({
  regionUid,
  initialValues,
  onFinish,
}: {
  regionUid: string;
  initialValues: API.RegionUpdateReq;
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.RegionUpdateReq>();

  return (
    <ModalForm<API.RegionUpdateReq>
      title="编辑可用区"
      trigger={<Button type="text" shape="circle" icon={<EditOutlined />} />}
      form={form}
      width={600}
      labelCol={{ span: 4 }}
      initialValues={initialValues}
      layout="horizontal"
      onFinish={async (data) => {
        try {
          const res = await regionUpdateApiCmdbRegionsByUid(
            { uid: regionUid },
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
      <ProFormText name="CloudUid" hidden />
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
