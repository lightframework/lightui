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
      title: '可用区',
      key: 'zone',
      dataIndex: 'zone',
      width: 100,
    },
    {
      title: '配置',
      key: 'InstanceType',
      dataIndex: 'instanceType',
      width: 100,
    },
    {
      title: '数量',
      key: 'count',
      dataIndex: 'count',
      width: 60,
    },
    {
      title: '操作',
      key: 'options',
      width: 140,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
              onClick={(e) => {
                e.stopPropagation();
                onCopy(row);
              }}
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
      />
      <Button className="w-full" type="primary" onClick={onHostAdd}>
        添加主机
      </Button>
    </div>
  );
}
