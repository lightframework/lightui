import StatusTag from '@/components/ui/StatusTag';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { useRegionList } from '@/contexts/list-data-context';
import { imagePageListApiCmdbImages } from '@/services/cmdb/image';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import CloudSyncButton from '../../../CloudSyncButton';
import { useCloud } from '../../contexts/cloud-context';
import DisabledCreateButton from '../DisabledCreateButton';
import DisabledDeleteButton from '../DisabledDeleteButton';
import DisabledUpdateButton from '../DisabledUpdateButton';

export default function Images() {
  const { cloud } = useCloud();
  const tableRef = useRef<ActionType>();

  const { selectedItem: selectedRegion } = useRegionList();

  if (!selectedRegion || !cloud) {
    return;
  }

  const columnsConfig: TableColumnsConfig = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
    Description: { show: false },
    IsSupportCloudinit: { show: false },
    Platfor: { show: false },
    ImageSource: { show: false },
    LicenseType: { show: false },
    SyncPercent: { show: false },
    ImageCreator: { show: false },
  };

  const columns: TableColumns<API.ImageInfo> = [
    {
      title: 'Uid',
      dataIndex: 'Uid',
      key: 'Uid',
      width: TABLE_UID_WIDTH,
    },
    {
      title: '镜像Id',
      key: 'ImageId',
      dataIndex: 'ImageId',
      width: 140,
      copyable: true,
      sorter: true,
    },
    {
      title: '镜像名称',
      key: 'ImageName',
      dataIndex: 'ImageName',
      copyable: true,
      ellipsis: true,
      sorter: true,
      width: 240,
    },
    {
      title: '镜像类型',
      key: 'ImageType',
      dataIndex: 'ImageType',
      ellipsis: true,
      width: 120,
    },
    {
      title: '镜像架构',
      key: 'Architecture',
      dataIndex: 'Architecture',
      ellipsis: true,
      width: 70,
    },
    {
      title: '镜像平台',
      key: 'Platfor',
      dataIndex: 'Platfor',
      ellipsis: true,
      width: 80,
    },
    {
      title: '系统名称',
      key: 'OsName',
      dataIndex: 'OsName',
      ellipsis: true,
      width: 160,
    },
    {
      title: '镜像大小',
      key: 'ImageSize',
      dataIndex: 'ImageSize',
      width: 80,
    },
    {
      title: '镜像源',
      key: 'ImageSource',
      dataIndex: 'ImageSource',
      ellipsis: true,
      width: 150,
    },
    {
      title: '状态',
      key: 'ImageState',
      dataIndex: 'ImageState',
      width: 100,
      sorter: true,
      render: (_, row) => (
        <StatusTag content={row.ImageState} positive="NORMAL" />
      ),
    },
    {
      title: '协议类型',
      key: 'LicenseType',
      dataIndex: 'LicenseType',
      ellipsis: true,
      width: 120,
    },
    {
      title: '支持cloud-init',
      key: 'IsSupportCloudinit',
      dataIndex: 'IsSupportCloudinit',
      render: (_, row) => <StatusTag content={row.IsSupportCloudinit} />,
      ellipsis: true,
      width: 150,
    },
    {
      title: '同步进度',
      key: 'SyncPercent',
      dataIndex: 'SyncPercent',
      ellipsis: true,
      width: 80,
      render: (_, row) => `${row.SyncPercent}%`,
    },
    {
      title: '镜像创建者',
      key: 'ImageCreator',
      dataIndex: 'ImageCreator',
      ellipsis: true,
      width: 120,
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
      key: 'ImageDescription',
      dataIndex: 'ImageDescription',
      ellipsis: true,
      width: TABLE_DESC_WIDTH,
    },
    {
      title: '描述',
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
            {/* <ImageUpdateModalForm
              regionUid={selectedRegion.Uid}
              imageUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <ImageDeleteModalForm
              imageUid={row.Uid}
              imageId={row.ImageId}
              imageName={row.ImageName}
            /> */}
            <DisabledUpdateButton />
            <DisabledDeleteButton />
          </div>
        );
      },
    },
  ];

  return (
    <Table<API.ImageInfo, API.imagePageListApiCmdbImagesParams>
      title="cloud-images"
      actionRef={tableRef}
      rowKey="Uid"
      search="请输入镜像名称搜索"
      columns={columns}
      params={{ RegionUid: selectedRegion.Uid }}
      request={imagePageListApiCmdbImages}
      columnsConfig={columnsConfig}
      toolBarRender={() => [
        <CloudSyncButton
          key="zone-sync"
          title="镜像同步"
          type="image"
          cloudUid={cloud.Uid!}
          regionUid={selectedRegion.Uid}
          onFinish={tableRef.current?.reload}
          hint={
            <div>
              您确定要同步{' '}
              <span className="text-red-400">
                {cloud.CloudName} - {selectedRegion.RegionName}
              </span>{' '}
              的镜像吗？
            </div>
          }
        />,
        // <ImageCreateModalForm
        //   key="region-image-create"
        //   regionUid={selectedRegion.Uid}
        //   onFinish={() => tableRef.current?.reload(true)}
        // />,
        <DisabledCreateButton key="disabled-image-create" />,
      ]}
    />
  );
}
