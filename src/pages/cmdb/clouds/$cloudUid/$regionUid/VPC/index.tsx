import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { useRegionList } from '@/contexts/list-data-context';
import { vpcPageListApiCmdbVpcs } from '@/services/cmdb/vpc';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import CloudSyncButton from '../../../CloudSyncButton';
import { useCloud } from '../../contexts/cloud-context';
import DisabledCreateButton from '../DisabledCreateButton';
import DisabledDeleteButton from '../DisabledDeleteButton';
import DisabledUpdateButton from '../DisabledUpdateButton';
import SubnetTable from './SubnetTable';

export default function VPC() {
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

  const columnsConfig: TableColumnsConfig<API.VpcInfo> = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
  };

  const columns: TableColumns<API.VpcInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      copyable: true,
    },
    {
      title: 'VPCId',
      key: 'VpcId',
      dataIndex: 'VpcId',
      ellipsis: true,
      copyable: true,
    },
    {
      title: 'VPC名称',
      key: 'VpcName',
      dataIndex: 'VpcName',
      ellipsis: true,
      copyable: true,
      sorter: (a, b) => sorter(a, b, 'VpcName'),
    },
    {
      title: 'CidrBlock',
      key: 'CidrBlock',
      dataIndex: 'CidrBlock',
      ellipsis: true,
      copyable: true,
    },
    {
      title: 'IsDefault',
      key: 'IsDefault',
      dataIndex: 'IsDefault',
      render: (_, row) => String(row.IsDefault),
      ellipsis: true,
    },
    {
      title: 'DnsServerSet',
      key: 'DnsServerSet',
      dataIndex: 'DnsServerSet',
      render: (_, row) => row.DnsServerSet.join('/n'),
      ellipsis: true,
    },
    {
      title: '创建者',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
    },
    {
      title: '创建时间',
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
      title: '更新时间',
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
      title: '备注',
      key: 'Description',
      dataIndex: 'Description',
      ellipsis: true,
    },
    {
      title: '操作',
      className: 'xl:w-[220px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
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
