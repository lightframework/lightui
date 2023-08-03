import { personAddApiCmdbPersons } from '@/services/cmdb/person';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function PersonAddModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.PersonAddReq['data']>();

  return (
    <ModalForm<API.PersonAddReq['data']>
      title="添加人员"
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
          const res = await personAddApiCmdbPersons(data as any);
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
        name="PersonName"
        label="人员名称"
        placeholder="请输入人员名称"
        rules={[
          {
            required: true,
            message: '请输入人员名称',
          },
        ]}
      />
      <ProFormText name="Mobile" label="手机" placeholder="请输入手机" />
      <ProFormText name="Email" label="邮箱" placeholder="请输入邮箱" />
      <ProFormRadio.Group
        name="Enabled"
        label="状态"
        options={[
          {
            label: '可用',
            value: true,
          },
          {
            label: '禁用',
            value: false,
          },
        ]}
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
