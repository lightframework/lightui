import { zoneUpdateApiCmdbZonesByUid } from '@/services/cmdb/zone';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function ZoneUpdateModalForm({
  uid,
  initialValues,
  onFinish,
}: {
  uid: string;
  initialValues: API.ZoneUpdateReq['data'];
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.ZoneUpdateReq['data']>();

  return (
    <ModalForm<API.ZoneUpdateReq['data']>
      title="编辑可用区"
      trigger={<Button type="link">编辑</Button>}
      form={form}
      width={600}
      labelCol={{ span: 4 }}
      modalProps={{
        destroyOnClose: true,
      }}
      initialValues={initialValues}
      layout="horizontal"
      onFinish={async (data) => {
        try {
          const res = await zoneUpdateApiCmdbZonesByUid({ uid }, {
            ...data,
            RegionUid: initialValues?.RegionUid,
          } as any);
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
        name="Zone"
        label="可用区ID"
        placeholder="请输入可用区ID"
        rules={[
          {
            required: true,
            message: '请输入可用区ID',
          },
        ]}
      />
      <ProFormText
        name="ZoneName"
        label="可用区名称"
        placeholder="请输入可用区名称"
        rules={[
          {
            required: true,
            message: '请输入可用区名称',
          },
        ]}
      />
      <ProFormRadio.Group
        name="ZoneState"
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
