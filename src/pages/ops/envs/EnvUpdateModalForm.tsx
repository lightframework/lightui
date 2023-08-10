import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  envReadOneApiCmdbEnvsByUid,
  envUpdateApiCmdbEnvsByUid,
} from '@/services/cmdb/env';
import { usePersonsOptions } from '@/utils/hooks';
import { EditOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button } from 'antd';

export default function EnvUpdateModalForm({
  envUid,
  onFinish,
}: {
  envUid: string;
  onFinish?: VoidFunction;
}) {
  const opsPersonOptions = usePersonsOptions('运维人员');
  const qaPersonOptions = usePersonsOptions('QA');
  const salePersonOptions = usePersonsOptions('销售');
  const supportPersonOption = usePersonsOptions('技术支持');

  return (
    <ModalUpdateForm<
      API.EnvUpdateReq,
      API.envUpdateApiCmdbEnvsByUidParams,
      API.envReadOneApiCmdbEnvsByUidParams
    >
      title="环境"
      width={512}
      trigger={<Button type="text" shape="circle" icon={<EditOutlined />} />}
      onFinish={onFinish}
      initialParams={{ uid: envUid }}
      initialRequest={async (params) => {
        const res = await envReadOneApiCmdbEnvsByUid(params);

        const OpsIds = res.data ? res.data.Ops?.map((item) => item.Uid) : [];
        const QaIds = res.data ? res.data.Qa?.map((item) => item.Uid) : [];
        const SaleIds = res.data ? res.data.Sale?.map((item) => item.Uid) : [];
        const SupportIds = res.data
          ? res.data.Support?.map((item) => item.Uid)
          : [];

        return {
          ...res,
          data: { ...res.data, OpsIds, QaIds, SaleIds, SupportIds },
        };
      }}
      requestParams={{ uid: envUid }}
      request={envUpdateApiCmdbEnvsByUid}
    >
      <ProForm.Group>
        <ProFormText
          label="环境ID"
          name="EnvId"
          width="sm"
          placeholder=""
          rules={[{ required: true, message: '请输入环境ID' }]}
        />
        <ProFormText
          label="环境名称"
          name="EnvName"
          width="sm"
          placeholder=""
          rules={[{ required: true, message: '请输入环境名称' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText label="域名" name="DomainName" width="sm" placeholder="" />
        <ProFormText
          label="API域名"
          name="ApiDomainName"
          width="sm"
          placeholder=""
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          label="SecretId"
          name="SecretId"
          width="sm"
          placeholder=""
        />
        <ProFormText
          label="SecretKey"
          name="SecretKey"
          width="sm"
          placeholder=""
        />
      </ProForm.Group>
      <ProFormSelect
        mode="multiple"
        allowClear
        label="运维人员"
        name="OpsIds"
        options={opsPersonOptions}
      />
      <ProFormSelect
        mode="multiple"
        allowClear
        label="QA"
        name="QaIds"
        options={qaPersonOptions}
      />
      <ProFormSelect
        mode="multiple"
        allowClear
        label="销售"
        name="SaleIds"
        options={salePersonOptions}
      />
      <ProFormSelect
        mode="multiple"
        allowClear
        label="技术支持"
        name="SupportIds"
        options={supportPersonOption}
      />
      <ProFormTextArea label="描述" name="Description" placeholder="" />
    </ModalUpdateForm>
  );
}
