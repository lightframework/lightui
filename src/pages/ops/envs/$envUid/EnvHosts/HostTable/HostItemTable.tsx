import { TableColumns } from '@/components/ui/Table';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { StagedHost } from './HostCreateModal';

export default function HostItemTable({
  hosts,
  onCopy,
  onRemove,
}: {
  hosts: StagedHost[];
  onCopy: (host: StagedHost) => void;
  onRemove: (host: StagedHost) => void;
}) {
  const columns: TableColumns<StagedHost> = [
    {
      title: '主机名',
      key: 'hostname',
      width: 250,
      render: (_, row) => {
        const ruleDefinition = row.hostType.RuleDefinition;
        return ruleDefinition
          .replace('{{.Cloud}}', row.cloud.Cloud)
          .replace('{{.Region}}', row.region.Region)
          .replace('{{.Zone}}', row.zone.Zone);
      },
    },
    {
      title: '可用区',
      key: 'Zone',
      render: (_, row) => row.zone.ZoneName,
      width: 100,
    },
    {
      title: '配置',
      key: 'InstanceType',
      render: (_, row) => row.instanceType.TypeName,
      width: 100,
    },
    {
      title: '数量',
      key: 'Count',
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
            <Button type="link" onClick={() => onCopy(row)}>
              复制
            </Button>
            <Button type="link" danger onClick={() => onRemove(row)}>
              移除
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-5/12">
      <ProTable
        className="env-add-host-table"
        columns={columns}
        rowKey="uuid"
        dataSource={hosts}
      />
    </div>
  );
}
