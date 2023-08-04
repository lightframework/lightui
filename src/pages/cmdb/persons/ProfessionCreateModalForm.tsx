import { professionCreateApiCmdbProfessions } from '@/services/cmdb/profession';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function ProfessionCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.ProfessionCreateReq>();

  return (
    <ModalForm<API.ProfessionCreateReq>
      title="新建团队"
      trigger={<Button type="link">新建团队</Button>}
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
          const res = await professionCreateApiCmdbProfessions(data);
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
        name="ProfessionId"
        label="团队ID"
        placeholder="请输入团队ID"
        rules={[
          {
            required: true,
            message: '请输入团队ID',
          },
        ]}
      />
      <ProFormText
        name="ProfessionName"
        label="团队名称"
        placeholder="请输入团队名称"
        rules={[
          {
            required: true,
            message: '请输入团队名称',
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
