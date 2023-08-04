import { personPageListApiCmdbPersons } from '@/services/cmdb/person';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import PersonCreateModalForm from './PersonCreateModalForm';
import PersonDeleteModalForm from './PersonDeleteModalForm';
import PersonUpdateModalForm from './PersonUpdateModalForm';

export default function PersonTable({
  professionUid,
  professionId,
}: {
  professionUid: string;
  professionId: string;
}) {
  const tableRef = useRef<ActionType>();

  const reloadTable = () => {
    tableRef.current?.reload();
  };

  const columns: ProColumns<API.PersonInfo>[] = [
    {
      key: 'Uid',
      width: 48,
      search: false,
    },
    {
      title: '用户名',
      key: 'PersonName',
      dataIndex: 'PersonName',
      search: { transform: (value: string) => ({ keywords: value }) },
      copyable: true,
      sorter: (a, b) => {
        const aName = a['PersonName'];
        const bName = b['PersonName'];
        return aName.localeCompare(bName);
      },
    },
    {
      title: '邮箱',
      key: 'Email',
      dataIndex: 'Email',
      ellipsis: true,
      copyable: true,
      search: false,
      sorter: (a, b) => {
        const aName = a['Email'];
        const bName = b['Email'];
        return aName.localeCompare(bName);
      },
    },
    {
      title: '手机',
      key: 'Mobile',
      dataIndex: 'Mobile',
      copyable: true,
      search: false,
    },
    {
      title: '状态',
      key: 'Enabled',
      dataIndex: 'Enabled',
      search: false,
      render: (value) => {
        if (!value) {
          return <span className="text-gray-400">不可用</span>;
        }

        return <span className="text-green-400">可用</span>;
      },
    },
    {
      title: '操作',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-5 xl:flex-nowrap">
            <PersonUpdateModalForm
              persionUid={row.Uid}
              initialValues={row}
              onFinish={reloadTable}
            />
            <PersonDeleteModalForm
              personUid={row.Uid}
              personName={row.PersonName}
              personId={row.PersonId}
              onFinish={reloadTable}
            />
          </div>
        );
      },
      search: false,
    },
  ];

  console.log(professionUid);

  return (
    <ProTable<API.PersonInfo, API.personPageListApiCmdbPersonsParams>
      key={professionUid}
      actionRef={tableRef}
      columns={columns}
      rowKey="Uid"
      request={async (params) => {
        const res = await personPageListApiCmdbPersons({
          ProfessionUid: professionUid,
          ...params,
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
      toolBarRender={() => [
        <PersonCreateModalForm
          key="person-create"
          professionId={professionId}
          onFinish={reloadTable}
        />,
      ]}
    />
  );
}
