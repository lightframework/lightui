import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import { usePersonOptions } from '@/hooks/options';
import {
  projectReadOneApiCmdbProjectsByUid,
  projectUpdateApiCmdbProjectsByUid,
} from '@/services/cmdb/project';

export default function ProjectUpdateModalForm({
  envUid,
  projectUid,

  onFinish,
}: {
  envUid: string;
  projectUid: string;
  onFinish?: VoidFunction;
}) {
  const salePersonOptions = usePersonOptions('销售');
  const supportPersonOptions = usePersonOptions('技术支持');

  return (
    <ModalUpdateForm<
      API.ProjectUpdateReq,
      API.projectUpdateApiCmdbProjectsByUidParams,
      API.projectReadOneApiCmdbProjectsByUidParams
    >
      title="编辑项目"
      onFinish={onFinish}
      initialParams={{ uid: projectUid }}
      initialRequest={async (params) => {
        const res = await projectReadOneApiCmdbProjectsByUid(params);

        const SaleIds = res.data ? res.data.Sale?.map((item) => item.Uid) : [];
        const SupportIds = res.data
          ? res.data.Support?.map((item) => item.Uid)
          : [];

        return {
          ...res,
          data: { ...res.data, SaleIds, SupportIds },
        };
      }}
      requestParams={{ uid: projectUid }}
      request={projectUpdateApiCmdbProjectsByUid}
      fields={[
        {
          fieldType: 'text',
          name: 'CusId',
          label: 'CusId',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'EnvUid',
          hidden: true,
          initialValue: envUid,
        },
        {
          fieldType: 'text',
          name: 'Project',
          label: '项目Id',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'ProjectName',
          label: '项目名称',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'ProjectState',
          label: '项目状态',
        },
        {
          fieldType: 'select',
          name: 'SaleIds',
          label: '销售',
          options: salePersonOptions.selectOptions,
        },
        {
          fieldType: 'select',
          name: 'SupportIds',
          label: '技术支持',
          options: supportPersonOptions.selectOptions,
        },
      ]}
    />
  );
}
