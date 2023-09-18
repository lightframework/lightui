import PageContainer from '@/components/ui/PageContainer';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { hosttypePageListApiCmdbHosttypes } from '@/services/cmdb/hosttype';
import { ActionType } from '@ant-design/pro-components';
import { history, useAccess } from '@umijs/max';
import { Button, Result } from 'antd';
import { useRef } from 'react';
import HostTypeCreateModalForm from './HostTypeCreateModalForm';
import HostTypeDeleteModalForm from './HostTypeDeleteModalForm';
import HostTypeUpdateModalForm from './HostTypeUpdateModalForm';

export default function HostType() {
  const access = useAccess();
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig = {
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<API.HostTypeInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      width: TABLE_UID_WIDTH,
    },
    {
      title: '主机类型名称',
      key: 'HostType',
      dataIndex: 'HostType',
      copyable: true,
      sorter: true,
      width: 250,
    },
    {
      title: '规则定义',
      key: 'RuleDefinition',
      dataIndex: 'RuleDefinition',
      copyable: true,
      width: 300,
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
      width: 140,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <HostTypeUpdateModalForm
              hostTypeUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <HostTypeDeleteModalForm
              hostTypeUid={row.Uid}
              hostTypeName={row.HostType}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
    },
  ];

  if (!(access as any).hosttypePageListApiCmdbHosttypes) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问主机类型数据"
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            返回首页
          </Button>
        }
      />
    );
  }

  return (
    <PageContainer>
      <Table<API.HostTypeInfo>
        title="host-types"
        actionRef={tableRef}
        rowKey="Uid"
        columns={columns}
        search="请输入主机类型名称搜索"
        request={hosttypePageListApiCmdbHosttypes}
        columnsConfig={columnsConfig}
        toolBarRender={() => [
          <HostTypeCreateModalForm
            key="hosttype-create"
            onFinish={() => tableRef.current?.reload()}
          />,
        ]}
      />
    </PageContainer>
  );
}
