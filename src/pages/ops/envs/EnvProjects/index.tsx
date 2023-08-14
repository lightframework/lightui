import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { projectPageListApiCmdbProjects } from '@/services/cmdb/project';
import { usePersonOptions, useTitle } from '@/utils/hooks';
import { sorter } from '@/utils/sorter';
import { useRef } from 'react';
import ProjectCreateModalForm from './ProjectCreateModalForm';
import ProjectDeleteModalForm from './ProjectDeleteModalForm';
import ProjectUpdateModalForm from './ProjectUpdateModalForm';

export default function EnvProjects({ envUid }: { envUid: string }) {
  useTitle('项目列表', { shift: true });

  const salePersonOptions = usePersonOptions('销售', { refreshDeps: [envUid] });
  const supportPersonOptions = usePersonOptions('技术支持', {
    refreshDeps: [envUid],
  });

  const tableRef = useRef<LightTableAction>();

  const columns: LightColumnsType<API.ProjectInfo> = [
    {
      title: 'CustomerID',
      key: 'CusId',
      dataIndex: 'CusId',
      copyAble: true,
    },
    {
      title: '项目ID',
      key: 'ProjectId',
      dataIndex: 'ProjectId',
      copyAble: true,
      ellipsis: true,
    },
    {
      title: '项目名称',
      key: 'ProjectName',
      dataIndex: 'ProjectName',
      ellipsis: true,
      copyAble: true,
      sorter: (a, b) => sorter(a, b, 'ProjectName'),
    },
    {
      title: '销售',
      key: 'Sale',
      dataIndex: 'Sale',
      ellipsis: true,
      render: (value: API.ProjectInfo['Sale']) =>
        value?.map((item) => item.PersonName).join(','),
    },
    {
      title: '技术支持',
      key: 'Support',
      dataIndex: 'Support',
      ellipsis: true,
      render: (value: API.ProjectInfo['Support']) =>
        value?.map((item) => item.PersonName).join(','),
    },
    {
      title: '状态',
      key: 'ProjectState',
      dataIndex: 'ProjectState',
      width: 60,
    },
    {
      title: '接入时间',
      key: 'createAt',
      dataIndex: 'createAt',
      ellipsis: true,
      render: (value) => new Date(value).toLocaleString(),
      sorter: (a, b) => sorter(a, b, 'createAt', { valueType: 'dateTime' }),
    },

    {
      title: '操作',
      className: 'xl:w-[140px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <ProjectUpdateModalForm
              envUid={envUid}
              projectUid={row.Uid}
              salePersonOptions={salePersonOptions}
              supportPersonOptions={supportPersonOptions}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <ProjectDeleteModalForm
              projectUid={row.Uid}
              projectName={row.ProjectName}
              projectId={row.ProjectId}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
    },
  ];

  const queryColumns: QueryColumn[] = [
    {
      type: 'text',
      name: 'keywords',
      itemWidth: 300,
      placeholder: '请输入项目ID/项目名称搜索',
    },
  ];

  return (
    <LightTable<API.ProjectInfo, API.projectPageListApiCmdbProjectsParams>
      ref={tableRef}
      key={envUid}
      rowKey="Uid"
      search
      params={{
        EnvUid: envUid,
      }}
      queryColumns={queryColumns}
      request={projectPageListApiCmdbProjects}
      columns={columns}
      buttonRender={
        <ProjectCreateModalForm
          envUid={envUid}
          salePersonOptions={salePersonOptions}
          supportPersonOptions={supportPersonOptions}
          onFinish={() => tableRef.current?.reload(true)}
        />
      }
    />
  );
}
