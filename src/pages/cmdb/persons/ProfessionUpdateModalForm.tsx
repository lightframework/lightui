import { professionUpdateApiCmdbProfessionsByUid } from '@/services/cmdb/profession';
import { EditOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function ProfessionUpdateModalForm({
  professionUid,
  initialValues,
  onFinish,
}: {
  professionUid: string;
  initialValues: API.ProfessionUpdateReq;
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.ProfessionUpdateReq>();

  console.log(initialValues);

  return (
    <ModalForm<API.ProfessionUpdateReq>
      title="编辑团队"
      trigger={<Button type="text" shape="circle" icon={<EditOutlined />} />}
      form={form}
      width={600}
      modalProps={{
        destroyOnClose: true,
      }}
      initialValues={initialValues}
      labelCol={{ span: 4 }}
      layout="horizontal"
      onFinish={async (data) => {
        try {
          const res = await professionUpdateApiCmdbProfessionsByUid(
            { uid: professionUid },
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
