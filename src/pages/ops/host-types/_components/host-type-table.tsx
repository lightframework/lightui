import Table, { TableColumns, TableColumnsState } from '@/components/table';
import TableCellActions from '@/components/table-cell-actions';
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from '@/constants/table';
import {
  hosttypeDeleteApiCmdbHosttypesByUid,
  hosttypePageListApiCmdbHosttypes,
} from '@/services/cmdb/hosttype';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { message } from 'antd';
import useModal from 'antd/es/modal/useModal';
import { useRef, useState } from 'react';
import HostTypeCreateModalForm from './host-type-create-modal-form';
import HostTypeUpdateModalForm from './host-type-update-modal-form';

export default function HostTypeTable() {
  const access = useAccess();
  const [modal, contextHolder] = useModal();
  const tableRef = useRef<ActionType>();

  const [selectedHostTypeToUpdate, setSelectedHostTypeToUpdate] = useState<
    CMDB.HostTypeInfo | undefined
  >();

  const showDeleteConfirm = (hostType: CMDB.HostTypeInfo) =>
    modal.confirm({
      title: '确定删除主机类型吗？',
      icon: <ExclamationCircleOutlined />,
      content: `删除主机类型 ${hostType.HostType}`,
      onOk: async () => {
        await hosttypeDeleteApiCmdbHosttypesByUid({ uid: hostType.Uid });
        message.success('删除成功');
        tableRef.current?.reload(false);
      },
    });

  const columnsState: TableColumnsState = {
    Uid: { show: false },
  };

  const columns: TableColumns<CMDB.HostTypeInfo> = [
    {
      title: 'UID',
      dataIndex: 'Uid',
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: '主机类型名称',
      dataIndex: 'HostType',
      width: 250,
      copyable: true,
      sorter: true,
    },
    {
      title: '命名规则',
      dataIndex: 'RuleDefinition',
      width: 300,
      copyable: true,
    },
    {
      title: '镜像',
      dataIndex: 'ImageKeyword',
      width: 200,
      copyable: true,
    },
    {
      title: 'VPC',
      dataIndex: 'VpcKeyword',
      width: 200,
      copyable: true,
    },
    {
      title: '安全组',
      dataIndex: 'SecKeyword',
      width: 200,
      copyable: true,
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      valueType: 'dateTime',
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: '备注',
      dataIndex: 'Description',
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: '操作',
      key: 'options',
      width: 90,
      fixed: 'right',
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: '编辑',
              onClick: () => setSelectedHostTypeToUpdate(row),
              disabled: !access.hosttypeUpdateApiCmdbHosttypesByUid,
            },
            {
              text: '删除',
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.hosttypeDeleteApiCmdbHosttypesByUid,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        name="host-type"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        searchPlaceholder="请输入主机类型名称查询"
        request={hosttypePageListApiCmdbHosttypes}
        toolbar={{
          actions: [
            <HostTypeCreateModalForm
              key="host-type-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <HostTypeUpdateModalForm
        open={selectedHostTypeToUpdate !== undefined}
        onCancel={() => setSelectedHostTypeToUpdate(undefined)}
        hostType={selectedHostTypeToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  );
}
