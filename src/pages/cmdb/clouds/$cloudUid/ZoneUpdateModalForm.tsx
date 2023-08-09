import {
  zoneReadOneApiCmdbZonesByUid,
  zoneUpdateApiCmdbZonesByUid,
} from '@/services/cmdb/zone';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, message } from 'antd';

export default function ZoneUpdateModalForm({
  zoneUid,
  regionUid,
  onFinish,
}: {
  zoneUid: string;
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<API.ZoneUpdateReq, API.zoneReadOneApiCmdbZonesByUidParams>
      title="编辑可用区"
      trigger={<Button type="link">编辑</Button>}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      params={{ uid: zoneUid }}
      request={async (params) => {
        const res = await zoneReadOneApiCmdbZonesByUid(params);
        return res.data!;
      }}
      onFinish={async (data) => {
        try {
          const res = await zoneUpdateApiCmdbZonesByUid({ uid: zoneUid }, data);
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
      <ProFormText name="RegionUid" initialValue={regionUid} hidden />
      <ProFormText
        name="Zone"
        label="可用区ID"
        placeholder=""
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
        placeholder=""
        rules={[
          {
            required: true,
            message: '请输入可用区名称',
          },
        ]}
      />
      <ProFormText name="ZoneState" label="状态" placeholder="" />
    </ModalForm>
  );
}
