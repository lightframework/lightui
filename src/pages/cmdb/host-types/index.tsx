import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { hosttypePageListApiCmdbHosttypes } from '@/services/cmdb/hosttype';
import { sorter } from '@/utils/sorter';
import { useRef } from 'react';
import HostTypeCreateModalForm from './HostTypeCreateModalForm';
import HostTypeDeleteModalForm from './HostTypeDeleteModalForm';
import HostTypeUpdateModalForm from './HostTypeUpdateModalForm';

export default function HostType() {
  const tableRef = useRef<LightTableAction>();

  const columns: LightColumnsType<API.HostTypeInfo> = [
    {
      title: '名称',
      key: 'HostTypeName',
      dataIndex: 'HostTypeName',
      copyAble: true,
      sorter: (a, b) => sorter(a, b, 'HostTypeName'),
      width: '15%',
    },
    {
      title: '规则定义',
      key: 'RuleDefinition',
      dataIndex: 'RuleDefinition',
      ellipsis: true,
      copyAble: true,
    },
    {
      title: '创建人',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
      width: 80,
    },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      ellipsis: true,
      width: '15%',
      sorter: (a, b) =>
        sorter(a, b, 'createAt', {
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
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <HostTypeUpdateModalForm
              hostTypeUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <HostTypeDeleteModalForm
              hostTypeUid={row.Uid}
              hostTypeName={row.HostTypeName}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
      width: '10%',
    },
  ];

  const queryColumns: QueryColumn[] = [
    {
      type: 'text',
      name: 'keywords',
      itemWidth: 300,
      placeholder: '请输入主机类型名称搜索',
    },
  ];

  return (
    <LightTable<API.HostTypeInfo, API.hosttypePageListApiCmdbHosttypesParams>
      ref={tableRef}
      columns={columns}
      rowKey="id"
      search
      request={hosttypePageListApiCmdbHosttypes}
      queryColumns={queryColumns}
      buttonRender={
        <HostTypeCreateModalForm onFinish={tableRef.current?.reload} />
      }
    />
  );
}
