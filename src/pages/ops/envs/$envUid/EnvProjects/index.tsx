import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { projectPageListApiCmdbProjects } from '@/services/cmdb/project';
import { usePersonOptions } from '@/utils/hooks';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { useRef } from 'react';
import ProjectCreateModalForm from './ProjectCreateModalForm';
import ProjectDeleteModalForm from './ProjectDeleteModalForm';
import ProjectUpdateModalForm from './ProjectUpdateModalForm';

export default function EnvProjects() {
  const params = useParams();
  const envUid = params.envUid!;

  const salePersonOptions = usePersonOptions('销售', { refreshDeps: [envUid] });
  const supportPersonOptions = usePersonOptions('技术支持', {
    refreshDeps: [envUid],
  });

  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig<API.ProjectInfo> = {
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<API.ProjectInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      copyable: true,
    },
    {
      title: 'CustomerID',
      key: 'CusId',
      dataIndex: 'CusId',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '项目ID',
      key: 'ProjectId',
      dataIndex: 'ProjectId',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '项目名称',
      key: 'ProjectName',
      dataIndex: 'ProjectName',
      ellipsis: true,
      copyable: true,
      sorter: (a, b) => sorter(a, b, 'ProjectName'),
    },
    {
      title: '销售',
      key: 'Sale',
      dataIndex: 'Sale',
      ellipsis: true,
      render: (_, row) => row.Sale?.map((item) => item.PersonName).join(','),
    },
    {
      title: '技术支持',
      key: 'Support',
      dataIndex: 'Support',
      ellipsis: true,
      render: (_, row) => row.Support?.map((item) => item.PersonName).join(','),
    },
    {
      title: '创建者',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
    },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      ellipsis: true,
      sorter: (a, b) =>
        sorter(a, b, 'createAt', {
          valueType: 'dateTime',
        }),
    },
    {
      title: '更新者',
      key: 'updateBy',
      dataIndex: 'updateBy',
      ellipsis: true,
    },
    {
      title: '更新时间',
      key: 'updateAt',
      dataIndex: 'updateAt',
      valueType: 'dateTime',
      ellipsis: true,
      sorter: (a, b) =>
        sorter(a, b, 'updateAt', {
          valueType: 'dateTime',
        }),
    },
    {
      title: '状态',
      key: 'ProjectState',
      dataIndex: 'ProjectState',
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

  return (
    <Table<API.ProjectInfo, API.projectPageListApiCmdbProjectsParams>
      title="env-projects"
      actionRef={tableRef}
      key={envUid}
      rowKey="Uid"
      columns={columns}
      search="请输入项目ID/项目名称搜索"
      params={{
        EnvUid: envUid,
      }}
      request={projectPageListApiCmdbProjects}
      columnsConfig={columnsConfig}
      toolBarRender={() => [
        <ProjectCreateModalForm
          key="env-project-create"
          envUid={envUid}
          salePersonOptions={salePersonOptions}
          supportPersonOptions={supportPersonOptions}
          onFinish={() => tableRef.current?.reload(true)}
        />,
      ]}
    />
  );
}
