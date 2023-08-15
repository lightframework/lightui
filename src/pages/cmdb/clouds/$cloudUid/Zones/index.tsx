import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { zonePageListApiCmdbZones } from '@/services/cmdb/zone';
import { sorter } from '@/utils/sorter';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import RegionSyncModalForm from '../RegionSyncModalForm';
import AvailableMachineTable from './AvailableMachineTable';
import ZoneCreateModalForm from './ZoneCreateModalForm';
import ZoneDeleteModalForm from './ZoneDeleteModalForm';
import ZoneUpdateModalForm from './ZoneUpdateModalForm';

export default function Zones({
  regionUid,
  regionName,
  cloudName,
  disableCreate = false,
}: {
  regionUid: string;
  regionName?: string;
  cloudName?: string;
  disableCreate?: boolean;
}) {
  const tableRef = useRef<LightTableAction>();
  const [selectedZone, setSelectedZone] = useState<{
    zoneUid: string;
    ZoneName: string;
  }>();

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
      render: (value) => new Date(value).toLocaleString(),
      sorter: (a, b) =>
        sorter(a, b, 'createAt', {
          valueType: 'dateTime',
        }),
    },
    {
      title: '操作',
      className: 'xl:w-[250px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
              onClick={() =>
                setSelectedZone({ zoneUid: row.Uid, ZoneName: row.ZoneName })
              }
            >
              查看可用机型
            </Button>
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
    <>
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
          <div className="flex gap-x-1.5">
            <RegionSyncModalForm
              regionUid={regionUid}
              regionName={regionName}
              cloudName={cloudName}
            />
            <ZoneCreateModalForm
              key="zone-create"
              regionUid={regionUid}
              disabled={disableCreate}
              onFinish={() => tableRef.current?.reload()}
            />
          </div>
        }
      />

      <Modal
        open={selectedZone !== undefined}
        title={`${selectedZone?.ZoneName} - 可用机型`}
        width="80%"
        bodyStyle={{
          paddingTop: 12,
        }}
        onCancel={() => setSelectedZone(undefined)}
        footer={[
          <Button
            key="back"
            type="primary"
            onClick={() => setSelectedZone(undefined)}
          >
            返回
          </Button>,
        ]}
      >
        {selectedZone !== undefined ? (
          <AvailableMachineTable zoneUid={selectedZone.zoneUid} />
        ) : null}
      </Modal>
    </>
  );
}
