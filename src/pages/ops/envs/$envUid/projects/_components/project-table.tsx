import Table, { TableColumns, TableColumnsState } from '@/components/table';
import TableCellActions from '@/components/table-cell-actions';
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_ENV_HEIGHT,
} from '@/constants/table';
import {
  projectDeleteApiCmdbProjectsByUid,
  projectPageListApiCmdbProjects,
} from '@/services/cmdb/project';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { message } from 'antd';
import useModal from 'antd/es/modal/useModal';
import { useRef, useState } from 'react';
import ProjectCreateModalForm from './project-create-modal-form';
import ProjectUpdateModalForm from './project-update-modal-form';

export default function ProjectTable({ envUid }: { envUid: string }) {
  const access = useAccess();
  const [modal, contextHolder] = useModal();
  const tableRef = useRef<ActionType>();

  const [selectedProjectToUpdate, setSelectedProjectToUpdate] = useState<
    CMDB.ProjectInfo | undefined
  >();

  const showDeleteConfirm = (project: CMDB.ProjectInfo) =>
    modal.confirm({
      title: '确定删除项目吗？',
      icon: <ExclamationCircleOutlined />,
      content: `删除项目 ${project.ProjectName}（${project.Project}）`,
      onOk: async () => {
        await projectDeleteApiCmdbProjectsByUid({ uid: project.Uid });
        message.success('删除成功');
        tableRef.current?.reload(false);
      },
    });

  const columnsState: TableColumnsState = {
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<CMDB.ProjectInfo> = [
    {
      title: 'UID',
      dataIndex: 'Uid',
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: 'CustomerID',
      dataIndex: 'CusId',
      copyable: true,
      width: 120,
    },
    {
      title: '项目ID',
      dataIndex: 'Project',
      copyable: true,
      width: 140,
    },
    {
      title: '项目名称',
      dataIndex: 'ProjectName',
      copyable: true,
      sorter: true,
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'ProjectState',
      width: 120,
    },
    {
      title: '销售',
      dataIndex: 'Sale',
      render: (_, row) => row.Sale?.map((item) => item.PersonName).join(','),
      width: 200,
    },
    {
      title: '技术支持',
      dataIndex: 'Support',
      render: (_, row) => row.Support?.map((item) => item.PersonName).join(','),
      width: 200,
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      valueType: 'dateTime',
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: '备注',
      dataIndex: 'Description',
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: '操作',
      key: 'options',
      width: 90,
      fixed: 'right',
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: '编辑',
              onClick: () => setSelectedProjectToUpdate(row),
              disabled: !access.projectUpdateApiCmdbProjectsByUid,
            },
            {
              text: '删除',
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.projectDeleteApiCmdbProjectsByUid,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        name="env-project"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{ EnvUid: envUid }}
        searchPlaceholder="请输入项目ID/名称查询"
        request={projectPageListApiCmdbProjects}
        defaultColumnsState={columnsState}
        scroll={{
          y: TABLE_ENV_HEIGHT,
        }}
        toolbar={{
          actions: [
            <ProjectCreateModalForm
              key="project-create"
              envUid={envUid}
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
      />
      <ProjectUpdateModalForm
        envUid={envUid}
        open={selectedProjectToUpdate !== undefined}
        onCancel={() => setSelectedProjectToUpdate(undefined)}
        project={selectedProjectToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  );
}
