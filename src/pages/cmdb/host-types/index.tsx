import { hosttypePageListApiCmdbHosttypes } from '@/services/cmdb/hosttype';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import HostTypeCreateModalForm from './HostTypeCreateModalForm';
import HostTypeDeleteModalForm from './HostTypeDeleteModalForm';
import HostTypeUpdateModalForm from './HostTypeUpdateModalForm';

export default function HostType() {
  const tableRef = useRef<ActionType>();

  const reloadTable = () => {
    tableRef.current?.reload();
  };

  const columns: ProColumns<API.HostTypeInfo>[] = [
    {
      key: 'Uid',
      width: 48,
      search: false,
    },
    {
      title: '名称',
      key: 'HostTypeName',
      dataIndex: 'HostTypeName',
      search: { transform: (value: string) => ({ keywords: value }) },
      copyable: true,
      sorter: (a, b) => {
        const aName = a['HostTypeName'];
        const bName = b['HostTypeName'];
        return aName.localeCompare(bName);
      },
      width: '15%',
    },
    {
      title: '规则定义',
      key: 'RuleDefinition',
      dataIndex: 'RuleDefinition',
      ellipsis: true,
      copyable: true,
      search: false,
    },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      ellipsis: true,
      search: false,
      width: '15%',
    },
    {
      title: '备注',
      key: 'Description',
      dataIndex: 'Description',
      ellipsis: true,
      search: false,
    },
    {
      title: '操作',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-5 xl:flex-nowrap">
            <HostTypeUpdateModalForm
              hostTypeUid={row.Uid}
              initialValues={row}
              onFinish={reloadTable}
            />
            <HostTypeDeleteModalForm
              hostTypeUid={row.Uid}
              hostTypeName={row.HostTypeName}
              onFinish={reloadTable}
            />
          </div>
        );
      },
      search: false,
      width: '15%',
    },
  ];

  return (
    <ProTable<API.HostTypeInfo, API.hosttypePageListApiCmdbHosttypesParams>
      actionRef={tableRef}
      columns={columns}
      rowKey="Uid"
      request={async (params) => {
        const res = await hosttypePageListApiCmdbHosttypes(params);
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
        <HostTypeCreateModalForm
          key="host-type-create"
          onFinish={reloadTable}
        />,
      ]}
    />
  );
}
