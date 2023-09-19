import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { projectPageListApiCmdbProjects } from '@/services/cmdb/project';
import { ActionType } from '@ant-design/pro-components';
import { history, useAccess, useParams } from '@umijs/max';
import { Button, Result } from 'antd';
import { useRef } from 'react';
import ProjectCreateModalForm from './ProjectCreateModalForm';
import ProjectDeleteModalForm from './ProjectDeleteModalForm';
import ProjectUpdateModalForm from './ProjectUpdateModalForm';

export default function EnvProjects() {
  const access = useAccess();
  const params = useParams();
  const envUid = params.envUid!;

  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig = {
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
      width: TABLE_UID_WIDTH,
    },
    {
      title: 'CustomerId',
      key: 'CusId',
      dataIndex: 'CusId',
      copyable: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '项目Id',
      key: 'Project',
      dataIndex: 'Project',
      copyable: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '项目名称',
      key: 'ProjectName',
      dataIndex: 'ProjectName',
      ellipsis: true,
      copyable: true,
      sorter: true,
      width: 200,
    },
    {
      title: '状态',
      key: 'ProjectState',
      dataIndex: 'ProjectState',
      ellipsis: true,
      width: 120,
    },
    {
      title: '销售',
      key: 'Sale',
      dataIndex: 'Sale',
      ellipsis: true,
      render: (_, row) => row.Sale?.map((item) => item.PersonName).join(','),
      width: 200,
    },
    {
      title: '技术支持',
      key: 'Support',
      dataIndex: 'Support',
      ellipsis: true,
      render: (_, row) => row.Support?.map((item) => item.PersonName).join(','),
      width: 200,
    },
    {
      title: '创建者',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      ellipsis: true,
      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '更新者',
      key: 'updateBy',
      dataIndex: 'updateBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '更新时间',
      key: 'updateAt',
      dataIndex: 'updateAt',
      valueType: 'dateTime',
      ellipsis: true,
      width: TABLE_DATETIME_WIDTH,
    },

    {
      title: '操作',
      key: 'options',
      width: 140,
      fixed: 'right',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <ProjectUpdateModalForm
              envUid={envUid}
              projectUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <ProjectDeleteModalForm
              projectUid={row.Uid}
              projectName={row.ProjectName}
              projectId={row.Project}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
    },
  ];

  if (!(access as any).projectPageListApiCmdbProjects) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问项目数据"
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            返回首页
          </Button>
        }
      />
    );
  }

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
          onFinish={() => tableRef.current?.reload(true)}
        />,
      ]}
    />
  );
}
