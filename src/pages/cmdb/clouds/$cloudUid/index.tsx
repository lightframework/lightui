import { zonePageListApiCmdbZones } from '@/services/cmdb/zone';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import RegionDeleteModalForm from './RegionDeleteModalForm';
import RegionList, { RegionInfo } from './RegionList';
import RegionUpdateModalForm from './RegionUpdateModalForm';
import ZoneCreateModalForm from './ZoneCreateModalForm';
import ZoneDeleteModalForm from './ZoneDeleteModalForm';
import ZoneUpdateModalForm from './ZoneUpdateModalForm';

type ZoneInfo = Required<API.ZoneInfo>['data'];

export default function RegionDetail() {
  const { cloudUid } = useParams();
  const [region, setRegion] = useState<RegionInfo>();
  const tableRef = useRef<ActionType>();

  const reloadTable = () => {
    tableRef.current?.reload();
  };

  useEffect(() => {
    reloadTable();
  }, [region]);

  const columns: ProColumns<ZoneInfo>[] = [
    {
      width: 48,
      search: false,
    },
    {
      title: '可用区ID',
      key: 'Zone',
      dataIndex: 'Zone',
      search: false,
    },
    {
      title: '可用区名称',
      key: 'ZoneName',
      dataIndex: 'ZoneName',
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
              uid={row.Uid!}
              initialValues={{ ...row, RegionUid: region?.Uid }}
              onFinish={reloadTable}
            />
            <ZoneDeleteModalForm
              uid={row.Uid!}
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
    <div className="flex bg-white">
      <RegionList
        cloudUid={cloudUid!}
        selectedRegionUid={region?.Uid}
        onRegionSelected={setRegion}
      />

      <div className="w-full">
        {region && (
          <>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold">
                  {region.RegionName}
                </span>

                <RegionUpdateModalForm
                  uid={region.Uid!}
                  initialValues={region}
                />
                <RegionDeleteModalForm
                  uid={region.Uid!}
                  region={region.Region}
                  regionName={region.RegionName}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <label htmlFor="region-id">
                  区域ID：<span id="region-id">{region.Region}</span>
                </label>
                <label htmlFor="region-state">
                  区域状态：
                  <span id="region-state">
                    {region.RegionState !== '0' ? '可用' : '不可用'}
                  </span>
                </label>
              </div>
            </div>

            <ProTable<ZoneInfo, API.zonePageListApiCmdbZonesParams>
              actionRef={tableRef}
              columns={columns}
              search={{
                style: { margin: 0 },
              }}
              request={async (params) => {
                const res = await zonePageListApiCmdbZones({
                  ...params,
                  RegionUid: region.Uid!,
                });
                return {
                  success: res.msg === 'OK',
                  total: res.data?.total,
                  data: res.data?.list as any,
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
                  regionUid={region.Uid!}
                  onFinish={reloadTable}
                />,
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
