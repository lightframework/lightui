import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { useRegionList } from '@/contexts/list-data-context';
import { zonePageListApiCmdbZones } from '@/services/cmdb/zone';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import RegionSyncModalForm from '../../RegionSyncModalForm';
import { useCloud } from '../../contexts/cloud-context';
import AvailableMachineTable from './AvailableMachineTable';
import ZoneCreateModalForm from './ZoneCreateModalForm';
import ZoneDeleteModalForm from './ZoneDeleteModalForm';
import ZoneUpdateModalForm from './ZoneUpdateModalForm';

export default function Zones() {
  const { selectedItem: selectedRegion } = useRegionList();
  const { cloud } = useCloud();

  const [selectedZone, setSelectedZone] = useState<{
    zoneUid: string;
    ZoneName: string;
  }>();

  const tableRef = useRef<ActionType>();

  if (!selectedRegion || !cloud) {
    return;
  }

  const columnsConfig: TableColumnsConfig<API.ZoneInfo> = {
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<API.ZoneInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      copyable: true,
    },
    {
      title: '可用区ID',
      key: 'Zone',
      dataIndex: 'Zone',
      copyable: true,
      sorter: (a, b) => sorter(a, b, 'Zone'),
      ellipsis: true,
    },
    {
      title: '可用区名称',
      key: 'ZoneName',
      dataIndex: 'ZoneName',
      copyable: true,
      sorter: (a, b) => sorter(a, b, 'ZoneName'),
      ellipsis: true,
    },
    {
      title: '状态',
      key: 'ZoneState',
      dataIndex: 'ZoneState',
    },
    {
      title: '创建者',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
    },
    {
      title: '创建日期',
      key: 'createAt',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      ellipsis: true,
      sorter: (a, b) =>
        sorter(a, b, 'createAt', {
          valueType: 'dateTime',
        }),
    },
    {
      title: '更新者',
      key: 'updateBy',
      dataIndex: 'updateBy',
      ellipsis: true,
    },
    {
      title: '更新日期',
      key: 'updateAt',
      dataIndex: 'updateAt',
      valueType: 'dateTime',
      ellipsis: true,
      sorter: (a, b) =>
        sorter(a, b, 'updateAt', {
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
              regionUid={selectedRegion.Uid}
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

  return (
    <>
      <Table<API.ZoneInfo, API.zonePageListApiCmdbZonesParams>
        title="cloud-zones"
        key={selectedRegion.Uid}
        actionRef={tableRef}
        rowKey="Uid"
        columns={columns}
        search="请输入可用区名称搜索"
        params={{ RegionUid: selectedRegion.Uid }}
        request={zonePageListApiCmdbZones}
        columnsConfig={columnsConfig}
        toolBarRender={() => [
          <RegionSyncModalForm
            key="region-sync"
            regionUid={selectedRegion.Uid}
            regionName={selectedRegion.RegionName}
            cloudName={cloud.CloudName}
          />,
          <ZoneCreateModalForm
            key="zone-create"
            regionUid={selectedRegion.Uid}
            disabled={cloud.SupportApi}
            onFinish={() => tableRef.current?.reload()}
          />,
        ]}
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
