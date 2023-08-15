import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { sorter } from '@/utils/sorter';
import { useRef } from 'react';
import SecurityGroupCreateModalForm from './SecurityGroupCreateModalForm';
import SecurityGroupDeleteModalForm from './SecurityGroupDeleteModalForm';
import SecurityGroupUpdateModalForm from './SecurityGroupUpdateModalForm';

type SecurityGroupInfo = {
  Uid: string;
  SGId: string;
  SGName: string;
  Tag: string;
  createAt: string;
};

export default function SecurityGroup({ regionUid }: { regionUid: string }) {
  const tableRef = useRef<LightTableAction>();

  const columns: LightColumnsType<SecurityGroupInfo> = [
    {
      title: '安全组Id',
      key: 'SGId',
      dataIndex: 'SGId',
      ellipsis: true,
    },
    {
      title: '安全组名称',
      key: 'SGName',
      dataIndex: 'SGName',
      ellipsis: true,
      sorter: (a, b) => sorter(a, b, 'SGName'),
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
      className: 'xl:w-[140px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <SecurityGroupUpdateModalForm
              sgUid={row.Uid}
              regionUid={regionUid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <SecurityGroupDeleteModalForm
              sgUid={row.Uid}
              sgId={row.SGId}
              sgName={row.SGName}
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
      placeholder: '请输入安全组名称搜索',
    },
  ];

  return (
    <LightTable<SecurityGroupInfo>
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
              SGId: 'sec_id_1',
              SGName: '客户端访问',
              Tag: '客户端',
              createAt: '2023/2/1 18:00:00',
            },
            {
              Uid: '31232',
              SGId: 'sec_id_2',
              SGName: '全通',
              Tag: '全通',
              createAt: '2023/2/1 18:00:00',
            },
          ],
          total: 2,
        },
      })}
      buttonRender={
        <SecurityGroupCreateModalForm
          regionUid={regionUid}
          onFinish={() => tableRef.current?.reload(true)}
        />
      }
    />
  );
}
