import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { usePersonOptions } from '@/lib/hooks';
import { projectUpdateApiCmdbProjectsByUid } from '@/services/cmdb/project';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';

export default function ProjectUpdateModalForm({
  envUid,
  open,
  onCancel,
  project,
  onFinish,
}: {
  envUid: string;
  open: boolean;
  onCancel: VoidFunction;
  project?: CMDB.ProjectInfo;
  onFinish?: VoidFunction;
}) {
  const salePersons = usePersonOptions('销售');
  const supportPersons = usePersonOptions('技术支持');

  return (
    <ModalForm<CMDB.ProjectUpdateReq>
      title="更新项目"
      name="project-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={project}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!project) return false;
        await projectUpdateApiCmdbProjectsByUid({ uid: project.Uid }, formData);
        message.success('更新成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText name="EnvUid" initialValue={envUid} hidden />
      <ProFormText label="CusID" name="CusId" placeholder="" />
      <ProFormText
        label="项目ID"
        name="Project"
        placeholder=""
        rules={[{ required: true, message: '请输入项目ID' }]}
      />
      <ProFormText
        label="项目名称"
        name="ProjectName"
        placeholder=""
        rules={[{ required: true, message: '请输入项目名称' }]}
      />
      <ProFormText label="状态" name="ProjectState" placeholder="" />
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
    </ModalForm>
  );
}
