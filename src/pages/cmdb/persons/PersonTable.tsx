import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { personPageListApiCmdbPersons } from '@/services/cmdb/person';
import { sorter } from '@/utils/sorter';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import PersonCreateModalForm from './PersonCreateModalForm';
import PersonDeleteModalForm from './PersonDeleteModalForm';
import PersonUpdateModalForm from './PersonUpdateModalForm';

export default function PersonTable({
  professionUid,
  professionOptions,
}: {
  professionUid: string;
  professionOptions: { label: string; value: string }[];
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
      copyable: true,
    },
    {
      title: '人员ID',
      key: 'PersonId',
      dataIndex: 'PersonId',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '姓名',
      key: 'PersonName',
      dataIndex: 'PersonName',
      ellipsis: true,
      copyable: true,
      sorter: (a, b) => sorter(a, b, 'PersonName'),
    },
    {
      title: '邮箱',
      key: 'Email',
      dataIndex: 'Email',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '联系电话',
      key: 'Mobile',
      dataIndex: 'Mobile',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '状态',
      key: 'Enabled',
      dataIndex: 'Enabled',
      width: 50,
      render: (_, row) =>
        row.Enabled ? (
          <CheckCircleOutlined className="text-green-400" />
        ) : (
          <CloseCircleOutlined className="text-red-400" />
        ),
    },
    {
      title: '类型',
      key: 'Professions',
      dataIndex: 'Professions',
      ellipsis: true,
      render: (_, row) =>
        row.Professions?.map((pro) => pro.ProfessionName).join(','),
    },
    {
      title: '创建者',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
    },
    {
      title: '创建日期',
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
      title: '更新日期',
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
      title: '备注',
      key: 'Description',
      dataIndex: 'Description',
      ellipsis: true,
    },
    {
      title: '操作',
      className: 'xl:w-[140px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <PersonUpdateModalForm
              personUid={row.Uid}
              professionOptions={professionOptions}
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
          professionOptions={professionOptions}
          onFinish={() => tableRef.current?.reload()}
        />,
      ]}
    />
  );
}
