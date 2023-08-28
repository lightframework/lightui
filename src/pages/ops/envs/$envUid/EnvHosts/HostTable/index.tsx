import AddHostModalForm from '@/components/host/AddHostModalForm';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { useEnvList } from '@/contexts/list-data-context';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

type HostInfo = {
  Uid: string;
  Hostname: string;
  PublicIP: string;
  PrivateIP: string;
  Config: string;
  Cloud: string;
  PaymentMethod: string;
  ExpireDate: string;
};

export default function HostTable() {
  const { selectedItem: env } = useEnvList();

  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig = {
    Uid: { show: false },
  };

  const columns: TableColumns<HostInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      ellipsis: true,
    },
    {
      title: '主机名',
      key: 'Hostname',
      dataIndex: 'Hostname',
      ellipsis: true,
      copyable: true,
      sorter: true,
    },
    {
      title: '公网IP',
      key: 'PublicIP',
      dataIndex: 'PublicIP',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '私网IP',
      key: 'PrivateIP',
      dataIndex: 'PrivateIP',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '配置',
      key: 'Config',
      dataIndex: 'Config',
      ellipsis: true,
    },
    {
      title: '云商/付费方式',
      key: 'cloud/payment',
      ellipsis: true,
      render: (_, row) => `${row.Cloud}/${row.PaymentMethod}`,
    },
    {
      title: '到期时间',
      key: 'ExpireDate',
      dataIndex: 'ExpireDate',
      ellipsis: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'options',
      className: 'xl:w-[200px]',
      render: () => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button type="link">详情</Button>
            <Button type="link">配置</Button>
            <Button type="link">日志</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table<HostInfo>
      title="env-hosts"
      actionRef={tableRef}
      rowKey="Uid"
      search="请输入主机名搜索"
      columns={columns}
      request={async () => ({
        msg: 'OK',
        code: 2000,
        data: {
          list: [
            {
              Uid: '1',
              Hostname: 'hk-orch-1',
              PublicIP: '181.188.188.188',
              PrivateIP: '192.168.0.1',
              Config: '4c-8g-500g',
              Cloud: '阿里云',
              PaymentMethod: '包年包月',
              ExpireDate: '2023-12-31',
            },
            {
              Uid: '2',
              Hostname: 'hk-orch-2',
              PublicIP: '181.188.188.188',
              PrivateIP: '192.168.0.1',
              Config: '4c-8g-500g',
              Cloud: '阿里云',
              PaymentMethod: '包年包月',
              ExpireDate: '2023-12-31',
            },
            {
              Uid: '3',
              Hostname: 'hk-orch-3',
              PublicIP: '181.188.188.188',
              PrivateIP: '192.168.0.1',
              Config: '4c-8g-500g',
              Cloud: '阿里云',
              PaymentMethod: '包年包月',
              ExpireDate: '2023-12-31',
            },
          ],
          total: 3,
        },
      })}
      columnsConfig={columnsConfig}
      toolBarRender={() => [<AddHostModalForm key="add-host" env={env!} />]}
    />
  );
}
