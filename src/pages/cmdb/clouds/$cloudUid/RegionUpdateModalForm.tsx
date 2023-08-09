import {
  regionReadOneApiCmdbRegionsByUid,
  regionUpdateApiCmdbRegionsByUid,
} from '@/services/cmdb/region';
import { EditOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { AxiosError, useParams } from '@umijs/max';
import { Button, message } from 'antd';

export default function RegionUpdateModalForm({
  regionUid,
  onFinish,
}: {
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  const { cloudUid } = useParams();

  return (
    <ModalForm<API.RegionUpdateReq, API.regionReadOneApiCmdbRegionsByUidParams>
      title="编辑可用区"
      trigger={<Button type="text" shape="circle" icon={<EditOutlined />} />}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      params={{ uid: regionUid }}
      request={async (params) => {
        const res = await regionReadOneApiCmdbRegionsByUid(params);
        return res.data!;
      }}
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
      <ProFormText name="RegionState" label="状态" placeholder="" />
    </ModalForm>
  );
}
