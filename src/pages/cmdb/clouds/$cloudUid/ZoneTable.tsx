import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { zonePageListApiCmdbZones } from '@/services/cmdb/zone';
import { sorter } from '@/utils/sorter';
import { useRef } from 'react';
import ZoneCreateModalForm from './ZoneCreateModalForm';
import ZoneDeleteModalForm from './ZoneDeleteModalForm';
import ZoneUpdateModalForm from './ZoneUpdateModalForm';

export default function ZoneTable({ regionUid }: { regionUid: string }) {
  const tableRef = useRef<LightTableAction>();

  const columns: LightColumnsType<API.ZoneInfo> = [
    {
      title: '可用区ID',
      key: 'Zone',
      dataIndex: 'Zone',
      copyAble: true,
      sorter: (a, b) => sorter(a, b, 'Zone'),
      ellipsis: true,
    },
    {
      title: '可用区名称',
      key: 'ZoneName',
      dataIndex: 'ZoneName',
      copyAble: true,
      sorter: (a, b) => sorter(a, b, 'ZoneName'),
      ellipsis: true,
    },
    {
      title: '状态',
      key: 'ZoneState',
      dataIndex: 'ZoneState',
      width: 60,
    },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      ellipsis: true,
      sorter: (a, b) =>
        sorter(a, b, 'createAt', {
          valueType: 'dateTime',
        }),
    },
    {
      title: '操作',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <ZoneUpdateModalForm
              zoneUid={row.Uid}
              regionUid={regionUid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <ZoneDeleteModalForm
              zoneUid={row.Uid}
              zone={row.Zone}
              zoneName={row.ZoneName}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
      width: '10%',
    },
  ];

  const queryColumns: QueryColumn[] = [
    {
      type: 'text',
      name: 'keywords',
      itemWidth: 300,
      placeholder: '请输入可用区名称搜索',
    },
  ];

  return (
    <LightTable<API.ZoneInfo, API.zonePageListApiCmdbZonesParams>
      key={regionUid}
      ref={tableRef}
      rowKey="Uid"
      columns={columns}
      search
      params={{ RegionUid: regionUid }}
      request={zonePageListApiCmdbZones}
      queryColumns={queryColumns}
      buttonRender={
        <ZoneCreateModalForm
          key="zone-create"
          regionUid={regionUid}
          onFinish={() => tableRef.current?.reload()}
        />
      }
    />
  );
}
