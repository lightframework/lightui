import { personUpdateApiCmdbPersonsByUid } from '@/services/cmdb/person';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function PersonUpdateModalForm({
  persionUid,
  initialValues,
  onFinish,
}: {
  persionUid: string;
  initialValues: API.PersonUpdateReq;
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.PersonUpdateReq>();

  return (
    <ModalForm<API.PersonUpdateReq>
      title="编辑人员"
      initialValues={initialValues}
      trigger={<Button type="link">编辑</Button>}
      form={form}
      width={600}
      labelCol={{ span: 4 }}
      layout="horizontal"
      autoFocusFirstInput
      onFinish={async (data) => {
        try {
          const res = await personUpdateApiCmdbPersonsByUid(
            {
              uid: persionUid,
            },
            {
              ...initialValues,
              ...data,
            },
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
        name="PersonId"
        label="人员ID"
        placeholder="请输入人员ID"
        rules={[
          {
            required: true,
            message: '请输入人员ID',
          },
        ]}
      />
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
      <ProFormText name="Email" label="邮箱" placeholder="请输入邮箱" />
      <ProFormText
        name="Mobile"
        label="手机"
        placeholder="请输入手机"
        rules={[
          {
            required: true,
            message: '请输入手机',
          },
        ]}
      />
      <ProFormRadio.Group
        name="Enabled"
        label="状态"
        initialValue={false}
        options={[
          {
            label: '可用',
            value: true,
          },
          { label: '禁用', value: false },
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
