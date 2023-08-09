import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { projectPageListApiCmdbProjects } from '@/services/cmdb/project';
import { sorter } from '@/utils/sorter';
import { Button } from 'antd';
import { useRef } from 'react';

export default function EnvProjects({ envUid }: { envUid: string }) {
  const tableRef = useRef<LightTableAction>();

  const columns: LightColumnsType<API.ProjectInfo> = [
    {
      title: '项目ID',
      key: 'ProjectId',
      dataIndex: 'ProjectId',
      copyAble: true,
      ellipsis: true,
    },
    {
      title: '项目名称',
      key: 'ProjectName',
      dataIndex: 'ProjectName',
      ellipsis: true,
      copyAble: true,
      sorter: (a, b) => sorter(a, b, 'ProjectName'),
    },
    {
      title: '状态',
      key: 'ProjectState',
      dataIndex: 'ProjectState',
    },
    {
      title: '接入时间',
      key: 'createAt',
      dataIndex: 'createAt',
      sorter: (a, b) => sorter(a, b, 'createAt', { valueType: 'dateTime' }),
    },
    {
      title: '操作',
      render: () => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button type="link">详情</Button>
            <Button type="link">配置</Button>

            <Button type="link">日志</Button>
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
      placeholder: '请输入可用区名称搜索',
    },
  ];

  return (
    <LightTable<API.ProjectInfo, API.projectPageListApiCmdbProjectsParams>
      ref={tableRef}
      key={envUid}
      rowKey="Uid"
      search
      params={{
        EnvUid: envUid,
      }}
      queryColumns={queryColumns}
      request={projectPageListApiCmdbProjects}
      columns={columns}
    />
  );
}
