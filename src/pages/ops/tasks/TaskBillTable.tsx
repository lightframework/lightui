import { TableColumns } from '@/components/ui/Table';
import { ProTable } from '@ant-design/pro-components';

export default function TaskBillTable({
  bills,
  onSelect,
}: {
  bills: API.TaskBillInfo[];
  onSelect: (bill: API.TaskBillInfo) => void;
}) {
  const columns: TableColumns<API.TaskBillInfo> = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id',
      ellipsis: true,
      width: 100,
    },
  ];

  return (
    <ProTable
      className="task-bill-table"
      columns={columns}
      rowKey="id"
      dataSource={bills}
      onRow={(row) => ({
        onClick: () => onSelect(row),
      })}
    />
  );
}
