import PageContainer from '@/components/ui/PageContainer';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { hosttypePageListApiCmdbHosttypes } from '@/services/cmdb/hosttype';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import HostTypeCreateModalForm from './HostTypeCreateModalForm';
import HostTypeDeleteModalForm from './HostTypeDeleteModalForm';
import HostTypeUpdateModalForm from './HostTypeUpdateModalForm';

export default function HostType() {
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig<API.HostTypeInfo> = {
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<API.HostTypeInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      copyable: true,
    },
    {
      title: '主机类型名称',
      key: 'HostTypeName',
      dataIndex: 'HostTypeName',
      copyable: true,
      sorter: (a, b) => sorter(a, b, 'HostTypeName'),
    },
    {
      title: '规则定义',
      key: 'RuleDefinition',
      dataIndex: 'RuleDefinition',
      ellipsis: true,
      copyable: true,
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
            <HostTypeUpdateModalForm
              hostTypeUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <HostTypeDeleteModalForm
              hostTypeUid={row.Uid}
              hostTypeName={row.HostTypeName}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Table<API.HostTypeInfo>
        title="host-types"
        actionRef={tableRef}
        rowKey="Uid"
        columns={columns}
        search="请输入主机类型名称搜索"
        request={hosttypePageListApiCmdbHosttypes}
        columnsConfig={columnsConfig}
        toolBarRender={() => [
          <HostTypeCreateModalForm
            key="hosttype-create"
            onFinish={() => tableRef.current?.reload()}
          />,
        ]}
      />
    </PageContainer>
  );
}
