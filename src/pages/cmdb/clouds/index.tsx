import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { cloudPageListApiCmdbClouds } from '@/services/cmdb/cloud';
import { sorter } from '@/utils/sorter';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Button } from 'antd';
import { useRef } from 'react';
import CloudCreateModalForm from './CloudCreateModalForm';
import CloudDeleteModalForm from './CloudDeleteModalForm';
import CloudUpdateModalForm from './CloudUpdateModalForm';

export default function Clouds() {
  const tableRef = useRef<LightTableAction>();

  const columns: LightColumnsType<API.CloudInfo> = [
    {
      title: '云商ID',
      key: 'CloudKey',
      dataIndex: 'CloudKey',
      copyAble: true,
      ellipsis: true,
      width: 100,
      sorter: (a, b) => sorter(a, b, 'CloudKey'),
    },
    {
      title: '云商名称',
      key: 'CloudName',
      dataIndex: 'CloudName',
      render: (value, row) => {
        return <Link to={row.Uid}>{value}</Link>;
      },
      ellipsis: true,
      sorter: (a, b) => sorter(a, b, 'CloudName'),
      width: '10%',
    },
    {
      title: '官网链接',
      key: 'Website',
      dataIndex: 'Website',
      copyAble: true,
      ellipsis: true,
      width: '15%',
    },
    {
      title: '云商API',
      key: 'ApiDomain',
      dataIndex: 'ApiDomain',
      copyAble: true,
      ellipsis: true,
      width: '15%',
    },
    {
      title: '支持API',
      key: 'SupportApi',
      dataIndex: 'SupportApi',
      width: 85,
      render: (value) =>
        value ? (
          <CheckCircleOutlined className="text-green-400" />
        ) : (
          <CloseCircleOutlined className="text-red-400" />
        ),
    },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      // render: (value) => new Date(value).toString(),
      sorter: (a, b) =>
        sorter(a, b, 'createAt', {
          valueType: 'dateTime',
        }),
      width: '15%',
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
            {/* TODO: 同步按钮 */}
            <Button type="link">同步</Button>
            <CloudUpdateModalForm
              cloudUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <CloudDeleteModalForm
              cloudUid={row.Uid}
              cloudKey={row.CloudKey}
              cloudName={row.CloudName}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
      width: '15%',
    },
  ];

  const queryColumns: QueryColumn[] = [
    {
      type: 'text',
      name: 'keywords',
      itemWidth: 300,
      placeholder: '请输入云商名称搜索',
    },
  ];

  return (
    <LightTable<API.CloudInfo, API.cloudPageListApiCmdbCloudsParams>
      ref={tableRef}
      columns={columns}
      rowKey="Uid"
      search
      request={cloudPageListApiCmdbClouds}
      queryColumns={queryColumns}
      buttonRender={
        <CloudCreateModalForm onFinish={() => tableRef.current?.reload()} />
      }
    />
  );
}
