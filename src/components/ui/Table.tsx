import { RedoOutlined } from '@ant-design/icons';
import {
  ActionType,
  ColumnsState,
  ProColumns,
  ProTable,
  ProTableProps,
} from '@ant-design/pro-components';
import { Button, Form, Input } from 'antd';
import { MutableRefObject, useEffect, useState } from 'react';

export type TableColumns<T extends Record<string, any>> = (Omit<
  ProColumns<T>,
  'dataIndex' | 'search'
> & {
  dataIndex?: keyof T;
})[];

export type TableColumnsConfig<T extends Record<string, any>> = {
  [key in keyof T]?: ColumnsState;
};

type ParamsType = Record<string, any>;

export default function Table<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
>({
  title,
  search = false,
  actionRef,
  request,
  columnsConfig,
  ...restProps
}: Omit<
  ProTableProps<DataType, Params>,
  'title' | 'request' | 'actionRef' | 'headerTitle' | 'search' | 'columnsState'
> & {
  title: string;
  actionRef: MutableRefObject<ActionType | undefined>;
  request: (
    params: Params & {
      pageSize?: number;
      current?: number;
      keywords?: string;
    },
  ) => Promise<{
    msg?: string;
    code?: number;
    data?: {
      list?: DataType[];
      total?: number;
    };
  }>;
  search?: string | false;
  columnsConfig?: TableColumnsConfig<DataType>;
}) {
  const [keywords, setKeywords] = useState('');
  const [columnsState, setColumnsState] = useState<{
    [key: string]: ColumnsState;
  }>(columnsConfig as { [key: string]: ColumnsState });

  useEffect(() => {
    const config = localStorage.getItem(`${title}-table-config`);
    if (config !== null) {
      setColumnsState(JSON.parse(config));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`${title}-table-config`, JSON.stringify(columnsState));
  }, [columnsState]);

  const searchForm = (
    <Form className="flex gap-x-1">
      <Button
        type="default"
        className="-rotate-90"
        icon={<RedoOutlined />}
        onClick={() => actionRef.current?.reload()}
      />
      <Input
        type="text"
        name="keywords"
        className="w-[300px]"
        value={keywords}
        placeholder={typeof search === 'string' ? search : undefined}
        onChange={(e) => setKeywords(e.target.value)}
        onPressEnter={() => actionRef.current?.reload()}
      />
    </Form>
  );

  return (
    <ProTable<DataType, Params>
      pagination={{
        size: 'small',
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
      {...restProps}
      actionRef={actionRef}
      headerTitle={typeof search === 'string' ? searchForm : null}
      search={false}
      request={async (params) => {
        const res = await request({ ...params, keywords });
        return {
          success: res.msg === 'OK',
          total: res.data?.total,
          data: res.data?.list,
        };
      }}
      columnsState={
        columnsState !== undefined
          ? {
              value: columnsState,
              onChange: (props) => setColumnsState(props),
            }
          : undefined
      }
    />
  );
}
