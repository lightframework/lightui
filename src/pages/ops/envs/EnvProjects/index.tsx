import { projectPageListApiCmdbProjects } from '@/services/cmdb/project';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';
import ProjectUpdateModalForm from './ProjectUpdateModalForm';

export default function EnvProjects({ envUid }: { envUid: string }) {
  const tableRef = useRef<ActionType>();

  const reloadTable = () => {
    tableRef.current?.reload();
  };

  const columns: ProColumns<API.ProjectInfo>[] = [
    {
      key: 'Uid',
      width: 48,
      search: false,
    },
    {
      title: '项目ID',
      search: false,
      key: 'ProjectId',
      dataIndex: 'ProjectId',
      width: '15%',
      copyable: true,
    },
    {
      title: '项目名称',
      key: 'ProjectName',
      dataIndex: 'ProjectName',
      width: '20%',
      copyable: true,
      sorter: (a, b) => {
        const aName = a['ProjectName'];
        const bName = b['ProjectName'];
        return aName.localeCompare(bName);
      },
    },
    {
      title: '接入时间',
      key: 'createAt',
      dataIndex: 'createAt',
      search: false,
      valueType: 'dateTime',
      sorter: (a, b) => {
        const aTime = new Date(a['createAt']).getTime();
        const bTime = new Date(b['createAt']).getTime();
        return aTime - bTime;
      },
      width: '20%',
    },
    {
      title: '状态',
      key: 'ProjectState',
      dataIndex: 'ProjectState',
      search: false,
    },
    {
      title: '操作',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-2 xl:flex-nowrap">
            <Button type="link">详情</Button>
            <ProjectUpdateModalForm
              projectUid={row.Uid}
              initialValues={{
                ...row,
                EnvUid: envUid,
              }}
              onFinish={reloadTable}
            />
            <Button type="link">日志</Button>
            {/* <HostTypeUpdateModalForm
              hostTypeUid={row.Uid}
              initialValues={row}
              onFinish={reloadTable}
            />
            <HostTypeDeleteModalForm
              hostTypeUid={row.Uid}
              hostTypeName={row.HostTypeName}
              onFinish={reloadTable}
            /> */}
          </div>
        );
      },
      search: false,
      width: '20%',
    },
  ];

  return (
    <ProTable<API.ProjectInfo, API.projectPageListApiCmdbProjectsParams>
      actionRef={tableRef}
      key={envUid}
      columns={columns}
      rowKey="Uid"
      request={async (params) => {
        const res = await projectPageListApiCmdbProjects({
          ...params,
          EnvUid: envUid,
        });
        return {
          success: res.msg === 'OK',
          data: res.data?.list,
          total: res.data?.total,
        };
      }}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        defaultPageSize: 10,
      }}
    />
  );
}
