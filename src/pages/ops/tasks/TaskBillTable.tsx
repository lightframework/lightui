import { TableColumns } from '@/components/ui/Table';
import { ProTable } from '@ant-design/pro-components';

export default function TaskBillTable({
  bills,
  selectedBillUuid,
  onSelect,
}: {
  bills: OPS.TaskBillInfo[];
  selectedBillUuid?: string;
  onSelect: (bill: OPS.TaskBillInfo) => void;
}) {
  const columns: TableColumns<OPS.TaskBillInfo> = [
    {
      title: 'uuid',
      key: 'uuid',
      dataIndex: 'uuid',
      ellipsis: true,
      width: 100,
    },
  ];

  return (
    <div className="w-5/12 shrink-0 space-y-2">
      <ProTable
        className="task-bill-table"
        columns={columns}
        rowKey="uuid"
        dataSource={bills}
        onRow={(row) => ({
          onClick: () => onSelect(row),
        })}
        rowClassName={(row) =>
          row.uuid === selectedBillUuid
            ? 'selected-host-row cursor-pointer'
            : 'cursor-pointer'
        }
      />
    </div>
  );
}
