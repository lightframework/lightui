import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { sorter } from '@/utils/sorter';
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
  const tableRef = useRef<LightTableAction>();
  const [selectedVPC, setSelectedVPC] = useState<{
    vpcUid: string;
    vpcName: string;
  }>();

  const columns: LightColumnsType<VPCInfo> = [
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

  const queryColumns: QueryColumn[] = [
    {
      type: 'text',
      name: 'keywords',
      itemWidth: 300,
      placeholder: '请输入VPC名称搜索',
    },
  ];

  return (
    <>
      <LightTable<VPCInfo>
        ref={tableRef}
        rowKey="Uid"
        search
        queryColumns={queryColumns}
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
        buttonRender={<VPCCreateModalForm regionUid="" />}
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
