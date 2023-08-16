import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import SubnetTable from './SubnetTable';
import VPCCreateModalForm from './VPCCreateModalForm';
import VPCDeleteModalForm from './VPCDeleteModalForm';
import VPCUpdateModalForm from './VPCUpdateModalForm';

type VPCInfo = {
  Uid: string;
  VpcId: string;
  VpcName: string;
  Tag: string;
  createAt: string;
};

export default function VPC({ regionUid }: { regionUid: string }) {
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig<VPCInfo> = {
    Uid: { show: false },
  };

  const [selectedVPC, setSelectedVPC] = useState<{
    vpcUid: string;
    vpcName: string;
  }>();

  const columns: TableColumns<VPCInfo> = [
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
    },
    {
      title: 'VPC名称',
      key: 'VpcName',
      dataIndex: 'VpcName',
      ellipsis: true,
      sorter: (a, b) => sorter(a, b, 'VpcName'),
    },

    {
      title: '标签',
      key: 'Tag',
      dataIndex: 'Tag',
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
            <VPCUpdateModalForm
              vpcUid={row.Uid}
              regionUid={regionUid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <VPCDeleteModalForm
              vpcUid={row.Uid}
              vpcId={row.VpcId}
              vpcName={row.VpcName}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table<VPCInfo>
        actionRef={tableRef}
        rowKey="Uid"
        search="请输入VPC名称搜索"
        columns={columns}
        request={async () => ({
          msg: 'OK',
          code: 2000,
          data: {
            list: [
              {
                Uid: '1231',
                VpcId: 'orch-pop-id',
                VpcName: 'orch-pop通信',
                Tag: 'orch pop',
                createAt: '2023/2/1 18:00:00',
              },
              {
                Uid: '31232',
                VpcId: 'client-id',
                VpcName: '登录客户端访问',
                Tag: '客户端',
                createAt: '2023/2/1 18:00:00',
              },
            ],
            total: 2,
          },
        })}
        columnsConfig={columnsConfig}
        toolBarRender={() => [
          <VPCCreateModalForm key="region-vpc-create" regionUid={regionUid} />,
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
