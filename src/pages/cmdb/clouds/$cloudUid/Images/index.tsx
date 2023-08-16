import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import ImageCreateModalForm from './ImageCreateModalForm';
import ImageDeleteModalForm from './ImageDeleteModalForm';
import ImageUpdateModalForm from './ImageUpdateModalForm';

type ImageInfo = {
  Uid: string;
  ImageId: string;
  ImageName: string;
  ImageType?: string;
  Architecture?: string;
  Platform?: string;
  OsName?: string;
  ImageSize?: string;
  Tags?: string;
  ImageCreator?: string;
  createAt?: string;
};

export default function Images({ regionUid }: { regionUid: string }) {
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig<ImageInfo> = {
    Uid: { show: false },
  };

  const columns: TableColumns<ImageInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      copyable: true,
    },
    {
      title: '镜像Id',
      key: 'ImageId',
      dataIndex: 'ImageId',
      ellipsis: true,
    },
    {
      title: '镜像名称',
      key: 'ImageName',
      dataIndex: 'ImageName',
      ellipsis: true,
      sorter: (a, b) => sorter(a, b, 'ImageName'),
    },

    {
      title: '镜像类型',
      key: 'ImageType',
      dataIndex: 'ImageType',
      ellipsis: true,
    },
    {
      title: '镜像架构',
      key: 'Architecture',
      dataIndex: 'Architecture',
      ellipsis: true,
    },
    {
      title: '镜像平台',
      key: 'Platform',
      dataIndex: 'Platform',
      ellipsis: true,
    },
    {
      title: '系统名称',
      key: 'OsName',
      dataIndex: 'OsName',
      ellipsis: true,
    },
    {
      title: '镜像大小',
      key: 'ImageSize',
      dataIndex: 'ImageSize',
      ellipsis: true,
    },
    {
      title: '标签',
      key: 'Tags',
      dataIndex: 'Tags',
      ellipsis: true,
    },
    {
      title: '创建者',
      key: 'ImageCreator',
      dataIndex: 'ImageCreator',
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
      className: 'xl:w-[140px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <ImageUpdateModalForm
              regionUid={regionUid}
              imageUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <ImageDeleteModalForm
              imageUid={row.Uid}
              imageId={row.ImageId}
              imageName={row.ImageName}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Table<ImageInfo>
      actionRef={tableRef}
      rowKey="Uid"
      search="请输入镜像名称搜索"
      columns={columns}
      request={async () => ({
        msg: 'OK',
        code: 2000,
        data: {
          list: [
            {
              Uid: '1231',
              ImageId: 'eqweq',
              ImageName: 'cnetos7-amd',
              ImageType: '操作系统',
              Architecture: 'amd',
              Platform: 'TencentOS',
              OsName: 'centos7',
              ImageSize: '500M',
              Tags: 'orch',
              ImageCreator: 'admin',
              createAt: '2023/08/15 09:00:00',
            },
          ],
          total: 1,
        },
      })}
      columnsConfig={columnsConfig}
      toolBarRender={() => [
        <ImageCreateModalForm
          key="region-image-create"
          regionUid={regionUid}
          onFinish={() => tableRef.current?.reload(true)}
        />,
      ]}
    />
  );
}
