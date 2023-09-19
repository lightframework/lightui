import StatusTag from '@/components/ui/StatusTag';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { useRegionList } from '@/contexts/list-data-context';
import { zonePageListApiCmdbZones } from '@/services/cmdb/zone';
import { ActionType } from '@ant-design/pro-components';
import { history, useAccess } from '@umijs/max';
import { Button, Modal, Result } from 'antd';
import { useRef, useState } from 'react';
import CloudSyncButton from '../../../CloudSyncButton';
import { useCloud } from '../../contexts/cloud-context';
import DisabledCreateButton from '../DisabledCreateButton';
import DisabledDeleteButton from '../DisabledDeleteButton';
import DisabledUpdateButton from '../DisabledUpdateButton';
import InstanceTable from './InstanceTable';

export default function Zones() {
  const access = useAccess();
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

  const columnsConfig: TableColumnsConfig = {
    createAt: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<API.ZoneInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      width: TABLE_UID_WIDTH,
    },
    {
      title: '可用区Id',
      key: 'Zone',
      dataIndex: 'Zone',
      copyable: true,
      sorter: true,
      ellipsis: true,
      width: 240,
    },
    {
      title: '可用区名称',
      key: 'ZoneName',
      dataIndex: 'ZoneName',
      copyable: true,
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      title: '状态',
      key: 'ZoneState',
      dataIndex: 'ZoneState',
      width: 120,
      sorter: true,
      render: (_, row) => (
        <StatusTag content={row.ZoneState} positive="AVAILABLE" />
      ),
    },
    {
      title: '创建者',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '更新者',
      key: 'updateBy',
      dataIndex: 'updateBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '更新时间',
      key: 'updateAt',
      dataIndex: 'updateAt',
      valueType: 'dateTime',
      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '备注',
      key: 'Description',
      dataIndex: 'Description',
      ellipsis: true,
      width: TABLE_DESC_WIDTH,
    },
    {
      title: '操作',
      key: 'options',
      fixed: 'right',
      width: 250,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
              disabled={
                !(access as any).instanceTypeQuotaItemPageListApiCmdbInstypes
              }
              onClick={() =>
                setSelectedZone({ zoneUid: row.Uid, ZoneName: row.ZoneName })
              }
            >
              查看可用机型
            </Button>
            {/* <ZoneUpdateModalForm
              zoneUid={row.Uid}
              regionUid={selectedRegion.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />

              <ZoneDeleteModalForm
                zoneUid={row.Uid}
                zone={row.Zone}
                zoneName={row.ZoneName}
                onFinish={() => tableRef.current?.reload(false)}
              /> */}

            <DisabledUpdateButton />
            <DisabledDeleteButton />
          </div>
        );
      },
    },
  ];

  if (!(access as any).zonePageListApiCmdbZones) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问可用区数据"
        extra={
          <Button
            type="primary"
            onClick={() => history.replace('/cmdb/clouds')}
          >
            返回云商
          </Button>
        }
      />
    );
  }

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
          <CloudSyncButton
            key="zone-sync"
            title="可用区同步"
            type="zone"
            cloudUid={cloud.Uid!}
            regionUid={selectedRegion.Uid}
            onFinish={tableRef.current?.reload}
            hint={
              <div>
                您确定要同步{' '}
                <span className="text-red-400">
                  {cloud.CloudName} - {selectedRegion.RegionName}
                </span>{' '}
                的可用机型吗？
              </div>
            }
          />,
          // <ZoneCreateModalForm
          //   key="zone-create"
          //   regionUid={selectedRegion.Uid}
          //   onFinish={() => tableRef.current?.reload()}
          // />,
          <DisabledCreateButton key="disabled-zone-create" />,
        ]}
      />
      <Modal
        open={selectedZone !== undefined}
        title={`${selectedZone?.ZoneName} - 可用机型`}
        width="80%"
        bodyStyle={{
          paddingTop: 12,
          overflowX: 'auto',
          overflowY: 'hidden',
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
          <InstanceTable zoneUid={selectedZone.zoneUid} />
        ) : null}
      </Modal>
    </>
  );
}
