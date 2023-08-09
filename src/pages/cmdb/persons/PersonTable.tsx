import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { personPageListApiCmdbPersons } from '@/services/cmdb/person';
import { sorter } from '@/utils/sorter';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import PersonCreateModalForm from './PersonCreateModalForm';
import PersonDeleteModalForm from './PersonDeleteModalForm';
import PersonUpdateModalForm from './PersonUpdateModalForm';

export default function PersonTable({
  professionUid,
  professionOptions,
}: {
  professionUid: string;
  professionOptions: { label: string; value: string }[];
}) {
  const tableRef = useRef<LightTableAction>();

  const columns: LightColumnsType<API.PersonInfo> = [
    {
      title: '姓名',
      key: 'PersonName',
      dataIndex: 'PersonName',
      ellipsis: true,
      copyAble: true,
      sorter: (a, b) => sorter(a, b, 'PersonName'),
      width: '10%',
    },
    {
      title: '邮箱',
      key: 'Email',
      dataIndex: 'Email',
      ellipsis: true,
      copyAble: true,
      width: '15%',
    },
    {
      title: '联系电话',
      key: 'Mobile',
      dataIndex: 'Mobile',
      ellipsis: true,
      copyAble: true,
      width: '10%',
    },
    {
      title: '状态',
      key: 'Enabled',
      dataIndex: 'Enabled',
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
      dataIndex: 'createAt',
      key: 'createAt',
      ellipsis: true,
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
      width: '10%',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <PersonUpdateModalForm
              persionUid={row.Uid}
              initialValues={row}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <PersonDeleteModalForm
              personUid={row.Uid}
              personName={row.PersonName}
              personId={row.PersonId}
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
      placeholder: '请输入姓名/邮箱/电话搜索',
    },
  ];

  return (
    <LightTable<API.PersonInfo, API.personPageListApiCmdbPersonsParams>
      key={professionUid}
      ref={tableRef}
      columns={columns}
      rowKey="Uid"
      search
      queryColumns={queryColumns}
      params={{
        ProfessionUid: professionUid,
      }}
      request={personPageListApiCmdbPersons}
      buttonRender={
        <PersonCreateModalForm
          professionUid={professionUid}
          professionOptions={professionOptions}
          onFinish={() => tableRef.current?.reload()}
        />
      }
    />
  );
}
