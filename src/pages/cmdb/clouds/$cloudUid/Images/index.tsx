import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { sorter } from '@/utils/sorter';
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
  const tableRef = useRef<LightTableAction>();

  const columns: LightColumnsType<ImageInfo> = [
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
      title: '创建人',
      key: 'ImageCreator',
      dataIndex: 'ImageCreator',
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

  const queryColumns: QueryColumn[] = [
    {
      type: 'text',
      name: 'keywords',
      itemWidth: 300,
      placeholder: '请输入镜像名称搜索',
    },
  ];

  return (
    <LightTable<ImageInfo>
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
      buttonRender={
        <ImageCreateModalForm
          regionUid={regionUid}
          onFinish={() => tableRef.current?.reload(true)}
        />
      }
    />
  );
}
