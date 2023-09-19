import CopyableText from '@/components/CopyableText';
import StatusTag from '@/components/ui/StatusTag';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_IP_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { useRegionList } from '@/contexts/list-data-context';
import { vpcPageListApiCmdbVpcs } from '@/services/cmdb/vpc';
import { ActionType } from '@ant-design/pro-components';
import { history, useAccess } from '@umijs/max';
import { Button, Modal, Result } from 'antd';
import { useRef, useState } from 'react';
import CloudSyncButton from '../../../CloudSyncButton';
import { useCloud } from '../../contexts/cloud-context';
import DisabledCreateButton from '../DisabledCreateButton';
import DisabledDeleteButton from '../DisabledDeleteButton';
import DisabledUpdateButton from '../DisabledUpdateButton';
import SubnetTable from './SubnetTable';

export default function VPC() {
  const access = useAccess();
  const { cloud } = useCloud();
  const tableRef = useRef<ActionType>();

  const [selectedVPC, setSelectedVPC] = useState<{
    vpcUid: string;
    vpcName: string;
  }>();

  const { selectedItem: selectedRegion } = useRegionList();

  if (!selectedRegion || !cloud) {
    return;
  }

  const columnsConfig: TableColumnsConfig = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
  };

  const columns: TableColumns<API.VpcInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      width: TABLE_UID_WIDTH,
    },
    {
      title: 'VPCId',
      key: 'VpcId',
      dataIndex: 'VpcId',
      ellipsis: true,
      copyable: true,
      width: 180,
      sorter: true,
    },
    {
      title: 'VPC名称',
      key: 'VpcName',
      dataIndex: 'VpcName',
      ellipsis: true,
      copyable: true,
      sorter: true,
      width: 200,
    },
    {
      title: ' VPC网段',
      key: 'CidrBlock',
      dataIndex: 'CidrBlock',
      ellipsis: true,
      copyable: true,
      width: TABLE_IP_WIDTH,
    },
    {
      title: '是否默认',
      key: 'IsDefault',
      dataIndex: 'IsDefault',
      render: (_, row) => <StatusTag content={row.IsDefault} />,
      width: 80,
    },
    {
      title: 'DNS列表',
      key: 'DnsServerSet',
      dataIndex: 'DnsServerSet',
      copyable: true,
      render: (_, row) => {
        if (!row.DnsServerSet || row.DnsServerSet.length === 0) return '-';

        return (
          <div>
            {row.DnsServerSet?.map((ip) => (
              <CopyableText key={ip} text={ip} />
            ))}
          </div>
        );
      },
      ellipsis: true,
      width: 140,
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
      width: 220,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
              disabled={!(access as any).subnetPageListApiCmdbSubnets}
              onClick={() =>
                setSelectedVPC({ vpcUid: row.Uid, vpcName: row.VpcName })
              }
            >
              查看子网
            </Button>

            {/* <VPCUpdateModalForm
              vpcUid={row.Uid}
              regionUid={selectedRegion.Uid}
              tagOptions={tagOptions}
              onFinish={() => tableRef.current?.reload(false)}
            />
          
              <VPCDeleteModalForm
                vpcUid={row.Uid}
                vpcId={row.VpcId}
                vpcName={row.VpcName}
                onFinish={() => tableRef.current?.reload(false)}
              /> */}

            <DisabledUpdateButton />
            <DisabledDeleteButton />
          </div>
        );
      },
    },
  ];

  if (!(access as any).vpcPageListApiCmdbVpcs) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问VPC数据"
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
      <Table<API.VpcInfo, API.vpcPageListApiCmdbVpcsParams>
        title="cloud-vpcs"
        actionRef={tableRef}
        rowKey="Uid"
        search="请输入VPC名称搜索"
        columns={columns}
        params={{ RegionUid: selectedRegion.Uid }}
        request={vpcPageListApiCmdbVpcs}
        columnsConfig={columnsConfig}
        toolBarRender={() => [
          <CloudSyncButton
            key="vpc-sync"
            title="VPC同步"
            type="vpc"
            cloudUid={cloud.Uid!}
            regionUid={selectedRegion.Uid}
            onFinish={tableRef.current?.reload}
            hint={
              <div>
                您确定要同步{' '}
                <span className="text-red-400">
                  {cloud.CloudName} - {selectedRegion.RegionName}
                </span>{' '}
                的VPC吗？
              </div>
            }
          />,
          // <VPCCreateModalForm
          //   key="region-vpc-create"
          //   regionUid={selectedRegion.Uid}
          //   tagOptions={tagOptions}
          // />,
          <DisabledCreateButton key="disabled-vpc-create" />,
        ]}
      />

      <Modal
        open={selectedVPC !== undefined}
        title={`${selectedVPC?.vpcName} - 可用机型`}
        width="80%"
        bodyStyle={{
          paddingTop: 12,
        }}
        onCancel={() => setSelectedVPC(undefined)}
        footer={[
          <Button
            key="back"
            type="primary"
            onClick={() => setSelectedVPC(undefined)}
          >
            返回
          </Button>,
        ]}
      >
        {selectedVPC !== undefined ? (
          <SubnetTable vpcUid={selectedVPC.vpcUid} />
        ) : null}
      </Modal>
    </>
  );
}
