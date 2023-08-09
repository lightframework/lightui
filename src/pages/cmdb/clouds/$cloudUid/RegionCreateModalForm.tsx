import { RegionCreateApiCmdbRegions } from '@/services/cmdb/region';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, message } from 'antd';

export default function RegionCreateModalForm({
  cloudUid,
  onFinish,
}: {
  cloudUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<API.RegionCreateReq>
      title="创建区域"
      trigger={<Button type="link">新增</Button>}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      autoFocusFirstInput
      onFinish={async (data) => {
        try {
          const res = await RegionCreateApiCmdbRegions(data);
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
      <ProFormText name="CloudUid" initialValue={cloudUid} hidden />
      <ProFormText
        name="Region"
        label="区域ID"
        placeholder=""
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
        placeholder=""
        rules={[
          {
            required: true,
            message: '请输入区域名称',
          },
        ]}
      />
      <ProFormText name="RegionState" label="区域状态" placeholder="" />
    </ModalForm>
  );
}
