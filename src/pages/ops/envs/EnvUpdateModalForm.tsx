import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import { usePersonOptions } from '@/hooks/options';
import {
  envReadOneApiCmdbEnvsByUid,
  envUpdateApiCmdbEnvsByUid,
} from '@/services/cmdb/env';
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
  const opsPersonOptions = usePersonOptions('运维');
  const qaPersonOptions = usePersonOptions('QA');
  const salePersonOptions = usePersonOptions('销售');
  const supportPersonOptions = usePersonOptions('技术支持');

  return (
    <ModalUpdateForm<
      API.EnvUpdateReq,
      API.envUpdateApiCmdbEnvsByUidParams,
      API.envReadOneApiCmdbEnvsByUidParams
    >
      title="编辑环境"
      width={512}
      trigger={
        <Button
          type="text"
          shape="circle"
          icon={<EditOutlined className="text-green-400" />}
        />
      }
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
          label="环境Id"
          name="EnvId"
          width="sm"
          placeholder=""
          rules={[{ required: true, message: '请输入环境Id' }]}
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

      <ProFormText label="SecretId" name="SecretId" placeholder="" />
      <ProFormText label="SecretKey" name="SecretKey" placeholder="" />

      <ProFormSelect
        mode="multiple"
        allowClear
        label="运维人员"
        name="OpsIds"
        options={opsPersonOptions.selectOptions}
      />
      <ProFormSelect
        mode="multiple"
        allowClear
        label="QA"
        name="QaIds"
        options={qaPersonOptions.selectOptions}
      />
      <ProFormSelect
        mode="multiple"
        allowClear
        label="销售"
        name="SaleIds"
        options={salePersonOptions.selectOptions}
      />
      <ProFormSelect
        mode="multiple"
        allowClear
        label="技术支持"
        name="SupportIds"
        options={supportPersonOptions.selectOptions}
      />
      <ProFormTextArea label="描述" name="Description" placeholder="" />
    </ModalUpdateForm>
  );
}
