import { zonePageListApiCmdbZones } from '@/services/cmdb/zone';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import CloudsBreadcrumb from './CloudsBreadcrumb';
import RegionInfo from './RegionInfo';
import RegionList from './RegionList';
import ZoneCreateModalForm from './ZoneCreateModalForm';
import ZoneDeleteModalForm from './ZoneDeleteModalForm';
import ZoneUpdateModalForm from './ZoneUpdateModalForm';

export default function RegionDetail() {
  const { cloudUid } = useParams();
  const [region, setRegion] = useState<API.RegionOption>();
  const tableRef = useRef<ActionType>();

  const reloadTable = () => {
    tableRef.current?.reload();
  };

  useEffect(() => {
    reloadTable();
  }, [region]);

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
    },
    {
      title: '可用区名称',
      key: 'ZoneName',
      dataIndex: 'ZoneName',
      search: { transform: (value: string) => ({ keywords: value }) },
      copyable: true,
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
    },

    {
      title: '操作',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-5 xl:flex-nowrap">
            <ZoneUpdateModalForm
              uid={row.Uid}
              initialValues={{ ...row, RegionUid: region?.Uid }}
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
    },
  ];

  return (
    <div>
      <CloudsBreadcrumb cloudUid={cloudUid!} />

      <div className="mt-5 flex bg-white">
        <RegionList
          cloudUid={cloudUid!}
          selectedRegionUid={region?.Uid}
          onRegionSelected={setRegion}
        />

        <div className="w-full">
          {region && (
            <>
              <RegionInfo region={region} />

              <ProTable<API.ZoneInfo, API.zonePageListApiCmdbZonesParams>
                actionRef={tableRef}
                columns={columns}
                search={{
                  style: { margin: 0 },
                }}
                request={async (params) => {
                  const res = await zonePageListApiCmdbZones({
                    ...params,
                    RegionUid: region.Uid,
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
                    regionUid={region.Uid}
                    onFinish={reloadTable}
                  />,
                ]}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
