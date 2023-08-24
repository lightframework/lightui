import StatusTag from '@/components/ui/StatusTag';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_EMAIL_WIDTH,
  TABLE_MOBILE_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { personPageListApiCmdbPersons } from '@/services/cmdb/person';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import PersonCreateModalForm from './PersonCreateModalForm';
import PersonDeleteModalForm from './PersonDeleteModalForm';
import PersonUpdateModalForm from './PersonUpdateModalForm';

export default function PersonTable({
  professionUid,
}: {
  professionUid: string;
}) {
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig<API.PersonInfo> = {
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<API.PersonInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      width: TABLE_UID_WIDTH,
    },
    {
      title: '人员Id',
      key: 'PersonId',
      dataIndex: 'PersonId',
      ellipsis: true,
      copyable: true,
      width: 140,
    },
    {
      title: '姓名',
      key: 'PersonName',
      dataIndex: 'PersonName',
      ellipsis: true,
      copyable: true,
      sorter: true,
      width: 200,
    },
    {
      title: '邮箱',
      key: 'Email',
      dataIndex: 'Email',
      ellipsis: true,
      copyable: true,
      width: TABLE_EMAIL_WIDTH,
    },
    {
      title: '联系电话',
      key: 'Mobile',
      dataIndex: 'Mobile',
      ellipsis: true,
      copyable: true,
      width: TABLE_MOBILE_WIDTH,
    },
    {
      title: '状态',
      key: 'Enabled',
      dataIndex: 'Enabled',
      width: 70,
      render: (_, row) => (
        <StatusTag content={row.Enabled ? '可用' : '禁用'} positive="可用" />
      ),
    },
    {
      title: '类型',
      key: 'Professions',
      dataIndex: 'Professions',
      ellipsis: true,
      render: (_, row) =>
        row.Professions?.map((pro) => pro.ProfessionName).join(','),
      width: 240,
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
      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '备注',
      key: 'Description',
      dataIndex: 'Description',
      ellipsis: true,
      width: TABLE_DESC_WIDTH,
    },
    {
      title: '操作',
      width: 140,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <PersonUpdateModalForm
              personUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <PersonDeleteModalForm
              personUid={row.Uid}
              personName={row.PersonName}
              personId={row.PersonId}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Table<API.PersonInfo, API.personPageListApiCmdbPersonsParams>
      title="persons"
      actionRef={tableRef}
      rowKey="Uid"
      columns={columns}
      search="请输入姓名/邮箱/电话搜索"
      params={{
        ProfessionUid: professionUid,
      }}
      request={personPageListApiCmdbPersons}
      columnsConfig={columnsConfig}
      toolBarRender={() => [
        <PersonCreateModalForm
          key="profession-person-create"
          professionUid={professionUid}
          onFinish={() => tableRef.current?.reload()}
        />,
      ]}
    />
  );
}
