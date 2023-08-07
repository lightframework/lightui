import { PersonCreateApiCmdbPersons } from '@/services/cmdb/person';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function PersonCreateModalForm({
  professionUid,
  onFinish,
}: {
  professionUid: string;
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.PersonCreateReq>();

  return (
    <ModalForm<API.PersonCreateReq>
      title="增加人员"
      trigger={<Button type="primary">增加</Button>}
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
          // TODO: 人员添加到指定团队
          const res = await PersonCreateApiCmdbPersons({
            ...data,
            ProfessionIds: [professionUid],
          });
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
