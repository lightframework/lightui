import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { MOBILE_REGEX } from '@/constants/regex';
import { personUpdateApiCmdbPersonsByUid } from '@/services/cmdb/person';
import { professionOptionsApiCmdbProfessionsOptions } from '@/services/cmdb/profession';
import {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';

export default function PersonUpdateModalForm({
  open,
  onCancel,
  person,
  onFinish,
}: {
  open: boolean;
  onCancel: VoidFunction;
  person?: CMDB.PersonInfo;
  onFinish?: VoidFunction;
}) {
  const { data: professionOptions } = useQuery({
    queryKey: ['profession-options'],
    queryFn: () =>
      professionOptionsApiCmdbProfessionsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  });

  return (
    <ModalForm<CMDB.PersonUpdateReq>
      title="更新人员"
      name="person-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onCancel();
        }
      }}
      initialValues={{
        ...person,
        ProfessionIds: person?.Professions?.map((profession) => profession.Uid),
      }}
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!person) return false;
        await personUpdateApiCmdbPersonsByUid({ uid: person.Uid }, formData);
        message.success('更新成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText
        label="人员ID"
        name="PersonId"
        placeholder=""
        rules={[{ required: true, message: '请输入人员ID' }]}
      />
      <ProFormText
        label="人员名称"
        name="PersonName"
        placeholder=""
        rules={[{ required: true, message: '请输入人员名称' }]}
      />
      <ProFormText
        label="邮箱"
        name="Email"
        placeholder=""
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '邮箱格式不正确' },
        ]}
      />
      <ProFormText
        label="联系电话"
        name="Mobile"
        placeholder=""
        rules={[
          { required: true, message: '请输入联系电话' },
          { pattern: MOBILE_REGEX, message: '联系电话格式不正确' },
        ]}
      />
      <ProFormSwitch label="状态" name="Enabled" placeholder="" />
      <ProFormSelect
        mode="multiple"
        showSearch
        label="部门"
        name="ProfessionIds"
        options={
          professionOptions?.map((profession) => ({
            label: profession.ProfessionName,
            value: profession.Uid,
          })) ?? []
        }
        rules={[
          {
            required: true,
            message: '请选择至少一个部门',
          },
        ]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
