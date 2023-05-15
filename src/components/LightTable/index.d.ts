import type React from 'react';

import type { QueryColumn } from '@/components/QueryHeader';
import type { TableProps } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';

declare type PageInfo = {
  pageSize: number;
  total: number;
  current: number;
};

export interface LightColumnType<RecordType> extends ColumnType<RecordType> {
  search?: {
    trigger?: 'onChange' | 'onClick';
  } & Omit<QueryColumn, 'name' | 'label'>;
}

export interface LightColumnGroupType<RecordType>
  extends Omit<LightColumnType<RecordType>, 'dataIndex'> {
  children: ColumnsType<RecordType>;
}

export type LightColumnsType<T> = (LightColumnGroupType<T> | LightColumnType<T>)[];

type BaseResp = {
  code?: number;
  msg?: string;
  success: boolean;
};

export type PageDataType<T> = {
  data: {
    list: T[];
    total: number;
  };
  resp: BaseResp;
};

declare type LightTableAction = {
  reload: (resetPageIndex?: boolean) => Promise<void>;
  pageInfo: PageInfo;
};

export declare interface LightTableProps<RecordType, Prams> extends TableProps<RecordType> {
  params?: Prams;
  request?: (query: Prams) => Promise<PageDataType<RecordType>>;
  search?: boolean;
  actionRef?: React.Ref<LightTableAction | undefined>;
  queryColumns?: QueryColumn[];
  defaultPageSize?: number;
  buttonRender?: () => React.ReactElement;
  columns?: LightColumnsType<RecordType>;
}

function LightTable<
  DataType extends Record<string, any>,
  Params extends Record<string, any> = Record<string, any>,
>(props: LightTableProps<DataType, Params>): JSX.Element;

export default LightTable;
