import { zonePageListApiCmdbZones } from '@/services/cmdb/zone';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import ZoneCreateModalForm from './ZoneCreateModalForm';
import ZoneDeleteModalForm from './ZoneDeleteModalForm';
import ZoneUpdateModalForm from './ZoneUpdateModalForm';

export default function ZoneTable({ regionUid }: { regionUid: string }) {
  const tableRef = useRef<ActionType>();

  const reloadTable = () => {
    tableRef.current?.reload();
  };

  const columns: ProColumns<API.ZoneInfo>[] = [
    {
      width: 48,
      search: false,
    },
    {
      title: '可用区ID',
      key: 'Zone',
      dataIndex: 'Zone',
      search: false,
      copyable: true,
      sorter: (a, b) => {
        const aId = a['Zone'];
        const bId = b['Zone'];
        return aId.localeCompare(bId);
      },
    },
    {
      title: '可用区名称',
      key: 'ZoneName',
      dataIndex: 'ZoneName',
      search: { transform: (value: string) => ({ keywords: value }) },
      copyable: true,
      sorter: (a, b) => {
        const aName = a['ZoneName'];
        const bName = b['ZoneName'];
        return aName.localeCompare(bName);
      },
    },
    {
      title: '状态',
      key: 'ZoneState',
      dataIndex: 'ZoneState',
      search: false,
      render: (value) => {
        if (value === '0') {
          return <span className="text-gray-400">不可用</span>;
        }

        return <span className="text-green-400">可用</span>;
      },
      width: '8%',
    },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      search: false,
      valueType: 'dateTime',
      sorter: (a, b) => {
        const aTime = new Date(a['createAt']).getTime();
        const bTime = new Date(b['createAt']).getTime();
        return aTime - bTime;
      },
    },
    {
      title: '操作',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-5 xl:flex-nowrap">
            <ZoneUpdateModalForm
              uid={row.Uid}
              initialValues={{ ...row, RegionUid: regionUid }}
              onFinish={reloadTable}
            />
            <ZoneDeleteModalForm
              uid={row.Uid}
              zone={row.Zone}
              zoneName={row.ZoneName}
              onFinish={reloadTable}
            />
          </div>
        );
      },
      search: false,
      width: '15%',
    },
  ];

  return (
    <ProTable<API.ZoneInfo, API.zonePageListApiCmdbZonesParams>
      key={regionUid}
      actionRef={tableRef}
      columns={columns}
      search={{
        style: { margin: 0 },
      }}
      request={async (params) => {
        const res = await zonePageListApiCmdbZones({
          ...params,
          RegionUid: regionUid,
        });
        return {
          success: res.msg === 'OK',
          total: res.data?.total,
          data: res.data?.list,
        };
      }}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        defaultPageSize: 10,
      }}
      toolBarRender={() => [
        <ZoneCreateModalForm
          key="zone-create"
          regionUid={regionUid}
          onFinish={reloadTable}
        />,
      ]}
    />
  );
}
