import { projectUpdateApiCmdbProjectsByUid } from '@/services/cmdb/project';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function ProjectUpdateModalForm({
  projectUid,
  initialValues,
  onFinish,
}: {
  projectUid: string;
  initialValues: API.ProjectUpdateReq;
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.ProjectUpdateReq>();

  return (
    <ModalForm<API.ProjectUpdateReq>
      title="编辑项目"
      trigger={<Button type="link">配置</Button>}
      form={form}
      width={600}
      labelCol={{ span: 4 }}
      initialValues={initialValues}
      layout="horizontal"
      onFinish={async (data) => {
        try {
          const res = await projectUpdateApiCmdbProjectsByUid(
            { uid: projectUid },
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
      <ProFormText name="EnvUid" hidden />
      <ProFormText
        name="ProjectId"
        label="ID"
        placeholder="请输入项目ID"
        rules={[
          {
            required: true,
            message: '请输入项目ID',
          },
        ]}
      />
      <ProFormText
        name="ProjectName"
        label="名称"
        placeholder="请输入项目名称"
        rules={[
          {
            required: true,
            message: '请输入项目名称',
          },
        ]}
      />
      <ProFormText
        name="ProjectState"
        label="项目状态"
        placeholder="请输入项目状态"
        rules={[
          {
            required: true,
            message: '请输入项目状态',
          },
        ]}
      />
      <ProFormSelect
        label="销售"
        name="SaleIds"
        mode="multiple"
        allowClear
        options={[
          {
            label: '3131',
            value: '1231',
          },
          {
            label: 'test',
            value: 'test',
          },
        ]}
      />
      <ProFormSelect
        label="技术支持"
        name="SupportIds"
        mode="multiple"
        allowClear
        options={[
          {
            label: '3131',
            value: '1231',
          },
          {
            label: 'test',
            value: 'test',
          },
        ]}
      />
    </ModalForm>
  );
}
