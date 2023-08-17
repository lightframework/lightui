import Table, { TableColumns } from '@/components/ui/Table';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

type TmpHostInfo = {
  Hostname: string;
  Zone: string;
  Config: string;
  Count: number;
};

function TmpHostTable() {
  const tableRef = useRef<ActionType>();

  const columns: TableColumns<TmpHostInfo> = [
    {
      title: '主机名',
      key: 'Hostname',
      dataIndex: 'Hostname',
      ellipsis: true,
    },
    {
      title: '可用区',
      key: 'Zone',
      dataIndex: 'Zone',
      ellipsis: true,
    },
    {
      title: '配置',
      key: 'Config',
      dataIndex: 'Config',
      ellipsis: true,
    },
    {
      title: '数量',
      key: 'Count',
      dataIndex: 'Count',
    },
    {
      title: '操作',
      key: 'options',
      className: 'xl:w-[140px]',
      render: () => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button type="link">复制</Button>
            <Button type="link" danger>
              移除
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-1/2 bg-red-400">
      <Table<TmpHostInfo>
        className="env-add-host-table"
        actionRef={tableRef}
        title="env-add-hosts"
        columns={columns}
        rowKey="Zone"
        request={async () => ({
          msg: 'OK',
          code: 2000,
          data: {
            list: [
              {
                Hostname: 'POP-{number}-Shanghai-tc',
                Zone: 'Shanghai-1',
                Config: '4c8g',
                Count: 3,
              },
              {
                Hostname: 'POP-{number}-Shanghai-tc',
                Zone: 'Shanghai-2',
                Config: '1c2g',
                Count: 3,
              },
            ],
            total: 2,
          },
        })}
      />
    </div>
  );
}

function HostAddForm() {
  return <div className="w-1/2 bg-green-400">form</div>;
}

export default function HostAdd() {
  return (
    <div className="flex">
      <TmpHostTable />
      <HostAddForm />
    </div>
  );
}
