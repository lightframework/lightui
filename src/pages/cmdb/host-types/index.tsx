import { hostTypePageListApiCmdbHosttypes } from '@/services/cmdb/hostType';
import { userPageListApiSysUsers } from '@/services/sys/user';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import HostTypeAddModalForm from './HostTypeAddModalForm';

type HostTypeInfo = Required<API.HostTypeInfo>['data'];

export default function HostTypes() {
  const tableRef = useRef<ActionType>();

  const reloadTable = () => {
    tableRef.current?.reload();
  };

  const columns: ProColumns<HostTypeInfo>[] = [
    {
      key: 'uid',
      width: 48,
      search: false,
    },
    {
      title: '主机类型',
      key: 'HostType',
      dataIndex: 'HostType',
    },
    {
      title: '命名规则',
      key: 'NamingRule',
      dataIndex: 'NamingRule',
      search: false,
    },
    {
      title: '规则定义',
      key: 'RuleDefinition',
      dataIndex: 'RuleDefinition',
      search: false,
    },
    {
      title: '描述',
      key: 'Description',
      dataIndex: 'Description',
      search: false,
    },
  ];

  userPageListApiSysUsers({}).then((res) => console.log(res));

  return (
    <ProTable<HostTypeInfo, API.hostTypePageListApiCmdbHosttypesParams>
      actionRef={tableRef}
      columns={columns}
      rowKey="uid"
      request={async (params) => {
        const res = await hostTypePageListApiCmdbHosttypes(params);
        return {
          success: res.msg === 'OK',
          data: res.data?.data?.data?.list as any,
          total: res.data?.data?.data?.total,
        };
      }}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        defaultPageSize: 10,
      }}
      toolBarRender={() => [
        <HostTypeAddModalForm key="cloud-create" onFinish={reloadTable} />,
      ]}
    />
  );
}
