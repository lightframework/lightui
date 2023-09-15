import { TableColumns } from '@/components/ui/Table';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { StagedHost } from './HostCreateModal';

export default function HostItemTable({
  selectedHostUuid,
  hosts,
  onCopy,
  onRemove,
  onRowClick,
  onHostAdd,
}: {
  selectedHostUuid?: string;
  hosts: StagedHost[];
  onHostAdd: VoidFunction;
  onCopy: (host: StagedHost) => void;
  onRemove: (host: StagedHost) => void;
  onRowClick: (row: StagedHost) => void;
}) {
  const columns: TableColumns<StagedHost> = [
    {
      title: 'uuid',
      key: 'uuid',
      dataIndex: 'uuid',
      width: 250,
    },
    {
      title: '资源组',
      key: 'resourceGroup',
      dataIndex: 'resourceGroup',
      width: 100,
    },
    {
      title: '区域 - 可用区',
      key: 'region',
      dataIndex: 'region',
      width: 200,
      render: (_, row) => `${row.region} - ${row.zone}`,
    },
    {
      title: '资源规格',
      key: 'InstanceType',
      dataIndex: 'instanceType',
      width: 140,
      render: (_, row) =>
        row.instanceType
          ? `${row.instanceType}_${row.cpu}C${row.memory}G`
          : '-',
    },
    {
      title: '数量',
      key: 'count',
      dataIndex: 'count',
      width: 60,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'options',
      fixed: 'right',
      width: 110,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
              onClick={(e) => {
                e.stopPropagation();
                onCopy(row);
              }}
              className="!p-0"
            >
              复制
            </Button>
            <Button
              type="link"
              danger
              onClick={(e) => {
                e.stopPropagation();
                onRemove(row);
              }}
            >
              移除
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-5/12 shrink-0 space-y-2">
      <ProTable
        className="env-add-host-table"
        columns={columns}
        rowKey="uuid"
        dataSource={hosts}
        onRow={(row) => ({
          onClick: () => onRowClick(row),
        })}
        rowClassName={(row) =>
          row.uuid === selectedHostUuid
            ? 'selected-host-row cursor-pointer'
            : 'cursor-pointer'
        }
        columnsState={{ value: { uuid: { show: false } } }}
      />
      <Button className="w-full" type="primary" onClick={onHostAdd}>
        添加主机
      </Button>
    </div>
  );
}
