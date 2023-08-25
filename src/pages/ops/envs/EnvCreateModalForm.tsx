import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { usePersonOptions } from '@/hooks/options';
import { EnvCreateApiCmdbEnvs } from '@/services/cmdb/env';

import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button } from 'antd';

export default function EnvCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const opsPersonOptions = usePersonOptions('运维');
  const qaPersonOptions = usePersonOptions('QA');
  const salePersonOptions = usePersonOptions('销售');
  const supportPersonOptions = usePersonOptions('技术支持');

  return (
    <ModalCreateForm<API.EnvCreateReq>
      title="创建环境"
      width={512}
      onFinish={onFinish}
      trigger={<Button type="link">新增</Button>}
      request={EnvCreateApiCmdbEnvs}
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
        <ProFormText
          label="域名"
          name="DomainName"
          width="sm"
          placeholder=""
          rules={[{ required: true, message: '请输入域名' }]}
        />
        <ProFormText
          label="API域名"
          name="ApiDomainName"
          width="sm"
          placeholder=""
          rules={[{ required: true, message: '请输入API域名' }]}
        />
      </ProForm.Group>

      <ProFormText label="SecretId" name="SecretId" placeholder="" />
      <ProFormText label="SecretKey" name="SecretKey" placeholder="" />

      <ProFormSelect
        mode="multiple"
        allowClear
        label="运维"
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
    </ModalCreateForm>
  );
}
