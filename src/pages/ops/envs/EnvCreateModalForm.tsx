import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { EnvCreateApiCmdbEnvs } from '@/services/cmdb/env';
import { usePersonOptions } from '@/utils/hooks';
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
  const opsPersonOptions = usePersonOptions('运维人员');
  const qaPersonOptions = usePersonOptions('QA');
  const salePersonOptions = usePersonOptions('销售');
  const supportPersonOption = usePersonOptions('技术支持');

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
    </ModalCreateForm>
  );
}
