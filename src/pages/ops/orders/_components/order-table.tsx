import { TableColumns, TableColumnsState } from '@/components/table';
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from '@/constants/table';
import { ActionType } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import useModal from 'antd/es/modal/useModal';
import { useRef, useState } from 'react';

export default function OrderTable() {
  const access = useAccess();
  const [modal, contextHolder] = useModal();
  const tableRef = useRef<ActionType>();

  const [selectedOrderToView, setSelectedOrderToView] = useState<
    unknown | any
  >();

  // const showDeleteConfirm = (order:unknown) =>
  //   modal.confirm({
  //     title: '确定删除工单吗？',
  //     icon: <ExclamationCircleOutlined />,
  //     content: `删除工单 ${order.uid}`,
  //     onOk: async () => {
  //       await hosttypeDeleteApiCmdbHosttypesByUid({ uid:order.Uid });
  //       message.success('删除成功');
  //       tableRef.current?.reload(false);
  //     },
  //   });

  const columnsState: TableColumnsState = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
    updateAt: { show: false },
    updateBy: { show: false },
  };

  const columns: TableColumns<unknown> = [
    {
      title: 'UID',
      dataIndex: 'Uid',
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: '项目工单',
      dataIndex: 'ProjectOrder',
      width: 160,
      copyable: true,
    },
    {
      title: '项目名称',
      dataIndex: 'ProjectName',
      width: 300,
    },
    {
      title: '环境',
      dataIndex: 'EnvName',
      width: 100,
    },
    {
      title: '工单编号',
      dataIndex: 'Number',
      width: 200,
    },
    {
      title: '工单类型',
      dataIndex: 'Genre',
      width: 160,
    },
    {
      title: '开始时间',
      dataIndex: 'StartTime',
      valueType: 'dateTime',
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: '结束时间',
      dataIndex: 'EndTime',
      valueType: 'dateTime',
      width: TABLE_CELL_DATETIME_WIDTH,
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
  ];

  // return (
  //   <>
  //     {contextHolder}
  //     <Table name="order" actionRef={tableRef} columns={columns} rowKey="Uid" />
  //   </>
  // );

  return <div>OrderTable</div>;
}
