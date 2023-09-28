import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { usePersonOptions } from '@/lib/hooks';
import {
  envReadOneApiCmdbEnvsByUid,
  envUpdateApiCmdbEnvsByUid,
} from '@/services/cmdb/env';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';

function isEnvOption(
  env: CMDB.EnvInfo | CMDB.EnvOption | undefined,
): env is CMDB.EnvOption {
  return env !== undefined && !('DomainName' in env);
}

export default function EnvUpdateModalForm({
  open,
  onCancel,
  env,
  onFinish,
}: {
  open: boolean;
  onCancel: VoidFunction;
  env?: CMDB.EnvInfo | CMDB.EnvOption;
  onFinish?: VoidFunction;
}) {
  const opsPersons = usePersonOptions('运维');
  const qaPersons = usePersonOptions('QA');
  const salePersons = usePersonOptions('销售');
  const supportPersons = usePersonOptions('技术支持');

  return (
    <ModalForm<CMDB.EnvUpdateReq>
      title="更新环境"
      name="env-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      request={
        isEnvOption(env)
          ? async () => {
              const data = await envReadOneApiCmdbEnvsByUid({
                uid: env.Uid,
              }).then((res) => res.data);
              if (data) {
                return {
                  ...data,
                  OpsIds: data.Ops?.map((person) => person.Uid),
                  SupportIds: data.Support?.map((person) => person.Uid),
                  SaleIds: data.Sale?.map((person) => person.Uid),
                  QaIds: data.Qa?.map((person) => person.Uid),
                };
              } else {
                return {};
              }
            }
          : undefined
      }
      initialValues={isEnvOption(env) ? undefined : env}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!env) return false;
        await envUpdateApiCmdbEnvsByUid({ uid: env.Uid }, formData);
        message.success('更新成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText
        label="环境ID"
        name="EnvId"
        placeholder=""
        rules={[{ required: true, message: '请输入环境ID' }]}
      />
      <ProFormText
        label="环境Key"
        name="EnvKey"
        placeholder=""
        rules={[{ required: true, message: '请输入环境Key' }]}
      />
      <ProFormText
        label="环境名称"
        name="EnvName"
        placeholder=""
        rules={[{ required: true, message: '请输入环境名称' }]}
      />
      <ProFormText
        label="官网链接"
        name="DomainName"
        placeholder=""
        rules={[
          { required: true, message: '请输入官网链接' },
          {
            type: 'url',
            warningOnly: true,
          },
        ]}
      />
      <ProFormText
        label="API链接"
        name="ApiDomainName"
        placeholder=""
        rules={[
          { required: true, message: '请输入API链接' },
          {
            type: 'url',
            warningOnly: true,
          },
        ]}
      />
      <ProFormText label="SecretId" name="SecretId" placeholder="" />
      <ProFormText label="SecretKey" name="SecretKey" placeholder="" />
      <ProFormSelect
        label="运维"
        name="OpsIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={opsPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormSelect
        label="QA"
        name="QaIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={qaPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormSelect
        label="销售"
        name="SaleIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={salePersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormSelect
        label="技术支持"
        name="SupportIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={supportPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
